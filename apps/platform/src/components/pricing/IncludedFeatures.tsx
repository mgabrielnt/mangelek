import { pricingFeatures } from "@/data/pricing/features";
import { PricingIcon } from "./PricingIcon";

export function IncludedFeatures() {
  return <section id="fitur-paket" className="pricingWidth pricingSection" aria-labelledby="features-title">
    <div className="pricingSectionHeading">
      <h2 id="features-title">Sudah dalam paket.<br /><em>Siap menjadi milik Anda.</em></h2>
      <p>Fitur utama yang dirancang untuk menemani bisnis Anda, dari halaman pertama hingga pengelolaan sehari-hari.</p>
    </div>
    <div className="pricingFeatures">{pricingFeatures.map((feature) =>
      <article className="pricingFeature" key={feature.title}>
        <span className="pricingIconTile"><PricingIcon name={feature.icon} /></span>
        <h3>{feature.title}</h3><p>{feature.description}</p>
        <ul>{feature.items.map((item) => <li key={item}><PricingIcon name="check" />{item}</li>)}</ul>
      </article>)}</div>
  </section>;
}
