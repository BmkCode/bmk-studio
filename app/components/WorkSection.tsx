"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { translations, type Translations } from "../../lib/translations";

const projects = [
  {
    slug: "le-restaurant",
    name: "Le Restaurant",
    category: "Restauration",
    categoryEn: "Hospitality",
    image: "/images/restaurant/Restaurant (14).JPG",
    style: { gridColumn: "1", gridRow: "1 / span 2" },
  },
  {
    slug: "qamees-place",
    name: "Qamees Place",
    category: "Mode",
    categoryEn: "Fashion",
    image: "/images/qamees-place/Qameesplace (5).JPG",
    style: { gridColumn: "2", gridRow: "1" },
  },
  {
    slug: "nutfully",
    name: "Nutfully",
    category: "Fruits secs",
    categoryEn: "Dried fruits",
    image: "/images/nutfully/Nutfully-5.jpg",
    style: { gridColumn: "2", gridRow: "2" },
  },
  {
    slug: "frange",
    name: "Frange",
    category: "Coiffure",
    categoryEn: "Hair salon",
    image: "/images/frange/Frange (1).JPG",
    style: { gridColumn: "1 / span 2", gridRow: "3" },
  },
];

function ProjectCard({
  name,
  category,
  image,
  slug,
  style,
  basePath,
}: {
  name: string;
  category: string;
  image: string | null;
  slug: string;
  style: React.CSSProperties;
  basePath: string;
}) {
  const [hovered, setHovered] = useState(false);

  const transition = "transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s ease, border-color 0.3s ease";

  return (
    <Link
      href={`${basePath}/travail/${slug}`}
      className="relative"
      style={{
        ...style,
        display: "block",
        borderRadius: 12,
        cursor: "pointer",
        zIndex: hovered ? 10 : 1,
        transform: hovered
          ? "perspective(1000px) translateZ(16px) scale(1.02) translateY(-4px)"
          : "perspective(1000px) translateZ(0) scale(1)",
        boxShadow: hovered
          ? "0 24px 48px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,180,0,0.2)"
          : "none",
        transition,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Contenu image — overflow-hidden isolé ici */}
      <div
        className="relative overflow-hidden"
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: 12,
          backgroundColor: "#0b1018",
          border: `1px solid ${hovered ? "rgba(255,180,0,0.25)" : "rgba(255,255,255,0.04)"}`,
          transition: "border-color 0.3s ease",
        }}
      >
        {/* Photo de fond */}
        {image && (
          <Image
            src={image}
            alt={`${name} — photographie par Bmk Studio`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1100px) 60vw, 668px"
            style={{ objectFit: "cover" }}
          />
        )}
        {/* Subtle inner texture */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 30%, rgba(255,180,0,0.025) 0%, transparent 70%)",
          }}
        />
        {/* Bottom overlay + labels */}
        <div
          className="absolute inset-x-0 bottom-0 flex flex-col gap-1 px-4 pb-4 pt-14"
          style={{
            background:
              "linear-gradient(to top, rgba(9,13,19,0.95) 0%, transparent 100%)",
          }}
        >
          <span
            className="font-inter font-light uppercase tracking-widest"
            style={{ fontSize: 9, color: "rgba(221,226,236,0.35)" }}
          >
            {category}
          </span>
          <span
            className="font-archivo leading-tight text-bmk-text"
            style={{
              fontSize: 14,
              display: "inline-block",
              transform: "scaleY(1.15)",
            }}
          >
            {name}
          </span>
        </div>
      </div>

      {/* Halo contour — border lumineuse derrière la card */}
      <div
        className="pointer-events-none absolute"
        style={{
          inset: -2,
          zIndex: -1,
          borderRadius: 14,
          border: "1px solid rgba(255,210,0,0.5)",
          boxShadow:
            "0 0 6px rgba(255,210,0,0.4), 0 0 16px rgba(255,200,0,0.25), 0 0 32px rgba(255,180,0,0.15), 0 0 56px rgba(255,180,0,0.07)",
          background: "transparent",
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}
      />
    </Link>
  );
}

export default function WorkSection({
  t = translations.fr,
  basePath = "",
}: {
  t?: Translations;
  basePath?: string;
}) {
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0, duration: 0.9, ease: "power3.out",
            scrollTrigger: { trigger: headerRef.current, start: "top 85%", toggleActions: "play none none none" },
          }
        );
      }
      if (gridRef.current) {
        const cards = gsap.utils.toArray<HTMLElement>(gridRef.current.children);
        gsap.fromTo(
          cards,
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0, duration: 0.85, ease: "power3.out", stagger: 0.12,
            scrollTrigger: { trigger: gridRef.current, start: "top 85%", toggleActions: "play none none none" },
          }
        );
      }
    });
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="portfolio"
      style={{ paddingTop: 5, paddingBottom: 56 }}
    >
      {/* Conteneur centré 1100px */}
      <div
        className="work-section-inner mx-auto w-full"
        style={{ maxWidth: 1100, paddingLeft: 44, paddingRight: 44 }}
      >
        {/* Section header */}
        <div className="mb-8" ref={headerRef}>
          <div className="mb-6 flex items-center gap-3">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping-slow absolute inline-flex h-full w-full rounded-full bg-bmk-accent" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-bmk-accent" />
            </span>
            <span
              className="font-archivo uppercase tracking-widest text-bmk-text/40"
              style={{ fontSize: 9 }}
            >
              {t.work.label}
            </span>
          </div>

          <h2
            className="font-archivo leading-[1.1] tracking-tight text-bmk-text"
            style={{
              fontSize: 40,
              display: "inline-block",
              transform: "scaleY(1.15)",
            }}
          >
            {t.work.title}{" "}
            <span
              className="font-meaculpa italic"
              style={{
                color: "#d4a843",
                textShadow:
                  "0 0 28px rgba(255,180,0,0.35), 0 0 56px rgba(255,180,0,0.12)",
                display: "inline-block",
                transform: "scaleY(1)",
              }}
            >
              {t.work.title_em}
            </span>
            {t.work.title_end && (
              <span
                className="font-archivo"
                style={{ color: "#d4a843" }}
              >
                {" "}{t.work.title_end}
              </span>
            )}
          </h2>
        </div>

        {/* Grille golden ratio — 1100px, rows 220/160/220, gap 6px */}
        <div
          ref={gridRef}
          className="work-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1.618fr 1fr",
            gridTemplateRows: "220px 160px 220px",
            gap: 16,
            overflow: "visible",
          }}
        >
          {projects.map((p) => (
            <ProjectCard
              key={p.slug}
              name={p.name}
              category={basePath === "/en" ? p.categoryEn : p.category}
              image={p.image}
              slug={p.slug}
              style={p.style}
              basePath={basePath}
            />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-8 flex justify-center">
          <a
            href={`${basePath}/travail`}
            className="inline-flex h-11 items-center justify-center px-8 font-inter text-sm font-light tracking-widest text-bmk-text/70 transition-all duration-300 hover:text-bmk-accent"
            style={{
              borderRadius: 8,
              border: "1px solid rgba(255,180,0,0.18)",
            }}
          >
            {t.work.see_all}
          </a>
        </div>
      </div>
    </section>
  );
}
