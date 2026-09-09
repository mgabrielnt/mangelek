import type { CSSProperties } from "react";
import type { TemplateCategory } from "@/data/templates";

type Props = { item: TemplateCategory; active: boolean };

export function TemplateCard({ item, active }: Props) {
  const style = { "--slot": item.slot } as CSSProperties;
  return (
    <article className={`templateCard${active ? " isActive" : ""}`} data-id={item.id}>
      <div
        className="templatePreview"
        style={style}
        role="img"
        aria-label={`Preview template ${item.title}`}
      />
      <div className="templateMeta">
        <div>
          <span>{item.label}</span>
          <h3>{item.title}</h3>
        </div>
        <a href="#features" aria-label={`Pilih ${item.title}`}>Pilih tema</a>
      </div>
    </article>
  );
}
