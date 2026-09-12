import Image from "next/image";
import type { BusinessFeature } from "@/data/features";

type Props = { item: BusinessFeature; index: number };

export function FeaturePreview({ item, index }: Props) {
  return <figure className="featurePreview">
    <div className="featurePreviewBar" aria-hidden="true">
      <span /><span /><span /><small>mangelek / {item.label.toLowerCase()}</small>
    </div>
    <div className="featurePreviewMedia">
      <Image src={`/images/marketing/features/${item.image}`}
        alt={`Ilustrasi ${item.title}`} fill sizes="(max-width: 700px) 85vw, 480px" />
    </div>
    <figcaption><span>0{index + 1} / 04</span><strong>Ruang untuk berkembang.</strong></figcaption>
  </figure>;
}
