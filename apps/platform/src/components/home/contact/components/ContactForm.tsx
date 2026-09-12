export function ContactForm() {
  return (
    <form className="contactForm" aria-label="Form kontak Mangelek">
      <div className="contactField">
        <label htmlFor="contact-name">Nama</label>
        <input id="contact-name" name="name" autoComplete="name" placeholder="Nama Anda" />
      </div>
      <div className="contactField">
        <label htmlFor="contact-whatsapp">WhatsApp</label>
        <input id="contact-whatsapp" name="whatsapp" type="tel" inputMode="tel"
          autoComplete="tel" placeholder="+62 812 3456 7890" />
      </div>
      <div className="contactField">
        <label htmlFor="contact-email">Email</label>
        <input id="contact-email" name="email" type="email" autoComplete="email"
          placeholder="nama@bisnis.com" />
      </div>
      <div className="contactField">
        <label htmlFor="contact-company">Bisnis</label>
        <input id="contact-company" name="company" autoComplete="organization"
          placeholder="Nama bisnis" />
      </div>
      <div className="contactField contactFieldWide">
        <label htmlFor="contact-message">Kebutuhan</label>
        <textarea id="contact-message" name="message" rows={5}
          placeholder="Ceritakan kebutuhan website Anda" />
      </div>
      <button className="contactSubmit" type="button">
        <span>Kirim permintaan</span><span aria-hidden>↗</span>
      </button>
    </form>
  );
}
