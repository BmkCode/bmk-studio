"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { translations } from "../../lib/translations";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const isEN = pathname.startsWith("/en");
  const t = isEN ? translations.en : translations.fr;
  const basePath = isEN ? "/en" : "";

  const links = [
    { href: `${basePath}/travail`, label: t.nav.work },
    { href: `${basePath}/formations`, label: t.nav.training },
    { href: `${basePath}/contact`, label: t.nav.contact },
  ];

  const logoHref = isEN ? "/en" : "/";
  const toFR = isEN ? pathname.replace(/^\/en/, "") || "/" : pathname;
  const toEN = isEN ? pathname : `/en${pathname}`;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6">
      {/* Backdrop */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          background: "linear-gradient(to bottom, rgba(9,13,19,0.85) 0%, transparent 100%)",
        }}
      />

      {/* Logo */}
      <Link
        href={logoHref}
        className="relative font-archivo text-xl tracking-tight text-bmk-text transition-opacity hover:opacity-80"
        style={{ display: "inline-block", transform: "scaleY(1.15)" }}
      >
        BMK
        <span style={{ color: "#ffb400", textShadow: "0 0 12px rgba(255,180,0,0.6), 0 0 24px rgba(255,180,0,0.3)" }}>.</span>
      </Link>

      {/* Desktop nav */}
      <nav className="relative hidden md:flex items-center gap-10" aria-label="Navigation principale">
        {links.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className="font-inter font-light uppercase text-bmk-text/60 transition-colors duration-200 hover:text-bmk-accent"
            style={{ fontSize: 9, letterSpacing: "0.2em" }}
          >
            {label}
          </Link>
        ))}

        {/* Language switcher */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => router.push(toFR)}
            className="font-inter font-light uppercase tracking-widest transition-colors duration-200"
            style={{
              fontSize: 9,
              letterSpacing: "0.2em",
              color: !isEN ? "#ffb400" : "rgba(221,226,236,0.25)",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 0,
            }}
          >
            FR
          </button>
          <span style={{ color: "rgba(221,226,236,0.15)", fontSize: 9 }}>|</span>
          <button
            onClick={() => router.push(toEN)}
            className="font-inter font-light uppercase tracking-widest transition-colors duration-200"
            style={{
              fontSize: 9,
              letterSpacing: "0.2em",
              color: isEN ? "#ffb400" : "rgba(221,226,236,0.25)",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 0,
            }}
          >
            EN
          </button>
        </div>
      </nav>

      {/* Hamburger — mobile only */}
      <button
        className="relative flex md:hidden flex-col justify-center gap-[6px] w-8 h-8"
        onClick={() => setOpen(true)}
        aria-label="Ouvrir le menu"
      >
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="block h-px w-full"
            style={{ backgroundColor: "#dde2ec" }}
          />
        ))}
      </button>

      {/* Mobile menu overlay */}
      {open && (
        <div
          className="mobile-menu-enter fixed inset-0 z-50 flex flex-col items-center justify-center"
          style={{ backgroundColor: "#090d13" }}
        >
          {/* Close */}
          <button
            className="absolute top-6 right-8 text-bmk-text/60 transition-colors hover:text-bmk-text"
            style={{ fontSize: 32, lineHeight: 1, background: "none", border: "none", cursor: "pointer" }}
            onClick={() => setOpen(false)}
            aria-label="Fermer le menu"
          >
            ×
          </button>

          <nav className="flex flex-col items-center gap-10" aria-label="Menu mobile">
            {links.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="font-archivo text-bmk-text transition-opacity hover:opacity-60"
                style={{ fontSize: 24, display: "inline-block", transform: "scaleY(1.15)" }}
                onClick={() => setOpen(false)}
              >
                {label}
              </Link>
            ))}

            {/* Language switcher mobile */}
            <div className="flex items-center gap-3 mt-4">
              <button
                onClick={() => { router.push(toFR); setOpen(false); }}
                className="font-inter font-light uppercase tracking-widest"
                style={{
                  fontSize: 11,
                  color: !isEN ? "#ffb400" : "rgba(221,226,236,0.25)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                FR
              </button>
              <span style={{ color: "rgba(221,226,236,0.15)" }}>|</span>
              <button
                onClick={() => { router.push(toEN); setOpen(false); }}
                className="font-inter font-light uppercase tracking-widest"
                style={{
                  fontSize: 11,
                  color: isEN ? "#ffb400" : "rgba(221,226,236,0.25)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                EN
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
