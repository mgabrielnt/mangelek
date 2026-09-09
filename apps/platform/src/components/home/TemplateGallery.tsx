"use client";

import { useEffect, useRef, useState } from "react";
import { templateCategories } from "@/data/templates";
import { TemplateCard } from "./TemplateCard";

export function TemplateGallery() {
  const [active, setActive] = useState("company");
  const railRef = useRef<HTMLDivElement>(null);

  function center(id: string, behavior: ScrollBehavior = "smooth") {
    const target = railRef.current?.querySelector<HTMLElement>(`[data-id="${id}"]`);
    target?.scrollIntoView({ behavior, block: "nearest", inline: "center" });
  }

  function select(id: string) {
    setActive(id);
    center(id);
  }

  useEffect(() => center("company", "auto"), []);

  return (
    <section className="templates" id="templates">
      <div className="sectionIntro">
        <p className="eyebrow">Products</p>
        <h2>Temukan Website yang Cocok.</h2>
        <p>Mulai bisnis Anda dengan tema yang siap disesuaikan.</p>
      </div>
      <div className="categoryTabs" role="tablist" aria-label="Kategori template">
        {templateCategories.map((item) => (
          <button
            key={item.id}
            className={active === item.id ? "active" : ""}
            onClick={() => select(item.id)}
            role="tab"
            aria-selected={active === item.id}
          >{item.label}</button>
        ))}
      </div>
      <div className="templateRail" ref={railRef}>
        {templateCategories.map((item) => (
          <TemplateCard key={item.id} item={item} active={active === item.id} />
        ))}
      </div>
    </section>
  );
}
