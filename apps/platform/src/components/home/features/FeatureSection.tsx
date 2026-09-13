import { ScrollScene } from "../shared/ScrollScene";
import { SectionIntro } from "../shared/SectionIntro";
import { FeatureShowcase } from "./components/FeatureShowcase";

export function FeatureSection() {
  return <section className="featureSection marketingSection" id="features"
    aria-labelledby="features-title">
    <div className="featureBackdrop" aria-hidden="true" />
    <ScrollScene>
      <SectionIntro id="features-title"
        title={<>Satu ruang.<br /><em>Segala kemungkinan.</em></>}
        description="Dari ide pertama hingga langkah berikutnya." />
    </ScrollScene>
    <ScrollScene distance={32}><FeatureShowcase /></ScrollScene>
  </section>;
}
