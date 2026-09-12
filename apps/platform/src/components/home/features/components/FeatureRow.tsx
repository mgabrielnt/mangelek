import type { BusinessFeature } from "@/data/features";
import { FeatureWindow } from "./FeatureWindow";

type Props = {
  item: BusinessFeature;
  index: number;
  visible: boolean;
  setNode: (index: number, node: HTMLElement | null) => void;
};

export function FeatureRow({ item, index, visible, setNode }: Props) {
  const reverse = index % 2 === 1;
  const number = String(index + 1).padStart(2, "0");

  return (
    <article
      ref={(node) => setNode(index, node)}
      data-index={index}
      className={`featureRow${reverse ? " isReverse" : ""}${visible ? " isVisible" : ""}`}
    >
      <div className="featureRowCopy">
        <span className="featureMeta">{number} · {item.label}</span>
        <h3>{item.title}</h3>
        <p>{item.text}</p>
      </div>
      <div className="featureRowVisual">
        <div className="featureGlow" aria-hidden />
        <FeatureWindow item={item} index={index} />
      </div>
    </article>
  );
}
