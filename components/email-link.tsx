"use client";

import { useEffect, useState } from "react";

const EMAIL = "m.imran.ansari.2020@gmail.com";
const SUBJECT = "Hello from your portfolio";

/**
 * Smart email link.
 *
 * Native <a href="mailto:..."> doesn't visibly do anything if the user has no
 * default mail client (common on Macs where Mail.app isn't set up). We solve
 * that by ALSO copying the address to the clipboard and showing a transient
 * toast — so every click yields a usable result, regardless of mail setup.
 *
 * The mailto: anchor is preserved so users who DO have a configured mail app
 * still get the compose window. Pre-filled subject helps tooling.
 */
export function EmailLink({
  children,
  className,
  ariaLabel,
}: {
  children: React.ReactNode;
  className?: string;
  ariaLabel?: string;
}) {
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2400);
    return () => clearTimeout(t);
  }, [toast]);

  const handleClick = async () => {
    // Try clipboard. Failures (e.g. permission denied) shouldn't break the link.
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(EMAIL);
        setToast(`Email copied — ${EMAIL}`);
      }
    } catch {
      // Fall back to a textarea + execCommand for older browsers.
      try {
        const ta = document.createElement("textarea");
        ta.value = EMAIL;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
        setToast(`Email copied — ${EMAIL}`);
      } catch {
        // Last resort: show the address so the user can copy it manually.
        setToast(`Reach me at ${EMAIL}`);
      }
    }
  };

  return (
    <>
      <a
        href={`mailto:${EMAIL}?subject=${encodeURIComponent(SUBJECT)}`}
        onClick={handleClick}
        className={className}
        aria-label={ariaLabel ?? `Email ${EMAIL}`}
      >
        {children}
      </a>
      {/* Toast — fixed-position so it floats over content; no layout shift. */}
      {toast && (
        <div
          role="status"
          aria-live="polite"
          className="email-toast fixed bottom-6 left-1/2 -translate-x-1/2 z-50 rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-black/20"
        >
          {toast}
        </div>
      )}
    </>
  );
}
