import type { Metadata } from "next";
import { Header } from "@/components/home/header/Header";
import { Footer } from "@/components/home/footer/Footer";
import { PricingHero } from "@/components/pricing/PricingHero";
import { PlanCard } from "@/components/pricing/PlanCard";
import { IncludedFeatures } from "@/components/pricing/IncludedFeatures";
import { UsageLimits } from "@/components/pricing/UsageLimits";
import { PricingAddons } from "@/components/pricing/PricingAddons";
import { PricingFaq } from "@/components/pricing/PricingFaq";
import "@/styles/pricing.css";

export const metadata: Metadata = {
  title: "Pricing — Website + CMS | Mangelek",
  description: "Kenali paket Website + CMS Mangelek, fitur utama, pilihan tambahan, dan informasi langganan untuk website bisnis Anda.",
};

export default function PricingPage() {
  return <div id="top" className="pricingPage">
    <Header activePage="pricing" />
    <main id="main-content" tabIndex={-1}>
      <PricingHero /><PlanCard /><IncludedFeatures />
      <UsageLimits /><PricingAddons /><PricingFaq />
    </main>
    <Footer />
  </div>;
}
