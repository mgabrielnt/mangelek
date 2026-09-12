import { FeyCards } from "@/components/ui/aceternity/fey-cards";
import { whyMangelekCards } from "@/data/why-mangelek";

export function WhyMangelekSection() {
  return (
    <section className="whySection" id="why-mangelek">
      <div className="whyGlow" aria-hidden />
      <div className="whyShell">
        <div className="whyIntro">
          <span className="whyEyebrow">Mengapa Mangelek</span>
          <h2>Lebih sedikit urusan teknis. Lebih banyak ruang untuk bisnis.</h2>
          <p>
            Website, konten, domain, dan insight berada dalam satu pengalaman
            yang dirancang untuk tetap sederhana saat bisnis Anda berkembang.
          </p>
          <div className="whyPills" aria-label="Keunggulan Mangelek">
            <span>Managed setup</span><span>Responsive by default</span><span>Business-ready</span>
          </div>
        </div>
        <FeyCards cards={whyMangelekCards} />
      </div>
    </section>
  );
}
