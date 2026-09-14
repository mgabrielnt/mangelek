import { usageLimits } from "@/data/pricing/features";

export function UsageLimits() {
  if (!usageLimits.length) return null;
  return <div className="pricingUsage">
    <h4>Kapasitas penggunaan</h4>
    <dl>{usageLimits.map((limit) => <div key={limit.label}>
      <dt>{limit.label}</dt><dd>{limit.value}</dd>
    </div>)}</dl>
  </div>;
}
