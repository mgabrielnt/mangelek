import { pricingFeatures } from "@/data/pricing/features";
import { PricingIcon } from "./PricingIcon";
import { UsageLimits } from "./UsageLimits";

export function IncludedFeatures() {
  return <div className="pricingIncluded">
    <h3>Yang termasuk dalam paket</h3>
    <div className="pricingFeatures">{pricingFeatures.map((group) =>
      <div key={group.title}>
        <h4>{group.title}</h4>
        <ul>{group.items.map((item) => <li key={item}>
          <PricingIcon name="check" /><span>{item}</span>
        </li>)}</ul>
      </div>)}</div>
    <UsageLimits />
  </div>;
}
