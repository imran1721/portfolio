import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/container";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const RESUME_PATH = "/imran-ansari-resume.pdf";

export const metadata: Metadata = {
  title: "Resume",
  description:
    "Download Imran Ansari's resume — Senior Full-Stack Engineer focused on agentic AI and geospatial platforms.",
};

export default function ResumePage() {
  return (
    <>
      <SiteHeader />

      <section className="pt-12 sm:pt-16 pb-24">
        <Container>
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-sm text-zinc-500 hover:text-teal-700 transition-colors"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden
            >
              <path
                d="M19 12H5m0 0l6-6m-6 6l6 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Home
          </Link>

          <header className="mt-6 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-zinc-500 font-medium">
                Resume
              </p>
              <h1 className="mt-2 text-3xl sm:text-4xl font-semibold tracking-tight text-zinc-900">
                Imran Ansari — 2026
              </h1>
              <p className="mt-2 text-zinc-600 max-w-xl">
                Senior Full-Stack Engineer · Agentic AI &amp; Geospatial
                Platforms.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <a
                href={RESUME_PATH}
                download="Imran-Ansari-Resume.pdf"
                className="inline-flex items-center gap-1.5 rounded-md bg-zinc-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-teal-600 transition-colors"
              >
                Download PDF
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden
                >
                  <path
                    d="M12 3v12m0 0l-5-5m5 5l5-5M5 21h14"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
              <a
                href={RESUME_PATH}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-md border border-zinc-300 bg-white px-4 py-2.5 text-sm font-medium text-zinc-900 hover:bg-zinc-50 transition-colors"
              >
                Open in new tab
              </a>
            </div>
          </header>

          {/* PDF embed — falls back to a card for browsers that block embeds */}
          <div className="mt-8 overflow-hidden rounded-xl border border-zinc-200 bg-zinc-50">
            <object
              data={`${RESUME_PATH}#toolbar=0&navpanes=0&view=FitH`}
              type="application/pdf"
              className="w-full h-[80vh] sm:h-[90vh]"
              aria-label="Imran Ansari resume PDF preview"
            >
              <div className="p-8 text-center text-zinc-600">
                <p>Your browser can&apos;t preview the PDF inline.</p>
                <p className="mt-3">
                  <a
                    href={RESUME_PATH}
                    className="text-teal-700 underline-offset-4 hover:underline"
                  >
                    Download the resume
                  </a>{" "}
                  or{" "}
                  <a
                    href={RESUME_PATH}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-teal-700 underline-offset-4 hover:underline"
                  >
                    open it in a new tab
                  </a>
                  .
                </p>
              </div>
            </object>
          </div>
        </Container>
      </section>

      <SiteFooter />
    </>
  );
}
