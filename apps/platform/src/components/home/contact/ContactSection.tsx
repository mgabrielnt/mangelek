import { GithubGlobe } from "@/components/ui/aceternity/github-globe";
import { contactGlobeArcs } from "@/data/contact-globe";
import { ContactForm } from "./components/ContactForm";

export function ContactSection() {
  return (
    <section className="contactSection" id="contact">
      <div className="contactShell">
        <div className="contactVisual">
          <GithubGlobe arcs={contactGlobeArcs} />
        </div>
        <div className="contactPanel">
          <h3>Mulai proyek Anda.</h3>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}