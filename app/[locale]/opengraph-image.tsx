import { ImageResponse } from "next/og";

export const alt = "Partner Livingku — Co-living & Apartment Directory in Indonesia";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isId = locale === "id";

  const eyebrow = isId ? "DIREKTORI PROPERTI INDONESIA" : "INDONESIAN PROPERTY DIRECTORY";
  const headline1 = isId ? "Temukan Kost &" : "Find the Best";
  const headline2 = isId ? "Apartemen Terbaik" : "Co-living & Apartments";
  const sub = isId
    ? "Listing terverifikasi, harga transparan, kontak langsung owner"
    : "Verified listings, transparent pricing, direct owner contact";
  const tags = isId
    ? ["Terverifikasi", "Harga Transparan", "Chat WhatsApp"]
    : ["Verified Listings", "Transparent Pricing", "Direct WA Contact"];

  return new ImageResponse(
    (
      <div
        style={{
          background: "#0f1a23",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "80px 90px",
          fontFamily: "Georgia, serif",
          position: "relative",
        }}
      >
        {/* Accent bar */}
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 6, background: "#C9A84C" }} />

        <div style={{ color: "#C9A84C", fontSize: 15, fontFamily: "monospace", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 30 }}>
          {eyebrow}
        </div>

        <div style={{ display: "flex", alignItems: "baseline", gap: 14, marginBottom: 8 }}>
          <span style={{ color: "#ffffff", fontSize: 76, fontWeight: 700 }}>Partner</span>
          <span style={{ color: "#C9A84C", fontSize: 76, fontStyle: "italic" }}>Livingku</span>
        </div>

        <div style={{ color: "#e2e8f0", fontSize: 34, marginBottom: 20, fontWeight: 400 }}>
          {headline1} <span style={{ color: "#C9A84C", fontStyle: "italic" }}>{headline2}</span>
        </div>

        <div style={{ color: "#94a3b8", fontSize: 24, maxWidth: 680, lineHeight: 1.45, marginBottom: 48 }}>
          {sub}
        </div>

        <div style={{ display: "flex", gap: 14 }}>
          {tags.map((tag, i) => (
            <div
              key={tag}
              style={{
                background: i === 0 ? "#C9A84C" : "transparent",
                border: i === 0 ? "none" : "1.5px solid #374151",
                color: i === 0 ? "#0f1a23" : i === 1 ? "#C9A84C" : "#6b7280",
                padding: "10px 22px",
                borderRadius: 8,
                fontSize: 17,
                fontWeight: i === 0 ? 700 : 400,
                fontFamily: "monospace",
              }}
            >
              {tag}
            </div>
          ))}
        </div>

        <div style={{ color: "#4b5563", fontSize: 16, marginTop: 44, fontFamily: "monospace" }}>
          partnerlivingku.id{isId ? "" : "/en"}
        </div>
      </div>
    ),
    { ...size }
  );
}
