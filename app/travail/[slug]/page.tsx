import type { Metadata } from "next";
import ProjetClient from "./ProjetClient";

const projectsMeta = {
  "le-restaurant": {
    nom: "Le Restaurant",
    categorie: "Photo produit",
    pitch: "Une année à documenter l'âme d'un lieu — la lumière du service, le détail d'une table, l'instant avant que tout commence.",
    images: ["/images/restaurant/Restaurant (14).JPG"],
  },
  "qamees-place": {
    nom: "Qamees Place",
    categorie: "Photo produit",
    pitch: "Des vêtements traditionnels sublimés par la lumière — qamis, djellabas et gandoras photographiés avec l'élégance qu'ils méritent.",
    images: ["/images/qamees-place/Qameesplace (5).JPG"],
  },
  "nutfully": {
    nom: "Nutfully",
    categorie: "Photo produit",
    pitch: "Des matières brutes et généreuses — noix, amandes, pistaches photographiées dans leur vérité la plus naturelle.",
    images: ["/images/nutfully/Nutfully-0.jpg"],
  },
  "frange": {
    nom: "Frange",
    categorie: "Photo",
    pitch: "Une éternelle histoire de coiffure — capturer le geste, la matière, l'énergie d'un salon qui vit.",
    images: ["/images/frange/Frange (1).JPG"],
  },
  "restaurant-2": {
    nom: "Restaurant 2",
    categorie: "Photo",
    pitch: "Une cuisine fusion entre tradition et modernité — sublimer l'assiette, l'ambiance et le détail pour raconter une expérience gastronomique unique.",
    images: ["/images/restaurant 2/torofusion (9).JPG"],
  },
  "travaux-personnels": {
    nom: "Travaux personnels",
    categorie: "Photo & Vidéo",
    pitch: "Maîtrise de la lumière, profondeur de champ et mise en scène — des images qui révèlent la technique et la sensibilité du regard BMK.",
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
      projet.nom, projet.categorie, "photographie Bruxelles", "Bmk Studio",
      "studio photo Belgique", "photographe commercial Bruxelles"
    ],
    openGraph: {
      title: `${projet.nom} — Bmk Studio`,
      description: projet.pitch,
      images: [{ url: projet.images[0], alt: `${projet.nom} par Bmk Studio` }]
    }
  };
}

export default function Page() {
  return <ProjetClient />;
}
