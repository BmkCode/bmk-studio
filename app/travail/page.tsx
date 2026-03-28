import type { Metadata } from "next";
import TravailClient from "./TravailClient";

export const metadata: Metadata = {
  title: "Portfolio — Travail",
  description: "Découvrez les projets photo et vidéo de Bmk Studio — packshots produits, artisanat, coiffure, restauration, matcha. Studio commercial basé à Bruxelles.",
  keywords: ["portfolio photographe Bruxelles", "projets photo commerciaux", "packshot produit", "photo artisanat Bruxelles", "Bmk Studio portfolio", "Brussels photographer portfolio"]
};

export default function TravailPage() {
  return <TravailClient />;
}
