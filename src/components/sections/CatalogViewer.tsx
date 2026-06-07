"use client";

import { useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { ArrowLeft, Download } from "lucide-react";
import SmoothScroll from "@/components/layout/SmoothScroll";
import Header from "@/components/layout/Header";
import { catalogEntries } from "@/data/catalogs";
import catalogPages from "@/data/catalog-pages.json";
import CatalogDownloadModal from "@/components/ui/CatalogDownloadModal";
import { hasCapturedCatalogLead, downloadFile } from "@/lib/leads";

const catalogBySlug = new Map(catalogEntries.map((c) => [c.slug, c]));
const pageCounts = catalogPages as Record<string, number>;

const CatalogFlipbook = dynamic(() => import("./CatalogFlipbook"), { ssr: false });

export default function CatalogViewer({ slug }: { slug: string }) {
  const catalog = catalogBySlug.get(slug);
  const pages = pageCounts[slug] ?? 0;
  const [gateOpen, setGateOpen] = useState(false);

  if (!catalog) {
    return (
      <SmoothScroll>
        <Header />
        <main
          id="main-content"
          className="bg-surface-dark"
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div className="text-center">
            <p
              className="font-serif font-light text-ink-on-dark"
              style={{ fontSize: "1.5rem", marginBottom: "16px" }}
            >
              Catalogue not found
            </p>
            <Link href="/catalog" className="link-arrow text-accent-light">
              <ArrowLeft size={14} /> Back to Catalogue
            </Link>
          </div>
        </main>
      </SmoothScroll>
    );
  }

  const handleDownload = () => {
    if (!catalog.pdf) return;
    // Returning visitors who already filled the form skip the gate.
    if (hasCapturedCatalogLead()) {
      downloadFile(catalog.pdf);
      return;
    }
    setGateOpen(true);
  };

  return (
    <SmoothScroll>
      <Header />
      <main id="main-content" className="bg-surface-dark" style={{ minHeight: "100vh" }}>
        {/* Top bar */}
        <div
          style={{
            paddingTop: "80px",
            position: "sticky",
            top: 0,
            zIndex: 20,
            background: "var(--color-surface-dark)",
          }}
        >
          <div
            className="container flex items-center justify-between"
            style={{ padding: "16px var(--spacing-gutter)" }}
          >
            <div className="flex items-center" style={{ gap: "20px" }}>
              <Link
                href="/catalog"
                className="flex items-center text-[0.65rem] font-medium tracking-[0.12em] uppercase text-ink-on-dark-muted hover:text-accent-light"
                style={{ gap: "8px", transition: "color 0.3s" }}
              >
                <ArrowLeft size={14} />
                Back
              </Link>
              <div
                style={{
                  width: "1px",
                  height: "20px",
                  background: "rgba(181,138,82,0.15)",
                }}
              />
              <h1
                className="font-serif font-light text-ink-on-dark"
                style={{ fontSize: "clamp(0.9rem, 1.5vw, 1.15rem)" }}
              >
                {catalog.name}
              </h1>
            </div>
            <button
              type="button"
              onClick={handleDownload}
              className="flex items-center text-[0.6rem] font-medium tracking-[0.12em] uppercase text-accent-light hover:text-accent cursor-pointer"
              style={{
                gap: "8px",
                padding: "8px 20px",
                border: "1px solid rgba(181,138,82,0.25)",
                borderRadius: "4px",
                transition: "all 0.3s",
              }}
            >
              <Download size={13} />
              Download
            </button>
          </div>
          <div
            style={{
              height: "1px",
              background:
                "linear-gradient(90deg, transparent, rgba(181,138,82,0.12) 20%, rgba(181,138,82,0.12) 80%, transparent)",
            }}
          />
        </div>

        {/* Flipbook — when pre-rendered pages exist */}
        {pages > 0 ? (
          <CatalogFlipbook slug={slug} pages={pages} name={catalog.name} />
        ) : (
        /* Inline PDF viewer — when no pre-rendered flipbook pages exist */
        <div style={{ padding: "clamp(16px, 3vw, 40px) var(--spacing-gutter)" }}>
          <div
            className="mx-auto overflow-hidden"
            style={{
              maxWidth: "1100px",
              height: "calc(100vh - 200px)",
              minHeight: "480px",
              borderRadius: "6px",
              border: "1px solid rgba(181,138,82,0.18)",
              background: "rgba(0,0,0,0.25)",
            }}
          >
            <object
              data={`${catalog.pdf}#view=FitH`}
              type="application/pdf"
              style={{ width: "100%", height: "100%" }}
            >
              {/* Fallback for browsers that can't embed PDFs inline */}
              <div className="flex items-center justify-center" style={{ height: "100%" }}>
                <div className="text-center" style={{ maxWidth: "420px" }}>
                  <div
                    className="mx-auto flex items-center justify-center"
                    style={{
                      width: "64px",
                      height: "64px",
                      borderRadius: "50%",
                      background: "rgba(181,138,82,0.1)",
                      border: "1px solid rgba(181,138,82,0.2)",
                      marginBottom: "24px",
                    }}
                  >
                    <Download size={24} className="text-accent" />
                  </div>
                  <p className="font-serif font-light text-ink-on-dark" style={{ fontSize: "1.3rem", marginBottom: "12px" }}>
                    {catalog.name}
                  </p>
                  <p className="text-[0.8rem] text-ink-on-dark-muted" style={{ marginBottom: "32px", lineHeight: 1.7 }}>
                    Your browser can&apos;t display this catalogue inline. Download the full PDF to browse all designs, room scenes, and technical specifications.
                  </p>
                  <button
                    type="button"
                    onClick={handleDownload}
                    className="inline-flex items-center text-[0.65rem] font-semibold tracking-[0.16em] uppercase bg-accent text-white hover:bg-accent-hover transition-colors duration-300 cursor-pointer"
                    style={{ gap: "10px", padding: "14px 32px", borderRadius: "4px" }}
                  >
                    <Download size={14} />
                    Download Catalogue PDF
                  </button>
                </div>
              </div>
            </object>
          </div>
        </div>
        )}

        <CatalogDownloadModal
          open={gateOpen}
          onClose={() => setGateOpen(false)}
          catalogName={catalog.name}
          pdfUrl={catalog.pdf ?? ""}
        />
      </main>
    </SmoothScroll>
  );
}
