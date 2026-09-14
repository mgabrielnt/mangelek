import { pricingAddons } from "@/data/pricing/features";

export function PricingAddons() {
  return <div className="pricingAddons" aria-labelledby="addons-title">
    <h3 id="addons-title">Biaya tambahan</h3>
    <dl>{pricingAddons.map((addon) => <div key={addon.name}>
      <dt>{addon.name}</dt><dd>{addon.description}</dd>
    </div>)}</dl>
  </div>;
}
