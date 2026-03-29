import type { Metadata } from "next";
import ContactClient from "../../contact/ContactClient";
import { translations } from "../../../lib/translations";

export const metadata: Metadata = {
  title: "Contact & Quote",
  description: "Contact Bmk Studio for a free quote in product photography or commercial video in Brussels. Reply within 48h. Belgium & international.",
  keywords: ["Brussels photographer quote", "contact photo studio Brussels", "product photographer quote", "videographer Brussels", "Bmk Studio contact"]
};

export default function EnContactPage() {
  return <ContactClient t={translations.en} />;
}
