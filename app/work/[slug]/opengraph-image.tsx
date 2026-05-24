import { ImageResponse } from "next/og";
import { getProjectBySlug, getAllSlugs } from "@/lib/projects";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Project case study";

export function generateImageMetadata() {
  return getAllSlugs().map((slug) => ({ id: slug, alt: `${slug} case study` }));
}

export default async function OpenGraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  const name = project?.name ?? "Project";
  const tagline = project?.tagline ?? "";
  const role = project?.context ?? "Imran Ansari";

  // Map the project's accent class to a real gradient on the OG image.
  const gradients: Record<string, string> = {
    "smart-market":
      "linear-gradient(135deg, #0d9488 0%, #134e4a 50%, #18181b 100%)",
    "google-rmi":
      "linear-gradient(135deg, #f97316 0%, #b91c1c 50%, #312e81 100%)",
    "route-registration":
      "linear-gradient(135deg, #10b981 0%, #0e7490 50%, #1e3a8a 100%)",
    shipstation:
      "linear-gradient(135deg, #3b82f6 0%, #4338ca 50%, #18181b 100%)",
    "plenti-exchange":
      "linear-gradient(135deg, #f59e0b 0%, #ca8a04 50%, #064e3b 100%)",
    morehands:
      "linear-gradient(135deg, #f97316 0%, #e11d48 50%, #581c87 100%)",
    "slack-claude-bridge":
      "linear-gradient(135deg, #7c3aed 0%, #6b21a8 50%, #f59e0b 100%)",
    stockpe:
      "linear-gradient(135deg, #10b981 0%, #f59e0b 50%, #be123c 100%)",
    vibin:
      "linear-gradient(135deg, #ec4899 0%, #a21caf 50%, #312e81 100%)",
  };
  const gradient =
    (project && gradients[project.slug]) ?? gradients["vibin"];

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
          background: gradient,
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
              background: "rgba(255,255,255,0.85)",
            }}
          />
          <span
            style={{
              fontSize: 20,
              letterSpacing: 3,
              textTransform: "uppercase",
              opacity: 0.75,
            }}
          >
            imran ansari · case study
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ fontSize: 28, opacity: 0.7 }}>{role}</div>
          <div
            style={{
              fontSize: 80,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: -1,
              maxWidth: 980,
            }}
          >
            {name}
          </div>
          <div
            style={{
              fontSize: 26,
              maxWidth: 980,
              opacity: 0.85,
              lineHeight: 1.35,
            }}
          >
            {tagline}
          </div>
        </div>

        <div
          style={{
            fontSize: 18,
            opacity: 0.6,
            letterSpacing: 1,
          }}
        >
          portfolio-imran-ansari.vercel.app
        </div>
      </div>
    ),
    { ...size },
  );
}
