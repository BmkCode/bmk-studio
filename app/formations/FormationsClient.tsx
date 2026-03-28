"use client";

import { useRef, useEffect } from "react";
import Footer from "../components/Footer";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useIsMobile } from "../hooks/useIsMobile";

const formations = [
  {
    num: "01",
    duree: "2 jours — Débutant à intermédiaire",
    titre: "Appareil, lumière & composition avec Bmk",
    description:
      "Maîtrisez les fondamentaux de la photographie produit — de la gestion de la lumière à la post-production.",
    programme: [
      "Apprendre et comprendre son appareil",
      "Maîtriser la lumière",
      "Raconter une histoire à travers l'image",
    ],
  },
  {
    num: "02",
    duree: "1 jour — Tous niveaux",
    titre: "Vidéo smartphone & contenu réseaux",
    description:
      "Créez du contenu vidéo professionnel avec votre téléphone.",
    programme: [
      "Réglages caméra, stabilisation, cadrage",
      "Son, lumière naturelle, mise en scène rapide",
      "Montage mobile et export optimisé",
    ],
  },
  {
    num: "03",
    duree: "1 jour — Intermédiaire",
    titre: "Montage & post-production",
    description:
      "Du rushes au rendu final — maîtrisez le rythme, la couleur et l'exportation.",
    programme: [
      "Découpage, rythme, transitions",
      "Color grading — ambiance et cohérence visuelle",
      "Export multi-format",
    ],
  },
];

export default function FormationsClient() {
  const isMobile = useIsMobile();
  const headerRef = useRef<HTMLElement>(null);
  const introRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLElement>(null);
  const bandeauRef = useRef<HTMLElement>(null);

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
      [
        { el: introRef.current },
        { el: bandeauRef.current },
      ].forEach(({ el }) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0, duration: 0.9, ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none none" },
          }
        );
      });
      if (cardsRef.current) {
        const cards = gsap.utils.toArray<HTMLElement>(cardsRef.current.children);
        gsap.fromTo(
          cards,
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0, duration: 0.85, ease: "power3.out", stagger: 0.12,
            scrollTrigger: { trigger: cardsRef.current, start: "top 85%", toggleActions: "play none none none" },
          }
        );
      }
    });
    return () => ctx.revert();
  }, []);

  return (
    <>
      <main style={{ paddingTop: 80 }}>
        {/* ── HEADER ── */}
        <section
          ref={headerRef}
          className="formations-header mx-auto w-full"
          style={{
            maxWidth: 1100,
            paddingLeft: 44,
            paddingRight: 44,
            paddingTop: 56,
            paddingBottom: 48,
          }}
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
              Formations Bmk Studio
            </span>
          </div>

          {/* Titre — même ligne */}
          <h1
            style={{
              fontSize: 52,
              letterSpacing: "-2px",
              lineHeight: 1.1,
              display: "inline-block",
              transform: "scaleY(1.15)",
            }}
          >
            <span className="font-archivo text-bmk-text">Apprenez à voir </span>
            <span
              className="font-meaculpa italic"
              style={{
                color: "#d4a843",
                textShadow:
                  "0 0 28px rgba(255,180,0,0.35), 0 0 56px rgba(255,180,0,0.12)",
              }}
            >
              la lumière.
            </span>
          </h1>

          {/* Sous-titre */}
          <p
            className="mt-8 font-inter font-light leading-relaxed text-bmk-text/55"
            style={{ maxWidth: 480, fontSize: 15 }}
          >
            Des ateliers terrain animés par les photographes du studio. Pratiques, intenses, pensés pour les créateurs et entrepreneurs.
          </p>
        </section>

        {/* ── INTRO STRIP ── */}
        <section
          ref={introRef}
          className="formations-intro mx-auto w-full"
          style={{
            maxWidth: 1100,
            paddingLeft: 44,
            paddingRight: 44,
            paddingBottom: 56,
          }}
        >
          <div
            className="flex items-stretch gap-0"
            style={{
              border: "1px solid rgba(255,255,255,0.05)",
              borderRadius: 8,
              backgroundColor: "#0b1018",
              overflow: "hidden",
            }}
          >
            {/* Ligne dorée verticale */}
            <div
              style={{
                width: 3,
                flexShrink: 0,
                backgroundColor: "#ffb400",
                opacity: 0.7,
              }}
            />
            <p
              className="font-inter font-light leading-relaxed text-bmk-text/55"
              style={{ fontSize: 14, padding: "20px 28px" }}
            >
              Toutes les formations se déroulent en petit groupe pour garantir un suivi personnalisé. Matériel professionnel fourni. Bruxelles &amp; déplacement possible.
            </p>
          </div>
        </section>

        {/* ── CARDS FORMATIONS ── */}
        <section
          ref={cardsRef}
          className="formations-cards mx-auto w-full"
          style={{
            maxWidth: 1100,
            paddingLeft: 44,
            paddingRight: 44,
            paddingBottom: 72,
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          {formations.map((f) => (
            <div
              key={f.num}
              className="formation-card flex items-start gap-8"
              style={{
                border: "1px solid rgba(255,255,255,0.05)",
                borderRadius: 8,
                backgroundColor: "#0b1018",
                padding: isMobile ? "24px 20px" : "32px 36px",
                flexDirection: isMobile ? "column" : "row",
                gap: isMobile ? 16 : 32,
              }}
            >
              {/* Numéro */}
              <span
                className="formation-num font-meaculpa italic"
                style={{
                  fontSize: 40,
                  color: "rgba(212,168,67,0.35)",
                  lineHeight: 1,
                  flexShrink: 0,
                  width: isMobile ? "auto" : 48,
                }}
              >
                {f.num}
              </span>

              {/* Contenu */}
              <div className="flex flex-1 flex-col gap-3">
                <span
                  className="font-inter font-light uppercase tracking-widest text-bmk-text/35"
                  style={{ fontSize: 9 }}
                >
                  {f.duree}
                </span>
                <h2
                  className="font-archivo leading-tight text-bmk-text"
                  style={{
                    fontSize: 20,
                    display: "inline-block",
                    transform: "scaleY(1.15)",
                  }}
                >
                  {f.titre}
                </h2>
                <p
                  className="font-inter font-light leading-relaxed text-bmk-text/50"
                  style={{ fontSize: 14 }}
                >
                  {f.description}
                </p>
                <ul className="mt-1 flex flex-col gap-1">
                  {f.programme.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 font-inter font-light text-bmk-text/40"
                      style={{ fontSize: 13 }}
                    >
                      <span style={{ color: "#ffb400", marginTop: 1 }}>·</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <div
                className="formation-cta flex flex-shrink-0 flex-col justify-between self-stretch"
                style={{
                  minWidth: isMobile ? "auto" : 160,
                  width: isMobile ? "100%" : "auto",
                  alignItems: isMobile ? "flex-start" : "flex-end",
                  gap: isMobile ? 12 : 0,
                }}
              >
                <div className="flex flex-col gap-1" style={{ alignItems: isMobile ? "flex-start" : "flex-end" }}>
                  <span
                    className="font-inter font-light text-bmk-text/30"
                    style={{ fontSize: 11 }}
                  >
                    Sur devis
                  </span>
                  <span
                    className="font-inter font-light text-bmk-text/25"
                    style={{ fontSize: 10 }}
                  >
                    Max 6 pers.
                  </span>
                </div>
                <a
                  href="/contact"
                  className="inline-flex h-10 items-center justify-center bg-bmk-accent font-inter text-xs font-light uppercase tracking-widest text-bmk-bg transition-all duration-300 hover:bg-bmk-accent-2 hover:shadow-[0_0_24px_rgba(255,180,0,0.35)]"
                  style={{ borderRadius: 6, width: isMobile ? "100%" : "auto", padding: isMobile ? "0" : "0 24px" }}
                >
                  S&apos;inscrire
                </a>
              </div>
            </div>
          ))}
        </section>

        {/* ── BANDEAU SUR MESURE ── */}
        <section
          ref={bandeauRef}
          className="formations-bandeau mx-auto w-full"
          style={{
            maxWidth: 1100,
            paddingLeft: 44,
            paddingRight: 44,
            paddingBottom: 80,
          }}
        >
          <div
            className="flex flex-col items-center gap-5 text-center"
            style={{
              border: "1px solid rgba(255,180,0,0.15)",
              borderRadius: 8,
              backgroundColor: "#0b1018",
              padding: "48px 44px",
              background:
                "radial-gradient(ellipse 70% 80% at 50% 50%, rgba(255,180,0,0.04) 0%, transparent 70%), #0b1018",
            }}
          >
            <h2
              className="font-archivo leading-tight text-bmk-text"
              style={{
                fontSize: 28,
                display: "inline-block",
                transform: "scaleY(1.15)",
                marginBottom: 8,
              }}
            >
              Formation sur mesure
            </h2>
            <p
              className="font-inter font-light leading-relaxed text-bmk-text/50"
              style={{ maxWidth: 440, fontSize: 15 }}
            >
              Un besoin spécifique ? Bmk Studio conçoit des ateliers adaptés à votre secteur, votre équipe, votre niveau.
            </p>
            <a
              href="/contact"
              className="inline-flex h-11 items-center justify-center bg-bmk-accent px-8 font-inter text-sm font-light tracking-widest text-bmk-bg transition-all duration-300 hover:bg-bmk-accent-2 hover:shadow-[0_0_28px_rgba(255,180,0,0.35)]"
              style={{ borderRadius: 8 }}
            >
              Nous contacter
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
