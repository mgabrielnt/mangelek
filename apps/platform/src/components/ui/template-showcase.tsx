"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { useOutsideClick } from "@/hooks/use-outside-click";

export type ShowcaseCard = { src: string; title: string; category: string; content: ReactNode };

export function TemplateShowcase({ items, activeIndex = 0 }: { items: ReactNode[]; activeIndex?: number }) {
  const rail = useRef<HTMLDivElement>(null), firstGroup = useRef<HTMLDivElement>(null), ready = useRef(false);
  const metrics = () => {
    const group = firstGroup.current;
    if (!group) return null;
    const first = group.children.item(0) as HTMLElement | null;
    const second = group.children.item(1) as HTMLElement | null;
    if (!first) return null;
    const step = second ? second.offsetLeft - first.offsetLeft : first.offsetWidth;
    return { start: group.offsetLeft, span: group.offsetWidth, step };
  };
  const loop = () => {
    const el = rail.current, m = metrics();
    if (!el || !m) return;
    if (el.scrollLeft < m.start + m.span) el.scrollLeft += m.span;
    else if (el.scrollLeft >= m.start + m.span * 2) el.scrollLeft -= m.span;
  };
  useEffect(() => {
    const el = rail.current, m = metrics();
    if (!el || !m) return;
    const left = m.start + m.span + activeIndex * m.step;
    if (!ready.current) { el.scrollLeft = left; ready.current = true; }
    else el.scrollTo({ left, behavior: "smooth" });
  }, [activeIndex]);
  const move = (dir: number) => {
    const el = rail.current, m = metrics();
    if (el && m) el.scrollBy({ left: dir * m.step, behavior: "smooth" });
  };
  return <div className="showcase"><div className="showcaseRail" ref={rail} onScroll={loop}><div className="showcaseTrack">
    {[0, 1, 2].map((copy) => <div className="showcaseGroup" ref={copy === 0 ? firstGroup : undefined} key={copy}>{items}</div>)}
  </div></div><div className="showcaseControls">
    <button onClick={() => move(-1)} aria-label="Previous template">←</button>
    <button onClick={() => move(1)} aria-label="Next template">→</button>
  </div></div>;
}

export function ShowcaseItem({ card }: { card: ShowcaseCard }) {
  const [open, setOpen] = useState(false), ref = useRef<HTMLDivElement>(null);
  const close = useCallback(() => setOpen(false), []);
  useOutsideClick(ref, close);
  useEffect(() => {
    if (!open) return;
    const key = (e: KeyboardEvent) => e.key === "Escape" && close();
    const overflow = document.body.style.overflow; document.body.style.overflow = "hidden";
    window.addEventListener("keydown", key);
    return () => { document.body.style.overflow = overflow; window.removeEventListener("keydown", key); };
  }, [open, close]);
  return <><button className="showcaseCard" onClick={() => setOpen(true)}>
    <img src={card.src} alt={card.title} loading="lazy" /><span className="showcaseShade" />
    <span className="showcaseCopy"><small>{card.category}</small><strong>{card.title}</strong></span>
  </button>{open && <div className="showcaseModal"><div className="showcaseBackdrop" /><div ref={ref} className="showcaseDialog">
    <button className="showcaseClose" onClick={close} aria-label="Close">×</button>
    <small>{card.category}</small><h3>{card.title}</h3>{card.content}</div></div>}</>;
}
