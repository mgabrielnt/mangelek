"use client";

import { useEffect, useRef } from "react";
import type { GlobeArc } from "@/data/contact-globe";
import { createGlobeScene } from "./create-globe-scene";

export function useGlobeScene(arcs: GlobeArc[]) {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    let disposed = false;
    let cleanup = () => {};

    const start = () => {
      void createGlobeScene(host, arcs).then((stop) => {
        if (disposed) stop();
        else cleanup = stop;
      });
    };
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry?.isIntersecting) return;
      observer.disconnect();
      start();
    }, { rootMargin: "320px" });

    observer.observe(host);
    return () => {
      disposed = true;
      observer.disconnect();
      cleanup();
    };
  }, [arcs]);

  return hostRef;
}
