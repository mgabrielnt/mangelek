import type { ReactNode } from "react";
import { money, stages, type Contact, type Company, type Deal, type Task, type CrmDocument, type CrmRecord, type CrmSection } from "@/lib/crm/document";
export { CrmBoard } from "./CrmBoard";

const date = (value: string) => value ? new Intl.DateTimeFormat("id-ID", { day: "numeric", month: "short", year: "numeric" }).format(new Date(`${value}T12:00:00`)) : "Tanpa target";
const initials = (name: string) => name.trim().split(/\s+/).slice(0, 2).map(word => Array.from(word)[0]).join("").toUpperCase();

export function CrmRecords({ section, records, doc, today, open, actions }: {
  section: CrmSection; records: CrmRecord[]; doc: CrmDocument; today: string;
  open: (item: CrmRecord) => void; actions: (item: CrmRecord) => ReactNode;
}) {
  const contact = (id: string) => doc.contacts.find(item => item.id === id)?.name || "Tanpa kontak";
  const company = (id: string) => doc.companies.find(item => item.id === id)?.name || "Tanpa perusahaan";
  const heading = section === "contacts" ? "Kontak" : section === "companies" ? "Organisasi" : section === "deals" ? "Peluang" : "Tindak lanjut";
  const detail = section === "contacts" ? "Perusahaan & telepon" : section === "companies" ? "Relasi" : section === "deals" ? "Nilai & target" : "Jadwal";
  return <div className="crmTableWrap"><table className="crmTable" role="table"><caption className="editorSrOnly">Daftar {heading.toLowerCase()}</caption>
    <thead role="rowgroup"><tr role="row"><th scope="col">{heading}</th><th scope="col">{detail}</th><th scope="col">Status</th><th scope="col"><span className="editorSrOnly">Tindakan</span></th></tr></thead>
    <tbody role="rowgroup">{records.map(item => <tr key={item.id} role="row">
      <td role="cell"><div className="crmIdentity">{(section === "contacts" || section === "companies") && <span className="crmAvatar" aria-hidden="true">{initials(item.name)}</span>}<button className="cmsItemName" onClick={() => open(item)}><strong>{item.name}</strong><span>{section === "contacts" ? (item as Contact).email || "Email belum ditambahkan" : section === "companies" ? (item as Company).domain || (item as Company).industry || "Belum ada detail" : contact((item as Deal | Task).contactId)}</span></button></div></td>
      <td role="cell" data-label={detail}><div className="crmRowMeta">{section === "contacts" ? <><strong>{company((item as Contact).companyId)}</strong><span>{(item as Contact).phone || "Telepon belum ditambahkan"}</span></> : section === "companies" ? <strong>{doc.contacts.filter(person => person.companyId === item.id && !person.archived).length} kontak</strong> : section === "deals" ? <><strong>{money((item as Deal).amount)}</strong><span>{date((item as Deal).due)}</span></> : <><strong className={!(item as Task).done && (item as Task).due < today ? "crmOverdue" : ""}>{date((item as Task).due)}{!(item as Task).done && (item as Task).due < today ? " · Terlewat" : ""}</strong><span>Prioritas {(item as Task).priority === "high" ? "tinggi" : "normal"}</span></>}</div></td>
      <td role="cell" data-label="Status"><span className="crmStatus" data-tone={item.archived ? "neutral" : section === "deals" ? (item as Deal).stage : section === "contacts" ? (item as Contact).status : section === "tasks" && (item as Task).done ? "won" : "neutral"}>{item.archived ? "Arsip" : section === "contacts" ? (item as Contact).status === "lead" ? "Prospek" : "Pelanggan" : section === "deals" ? stages[(item as Deal).stage] : section === "tasks" ? (item as Task).done ? "Selesai" : "Terbuka" : "Perusahaan"}</span></td>
      <td role="cell"><div className="crmRowActions">{actions(item)}</div></td>
    </tr>)}</tbody>
  </table></div>;
}

