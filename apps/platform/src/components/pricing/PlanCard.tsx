import { billingOptions, plan } from "@/data/pricing/plan";
import { BillingSelector } from "./BillingSelector";
import { IncludedFeatures } from "./IncludedFeatures";
import { PricingAddons } from "./PricingAddons";

export function PlanCard() {
  return <section id="paket" className="pricingPlan" aria-labelledby="plan-title">
    <div className="pricingPlanMain">
      <div className="pricingPlanPurchase">
        <span className="pricingLabel">PAKET UTAMA</span>
        <h2 id="plan-title">{plan.name}</h2>
        <p className="pricingDescription">{plan.description}</p>
        <BillingSelector options={billingOptions} />
        <a className="pricingButton" href={plan.startHref}>
          Mulai Sekarang <span aria-hidden="true">→</span>
        </a>
        <p className="pricingStartNote">Mulai dengan memilih tema website.</p>
      </div>
      <IncludedFeatures />
    </div>
    <PricingAddons />
  </section>;
}
