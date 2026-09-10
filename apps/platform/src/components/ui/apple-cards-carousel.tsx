"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { useOutsideClick } from "@/hooks/use-outside-click";

export type AppleCard = { src: string; title: string; category: string; content: ReactNode };

export function Carousel({ items, initialIndex = 0 }: { items: ReactNode[]; initialIndex?: number }) {
  const rail = useRef<HTMLDivElement>(null), firstGroup = useRef<HTMLDivElement>(null);
  const ready = useRef(false);
  const metrics = () => {
    const group = firstGroup.current;
    if (!group) return null;
    const cards = group.children as HTMLCollectionOf<HTMLElement>;
    const step = cards.length > 1 ? cards[1].offsetLeft - cards[0].offsetLeft : cards[0]?.offsetWidth ?? 0;
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
    const left = m.start + m.span + initialIndex * m.step;
    if (!ready.current) { el.scrollLeft = left; ready.current = true; }
    else el.scrollTo({ left, behavior: "smooth" });
  }, [initialIndex]);
  const move = (dir: number) => {
    const el = rail.current, m = metrics();
    if (el && m) el.scrollBy({ left: dir * m.step, behavior: "smooth" });
  };
  return <div className="appleCarousel"><div className="appleRail" ref={rail} onScroll={loop}><div className="appleTrack">
    {[0, 1, 2].map((copy) => <div className="appleLoopGroup" ref={copy === 0 ? firstGroup : undefined} key={copy}>{items}</div>)}
  </div></div><div className="appleControls">
    <button onClick={() => move(-1)} aria-label="Previous template"><span aria-hidden>←</span></button>
    <button onClick={() => move(1)} aria-label="Next template"><span aria-hidden>→</span></button>
  </div></div>;
}

export function Card({ card, index }: { card: AppleCard; index: number }) {
  const [open, setOpen] = useState(false), ref = useRef<HTMLDivElement>(null);
  const close = useCallback(() => setOpen(false), []);
  useOutsideClick(ref, close);
  useEffect(() => {
    if (!open) return;
    const key = (e: KeyboardEvent) => e.key === "Escape" && close();
    const old = document.body.style.overflow; document.body.style.overflow = "hidden";
    window.addEventListener("keydown", key);
    return () => { document.body.style.overflow = old; window.removeEventListener("keydown", key); };
  }, [open, close]);
  return <><button className="appleCard" style={{ animationDelay: `${index * 45}ms` }} onClick={() => setOpen(true)}>
    <img src={card.src} alt={card.title} loading="lazy" /><span className="appleShade" />
    <span className="appleCopy"><small>{card.category}</small><strong>{card.title}</strong></span>
  </button>{open && <div className="appleModal"><div className="appleBackdrop" /><div ref={ref} className="appleDialog">
    <button className="appleClose" onClick={close} aria-label="Close"><span aria-hidden>×</span></button>
    <small>{card.category}</small><h3>{card.title}</h3>{card.content}</div></div>}</>;
}
