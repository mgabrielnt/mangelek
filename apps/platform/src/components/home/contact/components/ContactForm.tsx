export function ContactForm() {
  return (
    <form className="contactForm" aria-label="Form kontak Mangelek">
      <div className="contactField">
        <label htmlFor="contact-name">Nama</label>
        <input id="contact-name" name="name" autoComplete="name" />
      </div>
      <div className="contactField">
        <label htmlFor="contact-email">Email</label>
        <input id="contact-email" name="email" type="email" autoComplete="email" />
      </div>
      <div className="contactField">
        <label htmlFor="contact-company">Bisnis</label>
        <input id="contact-company" name="company" autoComplete="organization" />
      </div>
      <div className="contactField">
        <label htmlFor="contact-message">Kebutuhan</label>
        <textarea id="contact-message" name="message" rows={5} />
      </div>
      <button className="contactSubmit" type="button">
        Kirim <span aria-hidden>↗</span>
      </button>
    </form>
  );
}