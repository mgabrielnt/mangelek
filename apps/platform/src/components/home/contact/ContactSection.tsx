import { GithubGlobe } from "@/components/ui/aceternity/github-globe";
import { contactGlobeArcs } from "@/data/contact-globe";
import { ContactForm } from "./components/ContactForm";

export function ContactSection() {
  return (
    <section className="contactSection" id="contact">
      <div className="contactShell">
        <div className="contactVisual">
          <div className="contactCopy">
            <span className="contactEyebrow">Mulai dari Indonesia</span>
            <h2>Bangun kehadiran digital yang siap berkembang.</h2>
            <p>
              Ceritakan kebutuhan bisnis Anda. Mangelek membantu menyederhanakan
              proses dari pilihan desain hingga website siap digunakan.
            </p>
          </div>
          <div className="contactGlobeWrap">
            <GithubGlobe arcs={contactGlobeArcs} />
            <span className="contactLocation">Indonesia · terhubung lebih jauh</span>
          </div>
        </div>
        <div className="contactPanel">
          <span className="contactPanelIndex">05 / CONTACT</span>
          <h3>Mulai percakapan.</h3>
          <p>Empat informasi singkat sudah cukup untuk memahami kebutuhan awal Anda.</p>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
