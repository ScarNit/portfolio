import { asset, projects, type Project } from "@/data/content";
import PixelSprite from "./PixelSprite";
import Section from "./Section";
import { COVERS } from "./sprites";

const STATUS_COLOR = { published: "#3fcf8e", jam: "#ffb224", dev: "#a89d86" };

function Cover({ project, index }: { project: Project; index: number }) {
  const primary = project.links[0];
  return (
    <div className="game-cover relative aspect-[16/9] overflow-hidden border-b-2 border-line">
      {project.media ? (
        /\.(mp4|webm)$/i.test(project.media) ? (
          <video src={asset(project.media)} autoPlay muted loop playsInline className="absolute inset-0 size-full object-cover" />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={asset(project.media)} alt={`${project.title} gameplay`} loading="lazy" className="absolute inset-0 size-full object-cover" />
        )
      ) : (
        // Box art until a gameplay clip is set in content.ts
        <div aria-hidden="true" className="absolute inset-0 flex items-center gap-5 px-8 sm:gap-7 sm:px-10">
          <PixelSprite rows={COVERS[project.cover]} className="cover-sprite w-24 shrink-0 drop-shadow-[4px_4px_0_rgb(0_0_0/0.6)] sm:w-32" />
          <p className="font-pixel text-2xl font-bold uppercase leading-[1.05] text-[var(--accent)] sm:text-3xl">
            {project.title}
          </p>
        </div>
      )}

      <div aria-hidden="true" className="crt-overlay pointer-events-none absolute inset-0 opacity-70" />
      <span aria-hidden="true" className="hud-corner tl" />
      <span aria-hidden="true" className="hud-corner tr" />
      <span aria-hidden="true" className="hud-corner bl" />
      <span aria-hidden="true" className="hud-corner br" />

      <p className="absolute top-4 left-5 font-pixel text-[10px] uppercase tracking-wider text-dim">
        No. {String(index + 1).padStart(2, "0")} · {project.year}
      </p>
      <p
        className="absolute top-3.5 right-5 flex items-center gap-2 border border-current bg-ink/80 px-2 py-1 font-pixel text-[10px] uppercase tracking-wider"
        style={{ color: STATUS_COLOR[project.status.kind] }}
      >
        <span aria-hidden="true" className={"status-dot " + (project.status.kind === "published" ? "pulse-dot" : "")} />
        {project.status.label}
      </p>
      {primary && (
        <p aria-hidden="true" className="press-play absolute right-5 bottom-4 font-pixel text-[10px] uppercase tracking-wider text-bone">
          ▶ Press play
        </p>
      )}
    </div>
  );
}

function Card({ project, index }: { project: Project; index: number }) {
  const [primary, ...rest] = project.links;
  return (
    <article
      style={{ "--accent": project.accent } as React.CSSProperties}
      className="game-card reveal flex flex-col border-2 border-line bg-panel"
    >
      <Cover project={project} index={index} />
      <div className="flex flex-1 flex-col p-6">
        <p className="font-pixel text-[10px] uppercase tracking-wider text-[var(--accent)]">{project.genre}</p>
        <h3 className="mt-2 text-2xl font-semibold tracking-tight">{project.title}</h3>
        <p className="mt-2 text-lg font-medium leading-snug text-bone">{project.hook}</p>
        <p className="mt-2 leading-relaxed text-dim">{project.description}</p>

        <ul className="mt-4 space-y-1.5">
          {project.highlights.map((h) => (
            <li key={h} className="flex gap-2 text-sm text-bone/90">
              <span aria-hidden="true" className="text-[var(--accent)]">★</span>
              {h}
            </li>
          ))}
        </ul>

        <ul className="mt-5 flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <li key={t} className="border border-line px-2 py-1 font-pixel text-[10px] uppercase tracking-wider text-dim">
              {t}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-3 pt-6">
          {primary && (
            <a
              href={primary.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${primary.label}: ${project.title}`}
              className="px-shadow border-2 border-[var(--accent)] bg-[var(--accent)] px-4 py-2 font-pixel text-xs font-bold uppercase tracking-wider text-ink [--shadow:color-mix(in_srgb,var(--accent)_45%,black)]"
            >
              ▶ {primary.label}
            </a>
          )}
          {rest.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-pixel text-xs uppercase tracking-wider text-[var(--accent)] underline-offset-4 hover:underline"
            >
              {l.label} →
            </a>
          ))}
        </div>
      </div>
    </article>
  );
}

export default function Projects() {
  return (
    <Section
      id="projects"
      index="01"
      label="Games"
      title="Four games, all playable right now."
      lead="Designed, programmed and released solo under the name ScarNit."
    >
      <div className="grid gap-7 md:grid-cols-2">
        {projects.map((p, i) => (
          <Card key={p.title} project={p} index={i} />
        ))}
      </div>
    </Section>
  );
}
