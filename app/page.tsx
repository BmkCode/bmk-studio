"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import WorkSection from "./components/WorkSection";
import InterludeSection from "./components/InterludeSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import { useIsMobile } from "./hooks/useIsMobile";

export default function Home() {
  const isMobile = useIsMobile();
  const h1Ref = useRef<HTMLDivElement>(null);
  const acrocheRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const ctasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const els = [h1Ref.current, acrocheRef.current, subtitleRef.current, ctasRef.current];
    if (els.some(el => !el)) return;
    const tl = gsap.timeline();
    tl.fromTo(h1Ref.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.2 })
      .fromTo(acrocheRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1, ease: "power3.out" }, "-=0.85")
      .fromTo(subtitleRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" }, "-=0.8")
      .fromTo(ctasRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" }, "-=0.75");
    return () => { tl.kill(); };
  }, []);

  return (
    <>
      {/* ────────────────── HERO ────────────────── */}
      <main
        className="hero-main relative flex min-h-screen"
        style={{ paddingLeft: 44, paddingTop: 80, paddingBottom: 70 }}
      >
        {/* Golden halo backdrop */}
        <div
          className="animate-halo pointer-events-none absolute inset-0"
          aria-hidden
          style={{
            background:
              "radial-gradient(ellipse 60% 70% at 30% 55%, rgba(255,180,0,0.07) 0%, rgba(212,168,67,0.03) 45%, transparent 70%)",
          }}
        />

        {/* Left content column */}
        <div
          className="hero-left-col relative flex flex-col justify-center"
          style={isMobile ? { maxWidth: "100%", width: "100%", padding: "0 24px" } : { maxWidth: "calc(100% - 310px)" }}
        >
          {/* Pulsing location badge */}
          <div className="mb-8 flex items-center gap-3">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping-slow absolute inline-flex h-full w-full rounded-full bg-bmk-accent" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-bmk-accent" />
            </span>
            <span className="font-inter text-xs font-light uppercase tracking-[0.22em] text-bmk-text/50">
              Studio photo &amp; vidéo — Bruxelles
            </span>
          </div>

          {/* h1 */}
          <div ref={h1Ref}>
            <h1
              className="hero-h1 font-archivo leading-[1.1] text-bmk-text"
              style={isMobile ? {
                fontSize: 28,
                letterSpacing: 0,
                display: "inline-block",
              } : {
                fontSize: 45,
                letterSpacing: "-2px",
                display: "inline-block",
                transform: "scaleY(1.15)",
              }}
            >
              Ce que l&apos;œil humain ne perçoit pas,
            </h1>
          </div>

          {/* Accroche Mea Culpa */}
          <div ref={acrocheRef} className="hero-accroche">
            <p
              className="mt-2 text-bmk-accent"
              style={{ fontSize: isMobile ? 28 : 55 }}
            >
              <span
                className="font-archivo"
                style={isMobile ? { display: "inline-block" } : { display: "inline-block", transform: "scaleY(1.15)" }}
              >
                Bmk
              </span>
              <span className="font-meaculpa italic">
                {" "}le{" "}
                <span
                  style={{
                    textShadow:
                      "0 0 30px rgba(255,180,0,0.4), 0 0 60px rgba(255,180,0,0.15)",
                  }}
                >
                  révèle
                </span>
                .
              </span>
            </p>
          </div>

          {/* Sous-titre */}
          <div ref={subtitleRef}>
            <p
              className="mt-7 font-inter font-light leading-relaxed text-bmk-text/55"
              style={{ maxWidth: 340, fontSize: 15 }}
            >
              Photographie de produit et vidéo commerciale pour les marques qui refusent le banal.
            </p>
          </div>

          {/* CTAs */}
          <div ref={ctasRef} className="hero-ctas mt-8 flex flex-row items-center gap-4">
            <a
              href="#portfolio"
              className="inline-flex h-11 items-center justify-center bg-bmk-accent px-7 font-inter text-sm font-light tracking-widest text-bmk-bg transition-all duration-300 hover:bg-bmk-accent-2 hover:shadow-[0_0_28px_rgba(255,180,0,0.35)]"
              style={{ borderRadius: 8 }}
            >
              Voir le portfolio
            </a>
            <a
              href="/contact"
              className="inline-flex h-11 items-center justify-center px-7 font-inter text-sm font-light tracking-widest text-bmk-text/80 transition-all duration-300 hover:text-bmk-accent"
              style={{
                borderRadius: 8,
                border: "1px solid rgba(255,255,255,0.12)",
              }}
            >
              Demander un devis
            </a>
          </div>
        </div>

        {/* Right panel */}
        {!isMobile && <div
          className="hero-right-panel absolute bottom-0 right-0 top-0"
          aria-hidden
          style={{
            width: 290,
            backgroundColor: "#0b1018",
            borderLeft: "1px solid rgba(255,180,0,0.13)",
          }}
        >
          <div
            className="absolute inset-y-0 right-full w-36"
            style={{
              background: "linear-gradient(to right, transparent 0%, #0b1018 100%)",
            }}
          />
        </div>}

        {/* Bottom fade */}
        <div
          className="pointer-events-none absolute bottom-0 left-0 right-0 h-24"
          aria-hidden
          style={{
            background:
              "linear-gradient(to bottom, transparent 0%, rgba(9,13,19,0.5) 100%)",
          }}
        />
      </main>

      {/* ────────────────── SECTIONS ────────────────── */}
      <WorkSection />
      <InterludeSection />
      <ContactSection />
      <Footer />
    </>
  );
}
