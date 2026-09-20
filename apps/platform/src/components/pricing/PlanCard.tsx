import { billingOptions, plan } from "@/data/pricing/plan";
import { BillingSelector } from "./BillingSelector";
import { IncludedFeatures } from "./IncludedFeatures";
import { PricingAddons } from "./PricingAddons";
import { PricingIcon } from "./PricingIcon";

export function PlanCard() {
  return <article id="paket" className="pricingPlan" aria-labelledby="plan-title">
    <div className="pricingPlanHeading">
      <div className="pricingPlanIdentity">
        <span className="pricingPlanIcon"><PricingIcon name="layout" /></span>
        <div>
          <h2 id="plan-title">{plan.name}</h2>
          <p>{plan.description}</p>
        </div>
      </div>
      <span className="pricingLabel">{billingOptions.length ? "Langganan" : "Segera hadir"}</span>
    </div>
    <div className="pricingPlanMain">
      <aside className="pricingPlanPurchase" aria-labelledby="summary-title">
        <h3 id="summary-title">Ringkasan paket</h3>
        <dl className="pricingSummary">
          <div><dt>Website + CMS</dt><dd>Satu paket</dd></div>
          <div><dt>Hosting & koneksi domain</dt><dd>Termasuk</dd></div>
        </dl>
        <BillingSelector options={billingOptions} />
        <a className="pricingButton" href={plan.startHref}>
          {billingOptions.length ? "Mulai Sekarang" : "Jelajahi Tema"}<PricingIcon name="arrow" />
        </a>
        <a className="pricingSecondaryButton" href="/#contact">Hubungi kami</a>
        {!billingOptions.length && <p className="pricingPurchaseNote">Harga, kuota, dan ketentuan tersedia sebelum pembayaran dibuka.</p>}
      </aside>
      <div className="pricingPlanDetails">
        <IncludedFeatures />
        <PricingAddons />
      </div>
    </div>
  </article>;
}
