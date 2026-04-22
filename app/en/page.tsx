import type { Metadata } from "next";
import EnHomeClient from "./EnHomeClient";

export const metadata: Metadata = {
  title: "Bmk Studio | Product Photography & Commercial Video – Brussels",
  description: "Brussels-based commercial photography and video studio. Dramatic lighting, premium products, images that sell. Available in Belgium and internationally.",
  keywords: [
    "product photographer Brussels", "commercial photography Belgium",
    "product photography studio Brussels", "commercial video Brussels",
    "packshot photography Belgium", "Bmk Studio", "advertising photographer Brussels",
  ],
  alternates: {
    canonical: "/en",
    languages: {
      "x-default": "https://www.bmkstudio.be",
      "fr-BE": "https://www.bmkstudio.be",
      "en": "https://www.bmkstudio.be/en",
    },
  },
  openGraph: {
    title: "Bmk Studio | Product Photography & Commercial Video – Brussels",
    description: "Brussels-based commercial photography and video studio. Dramatic lighting, premium products, images that sell.",
    locale: "en_US",
    url: "/en",
  },
};

export default function EnPage() {
  return <EnHomeClient />;
}
