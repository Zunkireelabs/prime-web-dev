"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import SmoothScroll from "@/components/layout/SmoothScroll";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FadeIn from "@/components/animations/FadeIn";

const sections = [
  {
    title: "Information We Collect",
    content: `When you visit our website, we may collect the following types of information:

Personal information you voluntarily provide through enquiry forms, quote requests, or email correspondence — such as your name, email address, phone number, and project details.

Non-personal information collected automatically, including your browser type, device information, IP address, pages visited, and time spent on the site. This data helps us understand how visitors use our website and improve the experience.`,
  },
  {
    title: "How We Use Your Information",
    content: `We use the information we collect to:

Respond to your enquiries, quote requests, and sample requests.
Provide information about our tile products, collections, and services.
Improve our website content, functionality, and user experience.
Communicate with you about orders, deliveries, or project consultations.
Send periodic updates about new collections or promotions, only if you have opted in to receive them.`,
  },
  {
    title: "Data Sharing",
    content: `Prime Tiles Industries Pvt. Ltd. does not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:

With trusted service providers who assist us in operating our website or servicing you, provided they agree to keep your information confidential.
When required by law, regulation, or legal process.
To protect the rights, safety, or property of Prime Tiles Industries, our customers, or the public.`,
  },
  {
    title: "Cookies",
    content: `Our website may use cookies and similar technologies to enhance your browsing experience. Cookies are small data files stored on your device that help us remember your preferences and understand site usage patterns.

You can choose to disable cookies through your browser settings. However, disabling cookies may affect certain features of the website.`,
  },
  {
    title: "Data Security",
    content: `We implement reasonable security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet or electronic storage is completely secure, and we cannot guarantee absolute security.`,
  },
  {
    title: "Third-Party Links",
    content: `Our website may contain links to third-party websites, including social media platforms. We are not responsible for the privacy practices or content of these external sites. We encourage you to review the privacy policies of any third-party websites you visit.`,
  },
  {
    title: "Changes to This Policy",
    content: `We may update this Privacy Policy from time to time to reflect changes in our practices or applicable laws. Any updates will be posted on this page with a revised effective date. We encourage you to review this policy periodically.`,
  },
  {
    title: "Contact Us",
    content: `If you have any questions or concerns about this Privacy Policy or how your information is handled, please contact us:

Prime Tiles Industries Pvt. Ltd.
Email: info@primeceramics.com.np
Phone: +977-1-5978860/61/62
Office: Level 4, Saket Complex, Tripureshwor, Kathmandu, Nepal`,
  },
];

export default function PrivacyPage() {
  return (
    <SmoothScroll>
      <Header />
      <main id="main-content">
        {/* Hero */}
        <section
          className="bg-surface-dark relative overflow-hidden"
          style={{ paddingTop: "120px", paddingBottom: "56px" }}
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
                <span className="text-ink-on-dark-light">Privacy Policy</span>
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
                Privacy <span className="italic text-accent-light">Policy</span>
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
                Prime Tiles Industries Pvt. Ltd. (&ldquo;Prime Ceramics,&rdquo; &ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website.
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
