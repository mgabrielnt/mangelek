import { Reveal } from "../shared/Reveal";
import { SectionIntro } from "../shared/SectionIntro";
import { FeatureShowcase } from "./components/FeatureShowcase";

export function FeatureSection() {
  return <section className="featureSection marketingSection" id="features"
    aria-labelledby="features-title">
    <div className="featureBackdrop" aria-hidden="true" />
    <Reveal>
      <SectionIntro id="features-title" label="02 / SEMUA TERHUBUNG"
        title={<>Satu ruang.<br /><em>Segala kemungkinan.</em></>}
        description="Dari ide pertama hingga langkah berikutnya." />
    </Reveal>
    <FeatureShowcase />
    <div className="featureFootnote sectionWidth">
      <span>WEBSITE / KONTEN / DOMAIN / INSIGHT</span>
      <a href="#contact">Bangun bersama Mangelek <span aria-hidden="true">↗</span></a>
    </div>
  </section>;
}
