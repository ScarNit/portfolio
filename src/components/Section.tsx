/** Shared section wrapper: numbered pixel label, heading and optional lead. */
export default function Section({
  id,
  index,
  label,
  title,
  lead,
  children,
}: {
  id: string;
  index: string;
  label: string;
  title: string;
  lead?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="border-t border-line py-20 sm:py-28">
      <div className="reveal">
        <p className="font-pixel text-xs uppercase tracking-widest text-torch">
          {index} / {label}
        </p>
        <h2 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
          {title}
        </h2>
        {lead && <p className="mt-4 max-w-2xl text-lg leading-relaxed text-dim">{lead}</p>}
      </div>
      <div className="mt-12">{children}</div>
    </section>
  );
}
