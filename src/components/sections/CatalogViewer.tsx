"use client";

import Link from "next/link";
import { ArrowLeft, Download } from "lucide-react";
import SmoothScroll from "@/components/layout/SmoothScroll";
import Header from "@/components/layout/Header";
import { catalogEntries } from "@/data/catalogs";

const catalogBySlug = new Map(catalogEntries.map((c) => [c.slug, c]));

export default function CatalogViewer({ slug }: { slug: string }) {
  const catalog = catalogBySlug.get(slug);

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
              Catalog not found
            </p>
            <Link href="/catalog" className="link-arrow text-accent-light">
              <ArrowLeft size={14} /> Back to Catalog
            </Link>
          </div>
        </main>
      </SmoothScroll>
    );
  }

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
            <a
              href={catalog.pdf}
              download
              className="flex items-center text-[0.6rem] font-medium tracking-[0.12em] uppercase text-accent-light hover:text-accent"
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
            </a>
          </div>
          <div
            style={{
              height: "1px",
              background:
                "linear-gradient(90deg, transparent, rgba(181,138,82,0.12) 20%, rgba(181,138,82,0.12) 80%, transparent)",
            }}
          />
        </div>

        {/* PDF Embed */}
        <div
          style={{
            height: "calc(100vh - 130px)",
            position: "relative",
          }}
        >
          {/* Loading indicator */}
          <div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            style={{ zIndex: 1 }}
          >
            <div className="text-center">
              <div
                className="mx-auto"
                style={{
                  width: "32px",
                  height: "32px",
                  border: "2px solid rgba(181,138,82,0.15)",
                  borderTopColor: "var(--color-accent)",
                  borderRadius: "50%",
                  animation: "spin 1s linear infinite",
                  marginBottom: "16px",
                }}
              />
              <p className="text-[0.7rem] font-medium tracking-[0.1em] uppercase text-ink-on-dark-muted">
                Loading catalog...
              </p>
            </div>
          </div>

          <iframe
            src={catalog.pdf}
            title={`${catalog.name} Catalog`}
            className="w-full h-full"
            style={{
              border: "none",
              position: "relative",
              zIndex: 2,
              background: "transparent",
            }}
          />
        </div>

        <style jsx>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </main>
    </SmoothScroll>
  );
}
