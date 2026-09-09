import type { CSSProperties } from "react";

type Props = { title: string; text: string; slot: number };

export function FeatureCard({ title, text, slot }: Props) {
  const style = { "--slot": slot } as CSSProperties;
  return (
    <article className="featureCard">
      <div
        className="featureImage"
        style={style}
        role="img"
        aria-label={`Tampilan ${title}`}
      />
      <div className="featureCopy">
        <h3>{title}</h3>
        <p>{text}</p>
      </div>
    </article>
  );
}
