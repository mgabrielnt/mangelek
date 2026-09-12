import { ContactSection } from "@/components/home/contact/ContactSection";
import { FeatureSection } from "@/components/home/features/FeatureSection";
import { Header } from "@/components/home/Header";
import { Hero } from "@/components/home/Hero";
import { TemplateGallery } from "@/components/home/TemplateGallery";
import { WhyMangelekSection } from "@/components/home/why/WhyMangelekSection";

export default function HomePage() {
  return (
    <main>
      <Header />
      <Hero />
      <TemplateGallery />
      <FeatureSection />
      <WhyMangelekSection />
      <ContactSection />
    </main>
  );
}
