"use client";

import { useEffect, useState } from "react";
import { profile } from "@/data/content";

const items = [
  { id: "projects", label: "Games" },
  { id: "path", label: "Path" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  // Highlight the section currently in the middle of the viewport.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    // "top" is observed too so the highlight clears back in the hero.
    for (const { id } of [{ id: "top" }, ...items]) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const link = (id: string) =>
    "transition-colors hover:text-bone " + (active === id ? "text-torch" : "text-dim");

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-ink/85 backdrop-blur">
      <nav aria-label="Main" className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
        <a href="#top" className="font-pixel text-sm font-bold tracking-wide" onClick={() => setOpen(false)}>
          {profile.moniker}
          <span className="blink text-torch">_</span>
        </a>

        <ul className="hidden gap-8 font-pixel text-xs uppercase tracking-wider sm:flex">
          {items.map((item) => (
            <li key={item.id}>
              <a href={`#${item.id}`} aria-current={active === item.id ? "true" : undefined} className={link(item.id)}>
                {active === item.id && <span aria-hidden="true">▸ </span>}
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((o) => !o)}
          className="-mr-2 grid size-10 place-items-center border-2 border-line text-lg text-bone active:translate-y-px sm:hidden"
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <span aria-hidden="true">{open ? "✕" : "☰"}</span>
        </button>
      </nav>

      {open && (
        <ul id="mobile-menu" className="border-t border-line px-5 py-2 font-pixel text-sm uppercase tracking-wider sm:hidden">
          {items.map((item) => (
            <li key={item.id}>
              <a href={`#${item.id}`} onClick={() => setOpen(false)} className={"block py-3 " + link(item.id)}>
                <span aria-hidden="true" className="mr-2 text-torch">▸</span>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
