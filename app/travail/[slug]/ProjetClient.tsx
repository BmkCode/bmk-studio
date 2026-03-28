"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Footer from "../../components/Footer";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const projects: Record<string, {
  nom: string;
  categorie: string;
  annee: string;
  visuels: string;
  pitch: string;
  description: string;
  images: string[];
  precedent: string | null;
  suivant: string | null;
}> = {
  "le-restaurant": {
    nom: "Le Restaurant",
    categorie: "Photo produit",
    annee: "2022",
    visuels: "16 visuels",
    pitch: "Une année à documenter l'âme d'un lieu — la lumière du service, le détail d'une table, l'instant avant que tout commence.",
    description: "Une collaboration d'un an avec un restaurant bruxellois. L'objectif : créer une identité visuelle cohérente pour les réseaux sociaux et le site web. Chaque image pensée pour raconter l'ambiance, la qualité, le soin du détail.",
    images: [
      "/images/restaurant/Restaurant (14).JPG",
      "/images/restaurant/Restaurant (1).JPG",
      "/images/restaurant/Restaurant (2).JPG",
      "/images/restaurant/Restaurant (3).JPG",
      "/images/restaurant/Restaurant (4).JPG",
      "/images/restaurant/Restaurant (5).JPG",
      "/images/restaurant/Restaurant (6).JPG",
      "/images/restaurant/Restaurant (16).JPG",
      "/images/restaurant/Restaurant (8).JPG",
      "/images/restaurant/Restaurant (9).JPG",
      "/images/restaurant/Restaurant (10).JPG",
      "/images/restaurant/Restaurant (11).JPG",
      "/images/restaurant/Restaurant (12).JPG",
      "/images/restaurant/Restaurant (13).JPG",
      "/images/restaurant/Restaurant (7).JPG",
      "/images/restaurant/Restaurant (15).JPG",
    ],
    precedent: null,
    suivant: "qamees-place",
  },
  "qamees-place": {
    nom: "Qamees Place",
    categorie: "Photo produit",
    annee: "2025",
    visuels: "18 visuels",
    pitch: "Des vêtements traditionnels sublimés par la lumière — qamis, djellabas et gandoras photographiés avec l'élégance qu'ils méritent.",
    description: "Qamees Place est une marque néerlandaise spécialisée dans les vêtements traditionnels pour hommes, femmes et enfants — qamis, djellabas, gandoras. La mission : valoriser ces pièces avec une photographie soignée qui respecte leur identité culturelle tout en séduisant une clientèle moderne et exigeante.",
    images: [
      "/images/qamees-place/Qameesplace (5).JPG",
      "/images/qamees-place/Qameesplace (1).JPG",
      "/images/qamees-place/Qameesplace (2).JPG",
      "/images/qamees-place/Qameesplace (3).JPG",
      "/images/qamees-place/Qameesplace (4).JPG",
      "/images/qamees-place/Qameesplace (6).JPG",
      "/images/qamees-place/Qameesplace (7).JPG",
      "/images/qamees-place/Qameesplace (8).JPG",
      "/images/qamees-place/Qameesplace (9).JPG",
      "/images/qamees-place/Qameesplace (10).JPG",
      "/images/qamees-place/Qameesplace (11).JPG",
      "/images/qamees-place/Qameesplace (12).JPG",
      "/images/qamees-place/Qameesplace (13).JPG",
      "/images/qamees-place/Qameesplace (14).JPG",
      "/images/qamees-place/Qameesplace (15).JPG",
      "/images/qamees-place/Qameesplace (16).JPG",
      "/images/qamees-place/Qameesplace (17).JPG",
      "/images/qamees-place/Qameesplace (18).JPG",
    ],
    precedent: "le-restaurant",
    suivant: "nutfully",
  },
  "nutfully": {
    nom: "Nutfully",
    categorie: "Photo produit",
    annee: "2023-2025",
    visuels: "8 visuels",
    pitch: "Des matières brutes et généreuses — noix, amandes, pistaches photographiées dans leur vérité la plus naturelle.",
    description: "Nutfully propose des fruits secs directement à la source. Packshots et mises en scène naturelles pour valoriser la qualité et l'authenticité des produits.",
    images: [
      "/images/nutfully/Nutfully-0.jpg",
      "/images/nutfully/Nutfully-1.JPG",
      "/images/nutfully/Nutfully-2.JPG",
      "/images/nutfully/Nutfully-3.JPG",
      "/images/nutfully/Nutfully-4.JPG",
      "/images/nutfully/Nutfully-5.jpg",
      "/images/nutfully/Nutfully-6.jpg",
      "/images/nutfully/Nutfully-7.JPG",
      "/images/nutfully/Nutfully-8.JPG",
    ],
    precedent: "qamees-place",
    suivant: "frange",
  },
  "frange": {
    nom: "Frange",
    categorie: "Photo",
    annee: "2024",
    visuels: "15 visuels",
    pitch: "Une éternelle histoire de coiffure — capturer le geste, la matière, l'énergie d'un salon qui vit.",
    description: "Frange est un salon de coiffure bruxellois moderne. Reportage photo complet : ambiance salon, gestes des coiffeurs, produits, portraits clients.",
    images: [
      "/images/frange/Frange (1).JPG",
      "/images/frange/Frange (12).JPG",
      "/images/frange/Frange (13).JPG",
      "/images/frange/Frange (14).JPG",
      "/images/frange/Frange (15).JPG",
      "/images/frange/Frange (16).JPG",
      "/images/frange/Frange (17).JPG",
      "/images/frange/Frange (18).JPG",
      "/images/frange/Frange (19).JPG",
      "/images/frange/Frange (20).JPG",
      "/images/frange/Frange (21).JPG",
      "/images/frange/Frange (22).JPG",
      "/images/frange/Frange (23).JPG",
      "/images/frange/Frange (24).JPG",
      "/images/frange/Frange (25).JPG",
    ],
    precedent: "nutfully",
    suivant: "restaurant-2",
  },
  "restaurant-2": {
    nom: "Restaurant 2",
    categorie: "Photo",
    annee: "2024",
    visuels: "17 visuels",
    pitch: "Une cuisine fusion entre tradition et modernité — sublimer l'assiette, l'ambiance et le détail pour raconter une expérience gastronomique unique.",
    description: "Un restaurant fusion qui marie les saveurs et les cultures. La mission : capturer l'identité visuelle du lieu — la lumière tamisée, les assiettes travaillées, l'énergie du service. Des images pensées pour donner envie avant même d'avoir goûté.",
    images: [
      "/images/restaurant 2/torofusion (9).JPG",
      "/images/restaurant 2/torofusion (1).jpg",
      "/images/restaurant 2/torofusion (2).jpg",
      "/images/restaurant 2/torofusion (3).jpg",
      "/images/restaurant 2/torofusion (4).jpg",
      "/images/restaurant 2/torofusion (5).jpg",
      "/images/restaurant 2/torofusion (6).jpg",
      "/images/restaurant 2/torofusion (7).jpg",
      "/images/restaurant 2/torofusion (8).jpg",
      "/images/restaurant 2/torofusion (9).JPG",
      "/images/restaurant 2/torofusion (10).jpg",
      "/images/restaurant 2/torofusion (11).JPG",
      "/images/restaurant 2/torofusion (12).JPG",
      "/images/restaurant 2/torofusion (13).JPG",
      "/images/restaurant 2/torofusion (14).jpg",
      "/images/restaurant 2/torofusion (15).jpg",
      "/images/restaurant 2/torofusion (16).jpg",
      "/images/restaurant 2/torofusion (17).jpg",
    ],
    precedent: "frange",
    suivant: "travaux-personnels",
  },
  "travaux-personnels": {
    nom: "Travaux personnels",
    categorie: "Photo & Vidéo",
    annee: "2023-2025",
    visuels: "17 visuels",
    pitch: "Maîtrise de la lumière, profondeur de champ et mise en scène — des images qui révèlent la technique et la sensibilité du regard BMK.",
    description: "Une sélection de travaux personnels explorant la photographie produit de luxe — horlogerie, parfumerie, accessoires. Chaque image est une étude de lumière, de matière et de composition. Ces projets sont le laboratoire créatif du studio — là où la technique se libère de la commande.",
    images: [
      "/images/travaux personnels/produit (8).png",
      "/images/travaux personnels/produit (1).JPG",
      "/images/travaux personnels/produit (1).png",
      "/images/travaux personnels/produit (2).jpg",
      "/images/travaux personnels/produit (2).png",
      "/images/travaux personnels/produit (3).jpg",
      "/images/travaux personnels/produit (3).png",
      "/images/travaux personnels/produit (4).jpg",
      "/images/travaux personnels/produit (4).png",
      "/images/travaux personnels/produit (5).jpg",
      "/images/travaux personnels/produit (5).png",
      "/images/travaux personnels/produit (6).jpg",
      "/images/travaux personnels/produit (6).png",
      "/images/travaux personnels/produit (7).png",
      "/images/travaux personnels/produit (8).png",
      "/images/travaux personnels/produit (9).png",
      "/images/travaux personnels/produit (10).png",
      "/images/travaux personnels/produit (11).png",
    ],
    precedent: "restaurant-2",
    suivant: null,
  },
};

const ctrlStyle: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: 44,
  height: 44,
  background: "transparent",
  border: "1px solid rgba(255,180,0,0.3)",
  borderRadius: 6,
  color: "#d4a843",
  fontSize: 18,
  cursor: "pointer",
  transition: "border-color 200ms",
  flexShrink: 0,
};

function ImageSlot({
  src,
  index,
  style,
  onOpen,
  hoverLogoSrc,
  hoverLabelText,
  hoverLabelStyle,
  hoverLabelClass,
  altText,
  logoStyle,
  overlayBg,
}: {
  src: string | undefined;
  index: number;
  style?: React.CSSProperties;
  onOpen: (index: number) => void;
  hoverLogoSrc?: string;
  hoverLabelText: string;
  hoverLabelStyle: React.CSSProperties;
  hoverLabelClass?: string;
  altText: string;
  logoStyle?: React.CSSProperties;
  overlayBg?: string;
}) {
  const [errored, setErrored] = useState(false);
  const [hovered, setHovered] = useState(false);

  if (!src || errored) {
    return (
      <div
        style={{
          ...style,
          backgroundColor: "#0b1018",
          borderRadius: 4,
          border: "1px solid rgba(255,255,255,0.04)",
        }}
      />
    );
  }

  return (
    <div
      className="relative overflow-hidden"
      style={{
        ...style,
        borderRadius: 4,
        border: `1px solid ${hovered ? "rgba(255,180,0,0.15)" : "rgba(255,255,255,0.04)"}`,
        cursor: "pointer",
        transition: "border-color 300ms",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onOpen(index)}
    >
      <Image
        src={src}
        alt={altText}
        fill
        style={{ objectFit: "cover" }}
        onError={() => setErrored(true)}
      />
      {/* Hover overlay + logo ou nom */}
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
        style={{
          background: overlayBg ?? "rgba(9,13,19,0.80)",
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}
      >
        {hoverLogoSrc ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={hoverLogoSrc}
            alt=""
            style={logoStyle ?? { height: "85%", width: "auto", objectFit: "contain", maxWidth: "90%", maxHeight: "90%" }}
          />
        ) : (
          <span className={hoverLabelClass ?? "font-inter"} style={hoverLabelStyle}>
            {hoverLabelText}
          </span>
        )}
      </div>
    </div>
  );
}

export default function ProjetClient() {
  const params = useParams();
  const slug = typeof params.slug === "string" ? params.slug : "";
  const projet = projects[slug];

  const heroRef = useRef<HTMLDivElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const galleryRow1Ref = useRef<HTMLDivElement>(null);
  const galleryRow2Ref = useRef<HTMLDivElement>(null);
  const galleryRow3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      if (heroRef.current) {
        gsap.fromTo(
          heroRef.current,
          { scale: 1.04, opacity: 0 },
          { scale: 1, opacity: 1, duration: 1.1, ease: "power3.out", delay: 0.1 }
        );
      }
      [
        { el: metaRef.current, y: 24 },
        { el: bodyRef.current, y: 30 },
      ].forEach(({ el, y }) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { opacity: 0, y },
          {
            opacity: 1, y: 0, duration: 0.9, ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none none" },
          }
        );
      });
      [galleryRow1Ref, galleryRow2Ref, galleryRow3Ref].forEach((rowRef, i) => {
        if (!rowRef.current) return;
        gsap.fromTo(
          rowRef.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0, duration: 0.85, ease: "power3.out",
            scrollTrigger: { trigger: rowRef.current, start: "top 88%", toggleActions: "play none none none" },
            delay: i * 0.08,
          }
        );
      });
    });
    return () => ctx.revert();
  }, []);

  // Lightbox state
  const [lbOpen, setLbOpen] = useState(false);
  const [lbCurrent, setLbCurrent] = useState(0);
  const [lbIncoming, setLbIncoming] = useState<number | null>(null);
  const [lbDir, setLbDir] = useState<1 | -1>(1);
  const [lbTransitioning, setLbTransitioning] = useState(false);

  const imgs = projet?.images ?? [];
  const total = imgs.length;

  const openLightbox = useCallback((i: number) => {
    setLbCurrent(i);
    setLbIncoming(null);
    setLbTransitioning(false);
    setLbOpen(true);
  }, []);

  const closeLightbox = useCallback(() => {
    setLbOpen(false);
    setLbIncoming(null);
    setLbTransitioning(false);
  }, []);

  const navigate = useCallback((dir: 1 | -1) => {
    if (lbIncoming !== null) return;
    const next = (lbCurrent + dir + total) % total;
    setLbDir(dir);
    setLbIncoming(next);
    setLbTransitioning(false);
    setTimeout(() => {
      setLbCurrent(next);
      setLbIncoming(null);
      setLbTransitioning(false);
    }, 380);
  }, [lbCurrent, lbIncoming, total]);

  // Trigger slide transition on next frame after incoming is set
  useEffect(() => {
    if (lbIncoming !== null && !lbTransitioning) {
      const raf = requestAnimationFrame(() => setLbTransitioning(true));
      return () => cancelAnimationFrame(raf);
    }
  }, [lbIncoming, lbTransitioning]);

  // Keyboard navigation
  useEffect(() => {
    if (!lbOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") navigate(-1);
      if (e.key === "ArrowRight") navigate(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lbOpen, closeLightbox, navigate]);

  // Block body scroll
  useEffect(() => {
    document.body.style.overflow = lbOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [lbOpen]);

  if (!projet) {
    return (
      <>
        <main
          className="mx-auto w-full"
          style={{ maxWidth: 1100, paddingLeft: 44, paddingRight: 44, paddingTop: 120, paddingBottom: 80 }}
        >
          <a
            href="/travail"
            className="font-inter font-light uppercase tracking-widest text-bmk-text/30 transition-colors duration-200 hover:text-bmk-accent"
            style={{ fontSize: 9 }}
          >
            ← Retour au portfolio
          </a>
          <p className="mt-12 font-inter font-light text-bmk-text/40" style={{ fontSize: 15 }}>
            Projet introuvable.
          </p>
        </main>
        <Footer />
      </>
    );
  }

  const precedentProjet = projet.precedent ? projects[projet.precedent] : null;
  const suivantProjet = projet.suivant ? projects[projet.suivant] : null;
  // Logo affiché à la place de l'image héro (Nutfully uniquement)
  const hoverLogoSrc =
    slug === "nutfully" ? "/images/nutfully/Nutfully-logo-transparent.png" :
    undefined;

  // Logo affiché en overlay au hover dans la galerie
  const galleryLogoSrc =
    slug === "nutfully" ? "/images/nutfully/Nutfully-logo-transparent.png" :
    slug === "qamees-place" ? "/images/qamees-place/logo.png" :
    undefined;

  const galleryLogoStyle: React.CSSProperties | undefined =
    slug === "qamees-place"
      ? { height: 80, width: "auto", objectFit: "contain" }
      : undefined;

  const galleryOverlayBg =
    slug === "qamees-place" || slug === "le-restaurant" || slug === "restaurant-2" ? "rgba(9,13,19,0.75)" : "rgba(9,13,19,0.80)";

  const hoverLabelText =
    slug === "frange" ? "FRANGE" :
    slug === "le-restaurant" ? "Restaurant" :
    slug === "restaurant-2" ? "Restaurant 2" :
    slug === "travaux-personnels" ? "Luxury" :
    projet.nom;
  const hoverLabelStyle: React.CSSProperties =
    slug === "frange"
      ? { fontSize: 32, fontWeight: 300, color: "#ffffff", letterSpacing: "6px" }
      : slug === "le-restaurant"
      ? { fontSize: 28, fontWeight: 200, color: "#ffffff", letterSpacing: "6px" }
      : slug === "restaurant-2"
      ? { fontSize: 28, fontWeight: 200, color: "#ffffff", letterSpacing: "6px" }
      : slug === "travaux-personnels"
      ? { fontSize: 36, color: "#d4a843", fontStyle: "italic", textShadow: "0 0 30px rgba(212,168,67,0.5)" }
      : { fontSize: 22, color: "#ffb400", display: "inline-block", transform: "scaleY(1.15)", textShadow: "0 0 24px rgba(255,180,0,0.6), 0 0 48px rgba(255,180,0,0.3)" };
  const hoverLabelClass =
    slug === "travaux-personnels" ? "font-meaculpa italic" : "font-inter";

  const galleryAlt = `${projet.nom} — photographie par Bmk Studio`;

  return (
    <>
      <main style={{ paddingTop: 80 }}>
        {/* ── BACK LINK ── */}
        <div
          className="mx-auto w-full"
          style={{ maxWidth: 1100, paddingLeft: 44, paddingRight: 44, paddingTop: 32, paddingBottom: 24 }}
        >
          <a
            href="/travail"
            className="font-inter font-light uppercase tracking-widest text-bmk-text/30 transition-colors duration-200"
            style={{ fontSize: 9 }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#d4a843")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(221,226,236,0.3)")}
          >
            ← Retour au portfolio
          </a>
        </div>

        {/* ── HERO IMAGE ── */}
        <div
          className="mx-auto w-full"
          style={{ maxWidth: 1100, paddingLeft: 44, paddingRight: 44 }}
        >
          <div
            ref={heroRef}
            className="relative w-full overflow-hidden"
            style={{ height: 420, borderRadius: 8, backgroundColor: "#0b1018" }}
          >
            {hoverLogoSrc ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={hoverLogoSrc}
                alt={projet.nom}
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  padding: "40px",
                }}
              />
            ) : imgs[0] ? (
              <Image
                src={imgs[0]}
                alt={`${projet.nom} — projet ${projet.categorie} Bmk Studio Bruxelles`}
                fill
                style={{ objectFit: "cover", objectPosition: slug === "le-restaurant" ? "center 40%" : "center" }}
                priority
              />
            ) : null}
            <div
              className="absolute inset-x-0 bottom-0 pointer-events-none"
              style={{
                height: 180,
                background: "linear-gradient(to top, rgba(9,13,19,0.85) 0%, transparent 100%)",
              }}
            />
          </div>
        </div>

        {/* ── META STRIP ── */}
        <div
          ref={metaRef}
          className="mx-auto w-full"
          style={{
            maxWidth: 1100,
            paddingLeft: 44,
            paddingRight: 44,
            paddingTop: 32,
            paddingBottom: 32,
            borderBottom: "1px solid rgba(255,255,255,0.05)",
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
          }}
        >
          {[
            { label: "Mission", value: projet.categorie },
            { label: "Livrables", value: projet.visuels },
            { label: "Année", value: projet.annee },
          ].map(({ label, value }) => (
            <div key={label} className="flex flex-col gap-1">
              <span
                className="font-inter font-light uppercase tracking-widest text-bmk-text/30"
                style={{ fontSize: 9 }}
              >
                {label}
              </span>
              <span className="font-inter font-light text-bmk-text/70" style={{ fontSize: 14 }}>
                {value}
              </span>
            </div>
          ))}
        </div>

        {/* ── CORPS ── */}
        <div
          ref={bodyRef}
          className="mx-auto w-full"
          style={{
            maxWidth: 1100,
            paddingLeft: 44,
            paddingRight: 44,
            paddingTop: 56,
            paddingBottom: 56,
            display: "grid",
            gridTemplateColumns: "1fr 2fr",
            gap: 64,
            alignItems: "start",
          }}
        >
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping-slow absolute inline-flex h-full w-full rounded-full bg-bmk-accent" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-bmk-accent" />
              </span>
              <span
                className="font-inter font-light uppercase tracking-[0.22em] text-bmk-text/40"
                style={{ fontSize: 9 }}
              >
                Le projet
              </span>
            </div>
            <p className="font-inter font-light leading-snug text-bmk-text/75" style={{ fontSize: 15 }}>
              {projet.pitch.split("—").map((part, i) =>
                i === 0 ? (
                  <span key={i}>{part}—</span>
                ) : (
                  <span key={i} style={{ color: "#d4a843" }}>{part}</span>
                )
              )}
            </p>
          </div>

          <div className="flex flex-col gap-5">
            <p className="font-inter font-light leading-relaxed text-bmk-text/55" style={{ fontSize: 15 }}>
              {projet.description}
            </p>
            <p className="font-inter font-light leading-relaxed text-bmk-text/35" style={{ fontSize: 14 }}>
              {projet.pitch}
            </p>
          </div>
        </div>

        {/* ── GALERIE ── */}
        <div
          className="mx-auto w-full"
          style={{
            maxWidth: 1100,
            paddingLeft: 44,
            paddingRight: 44,
            paddingBottom: 72,
            display: "flex",
            flexDirection: "column",
            gap: 6,
          }}
        >
          {/* Ligne 1 — 2 colonnes 1.618fr 1fr, h240 */}
          <div ref={galleryRow1Ref} style={{ display: "grid", gridTemplateColumns: "1.618fr 1fr", gap: 6, height: 240 }}>
            <ImageSlot src={imgs[1]} index={1} style={{ height: 240 }} onOpen={openLightbox} hoverLogoSrc={galleryLogoSrc} hoverLabelText={hoverLabelText} hoverLabelStyle={hoverLabelStyle} hoverLabelClass={hoverLabelClass} altText={galleryAlt} logoStyle={galleryLogoStyle} overlayBg={galleryOverlayBg} />
            <ImageSlot src={imgs[2]} index={2} style={{ height: 240 }} onOpen={openLightbox} hoverLogoSrc={galleryLogoSrc} hoverLabelText={hoverLabelText} hoverLabelStyle={hoverLabelStyle} hoverLabelClass={hoverLabelClass} altText={galleryAlt} logoStyle={galleryLogoStyle} overlayBg={galleryOverlayBg} />
          </div>

          {/* Ligne 2 — 3 colonnes égales, h160 */}
          <div ref={galleryRow2Ref} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6, height: 160 }}>
            <ImageSlot src={imgs[3]} index={3} style={{ height: 160 }} onOpen={openLightbox} hoverLogoSrc={galleryLogoSrc} hoverLabelText={hoverLabelText} hoverLabelStyle={hoverLabelStyle} hoverLabelClass={hoverLabelClass} altText={galleryAlt} logoStyle={galleryLogoStyle} overlayBg={galleryOverlayBg} />
            <ImageSlot src={imgs[4]} index={4} style={{ height: 160 }} onOpen={openLightbox} hoverLogoSrc={galleryLogoSrc} hoverLabelText={hoverLabelText} hoverLabelStyle={hoverLabelStyle} hoverLabelClass={hoverLabelClass} altText={galleryAlt} logoStyle={galleryLogoStyle} overlayBg={galleryOverlayBg} />
            <ImageSlot src={imgs[5]} index={5} style={{ height: 160 }} onOpen={openLightbox} hoverLogoSrc={galleryLogoSrc} hoverLabelText={hoverLabelText} hoverLabelStyle={hoverLabelStyle} hoverLabelClass={hoverLabelClass} altText={galleryAlt} logoStyle={galleryLogoStyle} overlayBg={galleryOverlayBg} />
          </div>

          {/* Ligne 3 — 2 colonnes 1fr 1.618fr, h200 */}
          <div ref={galleryRow3Ref} style={{ display: "grid", gridTemplateColumns: "1fr 1.618fr", gap: 6, height: 200 }}>
            <ImageSlot src={imgs[6]} index={6} style={{ height: 200 }} onOpen={openLightbox} hoverLogoSrc={galleryLogoSrc} hoverLabelText={hoverLabelText} hoverLabelStyle={hoverLabelStyle} hoverLabelClass={hoverLabelClass} altText={galleryAlt} logoStyle={galleryLogoStyle} overlayBg={galleryOverlayBg} />
            <ImageSlot src={imgs[7]} index={7} style={{ height: 200 }} onOpen={openLightbox} hoverLogoSrc={galleryLogoSrc} hoverLabelText={hoverLabelText} hoverLabelStyle={hoverLabelStyle} hoverLabelClass={hoverLabelClass} altText={galleryAlt} logoStyle={galleryLogoStyle} overlayBg={galleryOverlayBg} />
          </div>
        </div>

        {/* ── CTA ── */}
        <div
          className="mx-auto w-full"
          style={{
            maxWidth: 1100,
            paddingLeft: 44,
            paddingRight: 44,
            paddingBottom: 72,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 20,
          }}
        >
          <p className="font-meaculpa italic text-bmk-text/50" style={{ fontSize: 22 }}>
            Un projet similaire ?
          </p>
          <a
            href="/contact"
            className="inline-flex h-11 items-center justify-center bg-bmk-accent px-8 font-inter text-sm font-light tracking-widest text-bmk-bg transition-all duration-300 hover:bg-bmk-accent-2 hover:shadow-[0_0_28px_rgba(255,180,0,0.35)]"
            style={{ borderRadius: 8 }}
          >
            Demander un devis
          </a>
        </div>

        {/* ── NAVIGATION PROJETS ── */}
        {(precedentProjet || suivantProjet) && (
          <div
            className="mx-auto w-full"
            style={{
              maxWidth: 1100,
              paddingLeft: 44,
              paddingRight: 44,
              paddingTop: 32,
              paddingBottom: 80,
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 16,
              borderTop: "1px solid rgba(255,255,255,0.05)",
            }}
          >
            <div>
              {precedentProjet && (
                <a href={`/travail/${projet.precedent}`} className="group flex flex-col gap-1">
                  <span
                    className="font-inter font-light uppercase tracking-widest text-bmk-text/25 transition-colors duration-200 group-hover:text-bmk-accent"
                    style={{ fontSize: 9 }}
                  >
                    ← Projet précédent
                  </span>
                  <span
                    className="font-archivo text-bmk-text/60 transition-colors duration-200 group-hover:text-bmk-text"
                    style={{ fontSize: 16, display: "inline-block", transform: "scaleY(1.15)" }}
                  >
                    {precedentProjet.nom}
                  </span>
                </a>
              )}
            </div>
            <div className="flex justify-end">
              {suivantProjet && (
                <a href={`/travail/${projet.suivant}`} className="group flex flex-col items-end gap-1">
                  <span
                    className="font-inter font-light uppercase tracking-widest text-bmk-text/25 transition-colors duration-200 group-hover:text-bmk-accent"
                    style={{ fontSize: 9 }}
                  >
                    Projet suivant →
                  </span>
                  <span
                    className="font-archivo text-bmk-text/60 transition-colors duration-200 group-hover:text-bmk-text"
                    style={{ fontSize: 16, display: "inline-block", transform: "scaleY(1.15)" }}
                  >
                    {suivantProjet.nom}
                  </span>
                </a>
              )}
            </div>
          </div>
        )}
      </main>

      <Footer />

      {/* ── LIGHTBOX ── */}
      {lbOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ background: "rgba(9,13,19,0.96)", backdropFilter: "blur(12px)" }}
          onClick={closeLightbox}
        >
          {/* Fermeture */}
          <button
            onClick={closeLightbox}
            style={{ ...ctrlStyle, position: "absolute", top: 24, right: 24 }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(255,180,0,0.6)")}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(255,180,0,0.3)")}
            aria-label="Fermer"
          >
            ×
          </button>

          {/* Compteur */}
          <span
            className="font-inter font-light uppercase tracking-widest text-bmk-text/40"
            style={{ fontSize: 10, position: "absolute", top: 32, left: "50%", transform: "translateX(-50%)" }}
          >
            {lbCurrent + 1} / {total}
          </span>

          {/* Flèche gauche */}
          <button
            onClick={(e) => { e.stopPropagation(); navigate(-1); }}
            style={{ ...ctrlStyle, position: "absolute", left: 24, top: "50%", transform: "translateY(-50%)" }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(255,180,0,0.6)")}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(255,180,0,0.3)")}
            aria-label="Précédent"
          >
            ←
          </button>

          {/* Zone image avec slide */}
          <div
            className="relative overflow-hidden"
            style={{ width: "min(90vw, 1000px)", height: "min(80vh, 700px)" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image courante (sortante lors de la transition) */}
            <div
              className="absolute inset-0"
              style={{
                transform: lbTransitioning
                  ? `translateX(${lbDir === 1 ? "-100%" : "100%"})`
                  : "translateX(0)",
                transition: lbTransitioning
                  ? "transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)"
                  : "none",
              }}
            >
              {imgs[lbCurrent] && (
                <Image
                  src={imgs[lbCurrent]}
                  alt={galleryAlt}
                  fill
                  style={{ objectFit: "contain" }}
                  sizes="min(90vw, 1000px)"
                />
              )}
            </div>

            {/* Image entrante (seulement pendant la transition) */}
            {lbIncoming !== null && (
              <div
                className="absolute inset-0"
                style={{
                  transform: lbTransitioning
                    ? "translateX(0)"
                    : `translateX(${lbDir === 1 ? "100%" : "-100%"})`,
                  transition: lbTransitioning
                    ? "transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)"
                    : "none",
                }}
              >
                {imgs[lbIncoming] && (
                  <Image
                    src={imgs[lbIncoming]}
                    alt={galleryAlt}
                    fill
                    style={{ objectFit: "contain" }}
                    sizes="min(90vw, 1000px)"
                  />
                )}
              </div>
            )}
          </div>

          {/* Flèche droite */}
          <button
            onClick={(e) => { e.stopPropagation(); navigate(1); }}
            style={{ ...ctrlStyle, position: "absolute", right: 24, top: "50%", transform: "translateY(-50%)" }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(255,180,0,0.6)")}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(255,180,0,0.3)")}
            aria-label="Suivant"
          >
            →
          </button>
        </div>
      )}
    </>
  );
}
