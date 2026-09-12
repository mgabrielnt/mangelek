type Props = { active: number; total: number; label: string; move: (direction: number) => void };

export function TemplateControls({ active, total, label, move }: Props) {
  return <div className="templateControls sectionWidth">
    <span role="status" aria-live="polite" aria-atomic="true">
      <b>{String(active + 1).padStart(2, "0")}</b> / {String(total).padStart(2, "0")}
      <span className="visuallyHidden"> — {label}</span>
    </span>
    <p>Geser. Temukan. Jadikan milik Anda.</p>
    <div>
      <button type="button" onClick={() => move(-1)} aria-label="Template sebelumnya">←</button>
      <button type="button" onClick={() => move(1)} aria-label="Template berikutnya">→</button>
    </div>
  </div>;
}
