import { Card, type AppleCard } from "@/components/ui/apple-cards-carousel";
import type { TemplateCategory } from "@/data/templates";

export function TemplateCard({ item, index }: { item: TemplateCategory; index: number }) {
  const src = `/images/marketing/categories/${item.image}`;
  const card: AppleCard = {
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
  return <Card card={card} index={index} />;
}
