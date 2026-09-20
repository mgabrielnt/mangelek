export function BlogIcon({ name }: { name: "arrow" | "search" | "close" }) {
  const paths = { arrow: "M5 12h14m-6-6 6 6-6 6", search: "M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Zm-2 5 6 6", close: "m6 6 12 12M6 18 18 6" };
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[name]} /></svg>;
}
