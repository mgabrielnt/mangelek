import { pricingFaqs } from "@/data/pricing/faq";

export function PricingFaq() {
  return <section className="pricingFaqSection" aria-labelledby="faq-title">
    <div className="pricingWidth pricingFaqLayout">
      <div className="pricingFaqIntro"><span className="pricingEyebrow">FAQ</span>
        <h2 id="faq-title">Sebelum<br /><em>Anda mulai.</em></h2>
        <p>Beberapa hal yang mungkin ingin Anda ketahui.</p>
        <a className="pricingTextLink" href="/#contact">Tanyakan kepada kami <span aria-hidden="true">↗</span></a>
      </div>
      <div className="pricingQuestions">{pricingFaqs.map((faq) =>
        <details key={faq.question} name="pricing-faq">
          <summary>{faq.question}<span className="pricingFaqToggle" aria-hidden="true" /></summary>
          <p>{faq.answer}</p>
        </details>)}</div>
    </div>
  </section>;
}
