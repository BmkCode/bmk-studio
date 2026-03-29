"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { translations, type Translations } from "../../lib/translations";

export default function ContactSection({
  t = translations.fr,
  basePath = "",
}: {
  t?: Translations;
  basePath?: string;
}) {
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const el = titleRef.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none none" },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <section
      className="relative overflow-hidden text-center"
      style={{ paddingTop: 64, paddingBottom: 72 }}
    >
      {/* Golden halo */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 60% 70% at 50% 50%, rgba(255,180,0,0.09) 0%, rgba(212,168,67,0.04) 45%, transparent 72%)",
        }}
      />

      {/* Conteneur centré 1100px */}
      <div
        className="contact-section-inner relative mx-auto w-full"
        style={{ maxWidth: 1100, paddingLeft: 44, paddingRight: 44 }}
      >
        <div ref={titleRef}>
          <p
            className="mb-6 font-archivo uppercase tracking-widest"
            style={{ fontSize: 9, color: "rgba(255,180,0,0.35)" }}
          >
            {t.contact_section.eyebrow}
          </p>

          <h2 className="leading-[1.05] tracking-tight">
            <span
              className="block font-archivo text-bmk-text"
              style={{
                fontSize: 50,
                display: "inline-block",
                transform: "scaleY(1.15)",
              }}
            >
              {t.contact_section.title}
            </span>
             {" "} {" "}
            <span
              className="font-meaculpa italic"
              style={{
                fontSize: 62,
                color: "#ffb400",
                textShadow:
                  "0 0 40px rgba(255,180,0,0.5), 0 0 80px rgba(255,180,0,0.2), 0 0 120px rgba(255,180,0,0.08)",
              }}
            >
              {t.contact_section.title_em}
            </span>
          </h2>

          <p
            className="mx-auto mt-6 font-inter font-light text-bmk-text/45"
            style={{ fontSize: 13, letterSpacing: "0.06em", maxWidth: 440 }}
          >
            {t.contact_section.subtitle}
          </p>

          <div className="mt-10">
            <a
              href={`${basePath}/contact`}
              className="inline-flex h-12 items-center justify-center px-10 font-inter font-light tracking-widest transition-all duration-300 hover:shadow-[0_0_32px_rgba(255,180,0,0.4)]"
              style={{
                borderRadius: 8,
                fontSize: 13,
                backgroundColor: "#ffb400",
                color: "#090d13",
              }}
            >
              {t.contact_section.cta}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
