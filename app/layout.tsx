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
  title: "Temukan Kost & Apartemen Terbaik di Indonesia | Partner Livingku",
  description:
    "Partner Livingku — direktori kost dan apartemen terpercaya di Indonesia. Temukan hunian impianmu di Jakarta, Bandung, Surabaya, Bali, dan kota lainnya. Harga transparan, listing terverifikasi.",
  keywords: [
    "kost Jakarta",
    "apartemen Bandung",
    "sewa kost Indonesia",
    "direktori kost",
    "kost terverifikasi",
    "cari kost murah",
    "apartemen sewa Indonesia",
    "Partner Livingku",
  ],
  openGraph: {
    title: "Temukan Kost & Apartemen Terbaik di Indonesia | Partner Livingku",
    description:
      "Direktori kost dan apartemen terpercaya di seluruh Indonesia. Listing terverifikasi, harga transparan.",
    url: "https://partnerlivingku.id",
    siteName: "Partner Livingku",
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Temukan Kost & Apartemen Terbaik di Indonesia | Partner Livingku",
    description:
      "Direktori kost dan apartemen terpercaya di seluruh Indonesia.",
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
        "Direktori kost-kostan dan apartemen terpercaya di Indonesia.",
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer service",
        availableLanguage: "Indonesian",
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://partnerlivingku.id/#website",
      url: "https://partnerlivingku.id",
      name: "Partner Livingku",
      publisher: { "@id": "https://partnerlivingku.id/#organization" },
      inLanguage: "id",
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Apakah layanan Partner Livingku gratis untuk pencari kost?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Ya, layanan pencarian hunian di Partner Livingku 100% gratis untuk pencari kost dan apartemen.",
          },
        },
        {
          "@type": "Question",
          name: "Apakah semua listing sudah diverifikasi?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Ya, setiap listing yang tampil telah melalui proses verifikasi oleh tim kami.",
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
      lang="id"
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
