import { pricingAddons } from "@/data/pricing/features";
import { PricingIcon } from "./PricingIcon";

export function PricingAddons() {
  return <section className="pricingWidth pricingSection" aria-labelledby="addons-title">
    <div className="pricingSectionHeading">
      <h2 id="addons-title">Ruang untuk tumbuh.<br /><em>Sesuai kebutuhan Anda.</em></h2>
      <p>Pilihan tambahan di luar paket utama. Anda yang menentukan kapan membutuhkannya.</p>
    </div>
    <div className="pricingAddons">{pricingAddons.map((addon) =>
      <article className="pricingAddon" key={addon.name}>
        <div className="pricingAddonTop"><PricingIcon name={addon.icon} /><span>{addon.status}</span></div>
        <h3>{addon.name}</h3><p>{addon.description}</p><small>{addon.detail}</small>
      </article>)}</div>
  </section>;
}
