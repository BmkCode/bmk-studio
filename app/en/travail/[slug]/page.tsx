import type { Metadata } from "next";
import ProjetClient from "../../../travail/[slug]/ProjetClient";
import { translations } from "../../../../lib/translations";

const projectsMeta = {
  "le-restaurant": {
    nom: "Le Restaurant",
    categorie: "Product photography",
    pitch: "A year documenting the soul of a place — the light of service, the detail of a table, the moment before it all begins.",
    images: ["/images/restaurant/Restaurant (14).JPG"],
  },
  "qamees-place": {
    nom: "Qamees Place",
    categorie: "Product photography",
    pitch: "Traditional garments elevated by light — qamis, djellabas and gandoras photographed with the elegance they deserve.",
    images: ["/images/qamees-place/Qameesplace (5).JPG"],
  },
  "nutfully": {
    nom: "Nutfully",
    categorie: "Product photography",
    pitch: "Raw and generous textures — walnuts, almonds, pistachios photographed in their most natural truth.",
    images: ["/images/nutfully/Nutfully-0.jpg"],
  },
  "frange": {
    nom: "Frange",
    categorie: "Photography",
    pitch: "An eternal story of hairdressing — capturing the gesture, the texture, the energy of a living salon.",
    images: ["/images/frange/Frange (1).JPG"],
  },
  "restaurant-2": {
    nom: "Restaurant 2",
    categorie: "Photography",
    pitch: "A fusion cuisine between tradition and modernity — elevating the plate, the atmosphere and the detail to tell a unique gastronomic experience.",
    images: ["/images/restaurant 2/torofusion (9).JPG"],
  },
  "travaux-personnels": {
    nom: "Personal work",
    categorie: "Photo & Video",
    pitch: "Mastery of light, depth of field and staging — images that reveal the technique and sensitivity of the BMK eye.",
    images: ["/images/travaux personnels/produit (8).png"],
  },
};

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const projet = projectsMeta[slug as keyof typeof projectsMeta];
  if (!projet) return {};
  return {
    title: projet.nom,
    description: projet.pitch,
    keywords: [
      projet.nom, projet.categorie, "photography Brussels", "Bmk Studio",
      "commercial photography Belgium", "Brussels photographer"
    ],
    alternates: { canonical: `/en/travail/${slug}` },
    openGraph: {
      title: `${projet.nom} — Bmk Studio`,
      description: projet.pitch,
      images: [{ url: projet.images[0], alt: `${projet.nom} by Bmk Studio` }]
    }
  };
}

export default function EnProjetPage() {
  return <ProjetClient t={translations.en} basePath="/en" />;
}
