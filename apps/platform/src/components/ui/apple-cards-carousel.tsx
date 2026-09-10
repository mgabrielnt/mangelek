"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { useOutsideClick } from "@/hooks/use-outside-click";

export type AppleCard = { src: string; title: string; category: string; content: ReactNode };

export function Carousel({ items, initialScroll = 0 }: { items: ReactNode[]; initialScroll?: number }) {
  const rail = useRef<HTMLDivElement>(null);
  const firstGroup = useRef<HTMLDivElement>(null);
  const ready = useRef(false);
  const metrics = () => {
    const group = firstGroup.current;
    return group ? { start: group.offsetLeft, span: group.offsetWidth } : null;
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
    const left = m.start + m.span + initialScroll;
    if (!ready.current) { el.scrollLeft = left; ready.current = true; }
    else el.scrollTo({ left, behavior: "smooth" });
  }, [initialScroll]);
  const move = (x: number) => rail.current?.scrollBy({ left: x, behavior: "smooth" });
  return <div className="appleCarousel">
    <div className="appleRail" ref={rail} onScroll={loop}><div className="appleTrack">
      {[0, 1, 2].map((copy) => <div className="appleLoopGroup" ref={copy === 0 ? firstGroup : undefined} key={copy}>{items}</div>)}
    </div></div>
    <div className="appleControls">
      <button onClick={() => move(-360)} aria-label="Previous templates"><span aria-hidden>←</span></button>
      <button onClick={() => move(360)} aria-label="Next templates"><span aria-hidden>→</span></button>
    </div>
  </div>;
}

export function Card({ card, index }: { card: AppleCard; index: number }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const close = useCallback(() => setOpen(false), []);
  useOutsideClick(ref, close);
  useEffect(() => {
    if (!open) return;
    const key = (e: KeyboardEvent) => e.key === "Escape" && close();
    const old = document.body.style.overflow; document.body.style.overflow = "hidden";
    window.addEventListener("keydown", key);
    return () => { document.body.style.overflow = old; window.removeEventListener("keydown", key); };
  }, [open, close]);
  return <>
    <button className="appleCard" style={{ animationDelay: `${index * 45}ms` }} onClick={() => setOpen(true)}>
      <img src={card.src} alt={card.title} loading="lazy" /><span className="appleShade" />
      <span className="appleCopy"><small>{card.category}</small><strong>{card.title}</strong></span>
    </button>
    {open && <div className="appleModal"><div className="appleBackdrop" />
      <div ref={ref} className="appleDialog"><button className="appleClose" onClick={close} aria-label="Close"><span aria-hidden>×</span></button>
        <small>{card.category}</small><h3>{card.title}</h3>{card.content}</div>
    </div>}
  </>;
}
