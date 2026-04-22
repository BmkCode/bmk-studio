import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact & Devis",
  description: "Contactez Bmk Studio pour un devis gratuit en photographie produit ou vidéo commerciale à Bruxelles. Réponse sous 48h. Belgique & international.",
  keywords: ["devis photographe Bruxelles", "contact studio photo Bruxelles", "photographe produit devis", "vidéaste devis Bruxelles", "Bmk Studio contact"],
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return <ContactClient />;
}
