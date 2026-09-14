import { usageLimits } from "@/data/pricing/features";
import { PricingIcon } from "./PricingIcon";

export function UsageLimits() {
  return <section className="pricingWidth pricingUsage" aria-labelledby="usage-title">
    <span className="pricingIconTile"><PricingIcon name="storage" /></span>
    <div><h2 id="usage-title">Kapasitas yang jelas, sejak awal.</h2>
      {usageLimits.length ? <dl>{usageLimits.map((limit) => <div key={limit.label}>
        <dt>{limit.label}</dt><dd>{limit.value}</dd>
      </div>)}</dl> : <p>Rincian penyimpanan media dan batas penggunaan akan tersedia sebelum langganan dibuka.</p>}
    </div>
    <a className="pricingTextLink" href="/#contact">Diskusikan kebutuhan <span aria-hidden="true">↗</span></a>
  </section>;
}
