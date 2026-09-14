import { pricingFeatures } from "@/data/pricing/features";
import { PricingIcon } from "./PricingIcon";
import { UsageLimits } from "./UsageLimits";

export function IncludedFeatures() {
  return <div className="pricingIncluded">
    <h3>Termasuk dalam paket</h3>
    <ul className="pricingFeatures">{pricingFeatures.flatMap((group) => group.items).map((item) =>
      <li key={item}><PricingIcon name="check" /><span>{item}</span></li>)}</ul>
    <UsageLimits />
  </div>;
}
