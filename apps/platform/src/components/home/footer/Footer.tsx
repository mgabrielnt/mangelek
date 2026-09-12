export function Footer() {
  return <footer className="siteFooter marketingSection">
    <div className="footerTop sectionWidth">
      <a href="#templates" className="footerBrand" aria-label="Mangelek — pilih template">mangelek</a>
      <p>Ruang baru untuk bisnis Anda.</p>
      <nav aria-label="Navigasi footer"><a href="#templates">Template</a>
        <a href="#features">Platform</a><a href="#contact">Kontak</a></nav>
    </div>
    <div className="footerBottom sectionWidth"><span>© {new Date().getFullYear()} Mangelek</span>
      <span>Dibangun untuk langkah besar Anda.</span></div>
  </footer>;
}
