import { useState, useCallback, useRef } from "react";
import { useClient } from "sanity";
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
  useToast,
} from "@sanity/ui";
import { UploadIcon, CheckmarkCircleIcon, CloseCircleIcon, DocumentIcon } from "@sanity/icons";
import Papa from "papaparse";

// ── Constants ──

const ALLOWED_SIZES: Record<string, string> = {
  "300×300 mm": "floor-300x300",
  "300×450 mm": "wall-300x450",
  "300×600 mm": "wall-300x600",
  "400×400 mm": "vitrified-400x400",
  "600×600 mm": "vitrified-600x600",
  "600×1200 mm": "eleganz-600x1200",
};

const ALLOWED_FINISH = ["Glossy", "Matt", "High Gloss", "Carving", "Satin", "Polished", "Rustic"];
const ALLOWED_TILE_TYPE = ["Wall", "Floor", "Both"];
const ALLOWED_CATEGORY = [
  "Ceramic", "Vitrified", "Glazed Vitrified", "Porcelain",
  "Wood Look", "Stone Look", "Marble Look", "Monochrome",
  "Patio", "Driveway", "Special Edition", "Art", "Cultural Heritage",
];
const ALLOWED_SPACES = [
  "Living Room", "Bedroom", "Kitchen", "Bathroom", "Dining Room",
  "Office", "Balcony", "Outdoor", "Commercial", "Restaurant",
  "Hotel", "Hospital", "Apartment", "Showroom", "Staircase",
  "Elevation", "Parking",
];

const TILE_TYPE_MAP: Record<string, string> = {
  Wall: "Wall",
  Floor: "Floor",
  Both: "Wall & Floor",
};

function slugify(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
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
  status: "pending" | "uploading" | "done" | "error";
  errorMsg?: string;
}

// ── Component ──

export function BulkUploadTool() {
  const client = useClient({ apiVersion: "2026-04-01" });
  const toast = useToast();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [images, setImages] = useState<Map<string, File>>(new Map());
  const [entries, setEntries] = useState<ProductEntry[]>([]);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState({ done: 0, total: 0 });

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

  const handleCsvUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (ev) => {
        const text = ev.target?.result as string;
        const { data } = Papa.parse<CsvRow>(text, {
          header: true,
          skipEmptyLines: true,
          transformHeader: (h: string) => h.trim().toLowerCase().replace(/\s+/g, "_"),
        });

        const products: ProductEntry[] = data.map((row) => {
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
          else if (!ALLOWED_CATEGORY.includes(row.category.trim())) errors.push(`Invalid category "${row.category}"`);

          if (row.spaces?.trim()) {
            row.spaces.split(",").map((s) => s.trim()).filter(Boolean).forEach((s) => {
              if (!ALLOWED_SPACES.includes(s)) errors.push(`Invalid space "${s}"`);
            });
          }

          const imageKey = (row.image_name || "").trim().toLowerCase();
          const imageFile = images.get(imageKey) || null;
          if (row.image_name?.trim() && !imageFile) {
            errors.push(`Image "${row.image_name}" not found in uploaded images`);
          }

          return { row, imageFile, errors, status: "pending" as const };
        });

        setEntries(products);
        setStep(3);
      };
      reader.readAsText(file);
    },
    [images]
  );

  // ── Step 3: Execute Upload ──

  const handleExecute = useCallback(async () => {
    const valid = entries.filter((e) => e.errors.length === 0);
    if (valid.length === 0) {
      toast.push({ status: "error", title: "No valid products to upload" });
      return;
    }

    setUploading(true);
    setProgress({ done: 0, total: valid.length });

    for (let i = 0; i < valid.length; i++) {
      const entry = valid[i];
      const row = entry.row;

      setEntries((prev) =>
        prev.map((e) =>
          e === entry ? { ...e, status: "uploading" } : e
        )
      );

      try {
        const slug = slugify(row.product_name.trim());
        const catalogId = ALLOWED_SIZES[row.size.trim()];
        const spaces = row.spaces
          ? row.spaces.split(",").map((s) => s.trim()).filter(Boolean)
          : [];

        // Upload image if available
        let imageRef: Record<string, unknown> | undefined;
        if (entry.imageFile) {
          const asset = await client.assets.upload("image", entry.imageFile, {
            filename: entry.imageFile.name,
          });
          imageRef = {
            _type: "image",
            asset: { _type: "reference", _ref: asset._id },
          };
        }

        // Check if product exists
        const existing = await client.fetch(
          `*[_type == "tileProduct" && slug.current == $slug][0]{ _id }`,
          { slug }
        );

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

        if (existing) {
          const patch = client.patch(existing._id).set(doc);
          if (imageRef) patch.set({ image: imageRef });
          await patch.commit();
        } else {
          if (imageRef) doc.image = imageRef;
          await client.create(doc);
        }

        setEntries((prev) =>
          prev.map((e) => (e === entry ? { ...e, status: "done" } : e))
        );
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : "Unknown error";
        setEntries((prev) =>
          prev.map((e) =>
            e === entry ? { ...e, status: "error", errorMsg: msg } : e
          )
        );
      }

      setProgress((p) => ({ ...p, done: i + 1 }));
    }

    setUploading(false);
    toast.push({
      status: "success",
      title: `Upload complete! ${valid.length} products processed.`,
    });
  }, [entries, client, toast]);

  // ── Render ──

  const validCount = entries.filter((e) => e.errors.length === 0).length;
  const errorCount = entries.filter((e) => e.errors.length > 0).length;

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
                <Flex wrap="wrap" gap={2}>
                  {Array.from(images.entries())
                    .slice(0, 20)
                    .map(([name, file]) => (
                      <Card
                        key={name}
                        padding={2}
                        radius={2}
                        shadow={1}
                        style={{ width: "120px" }}
                      >
                        <Stack space={2}>
                          <img
                            src={URL.createObjectURL(file)}
                            alt={name}
                            style={{
                              width: "100%",
                              height: "80px",
                              objectFit: "cover",
                              borderRadius: "4px",
                            }}
                          />
                          <Text size={0} muted style={{ wordBreak: "break-all" }}>
                            {name}
                          </Text>
                        </Stack>
                      </Card>
                    ))}
                  {images.size > 20 && (
                    <Card padding={3} radius={2} tone="transparent">
                      <Text size={1} muted>
                        +{images.size - 20} more
                      </Text>
                    </Card>
                  )}
                </Flex>
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
                      <strong>finish:</strong> Glossy | Matt | High Gloss | Carving | Satin | Polished
                    </Text>
                    <Text size={1}>
                      <strong>size:</strong> 300{"\u00d7"}300 mm | 300{"\u00d7"}450 mm | 300{"\u00d7"}600 mm | 400{"\u00d7"}400 mm | 600{"\u00d7"}600 mm | 600{"\u00d7"}1200 mm
                    </Text>
                    <Text size={1}>
                      <strong>category:</strong> Ceramic | Vitrified | Glazed Vitrified | Porcelain | Wood Look | Stone Look | Marble Look
                    </Text>
                    <Text size={1}>
                      <strong>spaces:</strong> Living Room, Bedroom, Kitchen, Bathroom, Dining Room, Office, Balcony, Outdoor, Commercial, Restaurant, Hotel, Hospital, Apartment, Showroom, Staircase, Parking
                    </Text>
                  </Stack>
                </Card>

                <Button
                  icon={DocumentIcon}
                  text="Select CSV File"
                  tone="primary"
                  onClick={() => csvInputRef.current?.click()}
                  fontSize={1}
                />
                <input
                  ref={csvInputRef}
                  type="file"
                  accept=".csv"
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
                          <img
                            src={URL.createObjectURL(entry.imageFile)}
                            alt=""
                            style={{ width: "40px", height: "40px", objectFit: "cover", borderRadius: "4px" }}
                          />
                        ) : (
                          <Text size={0} muted>—</Text>
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

            {/* Execute */}
            <Flex gap={3}>
              <Button
                text={
                  uploading
                    ? `Uploading ${progress.done}/${progress.total}...`
                    : `Upload ${validCount} Products`
                }
                tone="positive"
                icon={UploadIcon}
                onClick={handleExecute}
                disabled={uploading || validCount === 0}
                fontSize={1}
              />
              <Button
                text="Back to Images"
                mode="ghost"
                onClick={() => {
                  setStep(1);
                  setEntries([]);
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
