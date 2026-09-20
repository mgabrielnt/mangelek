const paths = {
  arrow: "M5 12h14 M13 6l6 6-6 6",
  layout: "M3 4h18v16H3z M3 9h18 M9 9v11",
  edit: "M13 5H4v16h16v-9 M10 14l1-4 8-8 3 3-8 8z",
  chart: "M4 3v17h17 M8 15v-4 M13 15V7 M18 15V4",
  globe: "M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0 M3 12h18 M12 3c5 5 5 13 0 18-5-5-5-13 0-18",
  storage: "M4 4h16v6H4z M4 14h16v6H4z M7 7h.01 M7 17h.01",
  spark: "m12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5z",
  check: "m5 12 4 4L19 6",
} as const;

export function PricingIcon({ name }: { name: keyof typeof paths }) {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
    strokeLinejoin="round" aria-hidden="true"><path d={paths[name]} /></svg>;
}
