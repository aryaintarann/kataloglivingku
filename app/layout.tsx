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
  title: "Find the Best Co-living & Apartments in Indonesia | Partner Livingku",
  description:
    "Partner Livingku — the trusted co-living and apartment directory in Indonesia. Find your dream home in Jakarta, Bandung, Surabaya, Bali, and other cities. Transparent pricing, verified listings.",
  keywords: [
    "co-living Jakarta",
    "apartment Bandung",
    "rent room Indonesia",
    "co-living directory",
    "verified listings",
    "find cheap apartment",
    "rent apartment Indonesia",
    "Partner Livingku",
  ],
  openGraph: {
    title: "Find the Best Co-living & Apartments in Indonesia | Partner Livingku",
    description:
      "The trusted co-living and apartment directory across Indonesia. Verified listings, transparent pricing.",
    url: "https://partnerlivingku.id",
    siteName: "Partner Livingku",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Find the Best Co-living & Apartments in Indonesia | Partner Livingku",
    description:
      "The trusted co-living and apartment directory across Indonesia.",
  },
  robots: {
    index: true,
    follow: true,
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
      description:
        "Trusted co-living and apartment directory in Indonesia.",
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer service",
        availableLanguage: "English",
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://partnerlivingku.id/#website",
      url: "https://partnerlivingku.id",
      name: "Partner Livingku",
      publisher: { "@id": "https://partnerlivingku.id/#organization" },
      inLanguage: "en",
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Is Partner Livingku's service free for seekers?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, finding a home on Partner Livingku is 100% free for seekers.",
          },
        },
        {
          "@type": "Question",
          name: "Are all listings verified?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, every listing shown has gone through a verification process by our team.",
          },
        },
      ],
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
