import { education, experience, type TimelineItem } from "@/data/content";
import Section from "./Section";

function Track({ title, items }: { title: string; items: TimelineItem[] }) {
  return (
    <div>
      <h3 className="font-pixel text-xs uppercase tracking-widest text-dim">{title}</h3>
      <ol className="mt-6 ml-1.5 border-l-2 border-line">
        {items.map((item) => (
          <li key={item.role} className="reveal relative pb-9 pl-7 last:pb-0">
            <span
              aria-hidden="true"
              className={
                "absolute top-1.5 -left-[7px] size-3 border-2 border-torch " +
                (item.current ? "pulse-dot bg-torch" : "bg-ink")
              }
            />
            <p className={"font-pixel text-[10px] uppercase tracking-wider " + (item.current ? "text-torch" : "text-dim")}>
              {item.period}
            </p>
            <h4 className="mt-1.5 text-xl font-semibold tracking-tight">{item.role}</h4>
            <p className="text-sm text-dim">{item.place}</p>
            <ul className="mt-2.5 space-y-1.5">
              {item.points.map((point) => (
                <li key={point} className="flex gap-2 leading-relaxed text-bone/85">
                  <span aria-hidden="true" className="mt-[0.7em] size-1 shrink-0 bg-torch" />
                  {point}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default function Timeline() {
  return (
    <Section
      id="path"
      index="02"
      label="Path"
      title="Teaching it, studying it, shipping it."
      lead="Game development on one track, computer science on the other, and jobs that taught me to explain things clearly."
    >
      <div className="grid gap-14 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
        <Track title="Experience" items={experience} />
        <Track title="Education" items={education} />
      </div>
    </Section>
  );
}
