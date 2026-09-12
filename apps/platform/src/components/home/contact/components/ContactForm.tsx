export function ContactForm() {
  return (
    <form className="contactForm" aria-label="Form kontak Mangelek">
      <div className="contactField">
        <label htmlFor="contact-name">Nama lengkap</label>
        <input id="contact-name" name="name" autoComplete="name" placeholder="Nama Anda" />
      </div>
      <div className="contactField">
        <label htmlFor="contact-email">Email</label>
        <input id="contact-email" name="email" type="email" autoComplete="email" placeholder="nama@bisnis.com" />
      </div>
      <div className="contactField">
        <label htmlFor="contact-company">Bisnis / perusahaan</label>
        <input id="contact-company" name="company" autoComplete="organization" placeholder="Nama bisnis Anda" />
      </div>
      <div className="contactField">
        <label htmlFor="contact-message">Apa yang ingin Anda bangun?</label>
        <textarea id="contact-message" name="message" rows={5} placeholder="Ceritakan kebutuhan website Anda..." />
      </div>
      <button className="contactSubmit" type="button">Kirim permintaan <span>↗</span></button>
      <p className="contactNote">Form siap dihubungkan ke endpoint contact saat backend diaktifkan.</p>
    </form>
  );
}
