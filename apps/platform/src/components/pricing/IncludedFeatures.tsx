import { pricingFeatures } from "@/data/pricing/features";
import { PricingIcon } from "./PricingIcon";
import { UsageLimits } from "./UsageLimits";

export function IncludedFeatures() {
  return <div className="pricingIncluded">
    <h3>Termasuk dalam paket</h3>
    {pricingFeatures.map((group) => <div className="pricingFeatureGroup" key={group.title}>
      <h4>{group.title}</h4>
      <ul className="pricingFeatures">{group.items.map((item) =>
        <li key={item}><PricingIcon name="check" /><span>{item}</span></li>)}</ul>
    </div>)}
    <UsageLimits />
  </div>;
}
