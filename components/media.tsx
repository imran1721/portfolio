import type { Media as MediaT } from "@/lib/projects";
import { cn } from "@/lib/cn";

/**
 * Renders the project hero media — image, video, or a stylised placeholder
 * block until real assets land. The placeholder uses a gradient and a wordmark
 * so the layout looks intentional, not unfinished.
 */
export function Media({
  media,
  className,
  aspect = "video",
}: {
  media: MediaT;
  className?: string;
  /** "video" = 16:9, "square" = 1:1. */
  aspect?: "video" | "square";
}) {
  const aspectCls = aspect === "video" ? "aspect-video" : "aspect-square";

  if (media.kind === "image") {
    return (
      <div
        className={cn(
          "relative overflow-hidden rounded-xl border border-zinc-200 bg-zinc-100",
          aspectCls,
          className,
        )}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={media.src}
          alt={media.alt}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
    );
  }
  if (media.kind === "video") {
    return (
      <div
        className={cn(
          "relative overflow-hidden rounded-xl border border-zinc-200 bg-zinc-900",
          aspectCls,
          className,
        )}
      >
        <video
          src={media.src}
          poster={media.poster}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
    );
  }
  // placeholder
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl border border-zinc-200",
        aspectCls,
        className,
      )}
    >
      {/* gentle breathing gradient */}
      <div
        className={cn("absolute inset-0 breathe bg-gradient-to-br", media.gradient)}
        aria-hidden
      />
      {/* subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.18]"
        aria-hidden
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      {/* shimmer band — slow diagonal sweep */}
      <div
        className="absolute inset-0 opacity-30 mix-blend-overlay"
        aria-hidden
        style={{
          background:
            "linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.5) 50%, transparent 70%)",
          backgroundSize: "200% 100%",
          animation: "breathe 10s ease-in-out infinite",
        }}
      />
      <div className="absolute inset-0 flex items-end p-5 sm:p-6">
        <div className="text-white">
          <p className="text-[10px] uppercase tracking-[0.18em] opacity-80">
            Preview
          </p>
          <p className="mt-1 text-lg sm:text-xl font-semibold tracking-tight text-balance">
            {media.label}
          </p>
        </div>
      </div>
    </div>
  );
}
