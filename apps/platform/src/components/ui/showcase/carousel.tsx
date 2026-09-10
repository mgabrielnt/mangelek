"use client";

import { useEffect, useRef, type ReactNode } from "react";

function getMetrics(group: HTMLDivElement | null) {
  if (!group) return null;
  const first = group.children.item(0) as HTMLElement | null;
  const second = group.children.item(1) as HTMLElement | null;
  if (!first) return null;

  const step = second ? second.offsetLeft - first.offsetLeft : first.offsetWidth;
  return { span: group.offsetWidth, step };
}

export function TemplateShowcase({ items, activeIndex = 0 }: {
  items: ReactNode[];
  activeIndex?: number;
}) {
  const railRef = useRef<HTMLDivElement>(null);
  const groupRef = useRef<HTMLDivElement>(null);
  const readyRef = useRef(false);

  const loop = () => {
    const rail = railRef.current;
    const metrics = getMetrics(groupRef.current);
    if (!rail || !metrics) return;

    if (rail.scrollLeft < metrics.span) rail.scrollLeft += metrics.span;
    else if (rail.scrollLeft >= metrics.span * 2) rail.scrollLeft -= metrics.span;
  };

  useEffect(() => {
    const rail = railRef.current;
    const metrics = getMetrics(groupRef.current);
    if (!rail || !metrics) return;

    const left = metrics.span + activeIndex * metrics.step;
    if (readyRef.current) rail.scrollTo({ left, behavior: "smooth" });
    else { rail.scrollLeft = left; readyRef.current = true; }
  }, [activeIndex]);

  const move = (direction: number) => {
    const rail = railRef.current;
    const metrics = getMetrics(groupRef.current);
    if (rail && metrics) rail.scrollBy({ left: direction * metrics.step, behavior: "smooth" });
  };

  return <div className="showcase">
    <div className="showcaseRail" ref={railRef} onScroll={loop}>
      <div className="showcaseTrack">{[0, 1, 2].map((copy) =>
        <div className="showcaseGroup" ref={copy === 0 ? groupRef : undefined} key={copy}>{items}</div>)}</div>
    </div>
    <div className="showcaseControls">
      <button onClick={() => move(-1)} aria-label="Previous template">←</button>
      <button onClick={() => move(1)} aria-label="Next template">→</button>
    </div>
  </div>;
}
