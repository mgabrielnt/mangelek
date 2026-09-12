"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { templateCategories } from "@/data/templates";
import { SectionIntro } from "../shared/SectionIntro";
import { TemplateCard } from "./components/TemplateCard";
import { TemplateControls } from "./components/TemplateControls";
import { useTemplateRail } from "./hooks/useTemplateRail";

export function TemplateGallery() {
  const root = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: root, offset: ["start end", "end start"] });
  const textY = useTransform(scrollYProgress, [0, .45, 1], [32, 0, -24]);
  const { ref, active, select, move, ready } = useTemplateRail(
    Math.max(0, templateCategories.findIndex((item) => item.id === "company")),
  );
  return <section ref={root} className="templates marketingSection" id="templates"
    aria-labelledby="templates-title">
    <motion.div style={{ y: reduced ? 0 : textY }}>
      <SectionIntro id="templates-title" label="01 / TEMUKAN KARAKTER"
        title={<>Website yang terasa <em>seperti Anda.</em></>}
        description="Enam pilihan. Kemungkinan tanpa batas." />
    </motion.div>
    <div className="categoryTabs" role="group" aria-label="Pilih kategori template">
      {templateCategories.map((item, index) => <button key={item.id}
        type="button" aria-pressed={active === index}
        onClick={() => select(index)}>{item.label}</button>)}
    </div>
    <div className="templateViewport" ref={ref} data-ready={ready}
      aria-label="Koleksi template" aria-roledescription="karusel" tabIndex={0}
      role="region" onKeyDown={(event) => {
        if ((event.target as HTMLElement).closest("dialog")) return;
        if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
        event.preventDefault();
        if (event.key === "Home") select(0);
        else if (event.key === "End") select(templateCategories.length - 1);
        else move(event.key === "ArrowLeft" ? -1 : 1);
      }}>
      <div className="templateRail">
        {templateCategories.map((item, index) => <TemplateCard key={item.id}
          item={item} index={index} total={templateCategories.length} active={active === index} progress={scrollYProgress} />)}
      </div>
    </div>
    <TemplateControls active={active} total={templateCategories.length}
      label={templateCategories[active]?.label ?? ""} move={move} />
    <a className="templateContinue sectionWidth" href="#features">
      <span>Pilihan Anda. Awal ceritanya.</span><span aria-hidden="true">↓</span>
      <span className="templateContinueLine" aria-hidden="true">
        <motion.i style={{ scaleX: reduced ? 1 : scrollYProgress }} />
      </span>
    </a>
  </section>;
}
