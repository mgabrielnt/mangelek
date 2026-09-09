import type { TemplateCategory } from "@/data/templates";

type Props = { item: TemplateCategory; active: boolean };

export function TemplateCard({ item, active }: Props) {
  return (
    <article className={`templateCard${active ? " isActive" : ""}`} data-id={item.id}>
      <div className="templatePreview">
        <img
          src={`/images/marketing/categories/${item.image}`}
          alt={`Preview template ${item.title}`}
        />
      </div>
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
