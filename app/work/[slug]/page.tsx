import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Container } from "@/components/container";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Media } from "@/components/media";
import { Pill } from "@/components/pill";
import {
  PROJECTS,
  getProjectBySlug,
  getAllSlugs,
} from "@/lib/projects";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata(
  props: PageProps<"/work/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: project.name,
    description: project.tagline,
    openGraph: {
      title: `${project.name} — Imran Ansari`,
      description: project.tagline,
      type: "article",
    },
  };
}

export default async function CaseStudyPage(
  props: PageProps<"/work/[slug]">,
) {
  const { slug } = await props.params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  // simple prev/next ring through the project list for footer nav
  const idx = PROJECTS.findIndex((p) => p.slug === project.slug);
  const next = PROJECTS[(idx + 1) % PROJECTS.length];

  return (
    <>
      <SiteHeader />

      <article className="pt-12 sm:pt-16 pb-24">
        <Container>
          {/* breadcrumb */}
          <Link
            href="/#work"
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
            All work
          </Link>

          {/* title block */}
          <header className="mt-6">
            <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">
              <span className={`font-medium ${project.accentClass}`}>
                {project.context}
              </span>
              <span aria-hidden> · </span>
              <span>{project.dateRange}</span>
            </p>
            <h1 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-zinc-900 text-balance leading-[1.1]">
              {project.name}
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-zinc-600 leading-relaxed text-pretty">
              {project.tagline}
            </p>

            <div className="mt-6 flex flex-wrap gap-1.5">
              {project.stack.map((s) => (
                <Pill key={s}>{s}</Pill>
              ))}
            </div>

            {project.links.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-3">
                {project.links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={
                      l.variant === "primary"
                        ? "inline-flex items-center gap-1.5 rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-teal-600 transition-colors"
                        : "inline-flex items-center gap-1.5 rounded-md border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-900 hover:bg-zinc-50 transition-colors"
                    }
                  >
                    {l.label}
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden
                    >
                      <path
                        d="M7 17L17 7m0 0H8m9 0v9"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </a>
                ))}
              </div>
            )}
          </header>

          {/* hero media */}
          <div className="mt-10">
            <Media media={project.hero} />
          </div>

          {/* module walkthroughs gallery — only when project has secondary media */}
          {project.mediaShots && project.mediaShots.length > 0 && (
            <section className="mt-14">
              <p className="text-xs uppercase tracking-[0.18em] text-zinc-500 font-medium">
                Module walkthroughs
              </p>
              <div
                className={
                  project.mediaShots.length === 1
                    ? "mt-4 grid gap-6 grid-cols-1"
                    : project.mediaShots.length === 2
                      ? "mt-4 grid gap-6 sm:grid-cols-2"
                      : "mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
                }
              >
                {project.mediaShots.map((shot, i) => (
                  <figure key={i} className="space-y-3">
                    <Media media={shot.media} />
                    <figcaption>
                      <p className="text-sm font-semibold text-zinc-900">
                        {shot.caption}
                      </p>
                      {shot.description && (
                        <p className="mt-1 text-sm text-zinc-600 leading-relaxed text-pretty">
                          {shot.description}
                        </p>
                      )}
                    </figcaption>
                  </figure>
                ))}
              </div>
            </section>
          )}

          {/* content */}
          <div className="mt-12 grid gap-12 lg:grid-cols-3">
            {/* main column */}
            <div className="lg:col-span-2 space-y-12">
              <Section title="Context">
                {project.intro.map((p, i) => (
                  <p
                    key={i}
                    className="text-zinc-700 leading-relaxed text-pretty"
                  >
                    {p}
                  </p>
                ))}
              </Section>

              <Section title="What I built">
                <ul className="space-y-3">
                  {project.built.map((b, i) => (
                    <li key={i} className="flex gap-3 text-zinc-700 leading-relaxed text-pretty">
                      <span
                        aria-hidden
                        className="mt-2 inline-block h-1.5 w-1.5 flex-none rounded-full bg-teal-600"
                      />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </Section>

              {project.impact && project.impact.length > 0 && (
                <Section title="Impact">
                  <ul className="space-y-3">
                    {project.impact.map((b, i) => (
                      <li
                        key={i}
                        className="flex gap-3 text-zinc-700 leading-relaxed text-pretty"
                      >
                        <span
                          aria-hidden
                          className="mt-2 inline-block h-1.5 w-1.5 flex-none rounded-full bg-zinc-900"
                        />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </Section>
              )}

              {project.deepDive && project.deepDive.length > 0 && (
                <Section title="Deep dive">
                  <div className="space-y-4">
                    {project.deepDive.map((d, i) => (
                      <details
                        key={i}
                        className="group rounded-lg border border-zinc-200 bg-white open:bg-zinc-50/60 transition-colors"
                      >
                        <summary className="cursor-pointer list-none px-5 py-3.5 flex items-center justify-between text-sm font-medium text-zinc-900 hover:text-teal-700">
                          {d.title}
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            aria-hidden
                            className="text-zinc-400 group-open:rotate-180 transition-transform"
                          >
                            <path
                              d="M6 9l6 6 6-6"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </summary>
                        <p className="px-5 pb-4 text-sm text-zinc-700 leading-relaxed text-pretty">
                          {d.body}
                        </p>
                      </details>
                    ))}
                  </div>
                </Section>
              )}
            </div>

            {/* sidebar */}
            <aside className="lg:col-span-1">
              <div className="lg:sticky lg:top-20 space-y-6 rounded-xl border border-zinc-200 bg-zinc-50/60 p-5 text-sm">
                <Meta label="Role" value={project.context} />
                <Meta label="Timeframe" value={project.dateRange} />
                <Meta
                  label="Stack"
                  value={project.stack.join(" · ")}
                  mono
                />
                {project.links.length > 0 && (
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.18em] text-zinc-500 font-medium">
                      Links
                    </p>
                    <ul className="mt-2 space-y-1.5">
                      {project.links.map((l) => (
                        <li key={l.href}>
                          <a
                            href={l.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-teal-700 hover:text-teal-900 underline-offset-4 hover:underline"
                          >
                            {l.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </aside>
          </div>

          {/* next project */}
          <div className="mt-20 border-t border-zinc-200 pt-8">
            <Link
              href={`/work/${next.slug}`}
              className="group flex items-center justify-between gap-4 rounded-xl border border-zinc-200 bg-white p-5 hover:border-zinc-300 hover:bg-zinc-50 transition-colors"
            >
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-zinc-500 font-medium">
                  Next case study
                </p>
                <p className="mt-1 text-lg font-semibold tracking-tight text-zinc-900 group-hover:text-teal-700 transition-colors">
                  {next.name}
                </p>
              </div>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden
                className="text-zinc-400 group-hover:translate-x-1 group-hover:text-teal-700 transition-all"
              >
                <path
                  d="M5 12h14m0 0l-6-6m6 6l-6 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>
        </Container>
      </article>

      <SiteFooter />
    </>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="text-xs uppercase tracking-[0.18em] text-zinc-500 font-medium">
        {title}
      </h2>
      <div className="mt-4 space-y-4">{children}</div>
    </section>
  );
}

function Meta({
  label,
  value,
  mono,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-[0.18em] text-zinc-500 font-medium">
        {label}
      </p>
      <p
        className={`mt-1 text-zinc-800 leading-relaxed ${mono ? "font-mono text-xs" : ""}`}
      >
        {value}
      </p>
    </div>
  );
}
