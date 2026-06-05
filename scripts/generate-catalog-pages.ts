/**
 * Rasterize each catalogue PDF in public/catalogs/*.pdf into compressed webp
 * page images for the magazine flipbook viewer.
 *
 * Output:
 *   public/catalogs/pages/<slug>/<n>.webp   (1-indexed page images)
 *   src/data/catalog-pages.json             ({ "<slug>": <pageCount> })
 *
 * Pure-Node: pdfjs-dist renders each page, @napi-rs/canvas encodes webp.
 * No system tooling (poppler / cwebp / Cairo) required.
 * Run: npx tsx scripts/generate-catalog-pages.ts
 */
import { createCanvas, loadImage } from "@napi-rs/canvas";
import { existsSync, mkdirSync, readdirSync, rmSync, writeFileSync, statSync, readFileSync } from "fs";
import { join, basename } from "path";

const ROOT = join(__dirname, "..");
const SRC_DIR = join(ROOT, "public", "catalogs");
const OUT_ROOT = join(SRC_DIR, "pages");
const MANIFEST = join(ROOT, "src", "data", "catalog-pages.json");

const TARGET_WIDTH = 1400; // px — sharp enough to zoom, small enough for web
const WEBP_QUALITY = 80;

// Pull each page's content toward the binding to close the center gutter: the
// inner (spine-side) whitespace is dropped and the outer edge padded white, so
// content pages meet the spine like a real magazine. Full-bleed pages have ~no
// inner margin and are left untouched. Capped so we never move content too far.
const SPINE_SHIFT_CAP_FRAC = 0.12;
const SPINE_SHIFT_MIN_PX = 14; // below this, treat as full-bleed — don't shift

// Slugs whose PDF pdfjs cannot decode (e.g. "Bad FCHECK in flate stream" → blank
// pages). Listed slugs are skipped and the viewer falls back to the inline PDF
// view for any slug absent from the manifest. Currently empty.
const SKIP_SLUGS = new Set<string>([]);

// @napi-rs/canvas throws "Read pixels from canvas failed" when getImageData is
// asked for a region outside the canvas, whereas pdfjs's soft-mask compositor
// (genericComposeSMask) routinely reads slightly out-of-bounds and relies on the
// browser returning transparent pixels there. Wrap getImageData to clamp the read
// to the canvas and zero-fill the rest, preserving the requested width/height.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function patchSafeGetImageData(ctx: any) {
  const orig = ctx.getImageData.bind(ctx);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ctx.getImageData = (sx: number, sy: number, sw: number, sh: number, ...rest: any[]) => {
    sx = Math.round(sx); sy = Math.round(sy); sw = Math.round(sw); sh = Math.round(sh);
    const W = ctx.canvas.width, H = ctx.canvas.height;
    if (sw <= 0 || sh <= 0) return orig(sx, sy, Math.max(sw, 1), Math.max(sh, 1), ...rest);
    if (sx >= 0 && sy >= 0 && sx + sw <= W && sy + sh <= H) return orig(sx, sy, sw, sh, ...rest);
    const ix = Math.max(0, sx), iy = Math.max(0, sy);
    const ax = Math.min(W, sx + sw), ay = Math.min(H, sy + sh);
    const out = ctx.createImageData(sw, sh); // zero-filled
    if (ax > ix && ay > iy) {
      const valid = orig(ix, iy, ax - ix, ay - iy, ...rest);
      const vw = ax - ix, offX = ix - sx, offY = iy - sy;
      for (let r = 0; r < ay - iy; r++) {
        const srcStart = r * vw * 4;
        out.data.set(valid.data.subarray(srcStart, srcStart + vw * 4), ((r + offY) * sw + offX) * 4);
      }
    }
    return out;
  };
}

// pdfjs's bundled NodeCanvasFactory resizes canvases to 0 on destroy, which
// @napi-rs/canvas rejects once a 2d context is live. Provide our own factory
// that creates @napi-rs canvases and tears them down without resizing.
class NapiCanvasFactory {
  create(width: number, height: number) {
    const canvas = createCanvas(Math.ceil(width), Math.ceil(height));
    const context = canvas.getContext("2d");
    patchSafeGetImageData(context);
    return { canvas, context };
  }
  reset(entry: { canvas: ReturnType<typeof createCanvas> }, width: number, height: number) {
    entry.canvas.width = Math.ceil(width);
    entry.canvas.height = Math.ceil(height);
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  destroy(entry: any) {
    entry.canvas = null;
    entry.context = null;
  }
}

function isRealPdf(file: string): boolean {
  // LFS placeholders are tiny text pointers; real PDFs start with %PDF and are large.
  if (statSync(file).size < 1024) return false;
  return true;
}

type Margins = { l: number; r: number; t: number; b: number };

// Distance from each edge to the first row/column that isn't white "paper",
// sampled across the middle of the opposite axis. Used to find the uniform
// white border the print layout adds so we can crop it (closing the spine gap).
function measureMargins(data: Uint8ClampedArray, W: number, H: number): Margins {
  const isPaperCol = (x: number) => {
    let p = 0, t = 0;
    for (let y = Math.floor(H * 0.25); y < H * 0.75; y += 4) {
      const i = (y * W + x) * 4;
      t++;
      if ((data[i] + data[i + 1] + data[i + 2]) / 3 > 243) p++;
    }
    return p / t > 0.95;
  };
  const isPaperRow = (y: number) => {
    let p = 0, t = 0;
    for (let x = Math.floor(W * 0.25); x < W * 0.75; x += 4) {
      const i = (y * W + x) * 4;
      t++;
      if ((data[i] + data[i + 1] + data[i + 2]) / 3 > 243) p++;
    }
    return p / t > 0.95;
  };
  let l = 0; while (l < W * 0.25 && isPaperCol(l)) l++;
  let r = 0; while (r < W * 0.25 && isPaperCol(W - 1 - r)) r++;
  let t = 0; while (t < H * 0.25 && isPaperRow(t)) t++;
  let b = 0; while (b < H * 0.25 && isPaperRow(H - 1 - b)) b++;
  return { l, r, t, b };
}

// Count columns of fully-empty (white) paper inward from one side, scanning the
// FULL page height. Unlike measureMargins (which tolerates sparse ink for border
// detection), this is strict: it stops at the first column touched by any ink, so
// shifting a page by this amount can never clip real content.
function emptyEdgeCols(data: Uint8ClampedArray, W: number, H: number, side: "l" | "r"): number {
  const limit = Math.floor(W * 0.2);
  let count = 0;
  for (let k = 0; k < limit; k++) {
    const x = side === "l" ? k : W - 1 - k;
    let empty = true;
    for (let y = 0; y < H; y += 2) {
      const i = (y * W + x) * 4;
      if ((data[i] + data[i + 1] + data[i + 2]) / 3 <= 243) { empty = false; break; }
    }
    if (!empty) break;
    count++;
  }
  return count;
}

async function renderPdf(
  getDocument: typeof import("pdfjs-dist/legacy/build/pdf.mjs").getDocument,
  slug: string,
  pdfPath: string,
): Promise<number> {
  const outDir = join(OUT_ROOT, slug);
  rmSync(outDir, { recursive: true, force: true });
  mkdirSync(outDir, { recursive: true });

  const data = new Uint8Array(readFileSync(pdfPath));
  const doc = await getDocument({
    data,
    disableFontFace: true,
    isEvalSupported: false,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    canvasFactory: new NapiCanvasFactory() as any,
  }).promise;

  const pages = doc.numPages;
  let pageW = 0, pageH = 0;
  // Common (minimum) white border shared by every page — the safe amount to crop.
  const common: Margins = { l: Infinity, r: Infinity, t: Infinity, b: Infinity };
  // Per-page margins (1-indexed) — used to shift each page toward the spine.
  const perPage: Margins[] = [];

  // Pass 1 — render each page onto white paper, save full size, record margins.
  for (let i = 1; i <= pages; i++) {
    const page = await doc.getPage(i);
    const base = page.getViewport({ scale: 1 });
    const scale = TARGET_WIDTH / base.width;
    const viewport = page.getViewport({ scale });

    pageW = Math.round(viewport.width);
    pageH = Math.round(viewport.height);
    const canvas = createCanvas(pageW, pageH);
    const ctx = canvas.getContext("2d");
    patchSafeGetImageData(ctx);
    ctx.fillStyle = "#ffffff"; // PDFs don't paint their own paper; give them white
    ctx.fillRect(0, 0, pageW, pageH);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await page.render({ canvasContext: ctx as any, viewport }).promise;

    const id = ctx.getImageData(0, 0, pageW, pageH).data;
    const m = measureMargins(id, pageW, pageH);
    // Strict empty-column counts drive the spine shift (never clips content).
    perPage[i] = {
      l: emptyEdgeCols(id, pageW, pageH, "l"),
      r: emptyEdgeCols(id, pageW, pageH, "r"),
      t: 0,
      b: 0,
    };
    common.l = Math.min(common.l, m.l);
    common.r = Math.min(common.r, m.r);
    common.t = Math.min(common.t, m.t);
    common.b = Math.min(common.b, m.b);

    const webp = await canvas.encode("webp", WEBP_QUALITY);
    writeFileSync(join(outDir, `${i}.webp`), webp);
    page.cleanup();
  }
  await doc.destroy();

  // Cap the crop so a pathological page can't shave off real content.
  const cap = (v: number, max: number) => Math.min(Math.max(v, 0), max);
  const crop: Margins = {
    l: cap(common.l, Math.floor(pageW * 0.06)),
    r: cap(common.r, Math.floor(pageW * 0.06)),
    t: cap(common.t, Math.floor(pageH * 0.06)),
    b: cap(common.b, Math.floor(pageH * 0.06)),
  };

  // Pass 2 — crop the shared border, then shift each page toward the spine to
  // close the center gutter. Output stays uniform cw×ch for react-pageflip.
  const cw = pageW - crop.l - crop.r;
  const ch = pageH - crop.t - crop.b;
  const shiftCap = Math.floor(cw * SPINE_SHIFT_CAP_FRAC);
  const hasCommonCrop = crop.l + crop.r + crop.t + crop.b > 0;
  let shifted = 0;

  for (let i = 1; i <= pages; i++) {
    const m = perPage[i];
    // Spread parity with showCover=true: page 1 is the cover (shown alone). For
    // n≥2, even pages sit on the LEFT (spine on their right edge) and odd pages
    // on the RIGHT (spine on their left edge).
    let spine: "l" | "r" | null = null;
    let inner = 0;
    if (i >= 2) {
      if (i % 2 === 0) { spine = "r"; inner = Math.max(0, m.r - crop.r); }
      else { spine = "l"; inner = Math.max(0, m.l - crop.l); }
    }
    const shift = inner >= SPINE_SHIFT_MIN_PX ? Math.min(inner, shiftCap) : 0;
    if (shift > 0) shifted++;

    // Nothing to do for full-bleed pages with no common border — leave the
    // pass-1 image as-is to avoid a needless re-encode.
    if (!hasCommonCrop && shift === 0) continue;

    const file = join(outDir, `${i}.webp`);
    const img = await loadImage(readFileSync(file));
    const canvas = createCanvas(cw, ch);
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, cw, ch);

    // Drop `shift` px of inner whitespace and place the slice flush to the spine;
    // the vacated outer `shift` px stays white.
    const sw = cw - shift;
    const sx = spine === "l" ? crop.l + shift : crop.l; // trim from inner edge
    const dx = spine === "r" ? shift : 0;               // push right when spine is on the right
    ctx.drawImage(img, sx, crop.t, sw, ch, dx, 0, sw, ch);
    writeFileSync(file, await canvas.encode("webp", WEBP_QUALITY));
  }

  if (hasCommonCrop) console.log(`(cropped L${crop.l} R${crop.r} T${crop.t} B${crop.b}) `);
  if (shifted) console.log(`(spine-shifted ${shifted} pages) `);

  return pages;
}

async function main() {
  if (!existsSync(SRC_DIR)) {
    console.error(`No catalogue dir at ${SRC_DIR}`);
    process.exit(1);
  }

  const { getDocument } = await import("pdfjs-dist/legacy/build/pdf.mjs");

  const pdfs = readdirSync(SRC_DIR).filter((f) => f.toLowerCase().endsWith(".pdf"));
  const manifest: Record<string, number> = {};

  // --only <slug> renders just that catalogue and merges into the existing
  // manifest, leaving the other catalogues' pages and entries untouched.
  const onlyIdx = process.argv.indexOf("--only");
  const onlySlug = onlyIdx >= 0 ? process.argv[onlyIdx + 1] : null;
  let pdfsToRender = pdfs;
  if (onlySlug) {
    if (existsSync(MANIFEST)) {
      Object.assign(manifest, JSON.parse(readFileSync(MANIFEST, "utf8")));
    }
    pdfsToRender = pdfs.filter((f) => basename(f, ".pdf") === onlySlug);
    if (pdfsToRender.length === 0) {
      console.error(`--only ${onlySlug}: no matching PDF in ${SRC_DIR}`);
      process.exit(1);
    }
  }

  for (const file of pdfsToRender) {
    const slug = basename(file, ".pdf");
    const pdfPath = join(SRC_DIR, file);
    if (SKIP_SLUGS.has(slug)) {
      console.warn(`skipping ${file} — pdfjs cannot decode its image streams (renders blank)`);
      rmSync(join(OUT_ROOT, slug), { recursive: true, force: true });
      continue;
    }
    if (!isRealPdf(pdfPath)) {
      console.warn(`skipping ${file} — looks like an LFS placeholder (run \`git lfs pull\` first)`);
      continue;
    }
    process.stdout.write(`Rendering ${slug} … `);
    const pages = await renderPdf(getDocument, slug, pdfPath);
    manifest[slug] = pages;
    console.log(`${pages} pages`);
  }

  writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2) + "\n");
  console.log(`\nWrote ${MANIFEST}`);
  console.log(manifest);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
