import { templateCategories } from "@/data/templates";

export function HeroQuickLinks() {
  return <nav className="heroQuickLinks" aria-label="Pilih kategori website">
    {templateCategories.map((item) => <a key={item.id} href={`#template-${item.id}`}>
      {item.label}<span aria-hidden="true">↗</span>
    </a>)}
  </nav>;
}
