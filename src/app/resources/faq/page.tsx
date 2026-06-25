"use client";

import { useState } from "react";
import SmoothScroll from "@/components/layout/SmoothScroll";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FadeIn from "@/components/animations/FadeIn";
import { ChevronDown, ArrowRight } from "lucide-react";
import { faqCategories } from "@/data/faq";

function FaqCategory({
  category,
  catIndex,
}: {
  category: (typeof faqCategories)[0];
  catIndex: number;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <FadeIn delay={catIndex * 0.07}>
      <div
        style={{
          marginBottom: "clamp(40px, 6vw, 64px)",
          paddingBottom: "clamp(40px, 6vw, 64px)",
          borderBottom: "1px solid rgba(43,36,28,0.08)",
        }}
      >
        <h2
          className="font-serif font-light text-ink"
          style={{
            fontSize: "clamp(1.4rem, 2.5vw, 2rem)",
            lineHeight: 1.15,
            marginBottom: "clamp(20px, 3vw, 32px)",
          }}
        >
          {category.title}
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {category.items.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                style={{
                  border: "1px solid rgba(43,36,28,0.08)",
                  borderRadius: "8px",
                  overflow: "hidden",
                  background: isOpen ? "var(--color-surface-card, var(--color-surface-alt))" : "transparent",
                  transition: "background 0.3s linear",
                }}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex items-center justify-between text-left"
                  style={{
                    padding: "clamp(16px, 3vw, 20px) clamp(16px, 3vw, 24px)",
                    cursor: "pointer",
                    background: "none",
                    border: "none",
                  }}
                >
                  <span
                    className="font-medium text-ink"
                    style={{
                      fontSize: "clamp(0.85rem, 1.1vw, 0.95rem)",
                      paddingRight: "16px",
                    }}
                  >
                    {item.question}
                  </span>
                  <ChevronDown
                    size={16}
                    className="text-ink-muted shrink-0"
                    style={{
                      transform: isOpen ? "rotate(180deg)" : "rotate(0)",
                      transition: "transform 0.3s linear",
                    }}
                  />
                </button>

                {isOpen && (
                  <div
                    style={{
                      padding: "0 clamp(16px, 3vw, 24px) clamp(16px, 3vw, 24px)",
                    }}
                  >
                    <p
                      className="text-ink-light"
                      style={{
                        fontSize: "0.88rem",
                        lineHeight: 1.8,
                      }}
                    >
                      {item.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </FadeIn>
  );
}

export default function FaqPage() {
  return (
    <SmoothScroll>
      <Header />
      <main id="main-content">
        {/* Hero */}
        <section
          className="bg-surface-dark relative overflow-hidden"
          style={{
            paddingTop: "clamp(100px, 14vw, 160px)",
            paddingBottom: "clamp(60px, 8vw, 100px)",
          }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(181,138,82,0.08) 0%, transparent 60%)",
            }}
          />

          <div className="container relative z-10">
            <div style={{ maxWidth: "640px" }}>
              <FadeIn>
                <div className="flex items-center" style={{ gap: "16px", marginBottom: "24px" }}>
                  <div className="w-10 h-px bg-accent" />
                  <p className="eyebrow text-accent-light">Resources</p>
                </div>
              </FadeIn>
              <FadeIn delay={0.06}>
                <h1
                  className="font-serif font-light text-ink-on-dark"
                  style={{
                    fontSize: "clamp(2.2rem, 5vw, 4rem)",
                    lineHeight: 1.05,
                    marginBottom: "24px",
                  }}
                >
                  Frequently Asked{" "}
                  <span className="italic text-accent-light">Questions</span>
                </h1>
              </FadeIn>
              <FadeIn delay={0.1}>
                <p
                  className="text-ink-on-dark-light font-light"
                  style={{
                    fontSize: "clamp(0.9rem, 1.2vw, 1.05rem)",
                    lineHeight: 1.75,
                    maxWidth: "480px",
                  }}
                >
                  Answers to the most common questions about our tiles — from
                  choosing the right product to installation, maintenance, and
                  warranty support.
                </p>
              </FadeIn>
            </div>
          </div>

          <div
            className="absolute bottom-0 left-0 right-0"
            style={{
              height: "1px",
              background:
                "linear-gradient(90deg, transparent 5%, rgba(181,138,82,0.2) 30%, rgba(181,138,82,0.2) 70%, transparent 95%)",
            }}
          />
        </section>

        {/* FAQ content */}
        <section
          className="bg-surface"
          style={{ padding: "clamp(56px, 8vw, 96px) 0" }}
        >
          <div className="container">
            <div style={{ maxWidth: "800px", marginLeft: "auto", marginRight: "auto" }}>
              {faqCategories.map((cat, i) => (
                <FaqCategory key={cat.id} category={cat} catIndex={i} />
              ))}

              {/* CTA */}
              <FadeIn>
                <div
                  style={{
                    textAlign: "center",
                    padding: "clamp(32px, 5vw, 56px)",
                    background: "var(--color-surface-alt)",
                    borderRadius: "12px",
                  }}
                >
                  <p
                    className="font-serif font-light text-ink"
                    style={{
                      fontSize: "clamp(1.2rem, 2vw, 1.6rem)",
                      marginBottom: "16px",
                    }}
                  >
                    Still have questions?
                  </p>
                  <p
                    className="text-ink-muted"
                    style={{
                      fontSize: "0.88rem",
                      marginBottom: "24px",
                      maxWidth: "400px",
                      marginLeft: "auto",
                      marginRight: "auto",
                    }}
                  >
                    Our team is happy to help with any query about products,
                    installation, or your project requirements.
                  </p>
                  <a href="/#contact" className="btn-gold group">
                    Contact Us
                    <ArrowRight
                      size={14}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </a>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </SmoothScroll>
  );
}
