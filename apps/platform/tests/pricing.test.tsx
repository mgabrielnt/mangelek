import { window } from "./setup.mjs";
import assert from "node:assert/strict";
import { test } from "node:test";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { BillingSelector } from "../src/components/pricing/BillingSelector";
import { getBillingDisplay } from "../src/data/pricing/plan";

test("No approved prices exposes neither fictional amounts nor billing choices", async () => {
  const container = document.getElementById("test-root")!;
  const root = createRoot(container);
  try {
    await act(() => root.render(<BillingSelector options={[]} />));
    assert.match(container.textContent!, /Harga belum diumumkan/);
    assert.equal(container.querySelector("input"), null);
    assert.doesNotMatch(container.textContent!, /Rp|diskon|gratis/i);
  } finally { await act(() => root.unmount()); }
});

test("Changing billing cycle shows the full annual bill, never a monthly equivalent", async () => {
  const container = document.getElementById("test-root")!;
  const root = createRoot(container);
  try {
    await act(() => root.render(<BillingSelector options={[
      { cycle: "monthly", amount: 150000 }, { cycle: "yearly", amount: 1500000 },
    ]} />));
    assert.match(container.textContent!, /150\.000/);
    const yearly = container.querySelector<HTMLInputElement>('input[value="yearly"]')!;
    await act(() => yearly.dispatchEvent(new window.MouseEvent("click", { bubbles: true })));
    assert.equal(yearly.checked, true);
    assert.match(container.textContent!, /1\.500\.000/);
    assert.match(container.textContent!, /Ditagih sekaligus setiap tahun/);
    assert.doesNotMatch(container.textContent!, /125\.000/);
  } finally { await act(() => root.unmount()); }
});

test("A single approved annual option does not offer an unapproved monthly choice", async () => {
  const container = document.getElementById("test-root")!;
  const root = createRoot(container);
  try {
    await act(() => root.render(<BillingSelector options={[{ cycle: "yearly", amount: 2000000 }]} />));
    assert.equal(container.querySelector("fieldset"), null);
    assert.match(container.textContent!, /2\.000\.000/);
    assert.equal(getBillingDisplay({ cycle: "yearly", amount: 2000000 }).period, "/ tahun");
  } finally { await act(() => root.unmount()); }
});
