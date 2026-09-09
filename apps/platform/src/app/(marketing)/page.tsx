import { InteractiveShowcase } from "@/components/InteractiveShowcase";

const benefits = [
  ["Website siap pakai", "Mulai lebih cepat dengan fondasi desain yang konsisten dan profesional."],
  ["Kelola dari CMS", "Ubah konten utama tanpa perlu menyentuh kode setiap kali ada pembaruan."],
  ["Hosting terkelola", "Struktur disiapkan untuk operasional yang lebih sederhana dan mudah dikembangkan."],
];

export default function MarketingPage() {
  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Mangelek beranda">Mangelek</a>
        <nav className="desktop-nav" aria-label="Navigasi utama">
          <a href="#template">Template</a>
          <a href="#fitur">Fitur</a>
          <a href="#cara-kerja">Cara kerja</a>
        </nav>
        <a className="header-cta" href="#mulai">Mulai sekarang</a>
      </header>

      <section className="hero section-shell" id="top">
        <div className="hero-copy">
          <p className="eyebrow">Website bisnis, tanpa ribet teknis</p>
          <h1>Bangun kehadiran digital yang terlihat profesional sejak hari pertama.</h1>
          <p className="hero-lead">
            Pilih template, isi konten, dan kelola bisnis Anda dari satu platform. Dibuat untuk tampil cepat, jelas, dan konsisten di HP, tablet, maupun desktop.
          </p>
          <div className="hero-actions">
            <a className="button button--primary" href="#template">Lihat template</a>
            <a className="button button--secondary" href="#cara-kerja">Pelajari cara kerja</a>
          </div>
          <div className="trust-row" aria-label="Keunggulan utama">
            <span>Responsive</span>
            <span>CMS-ready</span>
            <span>Managed</span>
          </div>
        </div>

        <div className="hero-visual" aria-hidden="true">
          <div className="browser-frame">
            <div className="browser-bar"><i /><i /><i /></div>
            <div className="browser-content">
              <div className="mini-nav"><b>MANGELEK</b><span>Menu</span></div>
              <div className="mini-hero">
                <div><span className="mini-kicker">Modern business</span><strong>Website yang terasa premium.</strong><small>Rapi, fokus, dan siap digunakan.</small></div>
                <div className="mini-photo"><span /></div>
              </div>
            </div>
          </div>
          <div className="floating-card floating-card--left"><small>CMS</small><strong>Konten mudah dikelola</strong></div>
          <div className="floating-card floating-card--right"><small>Responsive</small><strong>Semua ukuran layar</strong></div>
        </div>
      </section>

      <InteractiveShowcase />

      <section className="benefits section-shell" id="fitur" aria-labelledby="benefits-title">
        <div className="section-copy section-copy--center">
          <p className="eyebrow">Semua yang penting, satu fondasi</p>
          <h2 id="benefits-title">Lebih sederhana untuk dijalankan, tetap siap berkembang.</h2>
        </div>
        <div className="benefit-grid">
          {benefits.map(([title, text], index) => (
            <article className="benefit-card" key={title}>
              <span className="benefit-number">0{index + 1}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="process section-shell" id="cara-kerja" aria-labelledby="process-title">
        <div className="section-copy">
          <p className="eyebrow">Alur yang jelas</p>
          <h2 id="process-title">Dari pilih tema sampai website tayang.</h2>
        </div>
        <ol className="process-list">
          <li><span>01</span><div><strong>Pilih template</strong><p>Pilih kategori dan tampilan yang paling sesuai dengan jenis bisnis.</p></div></li>
          <li><span>02</span><div><strong>Isi dan sesuaikan</strong><p>Atur konten inti, identitas brand, layanan, dan informasi penting.</p></div></li>
          <li><span>03</span><div><strong>Publikasikan</strong><p>Website siap dihubungkan ke domain dan dikelola dari dashboard.</p></div></li>
        </ol>
      </section>

      <section className="final-cta section-shell" id="mulai">
        <div>
          <p className="eyebrow">Siap memulai?</p>
          <h2>Buat website bisnis yang lebih rapi, cepat, dan mudah dikelola.</h2>
        </div>
        <a className="button button--light" href="/themes">Pilih template</a>
      </section>

      <footer className="site-footer">
        <strong>Mangelek</strong>
        <p>Managed website platform untuk bisnis.</p>
      </footer>
    </main>
  );
}
