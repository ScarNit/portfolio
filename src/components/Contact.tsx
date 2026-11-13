import { links, profile } from "@/data/content";

const socials = [
  { label: "GitHub", href: links.github },
  { label: "LinkedIn", href: links.linkedin },
  { label: "itch.io", href: links.itch },
  { label: "CV (PDF)", href: links.cv },
];

export default function Contact() {
  return (
    <footer id="contact" className="border-t-2 border-line bg-panel">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <p className="font-pixel text-xs uppercase tracking-widest text-torch">04 / Contact</p>
        <h2 className="mt-3 text-4xl font-semibold tracking-tight sm:text-6xl">
          Got a game to build?
        </h2>
        <p className="mt-4 max-w-xl text-lg text-dim">
          Open to game dev internships, junior roles, jams and collaborations.
        </p>
        <a
          href={`mailto:${links.email}`}
          className="mt-8 inline-block break-all text-xl font-semibold text-torch underline decoration-2 underline-offset-8 hover:text-bone sm:text-4xl"
        >
          {links.email}
        </a>

        <div className="mt-16 flex flex-col justify-between gap-6 border-t border-line pt-8 sm:flex-row sm:items-center">
          <ul className="flex flex-wrap gap-x-6 gap-y-2 font-pixel text-xs uppercase tracking-wider">
            {socials.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" className="text-dim hover:text-bone">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
          <p className="font-pixel text-[10px] uppercase tracking-wider text-dim">
            © {new Date().getFullYear()} {profile.name} · {profile.location}
          </p>
        </div>
      </div>
    </footer>
  );
}
