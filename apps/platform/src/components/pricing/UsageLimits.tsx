import { usageLimits } from "@/data/pricing/features";

export function UsageLimits() {
  return <div className="pricingUsage">
    <h4>Kapasitas penggunaan</h4>
    {usageLimits.length ? <dl>{usageLimits.map((limit) => <div key={limit.label}>
      <dt>{limit.label}</dt><dd>{limit.value}</dd>
    </div>)}</dl> : <p>Kuota penyimpanan dan penggunaan akan diumumkan bersama harga paket.</p>}
  </div>;
}
