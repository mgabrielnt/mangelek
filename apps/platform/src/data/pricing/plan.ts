export type BillingCycle = "monthly" | "yearly";
export type BillingOption = { cycle: BillingCycle; amount: number };

// Publish only approved totals in IDR. A yearly amount is the full annual bill.
// Empty options keep the page in pre-launch mode without invented prices.
export const billingOptions: readonly BillingOption[] = [
  { cycle: "monthly", amount: 200000 },
];
export const plan = {
  name: "Website + CMS",
  description: "Untuk membuat dan mengelola website bisnis dari satu dashboard.",
  startHref: "/templates",
} as const;

export const formatRupiah = (amount: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency", currency: "IDR", maximumFractionDigits: 0,
  }).format(amount);

export function getBillingDisplay(option: BillingOption) {
  const yearly = option.cycle === "yearly";
  return {
    price: formatRupiah(option.amount),
    period: yearly ? "/ tahun" : "/ bulan",
    note: yearly ? "Ditagih sekaligus setiap tahun." : "Ditagih setiap bulan.",
  };
}
