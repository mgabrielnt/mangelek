"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { businessFeatures } from "@/data/features";
import { FeaturePreview } from "./FeaturePreview";

export function FeatureShowcase() {
  const [active, setActive] = useState(0);
  const tabs = useRef<HTMLDivElement>(null);
  const onKeyDown = (event: KeyboardEvent) => {
    const keys = ["ArrowRight", "ArrowLeft", "ArrowUp", "ArrowDown", "Home", "End"];
    if (!keys.includes(event.key)) return;
    event.preventDefault();
    const step = ["ArrowLeft", "ArrowUp"].includes(event.key) ? -1 : 1;
    const last = businessFeatures.length - 1;
    const next = event.key === "Home" ? 0 : event.key === "End" ? last :
      (active + step + businessFeatures.length) % businessFeatures.length;
    setActive(next);
    (tabs.current?.children.item(next) as HTMLElement)?.focus();
  };
  return <div className="featureShowcase sectionWidth">
    <div className="featureTabs" role="tablist" aria-label="Fitur platform" aria-orientation="vertical"
      ref={tabs} onKeyDown={onKeyDown}>
      {businessFeatures.map((feature, index) => <button type="button"
        role="tab" id={`feature-tab-${index}`} aria-controls={`feature-panel-${index}`}
        aria-selected={active === index} tabIndex={active === index ? 0 : -1}
        key={feature.title} onClick={() => setActive(index)}>
        <span className="featureNumber">0{index + 1}</span>
        <span><small>{feature.label}</small><strong>{feature.title}</strong></span>
        <span className="featureArrow" aria-hidden="true">↗</span>
      </button>)}
    </div>
    {businessFeatures.map((feature, index) => <div key={feature.title}
      className="featureStage" role="tabpanel" id={`feature-panel-${index}`}
      hidden={active !== index} aria-labelledby={`feature-tab-${index}`} tabIndex={0}>
      {active === index && <div className="featureTransition">
        <div className="featureStageCopy"><span className="sectionLabel">{feature.label}</span>
          <h3>{feature.title}</h3><p>{feature.text}</p></div>
        <FeaturePreview item={feature} index={index} />
      </div>}
    </div>)}
  </div>;
}
