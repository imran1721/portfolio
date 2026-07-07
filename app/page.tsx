import Link from "next/link";
import { Container } from "@/components/container";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ProjectCard } from "@/components/project-card";
import { Pill } from "@/components/pill";
import { Reveal } from "@/components/reveal";
import { HeroBackdrop } from "@/components/hero-backdrop";
import { EmailLink } from "@/components/email-link";
import { YearsOfExperience } from "@/components/years-of-experience";
import { PROJECTS } from "@/lib/projects";

const SKILLS = [
  {
    title: "AI / Agentic",
    items:
      "LLM tool-calling · function calling · schema-grounded (RAG-style) SQL generation · agent skill orchestration · in-browser Pyodide · multi-turn chat · prompt engineering",
    accent: true,
  },
  {
    title: "Frontend",
    items:
      "React 19 · Next.js · Vinxi · TypeScript · TanStack Query · Zustand · Deck.gl · Tailwind · MUI · Rio.js extensions",
  },
  {
    title: "Backend",
    items: "Python (FastAPI) · Node.js · REST · GraphQL",
  },
  {
    title: "Data",
    items:
      "PostgreSQL · PostGIS · TimescaleDB · ClickHouse · BigQuery · Iceberg · Trino · Kafka · Redis · Supabase",
  },
  {
    title: "Cloud & DevOps",
    items:
      "GCP (Cloud Run, BigQuery, Cloud Build, Secret Manager, Maps APIs) · Docker · Docker Compose · Ansible · Traefik · CI/CD · Vercel",
  },
  {
    title: "Testing",
    items:
      "Playwright (visual regression, real-API E2E) · Jest · OpenTelemetry",
  },
];

export default function HomePage() {
  const workProjects = PROJECTS.filter(
    (p) => p.featured && p.category === "work",
  );
  const earlierProjects = PROJECTS.filter(
    (p) => p.featured && p.category === "earlier",
  );
  const personalProjects = PROJECTS.filter(
    (p) => p.featured && p.category === "personal",
  );

  return (
    <>
      <SiteHeader />

      {/* HERO */}
      <section className="relative overflow-hidden pt-16 sm:pt-24 pb-16 sm:pb-20">
        <HeroBackdrop />
        <Container className="relative">
          <p
            className="rise-in text-xs uppercase tracking-[0.18em] text-teal-700 font-medium"
            style={{ animationDelay: "0ms" }}
          >
            Senior Full-Stack Engineer
          </p>
          <h1
            className="rise-in mt-3 text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-zinc-900 text-balance leading-[1.05]"
            style={{ animationDelay: "75ms" }}
          >
            Building{" "}
            <span className="gradient-text-drift bg-gradient-to-r from-teal-600 via-emerald-700 to-zinc-900 bg-clip-text text-transparent">
              agentic AI
            </span>{" "}
            and{" "}
            <span className="gradient-text-drift bg-gradient-to-r from-teal-700 via-cyan-700 to-zinc-900 bg-clip-text text-transparent">
              geospatial
            </span>{" "}
            platforms.
          </h1>
          <p
            className="rise-in mt-6 max-w-2xl text-lg text-zinc-600 text-pretty leading-relaxed"
            style={{ animationDelay: "180ms" }}
          >
            I&apos;m{" "}
            <span className="font-medium text-zinc-900">Imran Ansari</span> — a
            full-stack engineer with <YearsOfExperience /> years shipping
            production platforms.
            Currently leading the{" "}
            <span className="font-medium text-zinc-900">frontend rewrite</span>{" "}
            of{" "}
            <span className="font-medium text-zinc-900">SmartMarket.ai</span>{" "}
            into an agentic, dataset-aware geospatial intelligence platform —
            React 19, in-browser Pyodide, LLM tool-calling, and schema-grounded
            SQL on the client.
          </p>

          <div
            className="rise-in mt-8 flex flex-wrap items-center gap-3"
            style={{ animationDelay: "280ms" }}
          >
            <a
              href="#work"
              className="inline-flex items-center gap-1.5 rounded-md bg-zinc-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-teal-600 transition-[background-color,transform] duration-200 active:scale-[0.98]"
            >
              View work
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden
              >
                <path
                  d="M12 5v14m0 0l-6-6m6 6l6-6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
            <Link
              href="/resume"
              className="inline-flex items-center gap-1.5 rounded-md border border-zinc-300 bg-white/80 backdrop-blur px-4 py-2.5 text-sm font-medium text-zinc-900 hover:bg-zinc-50 hover:border-zinc-400 transition-[background-color,border-color,transform] duration-200 active:scale-[0.98]"
            >
              Download resume
            </Link>
            <EmailLink className="inline-flex items-center gap-1.5 rounded-md px-4 py-2.5 text-sm font-medium text-zinc-700 hover:text-teal-700 transition-colors">
              Get in touch →
            </EmailLink>
          </div>

          {/* Skybook teaser — surfaces the interactive portfolio above the fold */}
          <a
            href="https://skybook.vibin.click/"
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-5 inline-flex items-center gap-2 rounded-full border border-sky-300/50 bg-sky-50/70 px-3 py-1.5 text-xs font-medium text-sky-900 hover:border-sky-400 hover:bg-sky-100 transition-colors"
          >
            <span
              aria-hidden
              className="inline-block h-1.5 w-1.5 rounded-full bg-sky-500 animate-pulse"
            />
            <span>
              Prefer to fly through it? Try{" "}
              <span className="font-semibold">Skybook</span>
            </span>
            <span
              aria-hidden
              className="text-sky-700 group-hover:translate-x-0.5 transition-transform"
            >
              ↗
            </span>
          </a>

          <div
            className="rise-in mt-10 flex flex-wrap gap-2"
            style={{ animationDelay: "380ms" }}
          >
            <Pill variant="accent">Agentic AI</Pill>
            <Pill variant="accent">Geospatial</Pill>
            <Pill>React 19</Pill>
            <Pill>FastAPI</Pill>
            <Pill>PostGIS</Pill>
            <Pill>Deck.gl</Pill>
            <Pill>GCP</Pill>
            <Pill>Open to senior roles</Pill>
          </div>
        </Container>
      </section>

      {/* SELECTED WORK */}
      <section id="work" className="py-12 sm:py-16 border-t border-zinc-200">
        <Container>
          <Reveal className="flex items-end justify-between gap-4 mb-8">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-zinc-500 font-medium">
                Work
              </p>
              <h2 className="mt-2 text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-900">
                Selected work at Lepton.
              </h2>
            </div>
            <p className="hidden sm:block text-sm text-zinc-500 max-w-xs text-right">
              {workProjects.length} case studies — click any project for the
              deep dive.
            </p>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {workProjects.map((p, i) => (
              <Reveal key={p.slug} delay={i * 80}>
                <ProjectCard project={p} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* EARLIER WORK */}
      <section
        id="earlier"
        className="py-12 sm:py-16 border-t border-zinc-200"
      >
        <Container>
          <Reveal className="flex items-end justify-between gap-4 mb-8">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-zinc-500 font-medium">
                2021 – 2024
              </p>
              <h2 className="mt-2 text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-900">
                Earlier work at Innostax.
              </h2>
            </div>
            <p className="hidden sm:block text-sm text-zinc-500 max-w-xs text-right">
              Project Lead — 3 years across web, mobile, and shipping
              platforms.
            </p>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {earlierProjects.map((p, i) => (
              <Reveal key={p.slug} delay={i * 80}>
                <ProjectCard project={p} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* PERSONAL PROJECTS */}
      <section
        id="personal"
        className="py-12 sm:py-16 border-t border-zinc-200"
      >
        <Container>
          <Reveal className="flex items-end justify-between gap-4 mb-8">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-zinc-500 font-medium">
                On the side
              </p>
              <h2 className="mt-2 text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-900">
                Personal projects.
              </h2>
            </div>
            <p className="hidden sm:block text-sm text-zinc-500 max-w-xs text-right">
              {personalProjects.length} side projects — published, open-source,
              real users.
            </p>
          </Reveal>
          <div
            className={
              personalProjects.length === 4
                ? "grid grid-cols-1 sm:grid-cols-2 gap-6"
                : "grid grid-cols-1 md:grid-cols-3 gap-6"
            }
          >
            {personalProjects.map((p, i) => (
              <Reveal key={p.slug} delay={i * 80}>
                <ProjectCard project={p} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* SKILLS */}
      <section id="skills" className="py-12 sm:py-16 border-t border-zinc-200">
        <Container>
          <Reveal>
            <p className="text-xs uppercase tracking-[0.18em] text-zinc-500 font-medium">
              Stack
            </p>
            <h2 className="mt-2 text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-900">
              What I&apos;m good at.
            </h2>
          </Reveal>
          <div className="mt-8 grid gap-x-10 gap-y-6 sm:grid-cols-2">
            {SKILLS.map((s, i) => (
              <Reveal
                key={s.title}
                delay={i * 60}
                className={
                  s.accent
                    ? "sm:col-span-2 rounded-lg border border-teal-200 bg-teal-50/60 p-5"
                    : ""
                }
              >
                <h3 className="text-sm font-semibold tracking-tight text-zinc-900">
                  {s.title}
                </h3>
                <p className="mt-1.5 text-sm text-zinc-600 leading-relaxed">
                  {s.items}
                </p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* CONTACT */}
      <section
        id="contact"
        className="py-16 sm:py-24 border-t border-zinc-200 bg-zinc-50/40"
      >
        <Container size="narrow">
          <p className="text-xs uppercase tracking-[0.18em] text-zinc-500 font-medium">
            Get in touch
          </p>
          <h2 className="mt-2 text-3xl sm:text-4xl font-semibold tracking-tight text-zinc-900 text-balance">
            Open to Senior Full-Stack, Agentic AI &amp; Geospatial roles.
          </h2>
          <p className="mt-4 text-zinc-600 leading-relaxed">
            Whether you&apos;re building something with LLM tool-calling,
            agentic workflows, or large-scale geospatial pipelines — I&apos;d
            love to hear about it.
          </p>

          {/* Direct details */}
          <dl className="mt-8 grid sm:grid-cols-2 gap-x-8 gap-y-5 rounded-xl border border-zinc-200 bg-white p-5 sm:p-6">
            <div>
              <dt className="text-[11px] uppercase tracking-[0.18em] text-zinc-500 font-medium">
                Email
              </dt>
              <dd className="mt-1.5">
                <EmailLink className="text-base text-zinc-900 hover:text-teal-700 font-medium break-all">
                  m.imran.ansari.2020@gmail.com
                </EmailLink>
              </dd>
            </div>
            <div>
              <dt className="text-[11px] uppercase tracking-[0.18em] text-zinc-500 font-medium">
                Phone
              </dt>
              <dd className="mt-1.5">
                <a
                  href="tel:+918797005465"
                  className="text-base text-zinc-900 hover:text-teal-700 font-medium"
                >
                  +91 87970 05465
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-[11px] uppercase tracking-[0.18em] text-zinc-500 font-medium">
                Location
              </dt>
              <dd className="mt-1.5 text-base text-zinc-900 font-medium">
                Gurgaon, India
              </dd>
            </div>
            <div>
              <dt className="text-[11px] uppercase tracking-[0.18em] text-zinc-500 font-medium">
                Status
              </dt>
              <dd className="mt-1.5 inline-flex items-center gap-1.5 text-sm text-zinc-700">
                <span
                  aria-hidden
                  className="inline-block h-1.5 w-1.5 rounded-full bg-teal-500 animate-pulse"
                />
                Open to senior roles
              </dd>
            </div>
          </dl>

          <div className="mt-6 flex flex-wrap gap-3">
            <EmailLink className="inline-flex items-center gap-1.5 rounded-md bg-zinc-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-teal-600 transition-colors">
              Email me
            </EmailLink>
            <a
              href="https://www.linkedin.com/in/imran-ansari-a4b178199/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-md border border-zinc-300 bg-white px-4 py-2.5 text-sm font-medium text-zinc-900 hover:bg-zinc-50 transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/imran1721"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-md border border-zinc-300 bg-white px-4 py-2.5 text-sm font-medium text-zinc-900 hover:bg-zinc-50 transition-colors"
            >
              GitHub
            </a>
            <Link
              href="/resume"
              className="inline-flex items-center gap-1.5 rounded-md px-4 py-2.5 text-sm font-medium text-zinc-700 hover:text-teal-700 transition-colors"
            >
              Resume →
            </Link>
          </div>
        </Container>
      </section>

      <SiteFooter />
    </>
  );
}
