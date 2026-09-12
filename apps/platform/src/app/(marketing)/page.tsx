import { FeatureSection } from "@/components/home/features/FeatureSection";
import { Header } from "@/components/home/Header";
import { Hero } from "@/components/home/Hero";
import { TemplateGallery } from "@/components/home/TemplateGallery";

export default function HomePage() {
  return (
    <main>
      <Header />
      <Hero />
      <TemplateGallery />
      <FeatureSection />
    </main>
  );
}
