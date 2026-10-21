"use client";

import { useRef, useState } from "react";
import { EditorIcon } from "@/components/editor/EditorIcon";
import type { CrmDocument, Task } from "@/lib/crm/document";

export function shiftDay(day: string, offset: number) {
  const date = new Date(`${day}T12:00:00`);
  date.setDate(date.getDate() + offset);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2,"0")}-${String(date.getDate()).padStart(2,"0")}`;
}
const formatDay = (day: string, options: Intl.DateTimeFormatOptions) => new Intl.DateTimeFormat("id-ID", options).format(new Date(`${day}T12:00:00`));

export function CrmAgenda({ tasks, doc, today, disabled, filter, setFilter, open, add, update, reset }: {
  tasks: Task[]; doc: CrmDocument; today: string; disabled: boolean; filter: string;
  setFilter: (filter: string) => void; open: (task: Task) => void; add: (due: string) => void;
  update: (task: Task, values: Partial<Pick<Task,"done" | "due">>) => Promise<boolean>; reset: () => void;
}) {
  const [week, setWeek] = useState(0), [selected, setSelected] = useState("");
  const heading = useRef<HTMLHeadingElement>(null);
  const active = doc.tasks.filter(task => !task.archived);
  const counts = { overdue: active.filter(task => !task.done && task.due < today).length, active: active.filter(task => !task.done).length, done: active.filter(task => task.done).length };
  const monday = shiftDay(today, -((new Date(`${today}T12:00:00`).getDay() + 6) % 7) + week * 7);
  const days = Array.from({length:7}, (_,index) => shiftDay(monday,index));
  const shown = tasks.filter(task => !selected || task.due === selected);
  const groups = [...new Set(shown.map(task => task.due))].sort();
  const change = async (task: Task, values: Partial<Pick<Task,"done" | "due">>) => { if (await update(task,values)) heading.current?.focus(); };
  return <section className="crmAgenda" aria-label="Agenda tindak lanjut">
    <div className="crmAgendaOverview">
      <div className="crmAgendaIntro"><span className="crmAgendaGlyph"><EditorIcon name="check" /></span><div><h2>Fokus tindak lanjut</h2><p>{counts.overdue ? `${counts.overdue} tindak lanjut terlewat. Tentukan prioritas hari ini.` : "Jaga setiap percakapan bergerak maju."}</p></div></div>
      <div className="crmAgendaStats" role="group" aria-label="Filter ringkasan aktivitas">{([['active','Terbuka'],['overdue','Terlewat'],['done','Selesai']] as const).map(([value,label]) => <button key={value} data-tone={value} aria-pressed={filter === value} onClick={() => { setSelected(""); setFilter(value); }}><strong>{counts[value]}</strong><span>{label}</span></button>)}</div>
    </div>
    <div className="crmAgendaCalendar">
      <div className="crmAgendaCalendarHeader"><div><h3>{formatDay(monday,{month:"long",year:"numeric"})}</h3><p>{formatDay(monday,{day:"numeric",month:"short"})} – {formatDay(shiftDay(monday,6),{day:"numeric",month:"short"})} · Pilih hari untuk melihat tugas.</p></div><div className="crmAgendaWeekNav"><button aria-label="Minggu sebelumnya" onClick={() => {setWeek(week - 1);setSelected("");}}><EditorIcon name="back" /></button><button onClick={() => {setWeek(0);setSelected(today);}}>Hari ini</button><button aria-label="Minggu berikutnya" onClick={() => {setWeek(week + 1);setSelected("");}}><EditorIcon name="arrow" /></button></div></div>
      <div className="crmAgendaDays" role="group" aria-label="Pilih hari agenda">{days.map(day => { const count = tasks.filter(task => task.due === day).length; return <button key={day} aria-pressed={selected === day} aria-current={day === today ? "date" : undefined} aria-label={`${formatDay(day,{weekday:"long",day:"numeric",month:"long"})}, ${count} tindak lanjut`} onClick={() => setSelected(selected === day ? "" : day)}><span>{formatDay(day,{weekday:"short"})}</span><strong>{formatDay(day,{day:"numeric"})}</strong><span className="crmAgendaDayCount">{count ? `${count} tugas` : "—"}</span></button>; })}</div>
    </div>
    <header className="crmAgendaListHeader"><h3 ref={heading} tabIndex={-1}>{selected ? formatDay(selected,{weekday:"long",day:"numeric",month:"long"}) : "Semua jadwal"}<span aria-label={`${shown.length} tindak lanjut`}> {shown.length}</span></h3>{selected && <button className="editorTextButton" onClick={() => setSelected("")}>Semua tanggal</button>}</header>
    {groups.length ? groups.map(day => <section className="crmAgendaGroup" key={day} aria-label={`Jadwal ${day}`}><h4><span className={!selected && day < today && filter !== "done" && filter !== "archive" ? "crmOverdue" : ""}>{day === today ? "Hari ini" : day === shiftDay(today,1) ? "Besok" : formatDay(day,{day:"numeric",month:"long",year:"numeric"})}</span><span>{shown.filter(task => task.due === day).length} tindak lanjut</span></h4>
      {shown.filter(task => task.due === day).map(task => <article className="crmAgendaTask" key={task.id} data-done={task.done}>
        <button className="crmAgendaComplete" aria-label={`${task.done ? "Buka kembali" : "Selesaikan"} ${task.name}`} aria-pressed={task.done} disabled={disabled || task.archived} onClick={() => void change(task,{done:!task.done})}><span>{task.done && <EditorIcon name="check" />}</span></button>
        <div className="crmAgendaTaskBody"><button className="crmAgendaTaskName" onClick={() => open(task)}>{task.name}</button><div className="crmAgendaTaskMeta"><span>{doc.contacts.find(contact => contact.id === task.contactId)?.name || "Tanpa kontak"}</span>{task.priority === "high" && <span className="crmAgendaPriority">Prioritas tinggi</span>}{task.archived && <span>Di arsip</span>}</div>
          <details className="crmAgendaTaskDetails"><summary>Detail & jadwal</summary><p>{task.notes || "Belum ada catatan tambahan."}</p>{task.done && !task.archived && <p>Buka kembali tugas untuk mengubah jadwal.</p>}{task.dealId && <p>Peluang: {doc.deals.find(deal => deal.id === task.dealId)?.name}</p>}<div><form key={task.updatedAt} onSubmit={event => {event.preventDefault(); const due = String(new FormData(event.currentTarget).get("due") || ""); if (due && due !== task.due) void change(task,{due});}}><label>Jadwalkan ulang<input aria-label={`Jadwalkan ulang ${task.name}`} name="due" type="date" required defaultValue={task.due} disabled={disabled || task.archived || task.done} /></label><button className="editorSecondary" disabled={disabled || task.archived || task.done} type="submit">Simpan jadwal</button></form><button className="editorTextButton" onClick={() => open(task)}>Buka detail lengkap<EditorIcon name="arrow" /></button></div></details>
        </div><span className="crmAgendaTaskStatus">{task.done ? "Selesai" : task.due < today ? "Terlewat" : task.due === today ? "Hari ini" : "Terjadwal"}</span>
      </article>)}
    </section>) : <div className="crmAgendaEmpty"><EditorIcon name="check" /><h4>{selected ? "Belum ada tugas pada tanggal ini." : "Tidak ada tindak lanjut pada tampilan ini."}</h4><p>Pilih jadwal lain atau siapkan langkah berikutnya untuk pelanggan Anda.</p><div><button className="editorSecondary" disabled={disabled} onClick={() => add(selected || today)}>Jadwalkan tindak lanjut</button><button className="editorTextButton" onClick={() => {setSelected("");reset();}}>Reset filter</button></div></div>}
  </section>;
}
