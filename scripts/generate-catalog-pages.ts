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

// pdfjs cannot decode the image streams in this catalogue ("Bad FCHECK in flate
// stream"), so it renders blank pages. Skip it — the viewer falls back to the
// PDF download CTA for any slug absent from the manifest.
const SKIP_SLUGS = new Set(["spirit-of-nepal"]);

// pdfjs's bundled NodeCanvasFactory resizes canvases to 0 on destroy, which
// @napi-rs/canvas rejects once a 2d context is live. Provide our own factory
// that creates @napi-rs canvases and tears them down without resizing.
class NapiCanvasFactory {
  create(width: number, height: number) {
    const canvas = createCanvas(Math.ceil(width), Math.ceil(height));
    return { canvas, context: canvas.getContext("2d") };
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
    ctx.fillStyle = "#ffffff"; // PDFs don't paint their own paper; give them white
    ctx.fillRect(0, 0, pageW, pageH);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await page.render({ canvasContext: ctx as any, viewport }).promise;

    const m = measureMargins(ctx.getImageData(0, 0, pageW, pageH).data, pageW, pageH);
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

  // Pass 2 — if there's a shared border, crop every page to it (closes the gutter).
  if (crop.l + crop.r + crop.t + crop.b > 0) {
    const cw = pageW - crop.l - crop.r;
    const ch = pageH - crop.t - crop.b;
    for (let i = 1; i <= pages; i++) {
      const file = join(outDir, `${i}.webp`);
      const img = await loadImage(readFileSync(file));
      const canvas = createCanvas(cw, ch);
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, crop.l, crop.t, cw, ch, 0, 0, cw, ch);
      writeFileSync(file, await canvas.encode("webp", WEBP_QUALITY));
    }
    console.log(`(cropped L${crop.l} R${crop.r} T${crop.t} B${crop.b}) `);
  }

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

  for (const file of pdfs) {
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
