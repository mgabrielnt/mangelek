import { GrowthSection } from "@/components/home/GrowthSection";
import { Header } from "@/components/home/Header";
import { Hero } from "@/components/home/Hero";
import { TemplateGallery } from "@/components/home/TemplateGallery";

export default function HomePage() {
  return (
    <main>
      <Header />
      <Hero />
      <TemplateGallery />
      <GrowthSection />
    </main>
  );
}
