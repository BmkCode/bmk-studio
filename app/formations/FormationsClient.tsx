"use client";

import { useRef, useEffect, useState } from "react";
import Footer from "../components/Footer";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useIsMobile } from "../hooks/useIsMobile";
import { translations, type Translations } from "../../lib/translations";

const formationsFr = [
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
];

const formationsEn = [
  {
    num: "01",
    duree: "2 days — Beginner to intermediate",
    titre: "Camera, light & composition with Bmk",
    description:
      "Master the fundamentals of product photography — from light management to post-production.",
    programme: [
      "Learn and understand your camera",
      "Master light",
      "Tell a story through the image",
    ],
  },
];

const inputStyle: React.CSSProperties = {
  width: "100%",
  background: "rgba(255,255,255,0.03)",
  borderWidth: 1,
  borderStyle: "solid",
  borderColor: "rgba(255,255,255,0.07)",
  borderRadius: 4,
  padding: "10px 14px",
  color: "#dde2ec",
  fontSize: 14,
  fontFamily: "inherit",
  outline: "none",
  transition: "border-color 200ms",
};

const errorInputStyle: React.CSSProperties = {
  ...inputStyle,
  borderColor: "rgba(220,60,60,0.6)",
};

function FieldError({ msg }: { msg: string | undefined }) {
  if (!msg) return null;
  return (
    <span
      className="font-inter font-light"
      style={{ fontSize: 11, color: "rgba(220,80,80,0.9)", marginTop: 4 }}
    >
      {msg}
    </span>
  );
}

function FormationModal({
  isOpen,
  formation,
  t,
  onClose,
}: {
  isOpen: boolean;
  formation: { titre: string } | null;
  t: Translations;
  onClose: () => void;
}) {
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<{ nom?: string; email?: string; contact?: string }>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState(false);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
      return () => document.removeEventListener("keydown", handleEsc);
    }
  }, [isOpen, onClose]);

  if (!isOpen || !formation) return null;

  const validate = () => {
    const errs: { nom?: string; email?: string; contact?: string } = {};
    if (!nom.trim()) errs.nom = t.formations.modal_validation.name_required;

    const hasEmail = email.trim();
    const hasPhone = telephone.trim();

    if (!hasEmail && !hasPhone) {
      errs.contact = t.formations.modal_validation.contact_required;
    } else {
      if (hasEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errs.email = t.formations.modal_validation.email_invalid;
      }
    }
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(false);
    setServerError(false);

    const fieldErrors = validate();
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: `Inscription Formation — ${formation.titre}`,
          nom,
          email,
          telephone: telephone || undefined,
          message: message || undefined,
        }),
      });
      if (res.ok) {
        setSuccess(true);
        setNom("");
        setEmail("");
        setTelephone("");
        setMessage("");
        setTimeout(() => {
          onClose();
        }, 2000);
      } else {
        setServerError(true);
      }
    } catch {
      setServerError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(9,13,19,0.92)",
        backdropFilter: "blur(8px)",
        zIndex: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        style={{
          background: "#090d13",
          border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: 8,
          width: "100%",
          maxWidth: 520,
          padding: "40px",
          position: "relative",
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: 20,
            right: 20,
            background: "none",
            border: "none",
            color: "rgba(255,255,255,0.5)",
            fontSize: 24,
            cursor: "pointer",
            padding: 0,
            width: 24,
            height: 24,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          ✕
        </button>

        {/* Title */}
        <h2
          className="font-archivo text-bmk-text"
          style={{
            fontSize: 20,
            display: "inline-block",
            transform: "scaleY(1.15)",
            marginBottom: 12,
            paddingRight: 24,
          }}
        >
          {t.formations.modal_title}
          <br />
          <span style={{ fontSize: 16, opacity: 0.7 }}>{formation.titre}</span>
        </h2>

        {/* Note */}
        <p
          className="font-inter font-light"
          style={{
            fontSize: 12,
            color: "rgba(221,226,236,0.45)",
            marginBottom: 24,
            lineHeight: 1.5,
          }}
        >
          {t.formations.modal_note}
        </p>

        {/* Form */}
        {!success ? (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
            {/* Nom */}
            <div className="flex flex-col">
              <input
                type="text"
                placeholder={t.formations.modal_fields.name}
                value={nom}
                onChange={(e) => setNom(e.target.value)}
                style={errors.nom ? errorInputStyle : inputStyle}
                onFocus={(e) =>
                  (e.currentTarget.style.borderColor = "rgba(255,180,0,0.3)")
                }
                onBlur={(e) =>
                  (e.currentTarget.style.borderColor = errors.nom
                    ? "rgba(220,60,60,0.6)"
                    : "rgba(255,255,255,0.07)")
                }
              />
              <FieldError msg={errors.nom} />
            </div>

            {/* Email */}
            <div className="flex flex-col">
              <input
                type="email"
                placeholder={t.formations.modal_fields.email}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={errors.email ? errorInputStyle : inputStyle}
                onFocus={(e) =>
                  (e.currentTarget.style.borderColor = "rgba(255,180,0,0.3)")
                }
                onBlur={(e) =>
                  (e.currentTarget.style.borderColor = errors.email
                    ? "rgba(220,60,60,0.6)"
                    : "rgba(255,255,255,0.07)")
                }
              />
              <FieldError msg={errors.email} />
            </div>

            {/* Telephone */}
            <input
              type="tel"
              placeholder={t.formations.modal_fields.phone_recommended}
              value={telephone}
              onChange={(e) => setTelephone(e.target.value)}
              style={inputStyle}
              onFocus={(e) =>
                (e.currentTarget.style.borderColor = "rgba(255,180,0,0.3)")
              }
              onBlur={(e) =>
                (e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)")
              }
            />

            {/* Message */}
            <textarea
              placeholder={t.formations.modal_fields.message}
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              style={{
                ...inputStyle,
                height: 70,
                resize: "none",
              }}
              onFocus={(e) =>
                (e.currentTarget.style.borderColor = "rgba(255,180,0,0.3)")
              }
              onBlur={(e) =>
                (e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)")
              }
            />

            {/* Contact error (at least email or phone required) */}
            {errors.contact && (
              <p
                className="font-inter font-light"
                style={{ fontSize: 11, color: "rgba(220,80,80,0.9)", marginTop: 4 }}
              >
                {errors.contact}
              </p>
            )}

            {/* Server error message */}
            {serverError && (
              <p
                className="font-inter font-light"
                style={{ fontSize: 13, color: "rgba(220,80,80,0.9)" }}
              >
                {t.formations.modal_error}
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="inline-flex h-10 w-full items-center justify-center font-inter text-sm font-light uppercase tracking-widest transition-all duration-300"
              style={{
                background: loading ? "rgba(255,180,0,0.5)" : "#ffb400",
                color: "#090d13",
                borderRadius: 6,
                border: "none",
                cursor: loading ? "not-allowed" : "pointer",
                marginTop: 8,
              }}
            >
              {loading ? t.formations.modal_loading : t.formations.modal_submit}
            </button>
          </form>
        ) : (
          <p
            className="font-inter font-light text-center"
            style={{ fontSize: 14, color: "rgba(180,210,120,0.9)" }}
          >
            {t.formations.modal_success}
          </p>
        )}
      </div>
    </div>
  );
}

export default function FormationsClient({
  t = translations.fr,
  basePath = "",
}: {
  t?: Translations;
  basePath?: string;
}) {
  const isMobile = useIsMobile();
  const formations = basePath === "/en" ? formationsEn : formationsFr;
  const headerRef = useRef<HTMLElement>(null);
  const introRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLElement>(null);
  const bandeauRef = useRef<HTMLElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFormation, setSelectedFormation] = useState<{ titre: string } | null>(null);

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
              {t.formations.eyebrow}
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
            <span className="font-archivo text-bmk-text">{t.formations.title}{" "}</span>
            <span
              className="font-meaculpa italic"
              style={{
                color: "#d4a843",
                textShadow:
                  "0 0 28px rgba(255,180,0,0.35), 0 0 56px rgba(255,180,0,0.12)",
              }}
            >
              {t.formations.title_em}
            </span>
          </h1>

          {/* Sous-titre */}
          <p
            className="mt-8 font-inter font-light leading-relaxed text-bmk-text/55"
            style={{ maxWidth: 480, fontSize: 15 }}
          >
            {t.formations.subtitle}
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
              {t.formations.intro}
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
                    {t.formations.price}
                  </span>
                  <span
                    className="font-inter font-light text-bmk-text/25"
                    style={{ fontSize: 10 }}
                  >
                    {t.formations.max}
                  </span>
                </div>
                <button
                  onClick={() => {
                    setSelectedFormation({ titre: f.titre });
                    setIsModalOpen(true);
                  }}
                  className="inline-flex h-10 items-center justify-center bg-bmk-accent font-inter text-xs font-light uppercase tracking-widest text-bmk-bg transition-all duration-300 hover:bg-bmk-accent-2 hover:shadow-[0_0_24px_rgba(255,180,0,0.35)]"
                  style={{ borderRadius: 6, width: isMobile ? "100%" : "auto", padding: isMobile ? "0" : "0 24px", border: "none", cursor: "pointer" }}
                >
                  {t.formations.register}
                </button>
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
              {t.formations.custom_title}
            </h2>
            <p
              className="font-inter font-light leading-relaxed text-bmk-text/50"
              style={{ maxWidth: 440, fontSize: 15 }}
            >
              {t.formations.custom_text}
            </p>
            <a
              href={`${basePath}/contact`}
              className="inline-flex h-11 items-center justify-center bg-bmk-accent px-8 font-inter text-sm font-light tracking-widest text-bmk-bg transition-all duration-300 hover:bg-bmk-accent-2 hover:shadow-[0_0_28px_rgba(255,180,0,0.35)]"
              style={{ borderRadius: 8 }}
            >
              {t.formations.custom_cta}
            </a>
          </div>
        </section>
      </main>

      <FormationModal
        isOpen={isModalOpen}
        formation={selectedFormation}
        t={t}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedFormation(null);
        }}
      />

      <Footer t={t} />
    </>
  );
}
