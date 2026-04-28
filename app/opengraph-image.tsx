import { ImageResponse } from "next/og";

export const alt = "Partner Livingku — Co-living & Apartment Directory in Indonesia";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0f0d0a",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "80px 90px",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            color: "#C4952A",
            fontSize: 16,
            fontFamily: "monospace",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            marginBottom: 32,
          }}
        >
          Indonesian Property Directory
        </div>

        <div style={{ display: "flex", alignItems: "baseline", gap: 16, marginBottom: 20 }}>
          <span style={{ color: "#ffffff", fontSize: 80, fontWeight: 700 }}>Partner</span>
          <span style={{ color: "#C4952A", fontSize: 80, fontStyle: "italic" }}>Livingku</span>
        </div>

        <div style={{ color: "#9ca3af", fontSize: 28, maxWidth: 680, lineHeight: 1.4 }}>
          Find the Best Co-living &amp; Apartments in Indonesia
        </div>

        <div style={{ display: "flex", gap: 16, marginTop: 52 }}>
          <div
            style={{
              background: "#C4952A",
              color: "#0f0d0a",
              padding: "10px 24px",
              borderRadius: 8,
              fontSize: 18,
              fontWeight: 700,
            }}
          >
            Verified Listings
          </div>
          <div
            style={{
              border: "1.5px solid #C4952A",
              color: "#C4952A",
              padding: "10px 24px",
              borderRadius: 8,
              fontSize: 18,
            }}
          >
            Transparent Pricing
          </div>
          <div
            style={{
              border: "1.5px solid #374151",
              color: "#6b7280",
              padding: "10px 24px",
              borderRadius: 8,
              fontSize: 18,
            }}
          >
            Direct WA Contact
          </div>
        </div>

        <div style={{ color: "#4b5563", fontSize: 17, marginTop: 44 }}>
          partnerlivingku.id
        </div>
      </div>
    ),
    { ...size }
  );
}
