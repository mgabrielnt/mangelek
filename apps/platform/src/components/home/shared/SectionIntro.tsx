import type { ReactNode } from "react";

type Props = { title: ReactNode; description?: string; id: string };

export function SectionIntro({ title, description, id }: Props) {
  return <header className="sectionIntro">
    <h2 id={id}>{title}</h2>
    {description && <p>{description}</p>}
  </header>;
}
