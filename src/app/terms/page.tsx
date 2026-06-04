"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import SmoothScroll from "@/components/layout/SmoothScroll";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FadeIn from "@/components/animations/FadeIn";

const sections = [
  {
    title: "Acceptance of Terms",
    content: `By accessing and using the Prime Tiles Industries website (primeceramics.com.np), you acknowledge that you have read, understood, and agree to be bound by these Terms of Use. If you do not agree with any part of these terms, please do not use our website.`,
  },
  {
    title: "Use of Website",
    content: `This website is provided for informational purposes, to showcase our tile products and collections, and to facilitate enquiries from potential customers, architects, designers, and dealers.

You agree to use this website only for lawful purposes and in a manner that does not infringe upon the rights of others or restrict their use and enjoyment of the site. You may not use this website to transmit harmful, offensive, or unlawful content.`,
  },
  {
    title: "Intellectual Property",
    content: `All content on this website — including but not limited to text, images, photographs, graphics, logos, icons, product designs, page layouts, and software — is the property of Prime Tiles Industries Pvt. Ltd. or its licensors and is protected by applicable intellectual property laws.

You may not reproduce, distribute, modify, display, or create derivative works from any content on this website without our prior written consent. Limited personal, non-commercial use such as saving or printing pages for reference is permitted.`,
  },
  {
    title: "Product Information & Imagery",
    content: `We make every effort to display our tile products as accurately as possible. However, please be aware that:

Tile colors, textures, patterns, and finishes may vary from the images shown on this website due to differences in screen calibration, lighting conditions, and manufacturing processes.

Product specifications, dimensions, and availability are subject to change without notice. We recommend visiting one of our showrooms or requesting physical samples before making purchase decisions.

The images on this website are representative and intended for reference purposes only. Actual tiles may differ in shade, texture, and surface finish.`,
  },
  {
    title: "Enquiries & Communications",
    content: `When you submit an enquiry, quote request, or any other form of communication through our website, you consent to receiving a response from our team via email, phone, or other contact methods you have provided.

We aim to respond to all enquiries promptly but do not guarantee specific response times. Submission of an enquiry does not constitute a binding order or agreement.`,
  },
  {
    title: "Third-Party Links",
    content: `Our website may contain links to third-party websites, including social media platforms and partner sites. These links are provided for your convenience and do not imply endorsement by Prime Tiles Industries.

We have no control over the content, privacy policies, or practices of third-party websites and accept no responsibility for them. You access third-party sites at your own risk.`,
  },
  {
    title: "Limitation of Liability",
    content: `Prime Tiles Industries Pvt. Ltd. provides this website and its content on an "as is" and "as available" basis without warranties of any kind, either express or implied.

To the fullest extent permitted by law, we shall not be liable for any direct, indirect, incidental, consequential, or special damages arising from your use of or inability to use this website, including but not limited to loss of data, revenue, or business opportunities.`,
  },
  {
    title: "Governing Law",
    content: `These Terms of Use shall be governed by and construed in accordance with the laws of Nepal. Any disputes arising from the use of this website shall be subject to the exclusive jurisdiction of the courts of Kathmandu, Nepal.`,
  },
  {
    title: "Changes to These Terms",
    content: `We reserve the right to modify or update these Terms of Use at any time without prior notice. Changes will be effective immediately upon posting on this page. Your continued use of the website after any changes constitutes your acceptance of the revised terms.`,
  },
  {
    title: "Contact Us",
    content: `If you have any questions about these Terms of Use, please contact us:

Prime Tiles Industries Pvt. Ltd.
Email: info@primeceramics.com.np
Phone: +977-1-5978860/61/62
Office: Bansighat Marg, Teku, Kathmandu, Nepal`,
  },
];

export default function TermsPage() {
  return (
    <SmoothScroll>
      <Header />
      <main id="main-content">
        {/* Hero */}
        <section
          className="bg-surface-dark relative overflow-hidden"
          style={{ paddingTop: "clamp(80px, 12vw, 120px)", paddingBottom: "clamp(36px, 6vw, 56px)" }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(181,138,82,0.06) 0%, transparent 60%)",
            }}
          />
          <div className="container relative z-10">
            <FadeIn>
              <nav
                aria-label="Breadcrumb"
                className="flex items-center text-[0.6rem] font-medium tracking-[0.16em] uppercase text-ink-on-dark-muted"
                style={{ gap: "10px", marginBottom: "28px" }}
              >
                <Link href="/" className="hover:text-ink-on-dark" style={{ transition: "color 0.3s" }}>
                  Home
                </Link>
                <ChevronRight size={10} aria-hidden="true" />
                <span className="text-ink-on-dark-light">Terms of Use</span>
              </nav>
            </FadeIn>
            <FadeIn delay={0.05}>
              <h1
                className="font-serif font-light text-ink-on-dark"
                style={{
                  fontSize: "clamp(2.2rem, 4.5vw, 3.6rem)",
                  lineHeight: 1.08,
                  letterSpacing: "-0.02em",
                  marginBottom: "16px",
                }}
              >
                Terms of <span className="italic text-accent-light">Use</span>
              </h1>
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="text-ink-on-dark-muted text-[0.75rem] tracking-[0.08em]">
                Last updated: April 2026
              </p>
            </FadeIn>
          </div>
          <div
            className="absolute bottom-0 left-0 right-0"
            style={{
              height: "1px",
              background: "linear-gradient(90deg, transparent 5%, rgba(181,138,82,0.15) 30%, rgba(181,138,82,0.15) 70%, transparent 95%)",
            }}
          />
        </section>

        {/* Content */}
        <section className="bg-surface" style={{ padding: "clamp(48px, 6vw, 80px) 0 clamp(80px, 10vw, 140px)" }}>
          <div className="container" style={{ maxWidth: "780px" }}>
            <FadeIn>
              <p
                className="text-ink-light font-light"
                style={{
                  fontSize: "clamp(0.9rem, 1.1vw, 1rem)",
                  lineHeight: 1.8,
                  marginBottom: "48px",
                }}
              >
                Welcome to the Prime Tiles Industries website. These Terms of Use govern your access to and use of our website and services. Please read them carefully.
              </p>
            </FadeIn>

            {sections.map((section, i) => (
              <FadeIn key={section.title} delay={Math.min(i * 0.04, 0.3)}>
                <div style={{ marginBottom: "40px" }}>
                  <h2
                    className="font-serif font-light text-ink"
                    style={{
                      fontSize: "clamp(1.2rem, 1.8vw, 1.5rem)",
                      marginBottom: "16px",
                    }}
                  >
                    {section.title}
                  </h2>
                  <div
                    style={{
                      width: "32px",
                      height: "1px",
                      background: "var(--color-accent)",
                      opacity: 0.3,
                      marginBottom: "16px",
                    }}
                  />
                  <p
                    className="text-ink-light font-light"
                    style={{
                      fontSize: "clamp(0.85rem, 1vw, 0.95rem)",
                      lineHeight: 1.85,
                      whiteSpace: "pre-line",
                    }}
                  >
                    {section.content}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </SmoothScroll>
  );
}
