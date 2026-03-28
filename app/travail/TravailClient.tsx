"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Footer from "../components/Footer";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const featured = {
  slug: "le-restaurant",
  name: "Le Restaurant",
  tags: ["Restauration", "Client", "Photo"],
  pitch:
    "Une année à documenter l'âme d'un lieu — la lumière du service, le détail d'une table, l'instant avant que tout commence.",
  meta: "20 visuels",
  image: "/images/restaurant/Restaurant (14).JPG",
};

const projects = [
  {
    slug: "qamees-place",
    name: "Qamees Place",
    tags: ["Mode", "Photo"],
    pitch:
      "Des vêtements traditionnels sublimés par la lumière — qamis, djellabas et gandoras photographiés avec l'élégance qu'ils méritent.",
    meta: "18 visuels",
    year: "2025",
    image: "/images/qamees-place/Qameesplace (5).JPG",
  },
  {
    slug: "nutfully",
    name: "Nutfully",
    tags: ["Fruits secs", "Photo"],
    pitch:
      "Des matières brutes et généreuses — noix, amandes, pistaches photographiées dans leur vérité la plus naturelle.",
    meta: "8 visuels",
    year: "2023–2025",
    image: "/images/nutfully/Nutfully-6.jpg",
  },
  {
    slug: "frange",
    name: "Frange",
    tags: ["Coiffure", "Photo"],
    pitch:
      "Une éternelle histoire de coiffure — capturer le geste, la matière, l'énergie d'un salon qui vit.",
    meta: "12 visuels",
    year: null,
    image: "/images/frange/Frange (1).JPG",
  },
  {
    slug: "restaurant-2",
    name: "Restaurant 2",
    tags: ["Restauration", "Photo"],
    pitch:
      "Une cuisine fusion entre tradition et modernité — sublimer l'assiette, l'ambiance et le détail pour raconter une expérience gastronomique unique.",
    meta: "17 visuels",
    year: "2024",
    image: "/images/restaurant 2/torofusion (9).JPG",
  },
  {
    slug: "travaux-personnels",
    name: "Travaux personnels",
    tags: ["Photo", "Vidéo"],
    pitch:
      "Maîtrise de la lumière, profondeur de champ et mise en scène — des images qui révèlent la technique et la sensibilité du regard BMK.",
    meta: "17 visuels",
    year: "2023–2025",
    image: "/images/travaux personnels/produit (8).png",
  },
];

function TagList({ tags }: { tags: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <span
          key={tag}
          className="font-inter font-light uppercase tracking-widest"
          style={{
            fontSize: 9,
            color: "rgba(221,226,236,0.4)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 4,
            padding: "2px 8px",
          }}
        >
          {tag}
        </span>
      ))}
    </div>
  );
}

export default function TravailClient() {
  const [featuredHover, setFeaturedHover] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [imgErrors, setImgErrors] = useState<Set<string>>(new Set());
  const onImgError = (key: string) =>
    setImgErrors((prev) => new Set(prev).add(key));

  const headerRef = useRef<HTMLDivElement>(null);
  const featuredRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", delay: 0.1 }
        );
      }
      if (featuredRef.current) {
        gsap.fromTo(
          featuredRef.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0, duration: 0.9, ease: "power3.out",
            scrollTrigger: { trigger: featuredRef.current, start: "top 85%", toggleActions: "play none none none" },
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
    <>
      <main style={{ paddingTop: 80 }}>
        {/* ── PAGE HEADER ── */}
        <section
          ref={headerRef}
          className="mx-auto w-full"
          style={{ maxWidth: 1100, paddingLeft: 44, paddingRight: 44, paddingTop: 56, paddingBottom: 56 }}
        >
          {/* Eyebrow */}
          <div className="mb-8 flex items-center gap-3">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping-slow absolute inline-flex h-full w-full rounded-full bg-bmk-accent" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-bmk-accent" />
            </span>
            <span
              className="font-inter font-light uppercase tracking-[0.22em] text-bmk-text/50"
              style={{ fontSize: 9 }}
            >
              Portfolio Bmk Studio
            </span>
          </div>

          {/* Titre */}
          <h1
            style={{
              fontSize: 52,
              letterSpacing: "-2px",
              lineHeight: 1.1,
              display: "inline-block",
              transform: "scaleY(1.15)",
            }}
          >
            <span className="font-archivo text-bmk-text">Le travail </span>
            <span
              className="font-meaculpa italic"
              style={{
                color: "#d4a843",
                textShadow:
                  "0 0 28px rgba(255,180,0,0.35), 0 0 56px rgba(255,180,0,0.12)",
              }}
            >
              parle.
            </span>
          </h1>

          {/* Sous-titre */}
          <p
            className="mt-8 font-inter font-light leading-relaxed text-bmk-text/55"
            style={{ maxWidth: 420, fontSize: 15 }}
          >
            Une sélection de projets photo et vidéo pour artisans, marques et créateurs.
          </p>
        </section>

        {/* ── FEATURED PROJECT ── */}
        <section
          ref={featuredRef}
          className="mx-auto w-full"
          style={{ maxWidth: 1100, paddingLeft: 44, paddingRight: 44, paddingBottom: 64 }}
        >
          <a
            href={`/travail/${featured.slug}`}
            className="group block"
            style={{
              position: "relative",
              border: `1px solid ${featuredHover ? "rgba(255,180,0,0.18)" : "rgba(255,255,255,0.05)"}`,
              borderRadius: 8,
              backgroundColor: "#0b1018",
              overflow: "hidden",
              transition: "border-color 300ms",
            }}
            onMouseEnter={() => setFeaturedHover(true)}
            onMouseLeave={() => setFeaturedHover(false)}
          >
            {/* Image zone */}
            <div
              className="relative w-full"
              style={{ height: 340, backgroundColor: "#0b1018" }}
            >
              {featured.image && !imgErrors.has("featured") && (
                <Image
                  src={featured.image}
                  alt={`${featured.name} — photographie par Bmk Studio`}
                  fill
                  style={{ objectFit: "cover", objectPosition: "center 40%" }}
                  onError={() => onImgError("featured")}
                />
              )}
              {/* Hover dark overlay */}
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background: "rgba(9,13,19,0.75)",
                  opacity: featuredHover ? 1 : 0,
                  transition: "opacity 0.3s ease",
                }}
              />
              {/* Nom centré au hover */}
              <div
                className="pointer-events-none absolute inset-0 flex items-center justify-center"
                style={{
                  opacity: featuredHover ? 1 : 0,
                  transition: "opacity 0.3s ease",
                }}
              >
                <span
                  className="font-archivo"
                  style={{
                    fontSize: 36,
                    color: "#ffb400",
                    display: "inline-block",
                    transform: "scaleY(1.15)",
                    textShadow:
                      "0 0 24px rgba(255,180,0,0.6), 0 0 48px rgba(255,180,0,0.3)",
                  }}
                >
                  {featured.name}
                </span>
              </div>
              {/* Bottom gradient */}
              <div
                className="absolute inset-x-0 bottom-0 pointer-events-none"
                style={{
                  height: 120,
                  background: "linear-gradient(to top, rgba(11,16,24,0.95) 0%, transparent 100%)",
                }}
              />
            </div>

            {/* Info band */}
            <div
              className="flex flex-col gap-4 px-8 py-6 md:flex-row md:items-end md:justify-between"
            >
              {/* Left */}
              <div className="flex flex-col gap-3" style={{ maxWidth: 600 }}>
                <TagList tags={featured.tags} />
                <h2
                  className="font-archivo leading-tight text-bmk-text"
                  style={{
                    fontSize: 20,
                    display: "inline-block",
                    transform: "scaleY(1.15)",
                  }}
                >
                  {featured.name}
                </h2>
                <p
                  className="font-inter font-light leading-relaxed text-bmk-text/50"
                  style={{ fontSize: 14 }}
                >
                  {featured.pitch}
                </p>
              </div>

              {/* Right */}
              <div className="flex flex-shrink-0 flex-col items-end gap-3">
                <span
                  className="font-inter font-light text-bmk-text/30"
                  style={{ fontSize: 11 }}
                >
                  {featured.meta}
                </span>
                <span
                  className="font-inter font-light uppercase tracking-widest text-bmk-accent transition-all duration-300 group-hover:text-bmk-accent-2"
                  style={{ fontSize: 11 }}
                >
                  Voir le projet →
                </span>
              </div>
            </div>
          </a>
        </section>

        {/* ── GRID 2 COLONNES ── */}
        <section
          ref={gridRef}
          className="mx-auto w-full"
          style={{
            maxWidth: 1100,
            paddingLeft: 44,
            paddingRight: 44,
            paddingBottom: 80,
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 16,
          }}
        >
          {projects.map((p) => (
            <a
              key={p.slug}
              href={`/travail/${p.slug}`}
              className="group flex flex-col"
              style={{
                position: "relative",
                border: `1px solid ${hoveredCard === p.slug ? "rgba(255,180,0,0.18)" : "rgba(255,255,255,0.05)"}`,
                borderRadius: 8,
                backgroundColor: "#0b1018",
                overflow: "hidden",
                transition: "border-color 300ms",
              }}
              onMouseEnter={() => setHoveredCard(p.slug)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Image zone */}
              <div
                className="relative w-full"
                style={{ height: 200, backgroundColor: "#0b1018" }}
              >
                {p.image && !imgErrors.has(p.slug) && (
                  <Image
                    src={p.image}
                    alt={`${p.name} — photographie par Bmk Studio`}
                    fill
                    style={{ objectFit: "cover" }}
                    onError={() => onImgError(p.slug)}
                  />
                )}
                {/* Hover dark overlay */}
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background: "rgba(9,13,19,0.75)",
                    opacity: hoveredCard === p.slug ? 1 : 0,
                    transition: "opacity 0.3s ease",
                  }}
                />
                {/* Nom centré au hover — toutes les cards */}
                <div
                  className="pointer-events-none absolute inset-0 flex items-center justify-center"
                  style={{
                    opacity: hoveredCard === p.slug ? 1 : 0,
                    transition: "opacity 0.3s ease",
                  }}
                >
                  <span
                    className="font-archivo"
                    style={{
                      fontSize: 28,
                      color: "#ffb400",
                      display: "inline-block",
                      transform: "scaleY(1.15)",
                      textShadow:
                        "0 0 24px rgba(255,180,0,0.6), 0 0 48px rgba(255,180,0,0.3)",
                    }}
                  >
                    {p.name}
                  </span>
                </div>
                {/* Bottom gradient */}
                <div
                  className="absolute inset-x-0 bottom-0 pointer-events-none"
                  style={{
                    height: 80,
                    background: "linear-gradient(to top, rgba(11,16,24,0.95) 0%, transparent 100%)",
                  }}
                />
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col gap-3 px-6 py-5">
                <TagList tags={p.tags} />
                <h3
                  className="font-archivo leading-tight text-bmk-text"
                  style={{
                    fontSize: 18,
                    display: "inline-block",
                    transform: "scaleY(1.15)",
                  }}
                >
                  {p.name}
                </h3>
                <p
                  className="flex-1 font-inter font-light leading-relaxed text-bmk-text/50"
                  style={{ fontSize: 13 }}
                >
                  {p.pitch}
                </p>
                <div className="flex items-center justify-between pt-2">
                  {p.year && (
                    <span
                      className="font-inter font-light text-bmk-text/25"
                      style={{ fontSize: 10 }}
                    >
                      {p.year}
                    </span>
                  )}
                  <span
                    className="font-inter font-light text-bmk-text/30"
                    style={{ fontSize: 10, marginLeft: "auto" }}
                  >
                    {p.meta}
                  </span>
                </div>
                <span
                  className="font-inter font-light uppercase tracking-widest text-bmk-text/30 transition-colors duration-300 group-hover:text-bmk-accent"
                  style={{ fontSize: 9 }}
                >
                  Voir le projet →
                </span>
              </div>
            </a>
          ))}
        </section>
      </main>

      <Footer />
    </>
  );
}
