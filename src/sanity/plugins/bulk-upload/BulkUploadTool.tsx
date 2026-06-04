import { useState, useCallback, useRef, useMemo } from "react";
import { useClient, useProjectId, useDataset } from "sanity";
import { createClient } from "@sanity/client";
import * as XLSX from "xlsx";
import {
  Card,
  Stack,
  Button,
  Text,
  Heading,
  Flex,
  Box,
  Badge,
  Spinner,
  Checkbox,
  useToast,
} from "@sanity/ui";
import { UploadIcon, CheckmarkCircleIcon, CloseCircleIcon, DocumentIcon } from "@sanity/icons";
import Papa from "papaparse";

// ── Constants ──

const ALLOWED_SIZES: Record<string, string> = {
  "300×300 mm": "wall-300x450",
  "300×450 mm": "wall-300x450",
  "300×600 mm": "wall-300x600",
  "400×400 mm": "vitrified-600x600",
  "600×600 mm": "vitrified-600x600",
  "600×1200 mm": "eleganz-600x1200",
};

const ALLOWED_FINISH = ["Glossy", "Matt", "High Gloss", "Carving", "Satin", "Polished", "Rustic"];
const FINISH_ALIASES: Record<string, string> = { gloss: "Glossy", matte: "Matt", highgloss: "High Gloss" };
const ALLOWED_TILE_TYPE = ["Wall", "Floor", "Both"];
const ALLOWED_CATEGORY = [
  "Ceramic", "Vitrified", "Glazed Vitrified", "Fully Vitrified", "Porcelain",
  "Wood Look", "Stone Look", "Marble Look", "Monochrome",
  "Patio", "Driveway", "Special Edition", "Art", "Cultural Heritage",
];

const TILE_TYPE_MAP: Record<string, string> = {
  Wall: "Wall",
  Floor: "Floor",
  Both: "Wall & Floor",
};

function slugify(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

// Map common column-header variants to the canonical names the tool expects,
// so sheets exported/authored with slightly different headers still work.
const HEADER_ALIASES: Record<string, string> = {
  image: "image_name",
  image_filename: "image_name",
  image_file: "image_name",
  filename: "image_name",
  product: "product_name",
  type: "tile_type",
};

function normalizeHeaderKey(h: string): string {
  const key = h.trim().toLowerCase().replace(/\s+/g, "_");
  return HEADER_ALIASES[key] || key;
}

function compressImage(file: File, maxDim = 1600, quality = 0.85): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(url);
      let { width, height } = img;
      if (width > maxDim || height > maxDim) {
        const scale = maxDim / Math.max(width, height);
        width = Math.round(width * scale);
        height = Math.round(height * scale);
      }
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      canvas.getContext("2d")!.drawImage(img, 0, 0, width, height);
      canvas.toBlob(
        (blob) => (blob ? resolve(blob) : reject(new Error("Compression failed"))),
        "image/jpeg",
        quality
      );
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Failed to load image"));
    };
    img.src = url;
  });
}

interface CsvRow {
  image_name: string;
  product_name: string;
  size: string;
  series: string;
  finish: string;
  tile_type: string;
  category: string;
  spaces: string;
  collection?: string;
  has_matching_floor?: string;
}

interface ProductEntry {
  row: CsvRow;
  imageFile: File | null;
  errors: string[];
  warnings: string[];
  status: "pending" | "uploading" | "done" | "error";
  errorMsg?: string;
}

// ── Component ──

const SANITY_WRITE_TOKEN = "skhYPqvRE0Ppu0r3FI6iQQ0qIkRrHWEU0tyPWqMV9cdnVtyMzIFdfGzYP7mnZKJDSIFa8sgtYbpcKmhtVDgYbl4DDdVTnNQVouGv4j7XiVtEMkooc0p5gGzirNFBqjRUXcVcmXhnnT6iyOcVjB1Nxc8dZw5N5H1IyKHfVli7gLi34mqlfGXq";

export function BulkUploadTool() {
  const readClient = useClient({ apiVersion: "2026-04-01" });
  const projectId = useProjectId();
  const dataset = useDataset();
  const toast = useToast();

  const client = useMemo(
    () =>
      createClient({
        projectId,
        dataset,
        apiVersion: "2026-04-01",
        token: SANITY_WRITE_TOKEN,
        useCdn: false,
      }),
    [projectId, dataset]
  );

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [images, setImages] = useState<Map<string, File>>(new Map());
  const [entries, setEntries] = useState<ProductEntry[]>([]);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState({ done: 0, total: 0 });
  const [ackNoImage, setAckNoImage] = useState(false);

  const imageInputRef = useRef<HTMLInputElement>(null);
  const csvInputRef = useRef<HTMLInputElement>(null);

  // ── Step 1: Image Upload ──

  const handleImageDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files).filter((f) =>
      /\.(jpe?g|png|webp)$/i.test(f.name)
    );
    setImages((prev) => {
      const next = new Map(prev);
      files.forEach((f) => next.set(f.name.toLowerCase(), f));
      return next;
    });
  }, []);

  const handleImageSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []).filter((f) =>
      /\.(jpe?g|png|webp)$/i.test(f.name)
    );
    setImages((prev) => {
      const next = new Map(prev);
      files.forEach((f) => next.set(f.name.toLowerCase(), f));
      return next;
    });
  }, []);

  // ── Step 2: CSV Upload ──

  // Parse rows from either CSV or Excel file
  const parseFileToRows = useCallback((file: File): Promise<CsvRow[]> => {
    const isExcel = /\.(xlsx?|xls)$/i.test(file.name);

    if (isExcel) {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (ev) => {
          const data = new Uint8Array(ev.target?.result as ArrayBuffer);
          const workbook = XLSX.read(data, { type: "array" });
          const sheet = workbook.Sheets[workbook.SheetNames[0]];
          const rows = XLSX.utils.sheet_to_json<Record<string, string>>(sheet, { defval: "" });
          // Normalize headers
          const normalized = rows.map((row) => {
            const out: Record<string, string> = {};
            for (const [key, val] of Object.entries(row)) {
              const nk = normalizeHeaderKey(key);
              // Don't let an aliased column clobber an explicit canonical column
              if (out[nk] && !val) continue;
              out[nk] = String(val ?? "");
            }
            return out as unknown as CsvRow;
          });
          resolve(normalized);
        };
        reader.readAsArrayBuffer(file);
      });
    }

    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const text = ev.target?.result as string;
        const { data } = Papa.parse<CsvRow>(text, {
          header: true,
          skipEmptyLines: true,
          transformHeader: (h: string) => normalizeHeaderKey(h),
        });
        resolve(data);
      };
      reader.readAsText(file);
    });
  }, []);

  const handleCsvUpload = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      const data = await parseFileToRows(file);

        const products: ProductEntry[] = data.map((row) => {
          // Auto-fix: replace letter 'x' with '×' in size (common mistake)
          if (row.size) {
            row.size = row.size.trim().replace(/(\d)\s*[xX]\s*(\d)/g, "$1\u00d7$2");
            if (/^\d+\u00d7\d+$/.test(row.size)) {
              row.size = row.size + " mm";
            }
          }
          // Auto-normalize finish (e.g. "Gloss" → "Glossy")
          if (row.finish?.trim()) {
            const key = row.finish.trim().toLowerCase().replace(/\s+/g, "");
            const alias = FINISH_ALIASES[key];
            if (alias) row.finish = alias;
            else {
              const match = ALLOWED_FINISH.find((f) => f.toLowerCase() === row.finish.trim().toLowerCase());
              if (match) row.finish = match;
            }
          }

          // Auto-normalize tile_type (case-insensitive)
          if (row.tile_type?.trim()) {
            const match = ALLOWED_TILE_TYPE.find((t) => t.toLowerCase() === row.tile_type.trim().toLowerCase());
            if (match) row.tile_type = match;
          }

          // Auto-normalize category (case-insensitive)
          if (row.category?.trim()) {
            const match = ALLOWED_CATEGORY.find((c) => c.toLowerCase() === row.category.trim().toLowerCase());
            if (match) row.category = match;
          }

          const errors: string[] = [];
          if (!row.product_name?.trim()) errors.push("Missing product_name");
          if (!row.size?.trim()) errors.push("Missing size");
          else if (!ALLOWED_SIZES[row.size.trim()]) errors.push(`Invalid size "${row.size}"`);
          if (!row.series?.trim()) errors.push("Missing series");
          if (!row.finish?.trim()) errors.push("Missing finish");
          else if (!ALLOWED_FINISH.includes(row.finish.trim())) errors.push(`Invalid finish "${row.finish}"`);
          if (!row.tile_type?.trim()) errors.push("Missing tile_type");
          else if (!ALLOWED_TILE_TYPE.includes(row.tile_type.trim())) errors.push(`Invalid tile_type "${row.tile_type}"`);
          if (!row.category?.trim()) errors.push("Missing category");
          else if (!ALLOWED_CATEGORY.includes(row.category.trim())) errors.push(`Invalid category "${row.category}"`)

          const imageKey = (row.image_name || "").trim().toLowerCase();
          const imageFile = images.get(imageKey) || null;
          if (row.image_name?.trim() && !imageFile) {
            errors.push(`Image "${row.image_name}" not found in uploaded images`);
          }

          const warnings: string[] = [];
          if (errors.length === 0 && !imageFile) {
            warnings.push(
              row.image_name?.trim()
                ? "No image attached — product will NOT appear on the website"
                : "Blank image_name — no image will be attached, product will NOT appear on the website"
            );
          }

          return { row, imageFile, errors, warnings, status: "pending" as const };
        });

        setEntries(products);
        setAckNoImage(false);
        setStep(3);
    },
    [images, parseFileToRows]
  );

  // ── Step 3: Execute Upload ──

  const handleExecute = useCallback(async () => {
    const valid = entries.filter((e) => e.errors.length === 0);
    if (valid.length === 0) {
      toast.push({ status: "error", title: "No valid products to upload" });
      return;
    }

    const CONCURRENCY = 3;
    setUploading(true);
    setProgress({ done: 0, total: valid.length });
    let doneCount = 0;
    let successCount = 0;
    let errorCount = 0;

    const validIndices = new Set(
      entries.map((e, i) => (e.errors.length === 0 ? i : -1)).filter((i) => i >= 0)
    );
    setEntries((prev) =>
      prev.map((e, i) =>
        validIndices.has(i) ? { ...e, status: "uploading" } : e
      )
    );

    // ── Batch existence check (single query) ──
    const slugs = valid.map((e) => slugify(e.row.product_name.trim()));
    let existingMap = new Map<string, string>();
    try {
      const existing = await client.fetch<{ _id: string; slug: string }[]>(
        `*[_type == "tileProduct" && slug.current in $slugs]{ _id, "slug": slug.current }`,
        { slugs }
      );
      existingMap = new Map(existing.map((e) => [e.slug, e._id]));
    } catch { /* proceed without — will create all as new */ }

    // ── Process each product end-to-end (compress → upload → create) ──
    const processProduct = async (entry: ProductEntry, entryIndex: number) => {
      const row = entry.row;
      try {
        const slug = slugify(row.product_name.trim());
        const catalogId = ALLOWED_SIZES[row.size.trim()];
        const spaces = row.spaces
          ? row.spaces.split(",").map((s) => s.trim()).filter(Boolean)
          : [];

        let imageRef: Record<string, unknown> | undefined;
        if (entry.imageFile) {
          let uploadBlob: Blob | File = entry.imageFile;
          let filename = entry.imageFile.name;
          let contentType = entry.imageFile.type || "image/jpeg";
          try {
            uploadBlob = await compressImage(entry.imageFile);
            filename = entry.imageFile.name.replace(/\.\w+$/, ".jpg");
            contentType = "image/jpeg";
          } catch {
            console.warn(`[Bulk Upload] Compression failed for ${entry.imageFile.name}, uploading original`);
          }
          const asset = await client.assets.upload("image", uploadBlob, {
            filename,
            contentType,
          });
          imageRef = {
            _type: "image",
            asset: { _type: "reference", _ref: asset._id },
          };
        }

        const doc: { _type: string; [key: string]: unknown } = {
          _type: "tileProduct",
          name: row.product_name.trim(),
          slug: { _type: "slug", current: slug },
          catalog: { _type: "reference", _ref: `catalog-${catalogId}` },
          category: row.category.trim(),
          series: row.series.trim(),
          size: row.size.trim(),
          finish: row.finish.trim(),
          application: TILE_TYPE_MAP[row.tile_type.trim()] || row.tile_type.trim(),
          hidden: false,
          sortOrder: 100,
        };

        if (spaces.length > 0) doc.spaces = spaces;
        if (row.collection?.trim()) doc.collection = row.collection.trim();
        if (row.has_matching_floor?.trim()) doc.hasMatchingFloor = row.has_matching_floor.trim();

        const existingId = existingMap.get(slug);
        if (existingId) {
          const patch = client.patch(existingId).set(doc);
          if (imageRef) patch.set({ image: imageRef });
          await patch.commit();
        } else {
          if (imageRef) doc.image = imageRef;
          await client.create(doc);
        }

        successCount++;
        setEntries((prev) =>
          prev.map((e, i) => (i === entryIndex ? { ...e, status: "done" } : e))
        );
      } catch (err: unknown) {
        console.error(`[Bulk Upload] Failed: ${row.product_name.trim()}`, err);
        const msg = err instanceof Error ? err.message : "Unknown error";
        errorCount++;
        setEntries((prev) =>
          prev.map((e, i) =>
            i === entryIndex ? { ...e, status: "error", errorMsg: msg } : e
          )
        );
      }
      doneCount++;
      setProgress({ done: doneCount, total: valid.length });
    };

    // Map each valid entry to its original index in entries array
    const validWithIndex = valid.map((entry) => ({
      entry,
      index: entries.indexOf(entry),
    }));

    for (let i = 0; i < validWithIndex.length; i += CONCURRENCY) {
      const batch = validWithIndex.slice(i, i + CONCURRENCY);
      await Promise.allSettled(
        batch.map(({ entry, index }) => processProduct(entry, index))
      );
    }

    setUploading(false);
    toast.push({
      status: errorCount > 0 ? "warning" : "success",
      title: errorCount > 0
        ? `Upload done: ${successCount} created, ${errorCount} failed. Check rows for details.`
        : `Upload complete! ${successCount} products created.`,
    });
  }, [entries, client, toast]);

  // ── Render ──

  const validCount = entries.filter((e) => e.errors.length === 0).length;
  const errorCount = entries.filter((e) => e.errors.length > 0).length;
  const noImageCount = entries.filter((e) => e.errors.length === 0 && !e.imageFile).length;

  return (
    <Card padding={4} sizing="border" style={{ height: "100%", overflow: "auto" }}>
      <Stack space={5}>
        {/* Header */}
        <Stack space={3}>
          <Heading size={3}>Bulk Upload Products</Heading>
          <Text size={1} muted>
            Upload tile images and CSV data to create products in bulk.
          </Text>
        </Stack>

        {/* Steps indicator */}
        <Flex gap={2}>
          {[1, 2, 3].map((s) => (
            <Button
              key={s}
              mode={step === s ? "default" : "ghost"}
              tone={step === s ? "primary" : "default"}
              text={
                s === 1
                  ? `1. Upload Images (${images.size})`
                  : s === 2
                    ? "2. Upload CSV"
                    : `3. Preview & Execute`
              }
              onClick={() => {
                if (s === 1) setStep(1);
                else if (s === 2 && images.size > 0) setStep(2);
                else if (s === 3 && entries.length > 0) setStep(3);
              }}
              disabled={
                (s === 2 && images.size === 0) ||
                (s === 3 && entries.length === 0)
              }
              fontSize={1}
            />
          ))}
        </Flex>

        {/* Step 1: Images */}
        {step === 1 && (
          <Stack space={4}>
            <Card
              padding={5}
              radius={2}
              shadow={1}
              tone="transparent"
              style={{
                border: "2px dashed var(--card-border-color)",
                textAlign: "center",
                cursor: "pointer",
              }}
              onDragOver={(e: React.DragEvent) => e.preventDefault()}
              onDrop={handleImageDrop}
              onClick={() => imageInputRef.current?.click()}
            >
              <Stack space={3} style={{ alignItems: "center" }}>
                <Text size={4}>
                  <UploadIcon />
                </Text>
                <Heading size={1}>Drop tile images here</Heading>
                <Text size={1} muted>
                  or click to browse — accepts .jpg, .png, .webp
                </Text>
              </Stack>
              <input
                ref={imageInputRef}
                type="file"
                multiple
                accept=".jpg,.jpeg,.png,.webp"
                style={{ display: "none" }}
                onChange={handleImageSelect}
              />
            </Card>

            {images.size > 0 && (
              <Stack space={3}>
                <Flex justify="space-between" align="center">
                  <Text size={1} weight="semibold">
                    {images.size} images uploaded
                  </Text>
                  <Button
                    text="Clear All"
                    mode="ghost"
                    tone="critical"
                    fontSize={1}
                    onClick={() => setImages(new Map())}
                  />
                </Flex>
                <Card padding={3} radius={2} shadow={1} style={{ maxHeight: "200px", overflow: "auto" }}>
                  <Stack space={1}>
                    {Array.from(images.keys())
                      .slice(0, 50)
                      .map((name) => (
                        <Text key={name} size={0} muted style={{ wordBreak: "break-all" }}>
                          {name}
                        </Text>
                      ))}
                    {images.size > 50 && (
                      <Text size={0} muted>+{images.size - 50} more</Text>
                    )}
                  </Stack>
                </Card>
                <Button
                  text="Next → Upload CSV"
                  tone="primary"
                  onClick={() => setStep(2)}
                  fontSize={1}
                />
              </Stack>
            )}
          </Stack>
        )}

        {/* Step 2: CSV */}
        {step === 2 && (
          <Stack space={4}>
            <Card padding={4} radius={2} shadow={1} tone="transparent">
              <Stack space={4}>
                <Heading size={1}>Upload CSV File</Heading>
                <Text size={1} muted>
                  Your CSV must have the column headers shown below. See the example row for reference.
                </Text>

                {/* Sample CSV table */}
                <Card padding={0} radius={2} shadow={1} style={{ overflow: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "12px" }}>
                    <thead>
                      <tr style={{ background: "var(--card-bg2-color)" }}>
                        {["image_name", "product_name", "size", "series", "finish", "tile_type", "category", "spaces"].map((col) => (
                          <th key={col} style={{ padding: "10px 12px", textAlign: "left", fontWeight: 700, fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.05em", whiteSpace: "nowrap", borderBottom: "2px solid var(--card-border-color)" }}>
                            {col}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      <tr style={{ borderBottom: "1px solid var(--card-border-color)" }}>
                        <td style={exTd}>ALCAZAR LIGHT.jpg</td>
                        <td style={exTd}>Alcazar Light</td>
                        <td style={exTd}>300{"\u00d7"}450 mm</td>
                        <td style={exTd}>Alcazar</td>
                        <td style={exTd}>Glossy</td>
                        <td style={exTd}>Wall</td>
                        <td style={exTd}>Ceramic</td>
                        <td style={exTd}>Living Room, Bathroom</td>
                      </tr>
                      <tr style={{ borderBottom: "1px solid var(--card-border-color)", background: "var(--card-bg2-color)" }}>
                        <td style={exTd}>BEDROCK BROWN.jpg</td>
                        <td style={exTd}>Bedrock Brown</td>
                        <td style={exTd}>600{"\u00d7"}1200 mm</td>
                        <td style={exTd}>Bedrock</td>
                        <td style={exTd}>Matt</td>
                        <td style={exTd}>Floor</td>
                        <td style={exTd}>Glazed Vitrified</td>
                        <td style={exTd}>Living Room, Office, Hotel</td>
                      </tr>
                      <tr>
                        <td style={exTd}>ANTIQUITY GREY.jpg</td>
                        <td style={exTd}>Antiquity Grey</td>
                        <td style={exTd}>600{"\u00d7"}600 mm</td>
                        <td style={exTd}>Stone</td>
                        <td style={exTd}>Matt</td>
                        <td style={exTd}>Both</td>
                        <td style={exTd}>Vitrified</td>
                        <td style={exTd}>Kitchen, Restaurant</td>
                      </tr>
                    </tbody>
                  </table>
                </Card>

                {/* Allowed values */}
                <Card padding={3} radius={2} tone="caution">
                  <Stack space={2}>
                    <Text size={1}>
                      <strong>tile_type:</strong> Wall | Floor | Both
                    </Text>
                    <Text size={1}>
                      <strong>finish:</strong> Glossy | Gloss | Matt | High Gloss | Carving | Satin | Polished | Rustic
                    </Text>
                    <Text size={1}>
                      <strong>size:</strong> 300{"\u00d7"}300 mm | 300{"\u00d7"}450 mm | 300{"\u00d7"}600 mm | 400{"\u00d7"}400 mm | 600{"\u00d7"}600 mm | 600{"\u00d7"}1200 mm
                    </Text>
                    <Text size={1}>
                      <strong>category:</strong> Ceramic | Vitrified | Glazed Vitrified | Fully Vitrified | Porcelain | Wood Look | Stone Look | Marble Look
                    </Text>
                    <Text size={1}>
                      <strong>spaces:</strong> Any comma-separated values (e.g. Living Room, Office, Hotel)
                    </Text>
                    <Text size={1}>
                      <strong>image column:</strong> may be named image_name, Image, image_filename, or filename — value must be the exact file name incl. extension (e.g. BALTIC-WHITE.jpg)
                    </Text>
                  </Stack>
                </Card>

                <Button
                  icon={DocumentIcon}
                  text="Select CSV or Excel File"
                  tone="primary"
                  onClick={() => csvInputRef.current?.click()}
                  fontSize={1}
                />
                <input
                  ref={csvInputRef}
                  type="file"
                  accept=".csv,.xlsx,.xls"
                  style={{ display: "none" }}
                  onChange={handleCsvUpload}
                />
              </Stack>
            </Card>
          </Stack>
        )}

        {/* Step 3: Preview & Execute */}
        {step === 3 && (
          <Stack space={4}>
            <Flex gap={3}>
              <Badge tone="positive" fontSize={1}>
                {validCount} valid
              </Badge>
              {errorCount > 0 && (
                <Badge tone="critical" fontSize={1}>
                  {errorCount} errors
                </Badge>
              )}
              {noImageCount > 0 && (
                <Badge tone="caution" fontSize={1}>
                  {noImageCount} without image
                </Badge>
              )}
              <Badge tone="default" fontSize={1}>
                {images.size} images
              </Badge>
            </Flex>

            {/* Preview table */}
            <Card padding={0} radius={2} shadow={1} style={{ overflow: "auto", maxHeight: "500px" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
                <thead>
                  <tr style={{ background: "var(--card-bg2-color)", position: "sticky", top: 0 }}>
                    <th style={thStyle}>Status</th>
                    <th style={thStyle}>Image</th>
                    <th style={thStyle}>Product Name</th>
                    <th style={thStyle}>Size</th>
                    <th style={thStyle}>Series</th>
                    <th style={thStyle}>Finish</th>
                    <th style={thStyle}>Type</th>
                    <th style={thStyle}>Category</th>
                    <th style={thStyle}>Spaces</th>
                  </tr>
                </thead>
                <tbody>
                  {entries.map((entry, i) => (
                    <tr
                      key={i}
                      style={{
                        borderBottom: "1px solid var(--card-border-color)",
                        background:
                          entry.errors.length > 0
                            ? "rgba(255,0,0,0.04)"
                            : entry.status === "done"
                              ? "rgba(0,180,0,0.04)"
                              : "transparent",
                      }}
                    >
                      <td style={tdStyle}>
                        {entry.status === "uploading" ? (
                          <Spinner />
                        ) : entry.status === "done" ? (
                          <Text size={2}><CheckmarkCircleIcon /></Text>
                        ) : entry.errors.length > 0 ? (
                          <span title={entry.errors.join("\n")}>
                            <Text size={2}><CloseCircleIcon /></Text>
                          </span>
                        ) : entry.status === "error" ? (
                          <span title={entry.errorMsg}>
                            <Text size={2}><CloseCircleIcon /></Text>
                          </span>
                        ) : (
                          "—"
                        )}
                      </td>
                      <td style={tdStyle}>
                        {entry.imageFile ? (
                          <Text size={0} muted>✓</Text>
                        ) : (
                          <span title={entry.warnings.join("\n") || "No image"}>
                            <Text size={0} style={{ color: "var(--card-badge-caution-fg-color, #b8860b)", fontWeight: 700 }}>
                              ✗ no image
                            </Text>
                          </span>
                        )}
                      </td>
                      <td style={tdStyle}>{entry.row.product_name}</td>
                      <td style={tdStyle}>{entry.row.size}</td>
                      <td style={tdStyle}>{entry.row.series}</td>
                      <td style={tdStyle}>{entry.row.finish}</td>
                      <td style={tdStyle}>{entry.row.tile_type}</td>
                      <td style={tdStyle}>{entry.row.category}</td>
                      <td style={tdStyle}>
                        <Text size={0} muted>{entry.row.spaces || "—"}</Text>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>

            {/* Error details */}
            {errorCount > 0 && (
              <Card padding={3} radius={2} tone="critical">
                <Stack space={2}>
                  <Text size={1} weight="semibold">
                    {errorCount} rows have errors and will be skipped:
                  </Text>
                  {entries
                    .filter((e) => e.errors.length > 0)
                    .slice(0, 10)
                    .map((e, i) => (
                      <Text key={i} size={1}>
                        <strong>{e.row.product_name || `Row ${i + 1}`}</strong>: {e.errors.join(", ")}
                      </Text>
                    ))}
                </Stack>
              </Card>
            )}

            {/* No-image warning */}
            {noImageCount > 0 && (
              <Card padding={3} radius={2} tone="caution">
                <Stack space={3}>
                  <Text size={1} weight="semibold">
                    ⚠ {noImageCount} product{noImageCount === 1 ? "" : "s"} have NO image and will NOT appear on the website:
                  </Text>
                  {entries
                    .filter((e) => e.errors.length === 0 && !e.imageFile)
                    .slice(0, 15)
                    .map((e, i) => (
                      <Text key={i} size={1}>
                        <strong>{e.row.product_name || `Row ${i + 1}`}</strong>
                        {e.row.image_name?.trim() ? ` — image "${e.row.image_name}" not matched` : " — image_name is blank"}
                      </Text>
                    ))}
                  <Text size={1} muted>
                    Check your CSV has an <strong>image_name</strong> column with the exact filename (incl. extension, e.g. "baltic-white.jpg") and that those files were uploaded in step 1.
                  </Text>
                  <Flex gap={2} align="center" as="label" style={{ cursor: "pointer" }}>
                    <Checkbox
                      checked={ackNoImage}
                      onChange={(e) => setAckNoImage(e.currentTarget.checked)}
                    />
                    <Text size={1}>Upload these products anyway (without images)</Text>
                  </Flex>
                </Stack>
              </Card>
            )}

            {/* Execute */}
            <Flex gap={3}>
              <Button
                text={
                  uploading
                    ? `Uploading ${progress.done}/${progress.total}...`
                    : noImageCount > 0
                      ? `Upload ${validCount} Products (${noImageCount} without image)`
                      : `Upload ${validCount} Products`
                }
                tone="positive"
                icon={UploadIcon}
                onClick={handleExecute}
                disabled={uploading || validCount === 0 || (noImageCount > 0 && !ackNoImage)}
                fontSize={1}
              />
              <Button
                text="Back to Images"
                mode="ghost"
                onClick={() => {
                  setStep(1);
                  setEntries([]);
                  setAckNoImage(false);
                }}
                disabled={uploading}
                fontSize={1}
              />
            </Flex>
          </Stack>
        )}
      </Stack>
    </Card>
  );
}

const thStyle: React.CSSProperties = {
  padding: "10px 12px",
  textAlign: "left",
  fontWeight: 600,
  fontSize: "11px",
  textTransform: "uppercase",
  letterSpacing: "0.05em",
};

const tdStyle: React.CSSProperties = {
  padding: "8px 12px",
  verticalAlign: "middle",
};

const exTd: React.CSSProperties = {
  padding: "8px 12px",
  whiteSpace: "nowrap",
  color: "var(--card-fg-color)",
  fontSize: "12px",
};
