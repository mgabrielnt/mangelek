"use client";

import { useEffect, useRef, useState } from "react";

export function useFeatureScroll(count: number) {
  const nodes = useRef<(HTMLElement | null)[]>([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      const index = Number((visible.target as HTMLElement).dataset.index ?? 0);
      setActive(index);
    }, { rootMargin: "-34% 0px -42% 0px", threshold: [0, .25, .5, .75] });

    nodes.current.slice(0, count).forEach((node) => node && observer.observe(node));
    return () => observer.disconnect();
  }, [count]);

  return {
    active,
    setNode: (index: number, node: HTMLElement | null) => { nodes.current[index] = node; },
  };
}
