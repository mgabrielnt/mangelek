type Props = { active: number; total: number; label: string; move: (direction: number) => void };

export function TemplateControls({ active, total, label, move }: Props) {
  return <div className="templateControls sectionWidth">
    <span className="visuallyHidden" role="status" aria-live="polite" aria-atomic="true">
      {label}, {active + 1} dari {total}
    </span>
    <div>
      <button type="button" onClick={() => move(-1)} aria-label="Template sebelumnya">←</button>
      <button type="button" onClick={() => move(1)} aria-label="Template berikutnya">→</button>
    </div>
  </div>;
}
