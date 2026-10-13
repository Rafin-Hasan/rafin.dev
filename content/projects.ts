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
  highlights?: string[]; // short badges shown on the home page bento card
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
    highlights: ["State sync", "Waterfall timeline", "Dynamic pricing calculator"],
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
    highlights: ["Raft consensus simulation", "SQL playground", "Latency benchmarks"],
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
    highlights: ["Dial-lock sign-in", "Web Audio feedback", "Cross-device sync"],
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
    slug: "lemon-warles",
    name: "Lemon Warles",
    kind: "Frontend",
    year: "[YEAR]",
    summary:
      "Responsive landing page for a web-hosting company, built to convert: a clear hero, hosting plans, customer stories and a sign-up call to action.",
    tags: ["React", "Vite", "Tailwind CSS"],
    image: "/projects/lemonwarles.png",
    highlights: ["Pricing plans", "Customer stories", "Scroll animations"],
    liveUrl: "https://lemonwarles.vercel.app/",
    caseStudy: {
      pitch: "A conversion-focused landing page for LemonWares, a web-hosting brand, built as a responsive React single-page site.",
      role: "[Frontend developer]",
      timeline: "[Mon YYYY — Mon YYYY]",
      team: "[Just me]",
      overview:
        "Lemon Warles is a marketing landing page for a web-hosting company. It leads with a simple promise — premium web hosting for your website — then walks visitors through the hosting types on offer, the plans, customer stories and a final prompt to create an account.",
      problem:
        "A hosting landing page has one job: get a visitor from the headline to choosing a plan. Every section has to earn its place and the page has to read well on a phone, where most first visits happen. [Add where the design came from — your own, a client brief, or a design you rebuilt for practice.]",
      approach:
        "The page is a single React app built with Vite and styled with Tailwind CSS utility classes, with sections revealing on scroll. Layout is mobile-first, with the hero image and plan cards reflowing for small screens. [Add your key decisions — component breakdown, how you matched the design, what you optimised.]",
      architecture: [
        { name: "Sections", detail: "Hero · plans · stories · CTA" },
        { name: "React + Vite", detail: "Tailwind CSS · scroll reveals" },
        { name: "Vercel", detail: "Static hosting · CDN" },
      ],
      features: [
        { title: "Hero with twin calls to action", detail: "Headline, supporting line and two buttons — create an account or choose a plan — beside a framed product photo." },
        { title: "Hosting plans", detail: "Shared, cloud, WordPress, email and private hosting laid out as packages with a clear button on each." },
        { title: "Customer stories", detail: "Testimonials with names and roles to build trust before the final sign-up prompt." },
        { title: "Responsive, animated sections", detail: "A mobile-first layout where each section animates into view as you scroll." },
      ],
      challenges: [
        { challenge: "[e.g. Matching the design pixel-for-pixel across breakpoints.]", solution: "[How you handled spacing, type scale and the decorative shapes.]" },
        { challenge: "[e.g. Keeping scroll animations smooth on low-end phones.]", solution: "[What you did.]" },
      ],
      results: [
        { value: "[N]", label: "[Lighthouse performance]" },
        { value: "[N]", label: "[Accessibility score]" },
        { value: "[N]", label: "[Sections built]" },
      ],
    },
  },
];

// Smaller builds and experiments. Add a `url` to link one.
export const labs: { name: string; detail: string; url?: string }[] = [
  { name: "eFootball Tournament Manager", detail: "Full-stack brackets with real-time standings" },
  { name: "Audio & motion micro-labs", detail: "Web Audio and animation micro-interactions" },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
