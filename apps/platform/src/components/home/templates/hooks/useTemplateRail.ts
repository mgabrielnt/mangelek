"use client";

import { useEffect, useRef, useState } from "react";

export function useTemplateRail(initial: number) {
  const ref = useRef<HTMLDivElement>(null);
  const current = useRef(initial);
  const [active, setActive] = useState(initial);
  const select = (index: number, instant = false) => {
    const rail = ref.current;
    const card = rail?.children.item(index) as HTMLElement | null;
    if (!rail || !card) return;
    const left = card.offsetLeft - (rail.clientWidth - card.offsetWidth) / 2;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    rail.scrollTo({ left, behavior: instant || reduce ? "instant" : "smooth" });
    current.current = index;
    setActive(index);
  };
  useEffect(() => {
    const rail = ref.current;
    if (!rail) return;
    let frame = 0;
    const sync = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const center = rail.scrollLeft + rail.clientWidth / 2;
        const distances = Array.from(rail.children, (child) => {
          const card = child as HTMLElement;
          return Math.abs(card.offsetLeft + card.offsetWidth / 2 - center);
        });
        const index = distances.indexOf(Math.min(...distances));
        if (index < 0 || index === current.current) return;
        current.current = index;
        setActive(index);
      });
    };
    const resize = new ResizeObserver(() => select(current.current, true));
    resize.observe(rail);
    rail.addEventListener("scroll", sync, { passive: true });
    return () => {
      resize.disconnect();
      rail.removeEventListener("scroll", sync);
      cancelAnimationFrame(frame);
    };
  }, []);
  return { ref, active, select };
}
