import { businessFeatures } from "@/data/features";
import { FeatureCard } from "./FeatureCard";

export function GrowthSection() {
  return (
    <section className="growth" id="features">
      <div className="growthHeader">
        <h2>Bisnis Lebih Mudah. Tumbuh Lebih Cepat.</h2>
        <p>
          Semua yang Anda butuhkan untuk membangun, mengelola, dan
          mengembangkan bisnis kini tersedia dalam satu platform yang praktis.
        </p>
      </div>
      <div className="featureRail">
        {businessFeatures.map((item) => <FeatureCard key={item.title} {...item} />)}
      </div>
    </section>
  );
}
