import type { Metadata } from "next";
import localFont from "next/font/local";
import { PricingNavigation } from "@/components/pricing/PricingNavigation";
import { PricingHero } from "@/components/pricing/PricingHero";
import { PlanCard } from "@/components/pricing/PlanCard";
import { PricingFaq } from "@/components/pricing/PricingFaq";
import { PricingFooter } from "@/components/pricing/PricingFooter";
import "@/styles/pricing.css";

const pricingFont = localFont({
  src: [
    { path: "../../../../public/fonts/manrope-regular.ttf", weight: "400", style: "normal" },
    { path: "../../../../public/fonts/manrope-semibold.ttf", weight: "600", style: "normal" },
  ],
  variable: "--font-pricing",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Pricing — Website + CMS | Mangelek",
  description: "Paket Website + CMS Mangelek: fitur, kapasitas penggunaan, biaya domain, dan informasi langganan website bisnis.",
};

export default function PricingPage() {
  return <div id="top" className={`pricingPage ${pricingFont.variable}`}>
    <PricingNavigation />
    <main id="main-content" className="pricingContent" tabIndex={-1} aria-labelledby="pricing-title">
      <section aria-labelledby="pricing-title"><PricingHero /><PlanCard /></section>
      <PricingFaq />
    </main>
    <PricingFooter />
  </div>;
}
