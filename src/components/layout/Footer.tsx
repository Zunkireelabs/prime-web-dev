"use client";

export default function Footer() {
  return (
    <footer className="bg-[var(--bg-secondary)] border-t border-[rgba(201,169,110,0.1)]">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-serif gold-gradient-text mb-4">
              Prime
            </h3>
            <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
              Premium experience crafted with care and attention to detail.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm uppercase tracking-wider text-[var(--gold)] mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {["Home", "About", "Services", "Gallery", "Contact"].map(
                (link) => (
                  <li key={link}>
                    <a
                      href={`#${link.toLowerCase()}`}
                      className="text-sm text-[var(--text-secondary)] hover:text-[var(--gold)] transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm uppercase tracking-wider text-[var(--gold)] mb-4">
              Contact
            </h4>
            <div className="space-y-2 text-sm text-[var(--text-secondary)]">
              <p>info@prime.com</p>
              <p>+1 (555) 000-0000</p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-[rgba(201,169,110,0.1)] text-center">
          <p className="text-xs text-[var(--text-muted)]">
            &copy; {new Date().getFullYear()} Prime. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
