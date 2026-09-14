import { billingOptions, plan } from "@/data/pricing/plan";
import { BillingSelector } from "./BillingSelector";
import { IncludedFeatures } from "./IncludedFeatures";

export function PlanCard() {
  return <article id="paket" className="pricingPlan" aria-labelledby="plan-title">
    <div className="pricingPlanMain">
      <div className="pricingPlanPurchase">
        <span className="pricingLabel">{billingOptions.length ? "Langganan" : "Segera hadir"}</span>
        <h2 id="plan-title">{plan.name}</h2>
        <BillingSelector options={billingOptions} />
        <a className="pricingButton" href={plan.startHref}>
          {billingOptions.length ? "Mulai Sekarang" : "Jelajahi Tema"}<span aria-hidden="true">↗</span>
        </a>
      </div>
      <IncludedFeatures />
    </div>
  </article>;
}
