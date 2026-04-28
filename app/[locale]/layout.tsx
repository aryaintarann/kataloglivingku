import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans, Space_Mono } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import "../globals.css";

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

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isId = locale === "id";

  const title = isId
    ? "Temukan Ko-living & Apartemen Terbaik di Indonesia | Partner Livingku"
    : "Find the Best Co-living & Apartments in Indonesia | Partner Livingku";
  const description = isId
    ? "Partner Livingku — direktori ko-living dan apartemen terpercaya di Indonesia. Temukan hunian impian Anda di Jakarta, Bandung, Surabaya, Bali, dan kota lainnya. Harga transparan, listing terverifikasi."
    : "Partner Livingku — the trusted co-living and apartment directory in Indonesia. Find your dream home in Jakarta, Bandung, Surabaya, Bali, and other cities. Transparent pricing, verified listings.";

  return {
    metadataBase: new URL("https://partnerlivingku.id"),
    title,
    description,
    keywords: isId
      ? ["kost Jakarta", "apartemen Bandung", "sewa kost Indonesia", "ko-living terverifikasi", "cari hunian Indonesia", "Partner Livingku", "direktori properti", "sewa apartemen Indonesia"]
      : ["co-living Jakarta", "apartment Bandung", "rent room Indonesia", "verified listings Indonesia", "affordable apartment Indonesia", "rent apartment Indonesia", "Partner Livingku"],
    openGraph: {
      title,
      description,
      url: isId ? "https://partnerlivingku.id" : "https://partnerlivingku.id/en",
      siteName: "Partner Livingku",
      locale: isId ? "id_ID" : "en_US",
      type: "website",
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Partner Livingku" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/opengraph-image"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
    },
    icons: {
      icon: [
        { url: "/icon.svg", type: "image/svg+xml" },
        { url: "/favicon.svg", type: "image/svg+xml" },
      ],
      apple: [{ url: "/apple-icon.svg", type: "image/svg+xml" }],
    },
    alternates: {
      canonical: isId ? "https://partnerlivingku.id" : "https://partnerlivingku.id/en",
      languages: {
        "id": "https://partnerlivingku.id",
        "en": "https://partnerlivingku.id/en",
      },
    },
  };
}

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
      inLanguage: ["id", "en"],
      potentialAction: {
        "@type": "SearchAction",
        target: "https://partnerlivingku.id/#units",
        "query-input": "required name=search_term_string",
      },
    },
  ],
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${playfair.variable} ${plusJakarta.variable} ${spaceMono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
