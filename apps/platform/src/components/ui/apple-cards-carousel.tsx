"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { useOutsideClick } from "@/hooks/use-outside-click";

export type AppleCard = { src: string; title: string; category: string; content: ReactNode };

export function Carousel({ items, initialScroll = 0 }: { items: ReactNode[]; initialScroll?: number }) {
  const rail = useRef<HTMLDivElement>(null);
  const [edge, setEdge] = useState({ left: true, right: false });
  const sync = () => {
    const el = rail.current;
    if (!el) return;
    const next = { left: el.scrollLeft <= 2, right: el.scrollLeft + el.clientWidth >= el.scrollWidth - 2 };
    setEdge((prev) => prev.left === next.left && prev.right === next.right ? prev : next);
  };
  useEffect(() => { rail.current?.scrollTo({ left: initialScroll, behavior: "smooth" }); requestAnimationFrame(sync); }, [initialScroll]);
  const move = (x: number) => rail.current?.scrollBy({ left: x, behavior: "smooth" });
  return <div className="appleCarousel">
    <div className="appleRail" ref={rail} onScroll={sync}><div className="appleTrack">{items}</div></div>
    <div className="appleControls">
      <button onClick={() => move(-360)} disabled={edge.left} aria-label="Previous templates"><span aria-hidden>←</span></button>
      <button onClick={() => move(360)} disabled={edge.right} aria-label="Next templates"><span aria-hidden>→</span></button>
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
      <div ref={ref} className="appleDialog">
        <button className="appleClose" onClick={close} aria-label="Close"><span aria-hidden>×</span></button>
        <small>{card.category}</small><h3>{card.title}</h3>{card.content}
      </div>
    </div>}
  </>;
}
