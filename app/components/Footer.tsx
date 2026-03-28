export default function Footer() {
  return (
    <footer style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
      {/* Conteneur centré 1100px */}
      <div
        className="footer-inner mx-auto flex w-full items-center justify-between"
        style={{
          maxWidth: 1100,
          paddingLeft: 44,
          paddingRight: 44,
          paddingTop: 28,
          paddingBottom: 28,
        }}
      >
        <span
          className="font-inter font-light"
          style={{ fontSize: 9, color: "rgba(221,226,236,0.25)" }}
        >
          © 2026 BMK Studio — Bruxelles
        </span>

        <nav className="flex items-center gap-8" aria-label="Réseaux sociaux">
          {[
            { href: "https://instagram.com", label: "Instagram" },
            { href: "https://linkedin.com", label: "LinkedIn" },
          ].map(({ href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-inter font-light uppercase tracking-widest transition-colors duration-200 hover:text-bmk-accent"
              style={{ fontSize: 9, color: "rgba(221,226,236,0.25)" }}
            >
              {label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
