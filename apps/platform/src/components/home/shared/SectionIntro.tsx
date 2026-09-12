import type { ReactNode } from "react";

type Props = { label: string; title: ReactNode; description?: string; id: string };

export function SectionIntro({ label, title, description, id }: Props) {
  return <header className="sectionIntro">
    <span className="sectionLabel">{label}</span>
    <h2 id={id}>{title}</h2>
    {description && <p>{description}</p>}
  </header>;
}
