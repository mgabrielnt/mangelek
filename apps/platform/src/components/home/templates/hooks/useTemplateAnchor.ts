"use client";

import { useEffect } from "react";
import type { UseEmblaCarouselType } from "embla-carousel-react";
import { templateCategories } from "@/data/templates";

export function useTemplateAnchor(api: UseEmblaCarouselType[1]) {
  useEffect(() => {
    if (!api) return;
    const select = () => {
      const index = templateCategories.findIndex((item) => location.hash === `#template-${item.id}`);
      if (index < 0) return;
      api.rootNode().scrollLeft = 0;
      api.scrollTo(index, true);
      document.getElementById("templates")?.scrollIntoView({ block: "start" });
    };
    const repeat = (event: MouseEvent) => {
      if (event.button || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      const link = (event.target as Element).closest<HTMLAnchorElement>('a[href^="#template-"]');
      if (link?.hash !== location.hash || link.target === "_blank") return;
      event.preventDefault();
      select();
    };
    select();
    document.addEventListener("click", repeat);
    window.addEventListener("hashchange", select);
    return () => {
      document.removeEventListener("click", repeat);
      window.removeEventListener("hashchange", select);
    };
  }, [api]);
}
