"use client";

import { useMemo, useState } from "react";
import { TemplateShowcase } from "@/components/ui/showcase/carousel";
import { TypingText } from "@/components/ui/typing-text";
import { templateCategories } from "@/data/templates";
import { TemplateCard } from "./TemplateCard";

export function TemplateGallery() {
  const initial = templateCategories.findIndex((item) => item.id === "company");
  const [active, setActive] = useState(initial < 0 ? 0 : initial);
  const cards = useMemo(
    () => templateCategories.map((item) => <TemplateCard key={item.id} item={item} />),
    [],
  );

  return (
    <section className="templates" id="templates">
      <div className="sectionIntro">
        <h2><TypingText text="Temukan Website yang Cocok." speed={48} /></h2>
        <p><TypingText text="Mulai bisnis Anda dengan tema premium yang siap disesuaikan." speed={22} delay={1450} /></p>
      </div>
      <div className="categoryTabs" role="tablist" aria-label="Kategori template">
        {templateCategories.map((item, index) => (
          <button key={item.id} className={active === index ? "active" : ""}
            onClick={() => setActive(index)} role="tab" aria-selected={active === index}>
            {item.label}
          </button>
        ))}
      </div>
      <TemplateShowcase items={cards} activeIndex={active} />
    </section>
  );
}
