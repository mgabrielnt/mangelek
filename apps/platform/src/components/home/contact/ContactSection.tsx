import { GithubGlobe } from "@/components/ui/aceternity/github-globe";
import { contactGlobeArcs } from "@/data/contact-globe";
import { ContactForm } from "./components/ContactForm";

export function ContactSection() {
  return (
    <section className="contactSection" id="contact">
      <div className="contactShell">
        <div className="contactVisual">
          <div className="contactCopy">
            <span className="contactEyebrow">Mulai percakapan</span>
            <h2>Mari bangun website yang bekerja untuk bisnis Anda.</h2>
            <p>
              Ceritakan apa yang ingin Anda capai. Kami bantu menyederhanakan
              langkah dari pilihan desain hingga website siap digunakan.
            </p>
          </div>
          <div className="contactGlobeWrap">
            <GithubGlobe arcs={contactGlobeArcs} />
            <span className="contactLocation">Indonesia · siap berkembang lebih jauh</span>
          </div>
        </div>
        <div className="contactPanel">
          <span className="contactPanelIndex">05 / CONTACT</span>
          <h3>Ceritakan kebutuhan Anda.</h3>
          <p>Kami hanya meminta informasi yang diperlukan untuk memahami proyek Anda.</p>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
