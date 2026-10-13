// Everything personal lives here. Replace the [bracketed] placeholders with your own details.

export const site = {
  name: "Rafin Hasan",
  shortName: "Rafin",
  domain: "rafin.dev",
  role: "Frontend & Full-Stack Developer",
  title: "Rafin Hasan — Frontend & Full-Stack Developer",
  description:
    "Frontend and full-stack developer and Computer Science undergraduate at the University of Roehampton, London, building fast, tactile web interfaces with React, Next.js and TypeScript.",
  location: "London, UK",
  email: "rafinhasan.web@gmail.com",
  resumeUrl: "/Resume/Rafin%20Hasan%20-%20Professional%20Resume.pdf",
  portrait: "/portrait.webp",
  replyTime: "[1–2 days]",
  available: true,
  availability: "Available for software engineering roles & internships · London / Remote",
  roles: ["Frontend developer", "Full-stack developer", "CS undergrad @ Roehampton", "UI engineer"],
  socials: {
    github: { label: "GitHub", handle: "@Rafin-Hasan", url: "https://github.com/Rafin-Hasan" },
    linkedin: { label: "LinkedIn", handle: "/in/[handle]", url: "https://www.linkedin.com/in/[handle]" },
  },
};

export const nav = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/projects" },
  { label: "About", href: "/about" },
  { label: "Writing", href: "/writing" },
  { label: "Contact", href: "/#contact" },
] as const;

export const metrics = [
  { value: "3+", label: "Complex builds", detail: "Observability, distributed DB UI, audio engine" },
  { value: "60 fps", label: "UI targets", detail: "Optimised render cycles, canvas and audio" },
  { value: "100%", label: "Type-safe & component-driven", detail: "Next.js · TypeScript · Tailwind" },
  { value: "BSc", label: "Computer Science", detail: "University of Roehampton · Class of 2027" },
];

export const tools = [
  "React", "Next.js", "TypeScript", "Vite", "Tailwind CSS", "Framer Motion",
  "Web Audio API", "Firebase", "REST APIs", "Node.js", "Vercel", "Git",
];

// `exploring: true` marks something you're still learning; everything else is production-ready.
export type Skill = { name: string; exploring?: boolean };

export const skills: { group: string; items: Skill[] }[] = [
  {
    group: "Core frontend",
    items: [{ name: "React" }, { name: "Next.js" }, { name: "Vite" }, { name: "TypeScript" }, { name: "JavaScript (ES6+)" }, { name: "HTML5" }, { name: "CSS3" }],
  },
  {
    group: "Styling & motion",
    items: [{ name: "Tailwind CSS" }, { name: "Framer Motion" }, { name: "Responsive, mobile-first layout" }],
  },
  {
    group: "Browser APIs & real-time",
    items: [{ name: "Web Audio API" }, { name: "Canvas / SVG micro-interactions" }, { name: "REST APIs" }, { name: "State synchronisation" }, { name: "WebGL / Three.js", exploring: true }],
  },
  {
    group: "Backend & tooling",
    items: [{ name: "Firebase Auth & Firestore" }, { name: "Node.js" }, { name: "Vercel CI/CD" }, { name: "Git & GitHub" }, { name: "npm" }, { name: "Distributed systems", exploring: true }, { name: "Rust tooling", exploring: true }],
  },
];

export const story = [
  "I'm a Computer Science undergraduate at the University of Roehampton in London. I pair the theory from my degree — algorithms, distributed systems, state machines — with a designer's eye for modern frontend.",
  "I build interfaces that respond instantly and feel physical to use, and I ship quickly with AI-assisted development pipelines while keeping the code typed, component-driven and easy to read.",
];

export const education = [
  {
    title: "BSc Computer Science",
    place: "University of Roehampton, London",
    years: "Class of 2027",
    detail: "[Standout modules or projects, societies.]",
    tags: ["Algorithms", "Distributed systems", "State machines"],
    current: true,
  },
];

export const experience = [
  { years: "[YYYY — Present]", role: "[Freelance web developer]", org: "[Self-employed]", detail: "[Who you built for and what you delivered.]" },
  { years: "[YYYY — YYYY]", role: "[Role]", org: "[Company / society]", detail: "[Responsibilities and one measurable outcome.]" },
];

export const now = [
  { label: "Currently exploring", title: "Distributed systems, WebGL & Rust", detail: "Distributed systems theory, WebGL / Three.js, and Rust-based tooling." },
  { label: "Location & work model", title: "Southall, London, UK", detail: "Eligible for full-time, placement and hybrid roles." },
  { label: "Design philosophy", title: "Zero-lag, tactile, accessible", detail: "Interfaces that respond instantly, give sensory feedback and work for everyone." },
];

export const principles = [
  { title: "Ship small, ship often", detail: "A working slice beats a perfect plan." },
  { title: "Speed is a feature", detail: "Performance and accessibility are part of the product, not polish." },
  { title: "Write it down", detail: "Clear READMEs and PRs save everyone time." },
];
