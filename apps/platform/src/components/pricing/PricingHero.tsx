export function PricingHero() {
  return <section className="pricingHero" aria-labelledby="pricing-title">
    <div className="pricingHalo" aria-hidden="true" />
    <div className="pricingWidth pricingHeroContent">
      <span className="pricingEyebrow">PRICING</span>
      <h1 id="pricing-title">Satu paket.<br /><em>Banyak kemungkinan.</em></h1>
      <p>Website, konten, dan pelanggan.<br className="pricingMobileBreak" /> Semua terkelola dalam satu tempat.</p>
      <a className="pricingTextLink" href="#paket">Temukan yang Anda dapatkan <span aria-hidden="true">↓</span></a>
    </div>
  </section>;
}
