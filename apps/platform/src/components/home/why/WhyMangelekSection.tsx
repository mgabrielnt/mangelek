import { FeyCards } from "@/components/ui/aceternity/fey-cards";
import { whyMangelekCards } from "@/data/why-mangelek";

export function WhyMangelekSection() {
  return (
    <section className="whySection" id="why-mangelek">
      <div className="whyGlow" aria-hidden />
      <div className="whyIntro">
        <span className="whyEyebrow">Mengapa Mangelek</span>
        <h2>Standar profesional. Dibuat untuk bisnis Anda.</h2>
        <p>
          Desain, pengelolaan, domain, dan insight dirancang sebagai satu
          pengalaman yang rapi—tanpa menambah kerumitan teknis untuk bisnis Anda.
        </p>
      </div>
      <FeyCards cards={whyMangelekCards} />
    </section>
  );
}
