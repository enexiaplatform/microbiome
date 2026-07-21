import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "The Microbiome Home — science-backed guides to a microbiome-friendly home";

/** Site-wide default Open Graph image. */
export default function SiteOgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#FAF8F4",
          padding: 72,
          textAlign: "center",
        }}
      >
        <div
          style={{
            width: 72,
            height: 72,
            borderRadius: 18,
            backgroundColor: "#245A3C",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#FAF8F4",
            fontSize: 40,
            fontWeight: 700,
          }}
        >
          M
        </div>
        <span style={{ marginTop: 36, fontSize: 64, fontWeight: 600, color: "#1C2B23", lineHeight: 1.1 }}>
          The Microbiome Home
        </span>
        <span style={{ marginTop: 24, fontSize: 28, color: "#5C7A66", maxWidth: 820, lineHeight: 1.4 }}>
          Science-backed guides to a microbiome-friendly home — for you and your pets.
        </span>
        <div style={{ marginTop: 40, width: 64, height: 5, backgroundColor: "#C2713B", borderRadius: 3 }} />
      </div>
    ),
    { ...size },
  );
}
