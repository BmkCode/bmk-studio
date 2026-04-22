import type { Metadata } from "next";
import FormationsClient from "./FormationsClient";

export const metadata: Metadata = {
  title: "Formations Photo & Vidéo",
  description: "Formations pratiques en photographie et vidéo à Bruxelles avec Bmk Studio. Apprenez à maîtriser votre appareil, la lumière et le montage. Petit groupe, terrain, résultats concrets.",
  keywords: ["formation photo Bruxelles", "cours photographie Bruxelles", "atelier vidéo Bruxelles", "apprendre photo produit", "formation lumière photo", "cours montage vidéo Bruxelles", "workshop photo Belgique"],
  alternates: { canonical: "/formations" },
};

export default function FormationsPage() {
  return <FormationsClient />;
}
