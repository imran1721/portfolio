/**
 * Ambient backdrop for the hero section: two slow-drifting blurred blobs
 * and a faint dot grid masked toward centre. Pure CSS, GPU-accelerated.
 * Sits behind the hero content via `absolute inset-0 pointer-events-none`.
 */
export function HeroBackdrop() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {/* dot grid — fades out toward edges via radial mask */}
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(9, 9, 11, 0.18) 1px, transparent 0)",
          backgroundSize: "22px 22px",
          maskImage:
            "radial-gradient(ellipse 70% 60% at 50% 40%, black 30%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 60% at 50% 40%, black 30%, transparent 75%)",
        }}
      />

      {/* large teal blob — top-left */}
      <div
        className="blob-a absolute -left-32 -top-32 h-[480px] w-[480px] rounded-full opacity-40 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(13,148,136,0.55) 0%, rgba(13,148,136,0) 70%)",
        }}
      />

      {/* zinc blob — bottom-right */}
      <div
        className="blob-b absolute -right-40 top-20 h-[520px] w-[520px] rounded-full opacity-30 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(99, 102, 241, 0.35) 0%, rgba(99, 102, 241, 0) 70%)",
        }}
      />

      {/* third faint glow — anchor near hero text */}
      <div
        className="absolute left-1/2 top-1/2 h-[280px] w-[640px] -translate-x-1/2 -translate-y-1/2 opacity-50 blur-3xl"
        style={{
          background:
            "radial-gradient(ellipse, rgba(20,184,166,0.18) 0%, rgba(20,184,166,0) 70%)",
        }}
      />

      {/* bottom fade so content below the hero blends cleanly */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-white" />
    </div>
  );
}
