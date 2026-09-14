import type { Metadata } from "next";
import { Header } from "@/components/home/header/Header";
import { PricingHero } from "@/components/pricing/PricingHero";
import { PlanCard } from "@/components/pricing/PlanCard";
import { PricingFaq } from "@/components/pricing/PricingFaq";
import { PricingFooter } from "@/components/pricing/PricingFooter";
import "@/styles/pricing.css";

export const metadata: Metadata = {
  title: "Pricing — Website + CMS | Mangelek",
  description: "Paket Website + CMS Mangelek: fitur, kapasitas penggunaan, biaya domain, dan informasi langganan website bisnis.",
};

export default function PricingPage() {
  return <div id="top" className="pricingPage">
    <Header activePage="pricing" />
    <main id="main-content" className="pricingContent" tabIndex={-1} aria-labelledby="pricing-title">
      <PricingHero /><PlanCard /><PricingFaq />
    </main>
    <PricingFooter />
  </div>;
}
