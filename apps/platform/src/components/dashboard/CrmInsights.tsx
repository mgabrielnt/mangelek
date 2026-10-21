"use client";

import { useId, useMemo, useState } from "react";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { money, type CrmDocument } from "@/lib/crm/document";
import { crmInsights } from "@/lib/dashboard/insights";
import { EditorIcon } from "@/components/editor/EditorIcon";

const shortDate = (value: string) => new Intl.DateTimeFormat("id-ID", { day: "numeric", month: "short" }).format(new Date(`${value}T12:00:00`));
const compact = (value: number) => new Intl.NumberFormat("id-ID", { notation: "compact", maximumFractionDigits: 1 }).format(value);
const tooltipStyle = { border: "1px solid #e0e5dc", borderRadius: 10, background: "#fff", fontSize: 12, padding: "12px 16px", color: "#20242a" };

// Composed directly with Recharts, the chart foundation used by shadcn/ui.
export function CrmInsights({ doc, today, loaded, unavailable, template }: { doc: CrmDocument | null; today: string; loaded: boolean; unavailable: boolean; template: string }) {
  const [days, setDays] = useState<7 | 30 | 90>(30);
  const [measure, setMeasure] = useState<"amount" | "count">("amount");
  const id = useId().replace(/:/g, "");
  const data = useMemo(() => crmInsights(doc, today, days), [doc, today, days]);
  const ready = loaded && !unavailable;
  const total = data.pipeline.reduce((sum, row) => sum + row[measure], 0);
  return <div className="dashInsights">
    <section className="dashChartPanel" aria-labelledby={`${id}-trend`}>
      <header className="dashChartHeader"><div><h2 id={`${id}-trend`}>Pertumbuhan relasi</h2><p>Kontak dan peluang yang ditambahkan.</p></div><label><span className="editorSrOnly">Periode grafik</span><select value={days} onChange={event => setDays(Number(event.target.value) as 7 | 30 | 90)}><option value={7}>7 hari terakhir</option><option value={30}>30 hari terakhir</option><option value={90}>90 hari terakhir</option></select></label></header>
      <div className="dashChartLegend"><span><i className="isContact" />Kontak baru<strong>{ready ? data.newContacts : "—"}</strong></span><span><i className="isDeal" />Peluang baru<strong>{ready ? data.newDeals : "—"}</strong></span></div>
      {!ready ? <div className="dashChartPlaceholder" role="status">{unavailable ? "Data CRM belum dapat dibaca. Pulihkan cadangan melalui modul CRM." : "Memuat grafik CRM…"}</div> : <div className="dashChartCanvas" aria-label="Grafik kontak dan peluang baru per hari">
        <ResponsiveContainer width="100%" height="100%" minWidth={0}>
          <AreaChart accessibilityLayer data={data.trend} margin={{ top: 12, right: 12, bottom: 0, left: -22 }}>
            <defs><linearGradient id={`${id}-fill`} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#637d4d" stopOpacity={.18} /><stop offset="100%" stopColor="#637d4d" stopOpacity={.01} /></linearGradient></defs>
            <CartesianGrid vertical={false} stroke="#e9ede5" strokeDasharray="3 4" />
            <XAxis dataKey="day" tickFormatter={shortDate} tickLine={false} axisLine={false} tick={{ fill: "#606872", fontSize: 11 }} minTickGap={42} tickMargin={12} />
            <YAxis allowDecimals={false} domain={[0, (max: number) => Math.max(2, max)]} axisLine={false} tickLine={false} tick={{ fill: "#606872", fontSize: 11 }} />
            <Tooltip contentStyle={tooltipStyle} labelFormatter={value => shortDate(String(value))} cursor={{ stroke: "#b4bfaa", strokeDasharray: "3 3" }} />
            <Area name="Kontak baru" dataKey="contacts" type="linear" stroke="#59723f" strokeWidth={2.5} fill={`url(#${id}-fill)`} isAnimationActive={false} activeDot={{ r: 5, stroke: "#fff", strokeWidth: 2 }} />
            <Area name="Peluang baru" dataKey="deals" type="linear" stroke="#738ab0" strokeWidth={2} strokeDasharray="5 4" fill="transparent" isAnimationActive={false} activeDot={{ r: 4, stroke: "#fff", strokeWidth: 2 }} />
          </AreaChart>
        </ResponsiveContainer>
      </div>}
      <footer><p>{ready && !data.newContacts && !data.newDeals ? "Belum ada penambahan pada periode ini. " : ""}Berdasarkan tanggal dibuat, termasuk catatan yang diarsipkan.</p><details><summary>Lihat data grafik</summary><div className="dashChartData"><table><caption>Penambahan harian · {days} hari terakhir</caption><thead><tr><th>Tanggal</th><th>Kontak</th><th>Peluang</th></tr></thead><tbody>{ready && data.trend.map(row => <tr key={row.day}><td>{shortDate(row.day)}</td><td>{row.contacts}</td><td>{row.deals}</td></tr>)}</tbody></table></div></details></footer>
    </section>
    <section className="dashChartPanel" aria-labelledby={`${id}-pipeline`}>
      <header className="dashChartHeader"><div><h2 id={`${id}-pipeline`}>Komposisi pipeline</h2><p>Posisi peluang saat ini, tanpa arsip.</p></div><label><span className="editorSrOnly">Ukuran pipeline</span><select value={measure} onChange={event => setMeasure(event.target.value as "amount" | "count")}><option value="amount">Nilai (Rp)</option><option value="count">Jumlah</option></select></label></header>
      <p className="dashChartTotal">{ready ? measure === "amount" ? money(total) : `${total} peluang` : "—"}<span>Seluruh tahap, termasuk berhasil dan tidak lanjut</span></p>
      {!ready ? <div className="dashChartPlaceholder" role="status">{unavailable ? "Pipeline belum dapat dibaca." : "Memuat pipeline…"}</div> : <div className="dashChartCanvas" aria-label="Grafik distribusi peluang berdasarkan tahap">
        <ResponsiveContainer width="100%" height="100%" minWidth={0}><BarChart accessibilityLayer data={data.pipeline} layout="vertical" margin={{ top: 0, right: 18, bottom: 0, left: 0 }} barSize={14}>
          <CartesianGrid horizontal={false} stroke="#e9ede5" strokeDasharray="3 4" /><YAxis dataKey="label" type="category" width={90} tick={{ fill: "#606872", fontSize: 11 }} axisLine={false} tickLine={false} />
          <XAxis type="number" tickFormatter={compact} allowDecimals={false} domain={[0, (max: number) => Math.max(1, max)]} axisLine={false} tickLine={false} tick={{ fill: "#606872", fontSize: 11 }} minTickGap={30} />
          <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "#f4f6f1" }} formatter={value => measure === "amount" ? money(Number(value)) : `${value} peluang`} />
          <Bar name={measure === "amount" ? "Nilai" : "Jumlah"} dataKey={measure} fill="#7b8f64" radius={[0, 4, 4, 0]} isAnimationActive={false} />
        </BarChart></ResponsiveContainer>
      </div>}
      <footer><p>Nilai peluang bukan pendapatan yang diterima.</p><details><summary>Lihat data pipeline</summary><div className="dashChartData"><table><caption>Posisi pipeline saat ini</caption><thead><tr><th>Tahap</th><th>Jumlah</th><th>Nilai</th></tr></thead><tbody>{ready && data.pipeline.map(row => <tr key={row.stage}><td>{row.label}</td><td>{row.count}</td><td>{money(row.amount)}</td></tr>)}</tbody></table></div></details><a href={`/app/crm/deals?template=${template}`}>Kelola papan pipeline<EditorIcon name="arrow" /></a></footer>
    </section>
  </div>;
}
