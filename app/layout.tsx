import type { Metadata } from "next";
import { Archivo_Black, Mea_Culpa, Inter } from "next/font/google";
import "./globals.css";
import Nav from "./components/Nav";
import GSAPProvider from "./components/GSAPProvider";
import { SpeedInsights } from "@vercel/speed-insights/next";

const archivoBlack = Archivo_Black({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-archivo-var",
})

const meaCulpa = Mea_Culpa({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-meaculpa-var",
})

const inter = Inter({
  weight: ["300", "400"],
  subsets: ["latin"],
  variable: "--font-inter-var",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://bmkstudio.be"),
  title: {
    default: "Bmk Studio — Photographie & Vidéo Commerciale · Bruxelles",
    template: "%s | Bmk Studio"
  },
  description: "Bmk Studio, studio de photographie produit et vidéo commerciale basé à Bruxelles. Spécialisé dans la mise en lumière des produits, artisanat et marques premium. Disponible en Belgique et à l'international.",
  keywords: [
    "photographe Bruxelles", "photographie produit Bruxelles", "studio photo Bruxelles",
    "vidéaste Bruxelles", "vidéo commerciale Bruxelles", "photographe produit Belgique",
    "photo artisanat Belgique", "photographie luxe Bruxelles", "studio vidéo Bruxelles",
    "photographe packshot Bruxelles", "photo e-commerce Belgique", "vidéo réseaux sociaux Bruxelles",
    "photographe maroquinerie", "photographe joaillerie", "photographe cosmétiques",
    "photographe restaurant Bruxelles", "photo culinaire Bruxelles", "photographe coiffure Bruxelles",
    "formation photo Bruxelles", "formation Bruxelles", "apprendre photographie Bruxelles",
    "atelier photo produit", "BMK Studio", "Bmk photographie", "photographe commercial Belgique",
    "Brussels photographer", "Brussels product photography", "commercial photographer Brussels",
    "Brussels video production", "product photographer Belgium", "Brussels studio photography",
    "artisan photography Belgium", "luxury photography Brussels", "Brussels brand photography",
    "photographer Brussels", "videographer Brussels", "Brussels content creator"
  ],
  authors: [{ name: "Bmk Studio" }],
  creator: "Bmk Studio",
  openGraph: {
    type: "website",
    locale: "fr_BE",
    alternateLocale: "en_GB",
    url: "https://bmkstudio.be",
    siteName: "Bmk Studio",
    title: "Bmk Studio — Photographie & Vidéo Commerciale · Bruxelles",
    description: "Studio de photographie produit et vidéo commerciale basé à Bruxelles. Lumière dramatique, textures sublimées, images qui vendent.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Bmk Studio — Photographie & Vidéo Commerciale Bruxelles" }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Bmk Studio — Photographie & Vidéo Commerciale",
    description: "Studio de photographie produit et vidéo commerciale basé à Bruxelles.",
    images: ["/og-image.jpg"]
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  icons: {
    icon: [
      { url: "/PJ_437_Logo-01.svg", type: "image/svg+xml" },
    ],
    shortcut: "/PJ_437_Logo-01.svg",
    apple: "/PJ_437_Logo-01.svg",
  },
  alternates: {
    canonical: "https://bmkstudio.be",
    languages: { "fr-BE": "https://bmkstudio.be", "en": "https://bmkstudio.be/en" }
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${archivoBlack.variable} ${meaCulpa.variable} ${inter.variable} ${inter.variable}`}
    >
      <body className="bg-bmk-bg font-inter text-bmk-text antialiased">
        <Nav />
        <GSAPProvider>{children}</GSAPProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
