import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found — Prime Ceramics",
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-surface-dark px-6 text-center">
      <p className="eyebrow text-accent-light mb-4">404</p>
      <h1 className="h1 text-ink-on-dark mb-6">Page Not Found</h1>
      <p className="body-lg text-ink-on-dark-light mb-8 max-w-md">
        The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <a
        href="/"
        className="link-arrow text-white/70 hover:text-white focus-visible:outline-1 focus-visible:outline-accent"
      >
        Back to Home
      </a>
    </div>
  );
}
