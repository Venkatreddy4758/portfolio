import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";
import { content } from "@/data/content";

export const alt = "Venkat Reddy Regulapally";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Generated Open Graph / Twitter share image (Section 35).
export async function GET() {
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
          background:
            "radial-gradient(120% 120% at 50% 0%, #741f3a 0%, #5e1826 55%, #3a211d 100%)",
          color: "#f8f0df",
          fontFamily: "Georgia, serif",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 36,
            border: "2px solid #c5a15a",
            borderRadius: 8,
            display: "flex",
          }}
        />
        <div style={{ fontSize: 26, letterSpacing: 8, color: "#c5a15a", display: "flex" }}>
          {content.hero.en.eyebrow.toUpperCase()}
        </div>
        <div style={{ fontSize: 88, marginTop: 18, color: "#fff9ed", display: "flex" }}>
          {profile.fullName}
        </div>
        <div style={{ fontSize: 40, marginTop: 8, color: "#e4c98e", display: "flex" }}>
          {profile.teluguName}
        </div>
        <div style={{ fontSize: 26, marginTop: 30, color: "#f8f0dfcc", display: "flex" }}>
          {content.hero.en.tagline1} {content.hero.en.tagline2}
        </div>
      </div>
    ),
    { ...size }
  );
}
