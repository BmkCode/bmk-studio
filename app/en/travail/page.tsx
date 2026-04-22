import type { Metadata } from "next";
import TravailClient from "../../travail/TravailClient";
import { translations } from "../../../lib/translations";

export const metadata: Metadata = {
  title: "Portfolio — Work",
  description: "Discover Bmk Studio's photo and video projects — product shots, artisan work, hospitality, matcha. Commercial studio based in Brussels.",
  keywords: ["Brussels photographer portfolio", "commercial photo projects", "product photography", "Bmk Studio portfolio", "Brussels commercial photographer"],
  alternates: { canonical: "/en/travail" },
};

export default function EnTravailPage() {
  return <TravailClient t={translations.en} basePath="/en" />;
}
