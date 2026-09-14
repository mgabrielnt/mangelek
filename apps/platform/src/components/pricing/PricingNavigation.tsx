export function PricingNavigation() {
  return <header className="pricingNav">
    <a className="pricingSkip" href="#main-content">Lewati navigasi</a>
    <a className="pricingWordmark" href="/" aria-label="Mangelek — beranda">mangelek.</a>
    <nav aria-label="Navigasi utama">
      <a href="/#templates">Tema</a>
      <a href="/pricing" aria-current="page">Pricing</a>
      <a href="/#contact">Kontak <span aria-hidden="true">↗</span></a>
    </nav>
  </header>;
}
