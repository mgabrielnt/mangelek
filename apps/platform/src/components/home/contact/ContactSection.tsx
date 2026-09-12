import { GithubGlobe } from "@/components/ui/aceternity/github-globe";
import { contactGlobeArcs } from "@/data/contact-globe";
import { ContactForm } from "./components/ContactForm";

export function ContactSection() {
  return (
    <section className="contactSection" id="contact" aria-labelledby="contact-title">
      <div className="contactShell">
        <div className="contactVisual">
          <GithubGlobe arcs={contactGlobeArcs} />
        </div>
        <div className="contactPanel">
          <h2 id="contact-title">Mulai proyek Anda.</h2>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
