import Link from "next/link";

export default function Nav() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6">
      {/* Subtle backdrop blur */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          background:
            "linear-gradient(to bottom, rgba(9,13,19,0.85) 0%, transparent 100%)",
          backdropFilter: "blur(0px)",
        }}
      />

      {/* Logo */}
      <Link
        href="/"
        className="relative font-archivo text-xl tracking-tight text-bmk-text transition-opacity hover:opacity-80"
        style={{ display: "inline-block", transform: "scaleY(1.15)" }}
      >
        BMK
        <span
          style={{
            color: "#ffb400",
            textShadow: "0 0 12px rgba(255,180,0,0.6), 0 0 24px rgba(255,180,0,0.3)",
          }}
        >
          .
        </span>
      </Link>

      {/* Navigation links */}
      <nav className="relative flex items-center gap-10" aria-label="Navigation principale">
        {[
          { href: "/travail", label: "Travail" },
          { href: "/formations", label: "Formations" },
          { href: "/contact", label: "Contact" },
        ].map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className="font-inter font-light uppercase text-bmk-text/60 transition-colors duration-200 hover:text-bmk-accent"
            style={{ fontSize: 9, letterSpacing: "0.2em" }}
          >
            {label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
