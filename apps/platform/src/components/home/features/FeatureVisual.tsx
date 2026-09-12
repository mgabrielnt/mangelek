type Feature = { title: string; text: string; image: string };

type Props = { items: Feature[]; active: number };

export function FeatureVisual({ items, active }: Props) {
  return (
    <aside className="featureStage" aria-live="polite">
      <div className="featureGlow" aria-hidden />
      <div className="featureWindow">
        <div className="featureWindowBar" aria-hidden>
          <span /><span /><span />
          <small>mangelek</small>
        </div>
        <div className="featureViewport">
          {items.map((item, index) => (
            <img
              key={item.title}
              className={`featureVisualImage${index === active ? " isActive" : ""}`}
              src={`/images/marketing/features/${item.image}`}
              alt={`Tampilan ${item.title}`}
              loading={index === 0 ? "eager" : "lazy"}
              decoding="async"
            />
          ))}
        </div>
        <div className="featureVisualLabel">
          <span>{String(active + 1).padStart(2, "0")}</span>
          <strong>{items[active]?.title}</strong>
        </div>
      </div>
    </aside>
  );
}
