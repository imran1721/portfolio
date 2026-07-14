# Portfolio — Imran Ansari

Personal developer portfolio built as a set of **case studies with video heroes**,
spanning professional, open-source, and personal work.

**Live:** https://imran.ansari.vibin.click

## What it is

A Next.js site where each project is a full case study — hero media (video or
image), stack pills, a deep-dive writeup, and a gallery of module walkthroughs.
Projects are grouped into **work**, **earlier**, and **personal**. Content is
data-driven from a single typed source (`lib/projects.ts`), so adding a project
is one object, not a new page.

Featured projects include SmartMarket Platform, Google RMI Demo, vibin.click,
Skybook, and byte.

## Stack

- **Next.js 16** (App Router) + **React 19**
- **TypeScript**
- **Tailwind CSS v4**
- **Vercel** — hosting, Analytics, and Speed Insights
- SEO built in: per-project OpenGraph images, sitemap, robots

## Run locally

```bash
pnpm install
pnpm dev
```

Open http://localhost:3000.

Other scripts: `pnpm build`, `pnpm start`, `pnpm lint`.

## Structure

```
app/            routes — home, /work/[slug] case studies, /resume, OG images
components/      UI — project cards, media, hero backdrop, reveal, layout
lib/projects.ts single typed source for all project content
```
