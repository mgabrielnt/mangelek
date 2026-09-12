"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";
import useEmblaCarousel from "embla-carousel-react";
import { useCarouselWheel } from "./useCarouselWheel";

export function useTemplateRail(initial: number) {
  const reduced = useReducedMotion();
  const [ref, api] = useEmblaCarousel({
    loop: true, align: "center", startIndex: initial, duration: 32,
    breakpoints: { "(prefers-reduced-motion: reduce)": { duration: 0 } },
  });
  const [active, setActive] = useState(initial);
  useEffect(() => {
    if (!api) return;
    const sync = () => setActive(api.selectedScrollSnap());
    sync();
    api.on("select", sync).on("reInit", sync);
    return () => { api.off("select", sync).off("reInit", sync); };
  }, [api]);
  useCarouselWheel(api, !!reduced);
  const select = (index: number) => api?.scrollTo(index, !!reduced);
  const move = (direction: number) => {
    if (direction < 0) api?.scrollPrev(!!reduced);
    else api?.scrollNext(!!reduced);
  };
  return { ref, active, select, move, ready: !!api };
}
