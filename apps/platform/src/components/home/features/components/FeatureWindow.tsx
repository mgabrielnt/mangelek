import type { BusinessFeature } from "@/data/features";

type Props = { item: BusinessFeature; index: number };

export function FeatureWindow({ item, index }: Props) {
  const number = String(index + 1).padStart(2, "0");

  return (
    <figure className="featureWindow">
      <div className="featureWindowBar" aria-hidden>
        <span /><span /><span />
        <small>mangelek</small>
      </div>
      <div className="featureViewport">
        <img
          src={`/images/marketing/features/${item.image}`}
          alt={`Tampilan ${item.title}`}
          loading="lazy"
          decoding="async"
        />
      </div>
      <figcaption className="featureWindowLabel">
        <span>{number}</span>
        <strong>{item.title}</strong>
      </figcaption>
    </figure>
  );
}
