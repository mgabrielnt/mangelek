import { billingOptions, plan } from "@/data/pricing/plan";
import { BillingSelector } from "./BillingSelector";
import { PricingIcon } from "./PricingIcon";

const highlights = ["Website dan hosting", "Dashboard CMS", "Formulir dan leads", "Analitik kunjungan"];

export function PlanCard() {
  return <section id="paket" className="pricingWidth pricingPlanSection" aria-labelledby="plan-title">
    <div className="pricingPlan">
      <div className="pricingPlanIntro">
        <span className="pricingEyebrow">PAKET UTAMA</span>
        <h2 id="plan-title">{plan.name}</h2>
        <p>{plan.description}</p>
        <ul className="pricingHighlights">{highlights.map((item) =>
          <li key={item}><PricingIcon name="check" />{item}</li>)}</ul>
        <a className="pricingTextLink" href="#fitur-paket">Lihat seluruh fitur <span aria-hidden="true">↗</span></a>
      </div>
      <div className="pricingPlanPurchase">
        <BillingSelector options={billingOptions} />
        <a className="pricingButton" href={plan.startHref}>Mulai Sekarang <span aria-hidden="true">↗</span></a>
        <p className="pricingStartNote">Mulai dengan menjelajahi tema website.</p>
      </div>
    </div>
    <p className="pricingPlanFootnote">Satu paket untuk kebutuhan utama. Tambahan hanya saat Anda membutuhkannya.</p>
  </section>;
}
