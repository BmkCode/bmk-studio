"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function InterludeSection() {
  const quoteRef = useRef<HTMLQuoteElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const el = quoteRef.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, scale: 0.97 },
        {
          opacity: 1, scale: 1, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none none" },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <section className="interlude-section relative overflow-hidden text-center" style={{ paddingTop: 56, paddingBottom: 56 }}>
      {/* Golden halo */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 55% 65% at 50% 50%, rgba(255,180,0,0.06) 0%, rgba(212,168,67,0.02) 50%, transparent 72%)",
        }}
      />

      {/* Conteneur centré 1100px */}
      <div
        className="interlude-inner relative mx-auto w-full"
        style={{ maxWidth: 1100, paddingLeft: 44, paddingRight: 44 }}
      >
        <blockquote ref={quoteRef} className="mx-auto" style={{ maxWidth: "none" }}>
          {/* Citation en Mea Culpa — "photographie" en accroche dorée */}
          <p
            className="font-meaculpa italic leading-snug text-bmk-text/80 interlude-quote"
            style={{ fontSize: 38, whiteSpace: "nowrap" }}
          >
            «&nbsp;Ce que l&apos;œil humain ne voit pas, la{" "}
            <span
              style={{
                color: "#ffb400",
                textShadow:
                  "0 0 24px rgba(255,180,0,0.45), 0 0 48px rgba(255,180,0,0.18)",
              }}
            >
              photographie
            </span>{" "}
            vous le montrera.&nbsp;»
          </p>

          <footer className="mt-6">
            <span
              className="font-inter font-light uppercase tracking-widest"
              style={{ fontSize: 9, color: "rgba(221,226,236,0.16)" }}
            >
              — BMK Studio, Bruxelles
            </span>
          </footer>
        </blockquote>
      </div>
    </section>
  );
}
