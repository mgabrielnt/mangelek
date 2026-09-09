export type TemplateCategory = {
  id: string;
  label: string;
  title: string;
  image: string;
};

export const templateCategories: TemplateCategory[] = [
  { id: "service", label: "Service", title: "Service Modern", image: "service.webp" },
  { id: "restaurant", label: "Restaurant", title: "Restaurant Premium", image: "restaurant.webp" },
  { id: "company", label: "Company", title: "Company Profile", image: "company.webp" },
  { id: "beauty", label: "Beauty & Wellness", title: "Beauty & Wellness", image: "beauty-wellness.webp" },
  { id: "property", label: "Property", title: "Property Showcase", image: "property.webp" },
  { id: "education", label: "Education", title: "Education Hub", image: "education.webp" },
];
