"use client";

import { useRef } from "react";

export function useHeroInteraction() {
  const scene = useRef<HTMLDivElement>(null);
  const follow = (position: number) => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches || !scene.current) return;
    const shift = (position - 43.9) / 40.83 * 100;
    scene.current.style.setProperty("--waiter-shift", `${shift}%`);
    scene.current.dataset.engaged = "true";
  };
  const reset = () => {
    scene.current?.style.removeProperty("--waiter-shift");
    scene.current?.removeAttribute("data-engaged");
  };
  return { scene, follow, reset };
}
