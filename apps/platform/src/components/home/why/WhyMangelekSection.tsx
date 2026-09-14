import { ScrollTimeline } from "@/components/ui/scroll-timeline/ScrollTimeline";
import { journey } from "@/data/journey";
import { SectionIntro } from "../shared/SectionIntro";
import { ScrollScene } from "../shared/ScrollScene";
import { JourneyStep } from "./components/JourneyStep";
import { FeyFinale } from "./components/FeyFinale";

export function WhyMangelekSection() {
  return <section className="whySection marketingSection" id="why-mangelek"
    aria-labelledby="journey-title">
    <ScrollScene distance={36}>
      <SectionIntro id="journey-title"
        title={<>Setiap langkah,<br /><em>semakin menjadi Anda.</em></>} />
    </ScrollScene>
    <ScrollTimeline>
      {journey.map((item, index) => <JourneyStep key={item.label} item={item} index={index} />)}
    </ScrollTimeline>
    <div className="journeyAction sectionWidth">
      <a className="marketingLink" href="#templates">
        Pilih Tema Anda<span aria-hidden="true">↗</span>
      </a>
    </div>
    <FeyFinale />
  </section>;
}
