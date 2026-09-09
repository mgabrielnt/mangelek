export type TemplateCategory = {
  id: string;
  label: string;
  title: string;
  slot: number;
};

export const templateCategories: TemplateCategory[] = [
  { id: "service", label: "Service", title: "Service Modern", slot: 0 },
  { id: "restaurant", label: "Restaurant", title: "Restaurant Premium", slot: 1 },
  { id: "company", label: "Company", title: "Company Profile", slot: 2 },
  { id: "beauty", label: "Beauty & Wellness", title: "Beauty & Wellness", slot: 3 },
  { id: "property", label: "Property", title: "Property Showcase", slot: 4 },
  { id: "education", label: "Education", title: "Education Hub", slot: 5 },
];
