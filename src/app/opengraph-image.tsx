import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const runtime = "edge";
export const alt = `${site.name} — Own Your Energy Future`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    <div
      style={{
        background: "#0d0b08",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "system-ui, sans-serif",
        position: "relative",
      }}
    >
      {/* glow blob */}
      <div
        style={{
          position: "absolute",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(245,166,35,0.22) 0%, transparent 70%)",
          top: -100,
          right: -100,
        }}
      />

      {/* brand line */}
      <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 32 }}>
        <div style={{ width: 48, height: 3, background: "#f5a623", borderRadius: 2 }} />
        <span style={{ color: "#f5a623", fontSize: 18, fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase" }}>
          {site.name}
        </span>
        <div style={{ width: 48, height: 3, background: "#f5a623", borderRadius: 2 }} />
      </div>

      {/* headline */}
      <div
        style={{
          fontSize: 72,
          fontWeight: 700,
          color: "#f4f8ff",
          textAlign: "center",
          lineHeight: 1.05,
          maxWidth: 900,
          letterSpacing: "-0.02em",
        }}
      >
        {site.tagline.lead}{" "}
        <span style={{ color: "#f5a623" }}>{site.tagline.accent}</span>
      </div>

      {/* sub */}
      <div
        style={{
          fontSize: 24,
          color: "rgba(248,244,238,0.7)",
          marginTop: 24,
          textAlign: "center",
          maxWidth: 700,
        }}
      >
        {site.address.city}, {site.address.region} · {site.trust.installs.toLocaleString()}+ Installs · {site.trust.warrantyYears}-yr Warranty
      </div>

      {/* trust stats row */}
      <div style={{ display: "flex", gap: 48, marginTop: 48 }}>
        {[
          { v: site.trust.totalSaved, l: "Total saved" },
          { v: `${site.trust.rating}★`, l: `${site.trust.reviews}+ reviews` },
          { v: "$0-down", l: "Financing" },
        ].map(({ v, l }) => (
          <div key={l} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <span style={{ color: "#f5a623", fontSize: 28, fontWeight: 700 }}>{v}</span>
            <span style={{ color: "rgba(244,248,255,0.55)", fontSize: 14, marginTop: 4 }}>{l}</span>
          </div>
        ))}
      </div>
    </div>,
    { ...size },
  );
}
