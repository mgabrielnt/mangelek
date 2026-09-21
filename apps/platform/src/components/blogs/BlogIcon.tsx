export function BlogIcon({ name }: { name: "arrow" | "search" | "close" | "back" | "external" | "check" | "alert" | "clock" }) {
  const paths = { back: "M19 12H5m6-6-6 6 6 6", external: "M6 18 18 6M6 6h12v12", check: "m5 12 4 4L19 6", alert: "M12 5v9m0 4v1", clock: "M12 7v5l3 2M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0", arrow: "M5 12h14m-6-6 6 6-6 6", search: "M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Zm-2 5 6 6", close: "m6 6 12 12M6 18 18 6" };
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[name]} /></svg>;
}
