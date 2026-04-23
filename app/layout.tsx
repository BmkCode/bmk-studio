import type { Metadata } from "next";
import { Archivo_Black, Mea_Culpa, Inter } from "next/font/google";
import "./globals.css";
import Nav from "./components/Nav";
import GSAPProvider from "./components/GSAPProvider";
import { SpeedInsights } from "@vercel/speed-insights/next";

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "Photographer"],
  name: "Bmk Studio",
  description: "Studio de photographie produit et vidéo commerciale basé à Bruxelles. Spécialisé dans la mise en lumière des produits, artisanat et marques premium.",
  url: "https://www.bmkstudio.be",
  logo: "https://www.bmkstudio.be/PJ_437_Logo-01.svg",
  image: "https://www.bmkstudio.be/og-image.jpg",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Bruxelles",
    addressCountry: "BE",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 50.8503,
    longitude: 4.3517,
  },
  areaServed: ["Bruxelles", "Belgique", "Wallonie", "Flandre"],
  priceRange: "€€",
  sameAs: [
    "https://www.instagram.com/bmk.studio/",
    "https://www.linkedin.com/in/m-khalid-bouanane-77a51223a/",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Services Bmk Studio",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Photographie produit" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Vidéo commerciale" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Formation photo & vidéo" } },
    ],
  },
};

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
  metadataBase: new URL("https://www.bmkstudio.be"),
  title: {
    default: "Bmk Studio — Photographie & Vidéo Commerciale · Bruxelles",
    template: "%s | Bmk Studio"
  },
  description: "Bmk Studio, studio de photographie produit et vidéo commerciale basé à Bruxelles. Spécialisé dans la mise en lumière des produits, artisanat et marques premium. Disponible en Belgique et à l'international.",
  keywords: [
    "photographe Bruxelles", "photographie produit Bruxelles", "studio photo Bruxelles",
    "vidéaste Bruxelles", "vidéo commerciale Bruxelles", "photographe produit Belgique",
    "photographe packshot Bruxelles", "photo e-commerce Belgique",
    "formation photo Bruxelles", "atelier photo produit", "BMK Studio",
    "Brussels photographer", "Brussels product photography", "commercial photographer Brussels",
  ],
  authors: [{ name: "Bmk Studio" }],
  creator: "Bmk Studio",
  openGraph: {
    type: "website",
    locale: "fr_BE",
    alternateLocale: "en_US",
    url: "https://www.bmkstudio.be",
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
      { url: "/favicon.ico", sizes: "any" },
    ],
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  alternates: {
    canonical: "/",
    languages: {
      "x-default": "https://www.bmkstudio.be",
      "fr-BE": "https://www.bmkstudio.be",
      "en": "https://www.bmkstudio.be/en",
    },
  },
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <Nav />
        <GSAPProvider>{children}</GSAPProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
