"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export function useFeatureReveal(count: number) {
  const nodes = useRef<(HTMLElement | null)[]>([]);
  const [visible, setVisible] = useState<boolean[]>(() => Array(count).fill(false));

  const setNode = useCallback((index: number, node: HTMLElement | null) => {
    nodes.current[index] = node;
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const index = Number((entry.target as HTMLElement).dataset.index ?? 0);
        setVisible((current) => current[index]
          ? current
          : current.map((value, itemIndex) => itemIndex === index || value));
        observer.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -12% 0px", threshold: .22 });

    nodes.current.slice(0, count).forEach((node) => node && observer.observe(node));
    return () => observer.disconnect();
  }, [count]);

  return { visible, setNode };
}
