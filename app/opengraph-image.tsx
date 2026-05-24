import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Imran Ansari — Senior Full-Stack Engineer";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 64,
          background:
            "linear-gradient(135deg, #0d9488 0%, #134e4a 45%, #18181b 100%)",
          color: "white",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: 6,
              background: "#5eead4",
            }}
          />
          <span
            style={{
              fontSize: 22,
              letterSpacing: 3,
              textTransform: "uppercase",
              opacity: 0.75,
            }}
          >
            imran ansari · portfolio
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontSize: 36,
              opacity: 0.7,
              letterSpacing: 0.5,
            }}
          >
            Senior Full-Stack Engineer
          </div>
          <div
            style={{
              fontSize: 76,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: -1,
              maxWidth: 980,
            }}
          >
            Agentic AI &amp; Geospatial Platforms.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 12,
            alignItems: "center",
          }}
        >
          {[
            "React 19",
            "TypeScript",
            "FastAPI",
            "PostGIS",
            "Deck.gl",
            "BigQuery",
            "GCP",
          ].map((s) => (
            <span
              key={s}
              style={{
                padding: "8px 14px",
                borderRadius: 8,
                background: "rgba(255,255,255,0.10)",
                border: "1px solid rgba(255,255,255,0.18)",
                fontSize: 20,
                color: "rgba(255,255,255,0.92)",
              }}
            >
              {s}
            </span>
          ))}
        </div>
      </div>
    ),
    { ...size },
  );
}
