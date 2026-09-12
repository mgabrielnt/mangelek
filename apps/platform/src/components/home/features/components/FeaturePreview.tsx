import type { BusinessFeature } from "@/data/features";

type Props = { item: BusinessFeature; index: number };

export function FeaturePreview({ item, index }: Props) {
  return <figure className="featurePreview">
    <div className="featurePreviewBar" aria-hidden>
      <span /><span /><span /><small>mangelek</small>
    </div>
    <div className="featurePreviewMedia">
      <img src={`/images/marketing/features/${item.image}`}
        alt={`Tampilan ${item.title}`} loading="lazy" decoding="async" />
    </div>
    <figcaption>
      <span>{String(index + 1).padStart(2, "0")}</span>
      <strong>{item.title}</strong>
    </figcaption>
  </figure>;
}
