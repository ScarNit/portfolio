import { links, profile } from "@/data/content";
import DungeonRun from "./DungeonRun";

const cta = [
  { label: "▶ Play my games", href: links.itch, primary: true },
  { label: "GitHub", href: links.github },
  { label: "LinkedIn", href: links.linkedin },
  { label: "CV ↓", href: links.cv, download: true },
];

export default function Hero() {
  return (
    <section id="top" className="grid items-center gap-12 py-12 sm:py-16 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
      <div>
        <p className="flex items-center gap-2 font-pixel text-xs uppercase tracking-widest text-torch">
          <span aria-hidden="true" className="status-dot pulse-dot" />
          {profile.role}
        </p>
        <h1 className="mt-5 text-6xl font-bold leading-[0.92] tracking-tight whitespace-nowrap sm:text-7xl xl:text-8xl">{profile.name}</h1>
        <p className="mt-6 max-w-xl text-2xl font-semibold leading-snug text-balance sm:text-3xl">
          {profile.tagline}
        </p>
        <p className="mt-4 max-w-xl text-lg leading-relaxed text-dim">{profile.intro}</p>

        <div className="mt-8 flex flex-wrap gap-3">
          {cta.map((c) => (
            <a
              key={c.label}
              href={c.href}
              {...(c.download ? { download: true } : { target: "_blank", rel: "noopener noreferrer" })}
              className={
                "px-shadow border-2 px-5 py-3 font-pixel text-xs uppercase tracking-wider " +
                (c.primary
                  ? "border-torch bg-torch font-bold text-ink [--shadow:#7a5200]"
                  : "border-line bg-panel text-bone hover:border-dim")
              }
            >
              {c.label}
            </a>
          ))}
        </div>

        <dl className="mt-10 grid max-w-xl grid-cols-3 border-2 border-line bg-panel">
          {profile.stats.map((s) => (
            <div key={s.label} className="border-line px-4 py-3 not-first:border-l-2">
              <dd className="text-2xl font-bold tracking-tight text-torch sm:text-3xl">{s.value}</dd>
              <dt className="mt-1 text-xs leading-snug text-dim sm:text-sm">{s.label}</dt>
            </div>
          ))}
        </dl>
      </div>

      <DungeonRun />
    </section>
  );
}
