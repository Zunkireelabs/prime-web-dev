import { useCallback, useRef, useState } from "react";
import { set, setIfMissing, unset, useClient } from "sanity";
import type { ObjectInputProps } from "sanity";

// Custom image input that uses useClient() so it always has the correct auth token.
// The built-in Sanity image input uses configContext.client (deprecated/cookie-based)
// which returns 503 from self-hosted studios at custom domains.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function AuthenticatedImageInput(props: ObjectInputProps<any>) {
  const client = useClient({ apiVersion: "2026-04-01" });
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const value = props.value;
  const imageRef = value?.asset?._ref ?? null;
  const altText = value?.alt ?? "";

  const { projectId, dataset } = client.config();
  const imageUrl = imageRef
    ? `https://cdn.sanity.io/images/${projectId}/${dataset}/${imageRef
        .replace(/^image-/, "")
        .replace(/-([a-zA-Z0-9]+)$/, ".$1")}`
    : null;

  const compressImage = useCallback((file: File): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const url = URL.createObjectURL(file);
      img.onload = () => {
        URL.revokeObjectURL(url);
        // Cap at 3000px on the longest side to stay well within Sanity's worker limit
        const MAX = 3000;
        let { width, height } = img;
        if (width > MAX || height > MAX) {
          if (width > height) { height = Math.round((height / width) * MAX); width = MAX; }
          else { width = Math.round((width / height) * MAX); height = MAX; }
        }
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (!ctx) { reject(new Error("Canvas not available")); return; }
        ctx.drawImage(img, 0, 0, width, height);
        canvas.toBlob(
          (blob) => blob ? resolve(blob) : reject(new Error("Canvas compression failed")),
          "image/jpeg",
          0.88
        );
      };
      img.onerror = () => { URL.revokeObjectURL(url); reject(new Error("Could not load image")); };
      img.src = url;
    });
  }, []);

  const handleFile = useCallback(
    async (file: File) => {
      setUploading(true);
      setUploadError(null);
      try {
        // Compress before upload — Sanity's image worker times out on large/raw files.
        // Wrap as a File so client.assets.upload() can infer the filename.
        const compressed = await compressImage(file);
        const jpegFile = new File(
          [compressed],
          file.name.replace(/\.[^.]+$/, ".jpg"),
          { type: "image/jpeg" }
        );

        // client.assets.upload() handles auth and transport via the Studio's
        // authenticated client. The compressed file avoids the 60s worker timeout.
        const asset = await client.assets.upload("image", jpegFile, {
          filename: jpegFile.name,
        });
        props.onChange([
          setIfMissing({ _type: "image" }),
          set({ _type: "reference" as const, _ref: asset._id }, ["asset"]),
        ]);
      } catch (e: unknown) {
        setUploadError(e instanceof Error ? e.message : String(e));
      } finally {
        setUploading(false);
      }
    },
    [client, props]
  );

  const handleAltChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      props.onChange([
        setIfMissing({ _type: "image" }),
        e.target.value ? set(e.target.value, ["alt"]) : unset(["alt"]),
      ]);
    },
    [props]
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      {/* Current image preview */}
      {imageUrl && (
        <div style={{ position: "relative", display: "inline-block", maxWidth: 280 }}>
          <img
            src={imageUrl}
            alt={altText || "Product image"}
            style={{
              width: "100%", objectFit: "contain",
              border: "1px solid rgba(0,0,0,0.12)", borderRadius: 4,
            }}
          />
          <button
            type="button"
            onClick={() => props.onChange(unset())}
            style={{
              position: "absolute", top: 4, right: 4,
              background: "rgba(0,0,0,0.6)", color: "#fff",
              border: "none", borderRadius: 3, padding: "2px 8px",
              cursor: "pointer", fontSize: 11,
            }}
          >
            Remove
          </button>
        </div>
      )}

      {/* Upload zone */}
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          const file = e.dataTransfer.files?.[0];
          if (file) handleFile(file);
        }}
        onClick={() => !uploading && fileRef.current?.click()}
        style={{
          border: "2px dashed rgba(0,0,0,0.18)", borderRadius: 4,
          padding: "20px 16px", textAlign: "center", cursor: uploading ? "default" : "pointer",
          background: "#f8f8f8", color: uploading ? "#999" : "#555", fontSize: 13,
        }}
      >
        {uploading ? "Uploading…" : "Drag & drop image here, or click to browse"}
        <div style={{ marginTop: 8 }}>
          <button
            type="button"
            disabled={uploading}
            onClick={(e) => { e.stopPropagation(); fileRef.current?.click(); }}
            style={{
              padding: "6px 16px", background: uploading ? "#ccc" : "#2276fc",
              color: "#fff", border: "none", borderRadius: 4,
              cursor: uploading ? "not-allowed" : "pointer", fontSize: 12,
            }}
          >
            {uploading ? "Uploading…" : imageUrl ? "Replace" : "Upload"}
          </button>
        </div>
      </div>

      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
          e.target.value = "";
        }}
      />

      {uploadError && (
        <div style={{
          color: "#c00", fontSize: 12, padding: "8px 12px",
          background: "#fff0f0", border: "1px solid #fcc", borderRadius: 4,
        }}>
          {uploadError}
        </div>
      )}

      {/* Alt text */}
      <div>
        <label style={{ display: "block", fontSize: 11, fontWeight: 600, marginBottom: 4, color: "#666", textTransform: "uppercase", letterSpacing: "0.05em" }}>
          Alt Text
        </label>
        <input
          type="text"
          value={altText}
          onChange={handleAltChange}
          placeholder="Describe the image for accessibility"
          style={{
            width: "100%", padding: "8px 10px", fontSize: 13,
            border: "1px solid rgba(0,0,0,0.2)", borderRadius: 4,
            boxSizing: "border-box",
          }}
        />
      </div>
    </div>
  );
}
