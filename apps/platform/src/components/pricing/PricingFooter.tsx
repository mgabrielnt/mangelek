export function PricingFooter() {
  return <footer className="pricingFooter">
    <a className="pricingFooterBrand" href="/" aria-label="Mangelek — beranda">mangelek.</a>
    <span>© {new Date().getFullYear()} Mangelek</span>
    <a href="/#contact">Kontak</a>
  </footer>;
}
