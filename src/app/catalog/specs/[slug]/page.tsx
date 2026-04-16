import { catalogEntries } from "@/data/catalogs";
import { allProductsIncludingHidden } from "@/data/catalog";
import { tileSpecsBySize } from "@/data/catalog/tile-specs";

export function generateStaticParams() {
  return catalogEntries
    .filter((c) => c.pdf)
    .map((c) => ({ slug: c.slug }));
}

export default function SpecSheetPage({
  params,
}: {
  params: { slug: string };
}) {
  const catalog = catalogEntries.find((c) => c.slug === params.slug);
  if (!catalog) {
    return (
      <div style={{ padding: "120px 24px", textAlign: "center" }}>
        <h1 style={{ fontSize: "1.5rem", marginBottom: "16px" }}>Spec sheet not found</h1>
        <a href="/catalog" style={{ color: "#b58a52" }}>Back to Catalog</a>
      </div>
    );
  }

  const specs = tileSpecsBySize[catalog.filterValue];
  const products = allProductsIncludingHidden.filter(
    (p) => p.size === catalog.filterValue
  );

  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "0 auto",
        padding: "48px 32px",
        fontFamily: "Inter, system-ui, sans-serif",
        color: "#2b241c",
      }}
    >
      {/* Print-only styles */}
      <style>{`
        @media print {
          nav, header, footer, .no-print { display: none !important; }
          body { background: white !important; }
          @page { margin: 1.5cm; }
        }
      `}</style>

      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingBottom: "24px",
          borderBottom: "2px solid #b58a52",
          marginBottom: "40px",
        }}
      >
        <div>
          <p
            style={{
              fontSize: "0.65rem",
              fontWeight: 600,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#b58a52",
              marginBottom: "8px",
            }}
          >
            Technical Specification Sheet
          </p>
          <h1
            style={{
              fontSize: "1.8rem",
              fontWeight: 300,
              fontFamily: "Cormorant Garamond, Georgia, serif",
              lineHeight: 1.1,
            }}
          >
            {catalog.name}
          </h1>
        </div>
        <div style={{ textAlign: "right" }}>
          <p style={{ fontSize: "0.7rem", color: "#6f6254" }}>Prime Ceramics Pvt. Ltd.</p>
          <p style={{ fontSize: "0.65rem", color: "#6f6254" }}>www.primeceramics.com.np</p>
        </div>
      </div>

      {/* Back link (hidden in print) */}
      <div className="no-print" style={{ marginBottom: "32px" }}>
        <a
          href="/catalog"
          style={{
            fontSize: "0.75rem",
            fontWeight: 500,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#b58a52",
            textDecoration: "none",
          }}
        >
          &larr; Back to Catalog
        </a>
      </div>

      {/* Catalog info */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "16px",
          marginBottom: "40px",
          padding: "24px",
          background: "#faf8f4",
          borderRadius: "8px",
          border: "1px solid rgba(43,36,28,0.06)",
        }}
      >
        <div>
          <p style={{ fontSize: "0.6rem", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "#6f6254", marginBottom: "4px" }}>Size</p>
          <p style={{ fontSize: "0.95rem" }}>{catalog.size}</p>
        </div>
        <div>
          <p style={{ fontSize: "0.6rem", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "#6f6254", marginBottom: "4px" }}>Designs</p>
          <p style={{ fontSize: "0.95rem" }}>{catalog.count}</p>
        </div>
        <div>
          <p style={{ fontSize: "0.6rem", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "#6f6254", marginBottom: "4px" }}>Finishes</p>
          <p style={{ fontSize: "0.95rem" }}>{catalog.types}</p>
        </div>
        <div>
          <p style={{ fontSize: "0.6rem", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "#6f6254", marginBottom: "4px" }}>Description</p>
          <p style={{ fontSize: "0.95rem" }}>{catalog.description}</p>
        </div>
      </div>

      {/* Technical Specs */}
      {specs && (
        <div style={{ marginBottom: "40px" }}>
          <h2
            style={{
              fontSize: "0.7rem",
              fontWeight: 600,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#b58a52",
              marginBottom: "20px",
              paddingBottom: "12px",
              borderBottom: "1px solid rgba(43,36,28,0.08)",
            }}
          >
            Technical Specifications
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "1px",
              background: "rgba(43,36,28,0.06)",
              borderRadius: "8px",
              overflow: "hidden",
            }}
          >
            {[
              { label: "Dimensions", value: specs.dimensions },
              { label: "Thickness", value: specs.thickness },
              { label: "Tile Type", value: specs.tileType },
              { label: "Tiles / Box", value: `${specs.tilesPerBox}` },
              { label: "Area / Box", value: specs.areaPerBox },
              { label: "Weight / Box", value: `${specs.weightPerBox} kg` },
              { label: "Water Absorption", value: specs.waterAbsorption },
              { label: "Breaking Strength", value: specs.breakingStrength },
              { label: "Modulus of Rupture", value: specs.modulusOfRupture },
              { label: "Scratch Hardness", value: specs.scratchHardness },
              { label: "Surface Abrasion", value: specs.surfaceAbrasion },
              { label: "Standard", value: specs.standard },
            ].map((s) => (
              <div
                key={s.label}
                style={{
                  padding: "14px 16px",
                  background: "white",
                }}
              >
                <p style={{ fontSize: "0.55rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#6f6254", marginBottom: "4px" }}>
                  {s.label}
                </p>
                <p style={{ fontSize: "0.85rem", fontWeight: 400 }}>
                  {s.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Product listing */}
      {products.length > 0 && (
        <div>
          <h2
            style={{
              fontSize: "0.7rem",
              fontWeight: 600,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#b58a52",
              marginBottom: "20px",
              paddingBottom: "12px",
              borderBottom: "1px solid rgba(43,36,28,0.08)",
            }}
          >
            Products in this Catalog ({products.length})
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "12px",
            }}
          >
            {products.slice(0, 60).map((p) => (
              <div
                key={p.slug}
                style={{
                  padding: "12px 16px",
                  background: "#faf8f4",
                  borderRadius: "6px",
                  border: "1px solid rgba(43,36,28,0.04)",
                }}
              >
                <p style={{ fontSize: "0.82rem", fontWeight: 400, marginBottom: "2px" }}>
                  {p.name}
                </p>
                <p style={{ fontSize: "0.6rem", color: "#6f6254" }}>
                  {p.finish} · {p.series}
                </p>
              </div>
            ))}
          </div>
          {products.length > 60 && (
            <p style={{ fontSize: "0.75rem", color: "#6f6254", marginTop: "16px", textAlign: "center" }}>
              + {products.length - 60} more designs
            </p>
          )}
        </div>
      )}

      {/* Footer */}
      <div
        style={{
          marginTop: "48px",
          paddingTop: "24px",
          borderTop: "1px solid rgba(43,36,28,0.08)",
          display: "flex",
          justifyContent: "space-between",
          fontSize: "0.65rem",
          color: "#6f6254",
        }}
      >
        <p>Prime Ceramics Pvt. Ltd. · Tripureshwor, Kathmandu</p>
        <p>ISO 10545 / NS 617:2082 Certified</p>
      </div>
    </div>
  );
}
