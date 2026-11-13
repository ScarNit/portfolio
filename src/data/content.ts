/**
 * All site content lives here. Edit this file to update the portfolio;
 * the components only handle layout.
 *
 * Roles, dates and figures were synced from LinkedIn in November 2026.
 */
import type { CoverKey } from "@/components/sprites";

export const profile = {
  name: "Tin Škarpa",
  moniker: "ScarNit",
  role: "Game developer · Unity + C#",
  tagline: "I design, build and ship games in Unity and C#.",
  intro:
    "Four games released on itch.io as ScarNit, including my entry to the Official Unity Game Jam 2026. Computer science student at FER Zagreb, and I teach Unity and C# to kids at Coding Giants.",
  location: "Zagreb, Croatia",
  stats: [
    { value: "4", label: "games released" },
    { value: "5.0/5", label: "TRY on itch.io at release" },
    { value: "12", label: "students taught each week" },
  ],
};

/** Prefix for files in /public, so links work when the site is served from a sub-path. */
export const asset = (path: string) => (process.env.NEXT_PUBLIC_BASE_PATH ?? "") + path;

export const links = {
  github: "https://github.com/ScarNit",
  linkedin: "https://www.linkedin.com/in/tin-skarpa-587876273/",
  itch: "https://scarnit.itch.io",
  email: "tinskarpa10@gmail.com",
  cv: asset("/Tin-Skarpa-CV.pdf"),
};

export type Project = {
  title: string;
  genre: string;
  year: string;
  status: { kind: "published" | "jam" | "dev"; label: string };
  /** One line that sells the game. */
  hook: string;
  description: string;
  /** Short, concrete facts shown as a list. */
  highlights: string[];
  tech: string[];
  /** CSS colour used for this card's accents. */
  accent: string;
  /** Pixel cover art, used only if `media` is not set. */
  cover: CoverKey;
  /** Screenshot, GIF or video under /public, e.g. "/media/try.mp4". */
  media?: string;
  /** First link is the primary button. */
  links: { label: string; href: string }[];
};

export const projects: Project[] = [
  {
    title: "TRY",
    genre: "Punishing dungeon platformer",
    year: "2026",
    status: { kind: "published", label: "Live · itch.io" },
    hook: "Every room is built to kill you. Every death is your own fault.",
    description:
      "A 2D pixel-art platformer about tight movement, instant restarts and learning a room one death at a time.",
    highlights: [
      "Rated 5.0 / 5.0 on itch.io at release",
      "Seven handcrafted levels with best-time tracking and autosave",
    ],
    tech: ["Unity 2D", "C#", "PixelLab pixel art", "Level design"],
    accent: "#ffb224",
    cover: "try",
    media: "/media/try.png",
    links: [{ label: "Play on itch.io", href: "https://scarnit.itch.io/try" }],
  },
  {
    title: "Lucky Seven, Honest!",
    genre: "Cartoon casino cheating game",
    year: "2026",
    status: { kind: "jam", label: "Unity Game Jam 2026 entry" },
    hook: "Tip your die to a seven while the dealer looks away.",
    description:
      "Reach 777 chips across a dice table, a VIP roulette run by a pit boss and a slot machine that pays in tricks. Theme: Lucky Number.",
    highlights: [
      "Designed, balanced and shipped inside the jam window",
      "Added a guided tutorial after playtest feedback",
    ],
    tech: ["Unity 6 (URP)", "C#", "WebGL", "AI-assisted tooling"],
    accent: "#3fcf8e",
    cover: "lucky",
    media: "/media/lucky-seven.png",
    links: [{ label: "Play in browser", href: "https://scarnit.itch.io/lucky-seven-honest" }],
  },
  {
    title: "LAST STAND",
    genre: "Post-apocalyptic tower defense",
    year: "2026",
    status: { kind: "published", label: "Live · itch.io" },
    hook: "Hold the line for one more wave.",
    description:
      "A 2D military tower defense set after the collapse: place defences, spend scarce resources and survive.",
    highlights: [
      "60 waves across four difficulty levels",
      "10 towers with four upgrade tiers, 10 enemy types, four multi-phase bosses",
    ],
    tech: ["Unity 2D", "C#", "Wave design", "Balancing"],
    accent: "#9db552",
    cover: "laststand",
    media: "/media/last-stand.jpg",
    links: [{ label: "Play in browser", href: "https://scarnit.itch.io/last-stand" }],
  },
  {
    title: "Attack on Samurai",
    genre: "Wave-based action",
    year: "2023",
    status: { kind: "published", label: "Live · itch.io" },
    hook: "The first one. Blade out, waves incoming.",
    description:
      "A 2D action game with katana combat, wave-based enemies and a boss fight. My final project at Machina Game Dev Academy.",
    highlights: ["Solo project, taken from concept to release"],
    tech: ["Unity 2D", "C#", "Combat design"],
    accent: "#f0524f",
    cover: "samurai",
    media: "/media/attack-on-samurai.jpg",
    links: [{ label: "Play on itch.io", href: "https://scarnit.itch.io/attack-on-samurai" }],
  },
];

export type TimelineItem = {
  role: string;
  place: string;
  period: string;
  /** Highlights the entry as ongoing. */
  current?: boolean;
  points: string[];
};

export const experience: TimelineItem[] = [
  {
    role: "Online Unity & C# Teacher",
    place: "Coding Giants · Part-time, remote",
    period: "Oct 2026 — Now",
    current: true,
    points: [
      "Teach two live classes a week: Unity for ages 13–15 and C# for ages 10–13.",
      "Turn programming concepts into things a ten-year-old can build and play.",
    ],
  },
  {
    role: "Website Developer (volunteer)",
    place: "SUSFER, sports association of FER students",
    period: "Oct 2026 — Now",
    current: true,
    points: ["Building the association's site: sports sections, events and how to join."],
  },
  {
    role: "Sales Assistant",
    place: "Apple Premium Reseller · Zagreb",
    period: "Oct 2025 — Jun 2026",
    points: [
      "Met monthly sales targets for hardware, accessories and services.",
      "Device setup, data migration and software troubleshooting in a high-volume store.",
    ],
  },
  {
    role: "Lab Demonstrator, Digital Logic",
    place: "FER, University of Zagreb",
    period: "Oct 2024 — Feb 2025",
    points: [
      "Selected by the faculty as one of few first-year students to demonstrate a lab course.",
      "Guided students through circuit simulation and troubleshooting.",
    ],
  },
  {
    role: "Aquapark Animator",
    place: "Skarpina · Vodice, seasonal",
    period: "2021 — 2026",
    points: ["Five summer seasons leading guest entertainment, ticket sales and customer service."],
  },
];

export const education: TimelineItem[] = [
  {
    role: "MSc in Game Development",
    place: "Applying across Europe, incl. University of Gothenburg",
    period: "Next",
    current: true,
    points: ["Preparing applications for game development Master's programmes."],
  },
  {
    role: "BSc in Computer Science",
    place: "FER, University of Zagreb",
    period: "Oct 2024 — Jun 2027",
    points: [
      "Algorithms & Data Structures, Object-Oriented Programming, Operating Systems, Databases, Web Software Development.",
    ],
  },
  {
    role: "Video Game Development with Unity & C#",
    place: "Machina Game Dev Academy · Certificate",
    period: "Jun 2023",
    points: ["Completed a year before starting at FER."],
  },
];

export const skills = {
  core: {
    title: "Unity + C#",
    proof: "Four released games, one of them a game jam entry, and two classes a week teaching both.",
    items: ["Unity 2D / 3D", "Unity 6 / URP", "Gameplay programming", "Game physics", "Level design", "Balancing", "WebGL builds", "Pixel art + sprites"],
  },
  groups: [
    { group: "Languages", items: ["C#", "C++", "Python", "JavaScript"] },
    { group: "Web + tools", items: ["HTML & CSS", "React / Next.js", "Git & GitHub", "AI coding assistants"] },
    { group: "People", items: ["Teaching", "Customer-facing sales", "Croatian (native)", "English (professional)"] },
  ],
  offScreen: "Off screen: 16 years on skis, carving and off-piste.",
};
