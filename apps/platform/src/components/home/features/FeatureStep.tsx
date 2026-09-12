import type { BusinessFeature } from "@/data/features";

type Props = {
  item: BusinessFeature;
  index: number;
  active: boolean;
  setNode: (index: number, node: HTMLElement | null) => void;
};

export function FeatureStep({ item, index, active, setNode }: Props) {
  const number = String(index + 1).padStart(2, "0");
  const image = `/images/marketing/features/${item.image}`;

  return (
    <article
      ref={(node) => setNode(index, node)}
      data-index={index}
      className={`featureStep${active ? " isActive" : ""}`}
    >
      <span className="featureNumber">{number}</span>
      <div className="featureStepCopy">
        <h3>{item.title}</h3>
        <p>{item.text}</p>
      </div>
      <span className="featureProgress" aria-hidden><i /></span>
      <div className="featureMobileVisual">
        <img src={image} alt={`Tampilan ${item.title}`} loading="lazy" decoding="async" />
      </div>
    </article>
  );
}
