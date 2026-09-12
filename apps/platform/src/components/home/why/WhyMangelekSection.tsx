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
      <SectionIntro id="journey-title" label="03 / DARI IDE, MENJADI NYATA"
        title={<>Setiap langkah,<br /><em>semakin menjadi Anda.</em></>} />
    </ScrollScene>
    <ScrollTimeline>
      {journey.map((item, index) => <JourneyStep key={item.label} item={item} index={index} />)}
    </ScrollTimeline>
    <FeyFinale />
  </section>;
}
