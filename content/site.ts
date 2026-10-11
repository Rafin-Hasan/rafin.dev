// Everything personal lives here. Replace the [bracketed] placeholders with your own details.

export const site = {
  name: "Rafin Hasan",
  shortName: "Rafin",
  domain: "rafin.dev",
  title: "Rafin Hasan — Full-stack developer",
  description:
    "Computer Science student at the University of Roehampton building fast, accessible full-stack web apps with Next.js and TypeScript.",
  location: "London, UK",
  email: "rafinhasan.web@gmail.com",
  resumeUrl: "/resume.pdf",
  portrait: "/portrait.webp",
  replyTime: "[1–2 days]",
  available: true,
  roles: ["Full-stack developer", "CS student @ Roehampton", "UI engineer", "Problem solver"],
  socials: {
    github: { label: "GitHub", handle: "@[username]", url: "https://github.com/[username]" },
    linkedin: { label: "LinkedIn", handle: "/in/[handle]", url: "https://www.linkedin.com/in/[handle]" },
  },
  stats: [
    { value: "[N]+", label: "Projects shipped" },
    { value: "[N] yrs", label: "Building for the web" },
    { value: "[N]+", label: "Technologies used" },
  ],
};

export const nav = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/projects" },
  { label: "About", href: "/about" },
  { label: "Writing", href: "/writing" },
  { label: "Contact", href: "/#contact" },
] as const;

export const tools = [
  "Next.js", "React", "TypeScript", "Node.js", "Tailwind CSS", "PostgreSQL",
  "Prisma", "Framer Motion", "Vercel", "Git", "MongoDB", "Figma",
];

export const skills = [
  { group: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"] },
  { group: "Backend", items: ["Node.js", "REST APIs", "PostgreSQL", "Prisma", "MongoDB"] },
  { group: "Tooling", items: ["Git", "GitHub", "Vercel", "Docker", "Figma"] },
  { group: "CS foundations", items: ["Data structures", "Algorithms", "OOP", "Databases"] },
];

export const education = [
  {
    title: "BSc Computer Science",
    place: "University of Roehampton, London",
    years: "[Start year] — Present",
    detail: "[Expected graduation, standout modules or projects, societies.]",
    tags: ["[Key module]", "[Key module]", "[Key module]"],
    current: true,
  },
  {
    title: "[Certification — e.g. Full-stack bootcamp]",
    place: "[Issuer]",
    years: "[Year]",
    detail: "[What it covered and what you built for it.]",
    tags: ["[Topic]", "[Topic]"],
  },
  {
    title: "[Higher secondary / A-levels]",
    place: "[School name]",
    years: "[Year — Year]",
    detail: "[Subjects and results.]",
    tags: ["[Subject]", "[Subject]"],
  },
];

export const experience = [
  { years: "[YYYY — Present]", role: "[Freelance web developer]", org: "[Self-employed]", detail: "[Who you built for and what you delivered.]" },
  { years: "[YYYY — YYYY]", role: "[Role]", org: "[Company / society]", detail: "[Responsibilities and one measurable outcome.]" },
  { years: "[YYYY]", role: "[Hackathon / open source]", org: "[Event or repo]", detail: "[What you shipped and any result.]" },
];

export const now = [
  { label: "Now building", title: "[Current project]", detail: "[One line on what and why.]" },
  { label: "Now learning", title: "[Technology or topic]", detail: "[What's drawing you to it.]" },
  { label: "Now reading", title: "[Book or course]", detail: "[Author / source]" },
];

export const principles = [
  { title: "Ship small, ship often", detail: "A working slice beats a perfect plan." },
  { title: "Speed is a feature", detail: "Performance and accessibility are part of the product, not polish." },
  { title: "Write it down", detail: "Clear READMEs and PRs save everyone time." },
];
