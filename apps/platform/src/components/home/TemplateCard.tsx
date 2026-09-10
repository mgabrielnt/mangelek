import { ShowcaseItem } from "@/components/ui/showcase/card";
import type { ShowcaseCard } from "@/components/ui/showcase/types";
import type { TemplateCategory } from "@/data/templates";

export function TemplateCard({ item }: { item: TemplateCategory }) {
  const src = `/images/marketing/categories/${item.image}`;
  const card: ShowcaseCard = {
    src,
    title: item.title,
    category: item.label,
    content: (
      <div className="templateDetail">
        <img src={src} alt={`Preview ${item.title}`} />
        <p>Template {item.label} siap disesuaikan untuk identitas dan kebutuhan bisnis Anda.</p>
        <a href="#features">Pilih template</a>
      </div>
    ),
  };

  return <ShowcaseItem card={card} />;
}
