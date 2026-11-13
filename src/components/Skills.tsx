import { skills } from "@/data/content";
import Section from "./Section";

export default function Skills() {
  const { core, groups, offScreen } = skills;
  return (
    <Section id="skills" index="03" label="Skills" title="Loadout.">
      <div className="reveal grid gap-px border-2 border-line bg-line lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div className="bg-panel p-6 sm:p-8">
          <p className="font-pixel text-[10px] uppercase tracking-wider text-torch">Main weapon</p>
          <h3 className="mt-2 text-3xl font-bold tracking-tight text-bone sm:text-4xl">{core.title}</h3>
          <p className="mt-3 leading-relaxed text-dim">{core.proof}</p>
          <ul className="mt-5 flex flex-wrap gap-2">
            {core.items.map((item) => (
              <li key={item} className="border border-torch/40 px-2 py-1 font-pixel text-[10px] uppercase tracking-wider text-bone">
                {item}
              </li>
            ))}
          </ul>
        </div>
        {groups.map((g) => (
          <div key={g.group} className="bg-panel p-6 sm:p-8">
            <h3 className="font-pixel text-xs uppercase tracking-wider text-torch">{g.group}</h3>
            <ul className="mt-4 space-y-2.5 text-bone/90">
              {g.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <p className="mt-5 font-pixel text-[11px] uppercase tracking-wider text-dim">{offScreen}</p>
    </Section>
  );
}
