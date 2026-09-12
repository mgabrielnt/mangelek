"use client";

import { businessFeatures } from "@/data/features";
import { FeatureRow } from "./components/FeatureRow";
import { useFeatureReveal } from "./hooks/use-feature-reveal";

export function FeatureSection() {
  const { visible, setNode } = useFeatureReveal(businessFeatures.length);

  return (
    <section className="featureSection" id="features">
      <div className="featureBackdrop" aria-hidden />
      <header className="featureHeader">
        <span className="featureEyebrow">Satu platform. Semua terhubung.</span>
        <h2>Bangun, kelola, dan tumbuhkan website bisnis Anda.</h2>
        <p>
          Setiap bagian bekerja sebagai satu sistem, dari editor dan konten
          hingga domain dan insight bisnis.
        </p>
      </header>
      <div className="featureFlow">
        {businessFeatures.map((item, index) => (
          <FeatureRow key={item.title} item={item} index={index}
            visible={visible[index] ?? false} setNode={setNode} />
        ))}
      </div>
    </section>
  );
}
