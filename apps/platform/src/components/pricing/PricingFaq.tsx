import { pricingFaqs } from "@/data/pricing/faq";

export function PricingFaq() {
  return <section className="pricingFaq" aria-labelledby="faq-title">
    <div className="pricingFaqIntro">
      <h2 id="faq-title">Pertanyaan umum</h2>
      <p>Masih ada pertanyaan?<br /><a href="/#contact">Hubungi kami →</a></p>
    </div>
    <div className="pricingQuestions">{pricingFaqs.map((faq) =>
      <details key={faq.question} name="pricing-faq">
        <summary>{faq.question}<span className="pricingFaqToggle" aria-hidden="true" /></summary>
        <p>{faq.answer}</p>
      </details>)}</div>
  </section>;
}
