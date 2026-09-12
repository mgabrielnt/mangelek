"use client";

import { StickyScrollReveal, type StickyScrollItem } from "@/components/ui/aceternity/sticky-scroll-reveal";
import { businessFeatures } from "@/data/features";
import { FeaturePreview } from "./components/FeaturePreview";

export function FeatureSection() {
  const items: StickyScrollItem[] = businessFeatures.map((item, index) => ({
    title: item.title,
    description: item.text,
    meta: `${String(index + 1).padStart(2, "0")} · ${item.label}`,
    content: <FeaturePreview item={item} index={index} />,
  }));

  return <section className="featureSection" id="features">
    <div className="featureBackdrop" aria-hidden />
    <header className="featureHeader">
      <span className="featureEyebrow">Satu platform. Semua terhubung.</span>
      <h2>Bangun, kelola, dan tumbuhkan website bisnis Anda.</h2>
    </header>
    <StickyScrollReveal items={items} />
  </section>;
}
