"use client";

import { useState, useRef, useEffect } from "react";
import Footer from "../components/Footer";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useIsMobile } from "../hooks/useIsMobile";
import { translations, type Translations } from "../../lib/translations";

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

function validate(nom: string, email: string, message: string, t: Translations) {
  const errors: { nom?: string; email?: string; message?: string } = {};
  if (!nom.trim()) errors.nom = t.contact.validation.name_required;
  if (!email.trim()) {
    errors.email = t.contact.validation.email_required;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = t.contact.validation.email_invalid;
  }
  if (!message.trim()) {
    errors.message = t.contact.validation.message_required;
  } else if (message.trim().length < 10) {
    errors.message = t.contact.validation.message_min;
  }
  return errors;
}

export default function ContactClient({
  t = translations.fr,
}: {
  t?: Translations;
}) {
  const isMobile = useIsMobile();
  const [selected, setSelected] = useState(t.contact.qualifiers[0]);
  const [hoveredService, setHoveredService] = useState<string | null>(null);
  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null);

  const headerRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLFormElement>(null);

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
      if (leftColRef.current) {
        gsap.fromTo(
          leftColRef.current,
          { opacity: 0, x: -20 },
          {
            opacity: 1, x: 0, duration: 0.9, ease: "power3.out",
            scrollTrigger: { trigger: leftColRef.current, start: "top 85%", toggleActions: "play none none none" },
          }
        );
      }
      if (rightColRef.current) {
        gsap.fromTo(
          rightColRef.current,
          { opacity: 0, x: 20 },
          {
            opacity: 1, x: 0, duration: 0.9, ease: "power3.out",
            scrollTrigger: { trigger: rightColRef.current, start: "top 85%", toggleActions: "play none none none" },
          }
        );
      }
    });
    return () => ctx.revert();
  }, []);

  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [entreprise, setEntreprise] = useState("");
  const [message, setMessage] = useState("");

  const [errors, setErrors] = useState<{ nom?: string; email?: string; message?: string }>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSuccess(false);
    setServerError(false);

    const fieldErrors = validate(nom, email, message, t);
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
        body: JSON.stringify({ type: selected, nom, email, entreprise, message }),
      });
      if (res.ok) {
        setSuccess(true);
        setNom("");
        setEmail("");
        setEntreprise("");
        setMessage("");
        setSelected(t.contact.qualifiers[0]);
      } else {
        setServerError(true);
      }
    } catch {
      setServerError(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <main style={{ paddingTop: 80 }}>
        {/* ── HEADER ── */}
        <section
          ref={headerRef}
          className="contact-header mx-auto w-full"
          style={{
            maxWidth: 1100,
            paddingLeft: isMobile ? 24 : 44,
            paddingRight: isMobile ? 24 : 44,
            paddingTop: isMobile ? 32 : 56,
            paddingBottom: isMobile ? 32 : 56,
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
              {t.contact.eyebrow}
            </span>
          </div>

          {/* Titre */}
          <h1
            style={isMobile ? {
              fontSize: 32,
              letterSpacing: 0,
              lineHeight: 1.1,
              display: "inline-block",
            } : {
              fontSize: 52,
              letterSpacing: "-2px",
              lineHeight: 1.1,
              display: "inline-block",
              transform: "scaleY(1.15)",
            }}
          >
            <span className="font-archivo text-bmk-text">{t.contact.title}{" "}</span>
            <span
              className="font-meaculpa italic"
              style={{
                color: "#ffb400",
                textShadow:
                  "0 0 32px rgba(255,180,0,0.55), 0 0 64px rgba(255,180,0,0.2), 0 0 96px rgba(255,180,0,0.08)",
              }}
            >
              {t.contact.title_em}
            </span>
          </h1>
        </section>

        {/* ── BODY GRILLE ── */}
        <section
          className="mx-auto w-full contact-body"
          style={{
            maxWidth: 1100,
            paddingLeft: isMobile ? 24 : 44,
            paddingRight: isMobile ? 24 : 44,
            paddingBottom: 80,
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1.2fr",
            gap: isMobile ? 40 : 56,
            alignItems: "start",
          }}
        >
          {/* ── COLONNE GAUCHE ── */}
          <div ref={leftColRef} className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <h2
                className="font-archivo text-bmk-text"
                style={{ fontSize: 20, display: "inline-block", transform: "scaleY(1.15)" }}
              >
                {t.contact.studio_title}
              </h2>
              <p
                className="font-inter font-light leading-relaxed text-bmk-text/50"
                style={{ fontSize: 14 }}
              >
                {t.contact.studio_text}
              </p>
            </div>

            <div className="flex flex-col gap-3">
              {[
                { label: t.contact.email_label, value: "info@bmkstudio.be" },
                { label: t.contact.zone_label, value: t.contact.zone_value },
                { label: t.contact.devis_label, value: t.contact.devis_value },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-start gap-3">
                  <span style={{ color: "#ffb400", fontSize: 14, marginTop: 1, flexShrink: 0 }}>·</span>
                  <div className="flex flex-col gap-0.5">
                    <span
                      className="font-inter font-light uppercase tracking-widest text-bmk-text/30"
                      style={{ fontSize: 9 }}
                    >
                      {label}
                    </span>
                    <span className="font-inter font-light text-bmk-text/65" style={{ fontSize: 13 }}>
                      {value}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              {[
{ href: "https://www.instagram.com/bmk.studio/", label: "Instagram" },
{ href: "https://www.linkedin.com/in/m-khalid-bouanane-77a51223a/", label: "LinkedIn" },
              ].map(({ href, label }) => {
                const sh = hoveredSocial === label;
                return (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-9 items-center justify-center font-inter font-light uppercase tracking-widest transition-all duration-200"
                    style={{
                      fontSize: 9,
                      border: sh ? "1px solid rgba(255,180,0,0.45)" : "1px solid rgba(255,255,255,0.08)",
                      borderRadius: 6,
                      padding: "0 16px",
                      color: sh ? "rgba(255,180,0,0.75)" : "rgba(221,226,236,0.4)",
                      boxShadow: sh ? "0 0 8px rgba(255,180,0,0.1)" : "none",
                    }}
                    onMouseEnter={() => setHoveredSocial(label)}
                    onMouseLeave={() => setHoveredSocial(null)}
                  >
                    {label}
                  </a>
                );
              })}
            </div>
          </div>

          {/* ── COLONNE DROITE — FORMULAIRE ── */}
          <form ref={rightColRef} className="flex flex-col gap-5" onSubmit={handleSubmit} noValidate>
            {/* Sélecteurs service */}
            <div className="flex flex-col gap-2">
              <span
                className="font-inter font-light uppercase tracking-widest text-bmk-text/35"
                style={{ fontSize: 9 }}
              >
                {t.contact.qualifier_label}
              </span>
              <div className="flex flex-wrap gap-2">
                {t.contact.qualifiers.map((s) => {
                  const active = selected === s;
                  const hov = hoveredService === s && !active;
                  return (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSelected(s)}
                      className="font-inter font-light uppercase tracking-widest transition-all duration-200"
                      style={{
                        fontSize: 9,
                        height: 32,
                        padding: "0 14px",
                        borderRadius: 4,
                        border: active
                          ? "1px solid rgba(255,180,0,0.55)"
                          : hov
                          ? "1px solid rgba(255,180,0,0.3)"
                          : "1px solid rgba(255,255,255,0.08)",
                        color: active
                          ? "rgba(255,180,0,0.85)"
                          : hov
                          ? "rgba(255,180,0,0.55)"
                          : "rgba(221,226,236,0.3)",
                        background: "transparent",
                        boxShadow: active ? "0 0 8px rgba(255,180,0,0.15)" : "none",
                        cursor: "pointer",
                      }}
                      onMouseEnter={() => setHoveredService(s)}
                      onMouseLeave={() => setHoveredService(null)}
                    >
                      {s}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Nom */}
            <div className="flex flex-col">
              <input
                type="text"
                placeholder={t.contact.fields.name}
                value={nom}
                onChange={(e) => setNom(e.target.value)}
                style={errors.nom ? errorInputStyle : inputStyle}
                onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(255,180,0,0.3)")}
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
                placeholder={t.contact.fields.email}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={errors.email ? errorInputStyle : inputStyle}
                onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(255,180,0,0.3)")}
                onBlur={(e) =>
                  (e.currentTarget.style.borderColor = errors.email
                    ? "rgba(220,60,60,0.6)"
                    : "rgba(255,255,255,0.07)")
                }
              />
              <FieldError msg={errors.email} />
            </div>

            {/* Entreprise (optionnel) */}
            <input
              type="text"
              placeholder={t.contact.fields.company}
              value={entreprise}
              onChange={(e) => setEntreprise(e.target.value)}
              style={inputStyle}
              onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(255,180,0,0.3)")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)")}
            />

            {/* Message */}
            <div className="flex flex-col">
              <textarea
                placeholder={t.contact.fields.message}
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                style={{
                  ...(errors.message ? errorInputStyle : inputStyle),
                  height: 90,
                  resize: "none",
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(255,180,0,0.3)")}
                onBlur={(e) =>
                  (e.currentTarget.style.borderColor = errors.message
                    ? "rgba(220,60,60,0.6)"
                    : "rgba(255,255,255,0.07)")
                }
              />
              <FieldError msg={errors.message} />
            </div>

            {/* Feedback messages */}
            {success && (
              <p
                className="font-inter font-light"
                style={{ fontSize: 13, color: "rgba(180,210,120,0.9)" }}
              >
                {t.contact.success}
              </p>
            )}
            {serverError && (
              <p
                className="font-inter font-light"
                style={{ fontSize: 13, color: "rgba(220,80,80,0.9)" }}
              >
                {t.contact.error}
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="inline-flex h-11 w-full items-center justify-center font-inter text-sm font-light uppercase tracking-widest transition-all duration-300"
              style={{
                background: loading ? "rgba(255,180,0,0.5)" : "#ffb400",
                color: "#090d13",
                borderRadius: 6,
                border: "none",
                cursor: loading ? "not-allowed" : "pointer",
              }}
            >
              {loading ? t.contact.loading : t.contact.submit}
            </button>
          </form>
        </section>
      </main>

      <Footer t={t} />
    </>
  );
}
