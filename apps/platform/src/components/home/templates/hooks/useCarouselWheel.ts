"use client";

import { useEffect } from "react";
import type { UseEmblaCarouselType } from "embla-carousel-react";

export function useCarouselWheel(api: UseEmblaCarouselType[1], reduced: boolean) {
  useEffect(() => {
    if (!api) return;
    const viewport = api.rootNode();
    let total = 0;
    let previous = 0;
    let lastMove = -Infinity;
    const wheel = (event: WheelEvent) => {
      if (event.ctrlKey || (event.target as HTMLElement).closest("dialog")) return;
      const horizontal = Math.abs(event.deltaX) > Math.abs(event.deltaY);
      if (!horizontal && !event.shiftKey) return;
      const delta = horizontal ? event.deltaX : event.deltaY;
      if (!delta) return;
      event.preventDefault();
      const now = event.timeStamp;
      if (now - previous > 180 || Math.sign(total) !== Math.sign(delta)) total = 0;
      total += delta * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? 400 : 1);
      previous = now;
      if (Math.abs(total) < 32 || now - lastMove < 180) return;
      if (total > 0) api.scrollNext(reduced);
      else api.scrollPrev(reduced);
      total = 0;
      lastMove = now;
    };
    viewport.addEventListener("wheel", wheel, { passive: false });
    return () => viewport.removeEventListener("wheel", wheel);
  }, [api, reduced]);
}
