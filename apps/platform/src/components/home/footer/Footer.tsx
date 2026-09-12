import { FooterNavigation } from "./components/FooterNavigation";

export function Footer() {
  return <footer className="siteFooter marketingSection" aria-label="Mangelek">
    <div className="footerCallout sectionWidth">
      <div><span className="sectionLabel">SATU LANGKAH LEBIH DEKAT</span>
        <h2>Giliran bisnis Anda<br /><em>jadi cerita besar.</em></h2></div>
      <a href="#contact" className="footerStart" aria-label="Mulai diskusikan website Anda">
        <span>Mari mulai</span><span aria-hidden="true">↗</span>
      </a>
    </div>
    <div className="footerMiddle sectionWidth">
      <div className="footerIdentity">
        <a href="#top" className="footerBrand" aria-label="Mangelek — beranda">mangelek<span aria-hidden="true">.</span></a>
        <p>Ruang baru untuk bisnis Anda.</p>
        <span className="footerOrigin">DARI INDONESIA. UNTUK DUNIA.</span>
      </div>
      <FooterNavigation />
    </div>
    <div className="footerWordmark sectionWidth" aria-hidden="true">mangelek.</div>
    <div className="footerBottom sectionWidth">
      <span>© {new Date().getFullYear()} Mangelek</span>
      <a href="#top">Kembali ke atas <span aria-hidden="true">↑</span></a>
    </div>
  </footer>;
}
