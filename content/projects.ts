// Add a project by appending to this array — the grid, filters, search and case-study
// routes all read from here, so the layout never needs to change.

export type ProjectKind = "Full-stack" | "Interactive" | "Frontend";

export type Project = {
  slug: string;
  name: string;
  kind: ProjectKind;
  year: string;
  summary: string;
  tags: string[];
  featured?: boolean;
  image?: string; // e.g. "/projects/my-app.png" (16:10)
  gallery?: string[]; // extra screenshots shown at the end of the case study
  liveUrl?: string;
  sourceUrl?: string;
  caseStudy?: CaseStudy;
};

export type CaseStudy = {
  pitch: string;
  role: string;
  timeline: string;
  team: string;
  overview: string;
  problem: string;
  approach: string;
  architecture: { name: string; detail: string }[];
  features: { title: string; detail: string }[];
  challenges: { challenge: string; solution: string }[];
  results: { value: string; label: string }[];
};

const placeholderCaseStudy: CaseStudy = {
  pitch: "[One-line pitch — e.g. a collaborative task board that keeps remote teams in sync in real time.]",
  role: "[Solo full-stack developer]",
  timeline: "[Mon YYYY — Mon YYYY]",
  team: "[Just me / team of N]",
  overview:
    "[Two or three sentences: what the product is, who uses it, and why you built it. Keep it plain — a recruiter should get it in ten seconds.]",
  problem: "[What was broken, slow or missing before. Who felt the pain and how.]",
  approach: "[The key decisions: why this stack, how the data flows, what you optimised for.]",
  architecture: [
    { name: "Client", detail: "React · RSC" },
    { name: "Next.js server", detail: "Route handlers · actions" },
    { name: "Database", detail: "PostgreSQL · Prisma" },
  ],
  features: [1, 2, 3, 4].map(() => ({
    title: "[Feature name]",
    detail: "[What it does and why it matters to the user.]",
  })),
  challenges: [
    { challenge: "[e.g. Keeping state in sync across tabs without hammering the database.]", solution: "[What you tried, what worked, and why.]" },
    { challenge: "[Second challenge.]", solution: "[How you solved it.]" },
  ],
  results: [
    { value: "[N]", label: "[Active users]" },
    { value: "[N]", label: "[Lighthouse score]" },
    { value: "[N]%", label: "[Faster than v1]" },
  ],
};

export const projects: Project[] = [
  {
    slug: "tracepulse",
    name: "TracePulse",
    kind: "Frontend",
    year: "2026",
    summary:
      "Marketing site for an observability platform that traces every request and LLM call — with a live telemetry dashboard, trace waterfall and real-time pricing calculator.",
    tags: ["Next.js", "React", "Vercel"],
    featured: true,
    image: "/projects/tracepulse.png",
    liveUrl: "https://tracepulse-website.vercel.app/",
    sourceUrl: "https://github.com/Rafin-Hasan/tracepulse-website",
    caseStudy: {
      pitch:
        "A product site for a concept observability platform — distributed traces, logs and LLM telemetry in one pipeline — that shows the product working instead of describing it.",
      role: "[Solo designer & developer]",
      timeline: "[Mon YYYY — Mon YYYY]",
      team: "[Just me]",
      overview:
        "TracePulse is a landing page for a developer-tools product: an observability platform that unifies distributed tracing, log search and LLM monitoring. The site walks platform engineers from the headline promise — every request, every token, traced in real time — through the product, pricing and social proof to a free-trial sign-up.",
      problem:
        "Observability products are hard to sell with words alone: every competitor promises faster root cause and lower bills. The page needed to make an abstract, technical product feel tangible within the first screen, and let an engineer estimate cost without talking to sales.",
      approach:
        "Instead of static screenshots, the key product surfaces are built as live UI components: a streaming dashboard with throughput, latency and error-rate cards, a span waterfall, and a step-by-step root-cause incident timeline. Pricing is interactive, so the value case is answered on the page. [Add your key technical decisions — component structure, animation approach, performance budget.]",
      architecture: [
        { name: "Content", detail: "Typed data · plans · logs" },
        { name: "Next.js", detail: "React components · SSG" },
        { name: "Vercel", detail: "Edge CDN hosting" },
      ],
      features: [
        { title: "Live telemetry dashboard", detail: "A mock product console with throughput, p95 latency, error rate and a streaming error & latency log, so the product is visible in the hero." },
        { title: "Trace waterfall", detail: "A six-span trace with inline LLM token counts that explains distributed tracing at a glance." },
        { title: "Interactive pricing calculator", detail: "A span-volume slider with a monthly/annual toggle that estimates the bill in real time and shows the annual saving." },
        { title: "Mega-menu navigation", detail: "Grouped Platform, Integrations, Pricing and Docs menus with a descriptive line for every link, collapsing to a counted mobile menu." },
      ],
      challenges: [
        { challenge: "[e.g. Keeping a dashboard full of animated, streaming UI smooth on mid-range phones.]", solution: "[What you did — e.g. CSS transforms only, pausing off-screen animation, reduced-motion fallbacks.]" },
        { challenge: "[e.g. Making the pricing maths correct and instant as the slider moves.]", solution: "[How you modelled the tiers and kept it in sync with the plan cards.]" },
      ],
      results: [
        { value: "[N]", label: "[Lighthouse performance]" },
        { value: "[N]", label: "[Accessibility score]" },
        { value: "[N] kB", label: "[First-load JS]" },
      ],
    },
  },
  {
    slug: "aetherdb",
    name: "AetherDB",
    kind: "Interactive",
    year: "2026",
    summary:
      "Multi-page product site for a distributed edge database — with a live SQL playground, a Raft cluster you can break and heal, and a usage-based pricing estimator.",
    tags: ["React", "Vite", "Vercel"],
    image: "/projects/aetherdb.webp",
    liveUrl: "https://aetherdb-site.vercel.app/",
    caseStudy: {
      pitch:
        "A product site for a concept distributed database that lets engineers poke at the hard parts — consensus, vector search, recovery — instead of reading about them.",
      role: "[Solo designer & developer]",
      timeline: "[Mon YYYY — Mon YYYY]",
      team: "[Just me]",
      overview:
        "AetherDB is a multi-page marketing site for a globally distributed, active-active database. It covers the homepage, architecture, benchmarks, pricing and a deploy flow, and is aimed at backend and platform engineers evaluating a database for low-latency, multi-region workloads.",
      problem:
        "Database claims like “sub-2 ms commits” and “conflict-free replication” are easy to write and hard to believe. The site needed to make distributed-systems concepts concrete enough that a sceptical engineer could see how the product behaves, not just be told.",
      approach:
        "Each core claim is paired with an interactive demo: a global edge map with a live routing log, an editable SQL playground with vector, point-lookup and transaction examples, and architecture cards the visitor can manipulate directly. [Add your key technical decisions — state management, animation approach, how the demos are simulated.]",
      architecture: [
        { name: "Demo data", detail: "Simulated regions · queries" },
        { name: "React SPA", detail: "Vite · interactive widgets" },
        { name: "Vercel", detail: "Static hosting · CDN" },
      ],
      features: [
        { title: "Live SQL playground", detail: "Editable queries with Vector KNN, point-lookup and ACID-transaction presets that return JSON results and a query plan; ⌘/Ctrl + Enter runs them." },
        { title: "Breakable Raft cluster", detail: "Click a replica to fail it and watch quorum, leaders and the write path react — then heal the cluster." },
        { title: "Point-in-time recovery scrubber", detail: "A 24-hour timeline you drag to pick a restore point, with a one-click jump to just before a dropped table." },
        { title: "Usage-based pricing estimator", detail: "Sliders for write units and storage that itemise the monthly bill, plus a build-your-own enterprise contract." },
      ],
      challenges: [
        { challenge: "[e.g. Simulating a believable cluster — elections, quorum loss, recovery — entirely in the browser.]", solution: "[How you modelled the state and kept the UI in sync.]" },
        { challenge: "[e.g. Keeping several always-animating widgets smooth on one page.]", solution: "[What you did — e.g. pausing off-screen demos, canvas vs DOM, reduced-motion fallbacks.]" },
      ],
      results: [
        { value: "[N]", label: "[Lighthouse performance]" },
        { value: "[N]", label: "[Accessibility score]" },
        { value: "5", label: "Pages built" },
      ],
    },
  },
  {
    slug: "tactile-task-console",
    name: "Tactile Task Console",
    kind: "Full-stack",
    year: "2026",
    summary:
      "A task manager built like a physical desk: dial a combination lock to open your vault, then organise folders, timed works and countdown challenges that sync across devices.",
    tags: ["React", "Vite", "Web Audio API"],
    image: "/projects/task-console-vault.webp",
    gallery: ["/projects/task-console-workspace.webp", "/projects/task-console-tutorial.webp"],
    liveUrl: "https://tactile-task-consol.vercel.app/",
    caseStudy: {
      pitch:
        "A to-do app that feels like an object, not a form — a safe door to sign in, a wooden desk for your work, and a glass dome for the one thing you're focusing on.",
      role: "[Solo designer & developer]",
      timeline: "[Mon YYYY — Mon YYYY]",
      team: "[Just me]",
      overview:
        "Tactile Task Console is a personal task manager with a skeuomorphic interface. There are no usernames: a vault code dialled on a combination lock is the account. Inside, an empty desk is filled from a single Add section with folders, temporary works and challenge works, each of which can be bookmarked, prioritised, marked as working and completed.",
      problem:
        "Most task apps look and behave the same: a list, a checkbox, a login form. I wanted to see whether a productivity tool could be memorable and enjoyable to touch without becoming harder to use — and whether sign-in could be reduced to a single code instead of an email and password.",
      approach:
        "Every screen is modelled on a physical object: brushed-metal safe, rotating dial and handle, wood-framed desk, analogue chronometer. Timing is part of the task model itself — temporary works run a stopwatch, challenge works race a countdown. A built-in eight-step tutorial explains each part. [Add your key technical decisions — how the vault code maps to stored data, the sync approach, how the dial interaction is built.]",
      architecture: [
        { name: "React client", detail: "Vite · dial, desk, timers" },
        { name: "API", detail: "[Vault + sync endpoints]" },
        { name: "Storage", detail: "[Database / store]" },
      ],
      features: [
        { title: "Combination-lock sign-in", detail: "Drag or scroll the dial and press its centre to set each digit — or just type — then turn the handle. The code is the account; an extra password is optional." },
        { title: "Three kinds of work", detail: "Folders with subfolders for subjects and projects, temporary works with a stopwatch, and challenge works that race a countdown." },
        { title: "Focus Crucible", detail: "Drop a single work under a glass dome to focus on it, alongside a live chronometer showing what is under way and done." },
        { title: "Sync, sound and tutorial", detail: "Work is saved and synced with a visible status, interface sounds can be toggled, and an eight-part tutorial covers every feature." },
      ],
      challenges: [
        { challenge: "[e.g. Making a rotating dial that works with mouse drag, scroll wheel, touch and keyboard.]", solution: "[How you handled the angle maths and input methods.]" },
        { challenge: "[e.g. Account security when the only credential is a short numeric code.]", solution: "[What you did — code length, optional password, rate limiting.]" },
      ],
      results: [
        { value: "[N]", label: "[Lighthouse performance]" },
        { value: "[N]", label: "[Accessibility score]" },
        { value: "8", label: "Tutorial sections" },
      ],
    },
  },
  {
    slug: "project-04",
    name: "[Project 04]",
    kind: "Frontend",
    year: "2025",
    summary: "[Website / UI build — the client or purpose.]",
    tags: ["Next.js", "Tailwind", "MDX"],
    liveUrl: "#",
    sourceUrl: "#",
    caseStudy: placeholderCaseStudy,
  },
  {
    slug: "project-05",
    name: "[Project 05]",
    kind: "Interactive",
    year: "2025",
    summary: "[Interactive experience — what users can do with it.]",
    tags: ["React", "Three.js", "GSAP"],
    liveUrl: "#",
    sourceUrl: "#",
    caseStudy: placeholderCaseStudy,
  },
  {
    slug: "project-06",
    name: "[Project 06]",
    kind: "Frontend",
    year: "2025",
    summary: "[Website / UI build — the client or purpose.]",
    tags: ["React", "TypeScript", "Vite"],
    liveUrl: "#",
    sourceUrl: "#",
    caseStudy: placeholderCaseStudy,
  },
];

export const archive = [
  { year: "[YEAR]", name: "[Hackathon project]", stack: "[Stack]", url: "#" },
  { year: "[YEAR]", name: "[Course project]", stack: "[Stack]", url: "#" },
  { year: "[YEAR]", name: "[CLI tool / script]", stack: "[Stack]", url: "#" },
  { year: "[YEAR]", name: "[UI experiment]", stack: "[Stack]", url: "#" },
  { year: "[YEAR]", name: "[First website]", stack: "HTML · CSS · JavaScript", url: "#" },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
