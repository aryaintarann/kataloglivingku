import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans, Space_Mono } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-jakarta",
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://partnerlivingku.id"),
  title: "Find the Best Co-living & Apartments in Indonesia | Partner Livingku",
  description:
    "Partner Livingku — the trusted co-living and apartment directory in Indonesia. Find your dream home in Jakarta, Bandung, Surabaya, Bali, and other cities. Transparent pricing, verified listings.",
  keywords: [
    "co-living Jakarta",
    "co-living Indonesia",
    "apartment Bandung",
    "rent room Indonesia",
    "sewa kost Jakarta",
    "co-living directory",
    "verified listings Indonesia",
    "affordable apartment Indonesia",
    "rent apartment Indonesia",
    "Partner Livingku",
    "kost Jakarta",
    "apartemen Bandung",
  ],
  openGraph: {
    title: "Find the Best Co-living & Apartments in Indonesia | Partner Livingku",
    description:
      "The trusted co-living and apartment directory across Indonesia. Verified listings, transparent pricing.",
    url: "https://partnerlivingku.id",
    siteName: "Partner Livingku",
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Partner Livingku — Co-living & Apartment Directory in Indonesia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Find the Best Co-living & Apartments in Indonesia | Partner Livingku",
    description:
      "The trusted co-living and apartment directory across Indonesia.",
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://partnerlivingku.id",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://partnerlivingku.id/#organization",
      name: "Partner Livingku",
      url: "https://partnerlivingku.id",
      description: "Trusted co-living and apartment directory in Indonesia.",
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer service",
        availableLanguage: ["English", "Indonesian"],
        hoursAvailable: "Mo-Su 08:00-21:00",
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://partnerlivingku.id/#website",
      url: "https://partnerlivingku.id",
      name: "Partner Livingku",
      publisher: { "@id": "https://partnerlivingku.id/#organization" },
      inLanguage: "en",
      potentialAction: {
        "@type": "SearchAction",
        target: "https://partnerlivingku.id/#units",
        "query-input": "required name=search_term_string",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${plusJakarta.variable} ${spaceMono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
