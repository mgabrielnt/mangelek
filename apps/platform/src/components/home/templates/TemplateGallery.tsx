"use client";

import { templateCategories } from "@/data/templates";
import { SectionIntro } from "../shared/SectionIntro";
import { Reveal } from "../shared/Reveal";
import { TemplateCard } from "./components/TemplateCard";
import { useTemplateRail } from "./hooks/useTemplateRail";

export function TemplateGallery() {
  const { ref, active, select } = useTemplateRail(2);
  return <section className="templates marketingSection" id="templates"
    aria-labelledby="templates-title">
    <Reveal>
      <SectionIntro id="templates-title" label="01 / PILIH KARAKTER BISNIS ANDA"
        title={<>Website yang terasa <em>seperti Anda.</em></>}
        description="Enam pilihan. Satu awal untuk sesuatu yang besar." />
    </Reveal>
    <div className="categoryTabs" role="group" aria-label="Pilih kategori template">
      {templateCategories.map((item, index) => <button key={item.id}
        type="button" aria-pressed={active === index}
        onClick={() => select(index)}>{item.label}</button>)}
    </div>
    <div className="templateRail" ref={ref} aria-label="Koleksi template"
      tabIndex={0} role="region">
      {templateCategories.map((item, index) =>
        <TemplateCard key={item.id} item={item} index={index} active={active === index} />)}
    </div>
    <div className="templateControls sectionWidth">
      <span><b>{String(active + 1).padStart(2, "0")}</b> / 06</span>
      <p>Dipilih untuk bisnis Anda. Disesuaikan untuk brand Anda.</p>
      <div>
        <button type="button" onClick={() => select(active - 1)}
          disabled={active === 0} aria-label="Template sebelumnya">←</button>
        <button type="button" onClick={() => select(active + 1)}
          disabled={active === 5} aria-label="Template berikutnya">→</button>
      </div>
    </div>
  </section>;
}
