import Link from "next/link";
import type { Project } from "@/lib/projects";
import { Media } from "./media";
import { Pill } from "./pill";
import { cn } from "@/lib/cn";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/work/${project.slug}`}
      className="group relative block rounded-2xl border border-zinc-200 bg-white p-2 transition-[transform,border-color,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:border-zinc-300 hover:shadow-[0_18px_40px_-20px_rgba(13,148,136,0.35)]"
    >
      <Media media={project.hero} className="rounded-lg" />
      {project.interactive && (
        <span
          aria-label="Interactive project"
          className="absolute right-4 top-4 z-10 inline-flex items-center gap-1.5 rounded-full bg-sky-500/95 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-white shadow-lg shadow-sky-500/40 backdrop-blur ring-1 ring-white/30"
        >
          <span
            aria-hidden
            className="inline-block h-1.5 w-1.5 rounded-full bg-white animate-pulse"
          />
          Interactive · Playable
        </span>
      )}
      <div className="p-4 sm:p-5">
        <div className="flex items-center gap-2 text-[11px] uppercase tracking-wide text-zinc-500">
          <span className={cn("font-medium", project.accentClass)}>
            {project.context}
          </span>
          <span aria-hidden>·</span>
          <span>{project.dateRange}</span>
        </div>
        <h3 className="mt-2 text-xl font-semibold tracking-tight text-zinc-900 group-hover:text-teal-600 transition-colors">
          {project.name}
        </h3>
        <p className="mt-2 text-sm text-zinc-600 text-pretty leading-relaxed">
          {project.tagline}
        </p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.stack.slice(0, 5).map((s) => (
            <Pill key={s}>{s}</Pill>
          ))}
          {project.stack.length > 5 && (
            <Pill variant="outline">+{project.stack.length - 5}</Pill>
          )}
        </div>
        <div className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-zinc-900 group-hover:text-teal-600 transition-colors">
          Read case study
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden
            className="group-hover:translate-x-0.5 transition-transform"
          >
            <path
              d="M5 12h14m0 0l-6-6m6 6l-6 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </Link>
  );
}
