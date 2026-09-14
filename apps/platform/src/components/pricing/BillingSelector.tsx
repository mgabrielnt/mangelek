"use client";

import { useState } from "react";
import { getBillingDisplay, type BillingOption } from "@/data/pricing/plan";

export function BillingSelector({ options }: { options: readonly BillingOption[] }) {
  const [cycle, setCycle] = useState(options[0]?.cycle);
  const selected = options.find((option) => option.cycle === cycle) ?? options[0];
  if (!selected) return <div className="pricingAmount pricingPending">
    <p>Harga belum diumumkan</p>
    <small>Langganan belum dibuka.</small>
  </div>;
  const display = getBillingDisplay(selected);
  return <div className="pricingAmount">
    {options.length > 1 && <fieldset className="pricingBilling">
      <legend className="pricingSrOnly">Periode pembayaran</legend>
      {options.map((option) => <label key={option.cycle}>
        <input type="radio" name="billing-cycle" value={option.cycle}
          checked={selected.cycle === option.cycle}
          onChange={() => setCycle(option.cycle)} />
        <span>{option.cycle === "monthly" ? "Bulanan" : "Tahunan"}</span>
      </label>)}
    </fieldset>}
    <div aria-live="polite" aria-atomic="true">
      <p className="pricingNumber">{display.price}<small>{display.period}</small></p>
      <span className="pricingBillNote">{display.note}</span>
    </div>
  </div>;
}
