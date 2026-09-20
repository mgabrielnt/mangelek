"use client";

import { useEffect, useState, type FormEvent } from "react";
import { templateCategories } from "@/data/templates";

export function ContactForm() {
  const [status, setStatus] = useState("");
  const [draft, setDraft] = useState("");
  const [message, setMessage] = useState("");
  useEffect(() => {
    const selected = templateCategories.find(item => item.id === new URLSearchParams(window.location.search).get("template"));
    if (selected) setMessage(`Saya tertarik dengan konsep ${selected.title}. Saya ingin mendiskusikan website untuk bisnis saya.`);
  }, []);
  async function prepare(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const fields = new FormData(event.currentTarget);
    const labels = { name: "Nama", whatsapp: "WhatsApp", email: "Email", company: "Bisnis", message: "Kebutuhan" };
    const text = Object.entries(labels).map(([key, label]) =>
      `${label}: ${String(fields.get(key) || "—").trim()}`).join("\n");
    try {
      await navigator.clipboard.writeText(text);
      setDraft("");
      setStatus("Permintaan disalin. Belum dikirim ke tim Mangelek.");
    } catch {
      setDraft(text);
      setStatus("Salin permintaan di bawah. Belum dikirim ke tim Mangelek.");
    }
  }
  return <form className="contactForm" onSubmit={prepare} aria-label="Form kontak Mangelek">
    <div className="contactField"><label htmlFor="contact-name">Nama</label>
      <input id="contact-name" name="name" autoComplete="name" placeholder="Nama Anda" required maxLength={100} /></div>
    <div className="contactField"><label htmlFor="contact-company">Bisnis</label>
      <input id="contact-company" name="company" autoComplete="organization" placeholder="Nama bisnis" maxLength={160} /></div>
    <div className="contactField"><label htmlFor="contact-email">Email</label>
      <input id="contact-email" name="email" type="email" autoComplete="email"
        placeholder="nama@bisnis.com" required maxLength={254} /></div>
    <div className="contactField"><label htmlFor="contact-whatsapp">WhatsApp <span>(opsional)</span></label>
      <input id="contact-whatsapp" name="whatsapp" type="tel" inputMode="tel"
        autoComplete="tel" placeholder="+62" maxLength={30} /></div>
    <div className="contactField contactFieldWide"><label htmlFor="contact-message">Kebutuhan Anda</label>
      <textarea id="contact-message" name="message" rows={3} maxLength={2000} value={message} onChange={event => setMessage(event.target.value)}
        placeholder="Website seperti apa yang Anda bayangkan?" required /></div>
    <button className="contactSubmit" type="submit">
      <span>Salin permintaan</span><span aria-hidden="true">↗</span></button>
    <p className="contactStatus" role="status">{status || "Form ini menyiapkan ringkasan untuk Anda salin."}</p>
    {draft && <textarea className="contactDraft" aria-label="Ringkasan permintaan"
      readOnly value={draft} onFocus={(event) => event.currentTarget.select()} />}
  </form>;
}
