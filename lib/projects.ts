export type MediaPlaceholder = {
  kind: "placeholder";
  /** Tailwind gradient classes used by the placeholder block (e.g. "from-teal-500 to-zinc-900"). */
  gradient: string;
  /** Big label drawn into the placeholder. */
  label: string;
};

export type MediaImage = {
  kind: "image";
  src: string;
  alt: string;
};

export type MediaVideo = {
  kind: "video";
  src: string;
  poster?: string;
};

export type Media = MediaPlaceholder | MediaImage | MediaVideo;

/** Secondary media slot — paired with a caption + optional one-line description. */
export type MediaShot = {
  media: Media;
  /** Short heading shown under the media (e.g. "Connections wizard"). */
  caption: string;
  /** Optional one-line context shown smaller under the caption. */
  description?: string;
};

export type DeepDiveSection = {
  title: string;
  body: string;
};

export type ProjectLink = {
  label: string;
  href: string;
  /** "primary" → solid teal button, "secondary" → ghost. */
  variant?: "primary" | "secondary";
};

export type Project = {
  slug: string;
  name: string;
  /** One-line, ~80 chars. Used on cards and at the top of case studies. */
  tagline: string;
  /** "Lepton Software · SDE-2", "Open-source contribution", "Personal project". */
  context: string;
  /** Drives the home-page section split. */
  category: "work" | "earlier" | "personal";
  dateRange: string;
  /** Top of-list short pills (4–6). */
  stack: string[];
  /** Used for card hero gradient when no real image yet. */
  hero: Media;
  /** Optional secondary media (module walkthroughs, additional flows). Renders as a gallery on the case study page. */
  mediaShots?: MediaShot[];
  /** Card preview accent (tailwind text color class). */
  accentClass: string;
  /** Featured on home? */
  featured: boolean;
  /** Mark a project as interactive — surfaces an "INTERACTIVE" badge on the card. */
  interactive?: boolean;
  /** 1–2 short paragraphs setting context. */
  intro: string[];
  /** What was built (bullet list, ~4–6). */
  built: string[];
  /** Optional measurable impact bullets. */
  impact?: string[];
  /** Optional deep-dive sections (collapsible on the page). */
  deepDive?: DeepDiveSection[];
  /** External buttons (live URL, GitHub). */
  links: ProjectLink[];
};

export const PROJECTS: Project[] = [
  {
    slug: "smart-market",
    name: "SmartMarket Platform",
    tagline:
      "Frontend lead on the next-gen rewrite of SmartMarket.ai — new Datasets, Connections, and an agentic AI Assistant module.",
    context: "Lepton Software · SDE-2 · Frontend",
    category: "work",
    dateRange: "June 2024 – Present",
    stack: [
      "React 19",
      "TypeScript",
      "Vinxi",
      "Rio.js",
      "TanStack Query",
      "Tailwind",
      "Pyodide",
      "Playwright",
    ],
    hero: {
      kind: "video",
      src: "/media/smart-market.mp4",
      poster: "/media/smart-market-poster.jpg",
    },
    mediaShots: [
      {
        media: {
          kind: "video",
          src: "/media/smart-market-datasets.mp4",
          poster: "/media/smart-market-datasets-poster.jpg",
        },
        caption: "Datasets — AI-generated metadata",
        description:
          "New-dataset wizard generates dataset names, descriptions, and column-level documentation across 7 sources in parallel.",
      },
      {
        media: {
          kind: "video",
          src: "/media/smart-market-connections.mp4",
          poster: "/media/smart-market-connections-poster.jpg",
        },
        caption: "Connections wizard",
        description:
          "Schema-driven PostgreSQL credential form with live Test connection feedback.",
      },
    ],
    accentClass: "text-teal-600",
    featured: true,
    intro: [
      "SmartMarket is Lepton's flagship SaaS for geospatial and market intelligence. I led the frontend rewrite of v1 (SmartMarket.ai) onto a new Rio.js extension monorepo and shipped the three frontend modules that define the upgraded platform: Datasets, Connections, and an agentic AI Assistant.",
      "My scope on this project is the frontend — UI, client-side data flow, build/deploy hardening, and end-to-end testing. Backend services and data infrastructure are owned by separate teams. The platform now lives at smartmarket.rio.software.",
    ],
    built: [
      "LLM-powered agentic geospatial assistant on the client — tool-calling for map rendering and dataset selection, prompt + schema scaffolding around per-dataset `_info.json` (RAG-style grounding), strict error/retry behaviour, and in-browser Pyodide for sandboxed data analysis on user uploads.",
      "Datasets and Connections UI surface across Postgres, BigQuery, S3, Kafka, and HTTP — connector wizards, schema-driven credential forms (with field order preserved through jsonb), pre-flight connection-staleness gating, and import-wizard recovery paths.",
      "Frontend production hardening: build-id-driven version-update banner, skew-protection volume + Nitro middleware so retained client bundles serve `text/javascript`, and an internal headless print pipeline that renders dataset reports to PDF.",
      "Real-API Playwright trust suite running against staging, gated in CI and fails-loud. It caught a connection-rename durability defect at the API boundary and produced the diagnostic that the backend team used for their fix.",
      "Visual regression coverage, project workspaces, RBAC surface, and 20+ smaller frontend features that round out the upgrade from v1.",
    ],
    impact: [
      "v1 baseline maintained: scalable RBAC surface (+40% faster user/project management on v1), −35% crashes, −30% page load, 2× faster releases via Docker + Ansible automation.",
      "Introduced the real-API trust-suite pattern that now catches FE↔BE contract regressions before staging promotes.",
    ],
    deepDive: [
      {
        title: "Why a Rio.js extension monorepo",
        body: "Lepton ships multiple frontends that share auth, navigation, and connector primitives through a single Rio.js OS. SmartMarket plugs in as an extension of that OS, so the app inherits sign-in, secrets, env, and rendering and only ships the new Datasets / Connections / Assistant surface area. This kept the rewrite scoped and let v1 features migrate incrementally.",
      },
      {
        title: "How the assistant grounds SQL on the client",
        body: "The assistant doesn't free-form SQL. Every dataset exposes a `_info.json` describing its columns, types, role hints, and geometry shape. The frontend feeds that schema into the LLM before its first query, and on every error re-reads the schema and retries the same scope — never silently switching cities, categories, or datasets to make the error go away. The SQL itself executes against the platform's existing query service.",
      },
      {
        title: "Pyodide upload router",
        body: "User uploads go through a size-aware 3-lane router on the client: small CSV/TSV/XLS → Pyodide (server scratch-cache → VFS `/input/` → existing Python tool); small GeoJSON → in-memory MapBlock; anything larger → full dataset ingest. Small files get assistant responses in seconds without paying ingestion latency.",
      },
    ],
    links: [
      {
        label: "Live: smartmarket.rio.software",
        href: "https://smartmarket.rio.software",
        variant: "primary",
      },
    ],
  },
  {
    slug: "google-rmi",
    name: "Google RMI Demo",
    tagline:
      "Production traffic intelligence platform for Google's Roads Management Insights program — dual-map comparison, time-replay, congestion analytics.",
    context: "Lepton Software · open-source sample",
    category: "work",
    dateRange: "2024 – 2025",
    stack: [
      "React 19",
      "TypeScript",
      "FastAPI",
      "Google BigQuery",
      "Deck.gl",
      "Google Maps Platform",
      "Cloud Run",
    ],
    hero: {
      kind: "video",
      src: "/media/google-rmi.mp4",
      poster: "/media/google-rmi-poster.jpg",
    },
    mediaShots: [
      {
        media: {
          kind: "video",
          src: "/media/google-rmi-realtime.mp4",
          poster: "/media/google-rmi-realtime-poster.jpg",
        },
        caption: "Use case · Real-Time monitoring",
        description:
          "Live anomaly detection across Paris ring road and Tokyo arterials — severity-ranked congestion alerts with one-click jump to the route on the map.",
      },
      {
        media: {
          kind: "video",
          src: "/media/google-rmi-historical.mp4",
          poster: "/media/google-rmi-historical-poster.jpg",
        },
        caption: "Use case · Historical analytics",
        description:
          "Date range, day-of-week, and time-range filters with multi-city support — Boston, Gurgaon, and more. Average-delay and delayed-route counts aggregate live as filters change.",
      },
      {
        media: {
          kind: "video",
          src: "/media/google-rmi-reliability.mp4",
          poster: "/media/google-rmi-reliability-poster.jpg",
        },
        caption: "Use case · Route reliability",
        description:
          "Pre-defined corridor analytics — Rome sightseeing, NYC airport corridors. Peak congestion, travel time, and 95% reliable time charted by hour. Quick Compare splits weekday vs weekend side-by-side.",
      },
    ],
    accentClass: "text-orange-600",
    featured: true,
    intro: [
      "RMI is Google's Roads Management Insights program — agencies and consultancies use it to get high-resolution traffic and congestion data from Google's traffic graph. The demo I built is the official customer-facing showcase for the program, deployed by Lepton and open-sourced under the googlemaps-samples org.",
      "It demonstrates the full RMI API surface (Roads, Geocoding, BigQuery Storage) wrapped in a production-grade React 19 + FastAPI app that customers can fork as a starting point.",
    ],
    built: [
      "Interactive 3D maps with Google Maps Platform + Deck.gl: dual-map weekday/weekend and period-over-period comparison, time-replay autoplay, and color-coded congestion layers.",
      "Route reliability metrics — Planning Time Index, Travel Time Index, 95th-percentile travel times — computed with GeoPandas, Shapely, and Turf.js.",
      "Grid- and polygon-based urban congestion heatmaps with boundary analysis (postal codes, localities, admin areas).",
      "Frontend optimisations — lazy loading, code splitting, TanStack Query + Zustand — so interactions stay sub-second on city-sized datasets.",
      "Multi-stage Docker + Cloud Run with zero-downtime blue/green releases.",
    ],
    impact: [
      "Sub-second interactions even on city-scale datasets (~100k–1M road segments).",
      "Live and historical traffic insights composed from the Roads Management Insights API, Geocoding API, and BigQuery Storage API.",
    ],
    links: [
      {
        label: "Live demo",
        href: "https://google-rmi-demo-dev-1024202510105.us-central1.run.app/",
        variant: "primary",
      },
      {
        label: "View on GitHub",
        href: "https://github.com/googlemaps-samples/roads-management-insights-samples",
        variant: "secondary",
      },
    ],
  },
  {
    slug: "route-registration",
    name: "Route Registration Tool",
    tagline:
      "Road-selection companion to Google RMI — pick road segments on a Google Map, persist to BigQuery, drive downstream traffic analytics.",
    context: "Lepton Software · open-source sample",
    category: "work",
    dateRange: "2025",
    stack: [
      "React",
      "Google Maps JS API",
      "FastAPI",
      "PostgreSQL",
      "BigQuery",
      "Cloud Run",
      "Docker Compose",
    ],
    hero: {
      kind: "video",
      src: "/media/route-registration.mp4",
      poster: "/media/route-registration-poster.jpg",
    },
    accentClass: "text-emerald-600",
    featured: true,
    intro: [
      "The RMI program needs a way for customers to register the road segments they care about before any of the analytics light up. The Route Registration Tool is that companion app — a React + Google Maps interface for selecting and editing road segments, with a FastAPI backend that syncs the selections to BigQuery for downstream Roads Management Insights analytics.",
      "Published alongside the RMI demo in the googlemaps-samples org.",
    ],
    built: [
      "React + Google Maps JavaScript API frontend with polyline-aware selection and edit affordances.",
      "FastAPI backend persisting selections to SQLite (default) or PostgreSQL (production) and syncing to BigQuery for the RMI analytics pipeline.",
      "ADC-minted OAuth bearer tokens for all backend Roads API calls — no server-side API key, no secret-in-env footgun.",
      "Cloud Run liveness/readiness probes that verify DB, Roads API, and BigQuery in parallel with per-check timeouts so a slow dependency surfaces as 503 rather than a silent hang.",
      "One-command Docker Compose + Cloud Build deploy to Cloud Run, with Secret Manager managing only the browser-side Maps JS key.",
    ],
    links: [
      {
        label: "Live demo",
        href: "https://route-registration-tool-1024202510105.us-central1.run.app/",
        variant: "primary",
      },
      {
        label: "View on GitHub",
        href: "https://github.com/googlemaps-samples/roads-management-insights-samples/tree/main/route-registration-tool",
        variant: "secondary",
      },
    ],
  },
  {
    slug: "shipstation",
    name: "ShipStation Web Platform",
    tagline:
      "Integrated 15+ shipping-carrier modules and led a team of 7 building the next iteration of ShipStation's web platform.",
    context: "Innostax · Project Lead",
    category: "earlier",
    dateRange: "2022 – 2024",
    stack: ["Node.js", "REST APIs", "SOAP APIs", "Jest", "Mocha"],
    hero: {
      kind: "image",
      src: "/media/shipstation.png",
      alt: "ShipStation order management UI — Awaiting Shipment view with order list, recipients, store sources, and ship-by dates.",
    },
    accentClass: "text-blue-600",
    featured: true,
    intro: [
      "ShipStation is one of the larger multi-carrier shipping platforms used by online retailers and marketplaces. While at Innostax I worked as Project Lead on a multi-quarter engagement to integrate new carrier APIs and harden the existing module surface.",
    ],
    built: [
      "Integrated 15+ shipping-carrier modules behind a unified internal API; designed the request/response shape so adding a new carrier didn't require touching consumers.",
      "Cut iteration cycles by ~20% by tightening the review/test loop and standardising the carrier-module shape across the team.",
      "Stabilised the platform with Jest/Mocha coverage on the integration layer — reduced regression defects by ~20%.",
      "Led a team of seven and onboarded five new engineers; established the carrier-module pattern as the standard for new integrations.",
    ],
    impact: [
      "+40% API performance across integrated modules.",
      "−20% iteration cycle time on new carrier rollouts.",
      "+15% client satisfaction per QBR feedback.",
    ],
    links: [],
  },
  {
    slug: "plenti-exchange",
    name: "PlentiExchange — 1031 Report Generator",
    tagline:
      "React + Node + .NET app that generates 1031-exchange reports for US real-estate investors; cut report time 25% and signup setup 40%.",
    context: "Innostax · Project Lead",
    category: "earlier",
    dateRange: "2022 – 2023",
    stack: [
      "React",
      "Node.js",
      ".NET",
      "MongoDB",
      "Azure DevOps",
      "HubSpot CRM",
    ],
    hero: {
      kind: "image",
      src: "/media/plenti-exchange.png",
      alt: "Plenti Financial — 1031 Exchange platform landing page now hosted at Deferred, showing 7,047+ exchanges and Get Started flow.",
    },
    accentClass: "text-amber-600",
    featured: true,
    intro: [
      "A 1031 exchange is a US tax-deferred real-estate swap — and the reports needed to file one are tedious to assemble by hand. PlentiExchange productised that workflow; I led the frontend + integration work for the report generator.",
      "Plenti Financial has since been acquired by Deferred — the site now lives at deferred.com/a/plenti-financial.",
    ],
    built: [
      "React frontend on top of a Node.js + .NET backend, MongoDB persistence, deployed on Azure DevOps.",
      "Redesigned the signup flow with progressive disclosure — cut setup time by ~40%.",
      "Wired in a referral-link program with HubSpot CRM — drove +30% engagement and +20% business uplift in the quarter after launch.",
      "Streamlined Azure deploys; reduced resource-mis-provisioning errors by ~15% after introducing pipeline templating.",
    ],
    impact: [
      "−25% report-generation time.",
      "−40% signup setup time.",
      "+30% engagement / +20% business via referrals.",
    ],
    links: [],
  },
  {
    slug: "morehands",
    name: "Morehands Mobile App",
    tagline:
      "Cross-platform iOS/Android home-services app on Ionic + Salesforce; led a team of four on the rebuild, cutting load times 30% and boosting engagement 50%.",
    context: "Innostax · Project Lead",
    category: "earlier",
    dateRange: "2021 – 2022",
    stack: ["Ionic", "Salesforce", "Firebase", "FCM", "Google Analytics"],
    hero: {
      kind: "image",
      src: "/media/morehands.png",
      alt: "Morehands mobile app — three screens: real-time cleaning status with ETA, manage cleaning with add-ons (windows, baseboards), and laundry pickup form.",
    },
    accentClass: "text-orange-600",
    featured: true,
    intro: [
      "Morehands is a US home-services marketplace (cleaning, handyman, etc.). I led a four-person team at Innostax on the cross-platform Ionic rebuild and the Salesforce-backed backend integration.",
    ],
    built: [
      "Cross-platform iOS/Android delivery on Ionic with Salesforce as the source of truth; designed the offline-first sync surface so booking flows tolerated flaky cellular networks.",
      "Wired in Google Analytics + Gladly for product insights, Firebase Cloud Messaging for booking-state push notifications.",
      "Streamlined update delivery with AppFlow / CodePush so non-native fixes shipped without store review delays.",
      "Hands-on across UI, app state, native plugins, and the Salesforce integration layer; mentored team of four through the rebuild.",
    ],
    impact: [
      "−30% load time after the rebuild.",
      "+50% engagement post-launch.",
      "−15% crash-report volume after bug triage pass.",
    ],
    links: [],
  },
  {
    slug: "vibin",
    name: "vibin.click",
    tagline:
      "Spotify Jam–style YouTube listening party — one host plays, anyone with the link queues and skips, realtime sync via Supabase.",
    context: "Personal project",
    category: "personal",
    dateRange: "2025",
    stack: [
      "Next.js",
      "Tailwind",
      "Supabase (Postgres + RLS + Realtime)",
      "Google OAuth",
      "YouTube Data API v3",
      "Vercel",
    ],
    hero: {
      kind: "video",
      src: "/media/vibin.mp4",
      poster: "/media/vibin-poster.jpg",
    },
    accentClass: "text-fuchsia-600",
    featured: true,
    intro: [
      "vibin is the Spotify Jam I wished existed for YouTube. One host plays audio in their browser; everyone else opens a shared link, searches YouTube, queues tracks, and skips to the next song — and the host's tab automatically picks up the change via realtime broadcast. No accounts, no installs.",
      "I built it end-to-end as a weekend project to play with Supabase Realtime, anonymous auth, and Google OAuth for playlist import.",
    ],
    built: [
      "Realtime shared queue powered by Supabase Postgres + Realtime channels and row-level security; anonymous auth means guests don't sign up.",
      "Host-only YouTube playlist import via Google OAuth (`youtube.readonly`) with server-only token storage — service-role key never reaches the client.",
      "YouTube Data API v3 for search; YouTube IFrame API for host playback with autoplay-friendly first-track handshake.",
      "iOS-friendly PWA — viewport-fit=cover, safe-area padding, Add-to-Home-Screen manifest.",
      "Deployed on Vercel; Supabase Realtime over WSS.",
    ],
    deepDive: [
      {
        title: "Why a host model",
        body: "YouTube's terms forbid serving the audio yourself, so playback has to happen in a real browser tab. The host model puts that tab at one user (whoever started the jam) and uses Realtime broadcast for everyone else to nudge it — search, queue, skip, advance. Guests stay lurkers from YouTube's perspective.",
      },
    ],
    links: [
      {
        label: "Live: vibin.click",
        href: "https://vibin.click",
        variant: "primary",
      },
      {
        label: "View on GitHub",
        href: "https://github.com/imran1721/vibin",
        variant: "secondary",
      },
    ],
  },
  {
    slug: "slack-claude-bridge",
    name: "slack-claude-bridge",
    tagline:
      "Self-hosted Slack ↔ Claude Code bridge: drive Claude on your laptop from Slack on your phone. Published as an npm package.",
    context: "Personal project · npm package",
    category: "personal",
    dateRange: "2025",
    stack: [
      "Node.js",
      "TypeScript",
      "Slack Socket Mode",
      "Claude Code CLI",
      "npm",
    ],
    hero: {
      kind: "image",
      src: "/media/slack-claude-bridge.png",
      alt: "slack-claude-bridge — bridge between Slack on a phone and Claude Code on a laptop. Mention the bot, get a screenshot back, resume sessions via claude -p --resume.",
    },
    accentClass: "text-violet-600",
    featured: true,
    intro: [
      "A self-hosted bridge between Slack and Claude Code that runs on my machine and lets me drive a real Claude session from anywhere my phone is. Two modes: one-shot @mentions that fire the slack-respond skill and return a screenshot, and a Conductor session mirror that pipes every Claude turn from any enrolled workspace into a Slack thread — replies feed straight back into the same session via `claude -p --resume`.",
      "Published to npm as `@imran-ansari/slack-claude-bridge`. I use it daily across multiple parallel Conductor worktrees.",
    ],
    built: [
      "Slack Socket Mode listener that routes mentions and thread replies to a local `claude -p` invocation with the correct cwd, session ID, and resume state.",
      "Conductor session mirror via Stop hook: a turn ending in any opted-in workspace POSTs to a local notify endpoint, which lands the diff/screenshot in a dedicated Slack thread.",
      "Resume protocol — thread replies attach to the same session ID and `claude -p --resume` re-enters with full context, so phone replies feel like the workstation never left.",
      "Per-workspace enrollment via a `.slack-mirror` marker file, so noise from non-opted-in worktrees doesn't leak into Slack.",
      "Packaged and published to npm under the `@imran-ansari/slack-claude-bridge` scope.",
    ],
    deepDive: [
      {
        title: "Why a Stop hook + thread mirror",
        body: "Claude Code's hook system runs a shell command at end-of-turn. Pointing it at a local notify URL lets the bridge collect every turn passively across N parallel worktrees without polling, without modifying Claude itself, and without giving Slack any code-execution rights — Slack only ever sees the final output.",
      },
    ],
    links: [
      {
        label: "View on npm",
        href: "https://www.npmjs.com/package/@imran-ansari/slack-claude-bridge",
        variant: "primary",
      },
      {
        label: "GitHub",
        href: "https://github.com/imran1721/slack-claude-bridge",
        variant: "secondary",
      },
    ],
  },
  {
    slug: "stockpe",
    name: "stockpe",
    tagline:
      "Inventory + billing MVP for a friend's electronics shop — barcode scan, CSV import, simple bills. Replaces Excel + WhatsApp.",
    context: "Personal project · for a friend",
    category: "personal",
    dateRange: "2025",
    stack: [
      "Next.js 16",
      "React 19",
      "Tailwind",
      "shadcn/ui",
      "Supabase",
      "html5-qrcode",
      "Vercel",
    ],
    hero: {
      kind: "video",
      src: "/media/stockpe.mp4",
      poster: "/media/stockpe-poster.jpg",
    },
    accentClass: "text-emerald-600",
    featured: true,
    intro: [
      "Built for a friend who runs a small electronics shop in India. He was tracking inventory in Excel and quoting prices over WhatsApp — stockpe replaces both with a phone-first PWA that scans barcodes, manages stock, and prints simple bills.",
      "Designed as a minimum-viable replacement for a notebook, not an enterprise ERP. Simplicity over features, real usage over assumptions.",
    ],
    built: [
      "Multi-tenant Supabase schema — businesses, user/business membership with admin/staff roles, products with barcode SKUs, bills with line items.",
      "Phone-first product entry with `html5-qrcode` barcode scanning, CSV import via `papaparse` for bootstrapping the catalogue from spreadsheets.",
      "Billing flow with browser-native printing (`window.print`) so it works on any phone or printer the shop already has, no integration needed.",
      "Auth via Supabase email/password + Google sign-in, RLS-enforced multi-business isolation.",
      "shadcn/ui on Tailwind for the surface, react-hook-form + Zod for validation, TanStack Query for client cache.",
    ],
    links: [
      {
        label: "Live: stockpe.vercel.app",
        href: "https://stockpe.vercel.app/",
        variant: "primary",
      },
      {
        label: "View on GitHub",
        href: "https://github.com/imran1721/stockpe",
        variant: "secondary",
      },
    ],
  },
  {
    slug: "sky-book",
    name: "Sky Book",
    tagline:
      "Fly a paper plane through photorealistic 3D cities. Collect floating skill tags, surface project cards anchored to real buildings, watch the score tick up — this portfolio, as a game.",
    context: "Personal project · interactive portfolio",
    category: "personal",
    dateRange: "2026",
    stack: [
      "Cesium",
      "Google 3D Tiles",
      "TypeScript",
      "Vite",
      "WebGL",
    ],
    hero: {
      kind: "video",
      src: "/media/sky-book.mp4",
      poster: "/media/sky-book-poster.jpg",
    },
    accentClass: "text-sky-600",
    featured: true,
    interactive: true,
    intro: [
      "A creative reimagining of a portfolio site: instead of scrolling through cards, you fly a paper plane through photorealistic 3D cities and the projects surface as floating cards anchored to real buildings along the route.",
      "Built on Cesium + Google's Map Tiles API (photorealistic 3D tiles) — same engine Google uses to render the 3D buildings in Maps. Keyboard-driven flight controls with bank physics on turns.",
    ],
    built: [
      "Cesium viewer with Google Photorealistic 3D Tiles loaded via `Cesium3DTileset.fromUrl` — real cities, real building geometry.",
      "Per-frame camera update driven by a `{ lat, lng, alt, heading, pitch }` flight state integrated from keyboard input (↑/↓ pitch, ←/→ turn with bank, W/S throttle, Space level out).",
      "Fixed-centre paper-plane SVG with bank rotation derived from turn input — visual roll without moving the plane on screen.",
      "Portfolio POIs are HTML cards projected to screen each frame via `SceneTransforms.wgs84ToWindowCoordinates`, faded by distance for smooth reveal/dismiss.",
      "Hidden globe ellipsoid + Google attribution preserved per Maps Platform terms; API key restricted to deployed origin in production.",
    ],
    deepDive: [
      {
        title: "Why this is technically interesting",
        body: "Most portfolio sites are scroll-driven 2D layouts. This one renders a continuous 3D scene at 60fps with photorealistic city geometry streaming in from Google's Map Tiles API, and overlays DOM elements that track the WebGL camera in real time. The fun engineering problem is the bridge: every frame, project the WGS84 location of each card to a screen pixel and fade it by distance, while keeping the plane visually centred and the rest of the world banking around it.",
      },
    ],
    links: [
      {
        label: "Live: skybook.vibin.click",
        href: "https://skybook.vibin.click/",
        variant: "primary",
      },
      {
        label: "View on GitHub",
        href: "https://github.com/imran1721/Skybook",
        variant: "secondary",
      },
    ],
  },
  {
    slug: "byte",
    name: "byte",
    tagline:
      "Tech in bite-size — a TikTok-style vertical feed of new dev tools, aggregated from 6 sources and ranked so the fresh + well-liked stuff floats to the top.",
    context: "Personal project",
    category: "personal",
    dateRange: "2026",
    stack: [
      "Next.js 15",
      "React 19",
      "Tailwind",
      "ISR / server fetch",
      "TypeScript",
    ],
    hero: {
      kind: "video",
      src: "/media/byte.mp4",
      poster: "/media/byte-poster.jpg",
    },
    accentClass: "text-amber-600",
    featured: true,
    intro: [
      "byte is a full-screen, snap-scrolling feed of the tools, libraries, and projects the dev world is liking right now — one card per item, infinite scroll, like TikTok for tech.",
      "It aggregates six sources (Hacker News, GitHub, Dev.to, Lobsters, Product Hunt, and more) into one normalized feed, then ranks and dedupes so the freshest well-liked items surface first.",
    ],
    built: [
      "Six source adapters (Algolia HN, GitHub Search, Dev.to, Lobsters, Product Hunt) normalized behind one `FeedItem` model — add a source by dropping in one file.",
      "Trending rank via the classic HN gravity shape: popularity damped by `log`, decayed by age; cross-source dedupe.",
      "Card enrichment fetches each link's `og:description` and `og:image` so every item explains what it is and shows a visual.",
      "Keyword classifier categorizes items (AI, Dev Tools, Web, Data & Infra, …) with no LLM — instant.",
      "First-run interest picker (saved to `localStorage`) drives a personalized For You view; server-side pagination gives effectively infinite scroll.",
    ],
    deepDive: [
      {
        title: "Fast without an LLM or a database",
        body: "The whole feed is server `fetch` with ISR (30-min revalidate) streamed via `loading.tsx`, so prod serves the cached feed near-instantly and the animated splash holds only until real content paints. Ranking, dedupe, and categorization are plain functions — no vector store, no model call — which keeps each request cheap and the classifier instant.",
      },
    ],
    links: [
      {
        label: "Live: byte.vibin.click",
        href: "https://byte.vibin.click/",
        variant: "primary",
      },
      {
        label: "View on GitHub",
        href: "https://github.com/imran1721/byte",
        variant: "secondary",
      },
    ],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}

export function getAllSlugs(): string[] {
  return PROJECTS.map((p) => p.slug);
}
