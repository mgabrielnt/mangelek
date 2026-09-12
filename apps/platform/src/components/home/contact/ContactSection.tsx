import { GithubGlobe } from "@/components/ui/aceternity/github-globe";
import { contactGlobeArcs } from "@/data/contact-globe";
import { Reveal } from "../shared/Reveal";
import { ContactForm } from "./components/ContactForm";

export function ContactSection() {
  return <section className="contactSection marketingSection" id="contact"
    aria-labelledby="contact-title">
    <div className="contactShell sectionWidth">
      <div className="contactVisual">
        <div className="contactVisualCopy"><span className="sectionLabel">DARI INDONESIA. UNTUK DUNIA.</span>
          <p>Ide Anda.<br /><em>Tanpa batas.</em></p></div>
        <GithubGlobe arcs={contactGlobeArcs} />
        <span className="contactCoordinates">6.21° S / 106.85° E <i /> INDONESIA</span>
      </div>
      <div className="contactPanel">
        <Reveal><span className="sectionLabel">03 / LANGKAH SELANJUTNYA</span>
          <h2 id="contact-title">Mulai sesuatu<br /><em>yang berarti.</em></h2>
          <p className="contactLead">Ceritakan bisnis Anda. Kita mulai dari sana.</p></Reveal>
        <ContactForm />
      </div>
    </div>
  </section>;
}
