"use client";

import { businessFeatures } from "@/data/features";
import { FeatureStep } from "./FeatureStep";
import { FeatureVisual } from "./FeatureVisual";
import { useFeatureScroll } from "./use-feature-scroll";

export function FeatureSection() {
  const { active, setNode } = useFeatureScroll(businessFeatures.length);

  return (
    <section className="featureSection" id="features">
      <div className="featureBackdrop" aria-hidden />
      <header className="featureHeader">
        <span className="featureEyebrow">Satu platform. Semua terhubung.</span>
        <h2>Satu sistem untuk menjalankan website bisnis Anda.</h2>
        <p>
          Dari konten dan domain hingga performa bisnis, semuanya bekerja
          bersama dalam satu pengalaman yang sederhana dan terarah.
        </p>
      </header>
      <div className="featureStory">
        <div className="featureSteps">
          {businessFeatures.map((item, index) => (
            <FeatureStep key={item.title} item={item} index={index}
              active={active === index} setNode={setNode} />
          ))}
        </div>
        <FeatureVisual items={businessFeatures} active={active} />
      </div>
    </section>
  );
}
