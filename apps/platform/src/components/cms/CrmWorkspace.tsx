"use client";

import { useEffect, useRef, useState } from "react";
import { crmSections, emptyCrm, money, newRecord, parseCrm, replaceRecord, stages, todayLocal, validateCrm, type Contact, type Company, type Deal, type Task, type CrmDocument, type CrmRecord, type CrmSection } from "@/lib/crm/document";
import { BackupMenu } from "@/components/ui/BackupMenu";
import { CrmAgenda } from "./CrmAgenda";
import { CrmBoard, CrmRecords } from "./CrmRecords";
import { EditorIcon } from "@/components/editor/EditorIcon";

const descriptions: Record<CrmSection, string> = {
  contacts: "Kenali pelanggan Anda. Simpan percakapan, peluang, dan langkah berikutnya dalam satu tempat.",
  companies: "Hubungkan orang-orang yang Anda kenal dengan bisnis tempat mereka bekerja.",
  deals: "Pantau setiap peluang, dari percakapan pertama sampai kesepakatan.",
  tasks: "Jaga percakapan tetap berjalan. Tentukan apa yang perlu dilakukan dan kapan."
};
const singular = { contacts: "kontak", companies: "perusahaan", deals: "peluang", tasks: "tindak lanjut" };
const dateLabel = (value: string) => value ? new Intl.DateTimeFormat("id-ID", { day: "numeric", month: "short", year: "numeric" }).format(new Date(`${value}T12:00:00`)) : "Tanpa tanggal target";

export function CrmWorkspace({ template, embedded = false, initialSection = "contacts", recordId, initialFilter = "active", onSectionChange }: { template: "service" | "restaurant"; embedded?: boolean; initialSection?: CrmSection; recordId?: string | undefined; initialFilter?: string; onSectionChange?: (section: CrmSection) => void }) {
  const key = `mangelek-crm-local-v1-${template}`;
  const [doc, setDoc] = useState<CrmDocument>(emptyCrm);
  const [loaded, setLoaded] = useState(false), [conflict, setConflict] = useState(false), [saving, setSaving] = useState(false);
  const [unreadable, setUnreadable] = useState(false);
  const [section, setSection] = useState<CrmSection>(initialSection), [query, setQuery] = useState(""), [filter, setFilter] = useState(initialFilter);
  const [editing, setEditing] = useState<CrmRecord | null>(null), [original, setOriginal] = useState("");
  const [error, setError] = useState(""), [notice, setNotice] = useState(""), [note, setNote] = useState("");
  const [sort, setSort] = useState("recent");
  const [taskView, setTaskView] = useState<"agenda" | "list">("agenda");
  const [view, setView] = useState<"board" | "list">("board");
  const [pendingImport, setPendingImport] = useState<CrmDocument | null>(null);
  const baseline = useRef<string | null>(null), busy = useRef(false);
  const fileInput = useRef<HTMLInputElement>(null), nameInput = useRef<HTMLInputElement>(null), errorBox = useRef<HTMLDivElement>(null);
  const dirty = !!editing && (JSON.stringify(editing) !== original || !!note.trim());
  useEffect(() => {
    try { const raw = localStorage.getItem(key); baseline.current = raw; if (raw) { const stored = parseCrm(raw); setDoc(stored); if (recordId) { const item = stored[initialSection].find(item => item.id === recordId); if (item) { setEditing(item); setOriginal(JSON.stringify(item)); } else setError("Catatan tidak ditemukan dalam CRM lokal ini."); } } }
    catch { setConflict(true); setUnreadable(true); setError("Data CRM belum dapat dibaca. Data lama belum diubah. Pulihkan cadangan CRM yang valid untuk melanjutkan."); }
    setLoaded(true);
    const changed = (event: StorageEvent) => { if (event.key === key || event.key === null) { setConflict(true); setUnreadable(false); } };
    window.addEventListener("storage", changed); return () => window.removeEventListener("storage", changed);
  }, [key]);
  useEffect(() => { if (editing) nameInput.current?.focus(); }, [editing?.id]);
  useEffect(() => { if (error) errorBox.current?.focus(); }, [error]);
  useEffect(() => { if (!dirty) return; const warn = (event: BeforeUnloadEvent) => event.preventDefault(); window.addEventListener("beforeunload", warn); return () => window.removeEventListener("beforeunload", warn); }, [dirty]);
  function canLeave() { return !busy.current && (!dirty || window.confirm("Perubahan belum disimpan. Tinggalkan perubahan ini?")); }
  function open(area: CrmSection, item?: CrmRecord, values?: Partial<Contact & Company & Deal & Task>) {
    if (!canLeave()) return;
    const next = item ? { ...item } : { ...newRecord(area), ...values };
    if (area !== section) { onSectionChange?.(area); setFilter("active"); setQuery(""); setSort("recent"); }
    setSection(area); setEditing(next); setOriginal(JSON.stringify(next)); setNote(""); setError(""); setNotice("");
  }
  function update(values: Partial<Contact & Company & Deal & Task>) { setEditing(current => current ? { ...current, ...values } : null); }
  async function persist(next: CrmDocument, message: string, recovering = false) {
    if (!loaded || conflict && !(recovering && unreadable) || busy.current) return false;
    busy.current = true; setSaving(true); let success = false;
    try {
      const raw = JSON.stringify(validateCrm(next));
      const write = () => {
        if (localStorage.getItem(key) !== baseline.current) { setConflict(true); return; }
        localStorage.setItem(key, raw); baseline.current = raw; setDoc(next); setConflict(false); setUnreadable(false); setError(""); setNotice(message); success = true;
      };
      if (window.navigator.locks) await window.navigator.locks.request(key, write); else write();
    } catch (e) { setError(e instanceof Error && !(e instanceof DOMException) ? e.message : "Belum tersimpan. Penyimpanan browser penuh atau diblokir. Unduh cadangan pekerjaan Anda sebelum menutup halaman."); }
    finally { busy.current = false; setSaving(false); }
    return success;
  }
  function withHistory(next: CrmDocument, record: CrmRecord, text: string) {
    const contactId = section === "contacts" ? record.id : "contactId" in record ? record.contactId : "";
    const dealId = section === "deals" ? record.id : "dealId" in record ? record.dealId : "";
    return { ...next, activities: [...next.activities, { id: crypto.randomUUID(), at: new Date().toISOString(), contactId, dealId, text }] };
  }
  function draftDocument() {
    if (!editing) return doc;
    const item = { ...editing, name: editing.name.trim(), updatedAt: new Date().toISOString() };
    let next = replaceRecord(doc, section, item);
    if (note.trim()) next = withHistory(next, item, note.trim());
    return next;
  }
  async function save() {
    if (!editing) return;
    let next = draftDocument();
    const previous = doc[section].find(item => item.id === editing.id);
    const change = !previous ? `${singular[section]} ditambahkan.` : section === "tasks" && (previous as Task).done !== (editing as Task).done ? `${(editing as Task).done ? "Selesai" : "Dibuka kembali"}: ${editing.name}` : section === "deals" && (previous as Deal).stage !== (editing as Deal).stage ? `Tahap berubah: ${stages[(editing as Deal).stage]}.` : "Detail diperbarui.";
    next = withHistory(next, editing, change);
    if (await persist(next, "Perubahan disimpan di perangkat ini.")) {
      const saved = next[section].find(item => item.id === editing.id)!; setEditing(saved); setOriginal(JSON.stringify(saved)); setNote("");
    }
  }
  async function toggleArchive(item: CrmRecord) {
    const next = { ...item, archived: !item.archived, updatedAt: new Date().toISOString() };
    await persist(withHistory(replaceRecord(doc, section, next), next, next.archived ? "Catatan diarsipkan." : "Catatan dipulihkan."), next.archived ? "Dipindahkan ke arsip. Hubungan dengan catatan lain tetap tersimpan." : "Catatan dipulihkan.");
  }
  function backup() {
    try {
      const next = draftDocument(); validateCrm(next);
      const url = URL.createObjectURL(new Blob([JSON.stringify(next, null, 2)], { type: "application/json" }));
      const link = document.createElement("a"); link.href = url; link.download = `mangelek-crm-${template}.json`; link.click(); setTimeout(() => URL.revokeObjectURL(url), 1000);
      setNotice("Cadangan diunduh, termasuk perubahan valid yang belum disimpan.");
    } catch (e) { setError(`Cadangan belum dibuat. ${e instanceof Error ? e.message : "Periksa isian Anda."}`); }
  }
  function reload() {
    if (!canLeave()) return;
    try { const raw = localStorage.getItem(key); setDoc(raw ? parseCrm(raw) : emptyCrm); baseline.current = raw; setConflict(false); setUnreadable(false); setEditing(null); setNote(""); setError(""); setNotice("Versi tersimpan dimuat."); }
    catch { setError("Versi tersimpan belum dapat dibaca. Data tidak diubah."); }
  }
  const contactName = (id: string) => doc.contacts.find(item => item.id === id)?.name || "Tanpa kontak";
  const companyName = (id: string) => doc.companies.find(item => item.id === id)?.name || "Tanpa perusahaan";
  const today = todayLocal();
  const visible = doc[section].filter(item => {
    if (item.archived !== (filter === "archive")) return false;
    if (section === "tasks" && filter !== "archive") { const task = item as Task; if (filter === "done" ? !task.done : task.done) return false; if (filter === "overdue" && task.due >= today) return false; }
    if (section === "deals" && Object.hasOwn(stages, filter) && (item as Deal).stage !== filter) return false;
    if (section === "contacts" && ["lead", "customer"].includes(filter) && (item as Contact).status !== filter) return false;
    const content = [item.name, item.notes, "email" in item ? item.email : "", "phone" in item ? item.phone : "", "companyId" in item ? companyName(item.companyId) : "", "contactId" in item ? contactName(item.contactId) : "", "domain" in item ? item.domain : ""].join(" ");
    return content.toLowerCase().includes(query.trim().toLowerCase());
  }).sort((a, b) => sort === "name" ? a.name.localeCompare(b.name, "id") : sort === "value" && section === "deals" ? Number((b as Deal).amount) - Number((a as Deal).amount) : section === "tasks" ? (a as Task).due.localeCompare((b as Task).due) || Number((b as Task).priority === "high") - Number((a as Task).priority === "high") : b.updatedAt.localeCompare(a.updatedAt));
  const activeDeals = doc.deals.filter(item => !item.archived && !["won", "lost"].includes(item.stage));
  const linkedDeals = editing && section === "contacts" ? doc.deals.filter(item => item.contactId === editing.id && !item.archived) : [];
  const linkedTasks = editing ? doc.tasks.filter(item => !item.archived && !item.done && (section === "contacts" ? item.contactId === editing.id || doc.deals.some(deal => deal.id === item.dealId && deal.contactId === editing.id) : section === "deals" && item.dealId === editing.id)) : [];
  const activities = editing ? doc.activities.filter(item => section === "contacts" ? item.contactId === editing.id : section === "deals" && item.dealId === editing.id).slice().reverse() : [];
  const savedRecord = editing && doc[section].some(item => item.id === editing.id);
  const contactOptions = (selected: string) => <><option value="">Pilih kontak</option>{doc.contacts.filter(item => !item.archived || item.id === selected).map(item => <option key={item.id} value={item.id}>{item.name}{item.archived ? " (arsip)" : ""}</option>)}</>;
  return <div className={`cmsWorkspace websiteEditor crmWorkspace${embedded ? " workspaceEmbedded" : ""}`}>
    <a className="editorSkip" href="#crm-main">Lewati navigasi</a>
    <header className="cmsHeader"><a className="cmsBrand" href="/subscription" onClick={event => { if (!canLeave()) event.preventDefault(); }}>mangelek.</a><nav aria-label="Ruang kerja"><a href={`/editor?template=${template}`} onClick={event => { if (!canLeave()) event.preventDefault(); }}>Website Editor</a><a href={`/cms?template=${template}`} onClick={event => { if (!canLeave()) event.preventDefault(); }}>Konten</a><a href={`/cms?template=${template}&area=crm`} aria-current="page" onClick={event => event.preventDefault()}>Pelanggan</a></nav><span>{template === "service" ? "Service Modern" : "Restaurant Premium"}</span></header>
    <div className="cmsLocal"><span>Di perangkat ini</span><p>CRM lokal. Belum tersinkron ke akun; email dan pengingat tidak dikirim otomatis. Simpan cadangan Anda.</p></div>
    <div className="cmsLayout"><aside className="cmsSidebar"><p>Hubungan pelanggan</p><nav aria-label="Modul CRM">{(Object.keys(crmSections) as CrmSection[]).map(area => <button key={area} aria-current={section === area ? "page" : undefined} onClick={() => { if (canLeave()) { setSection(area); setEditing(null); setQuery(""); setFilter("active"); setNote(""); setError(""); setNotice(""); } }}><EditorIcon name={area === "tasks" ? "check" : "layers"} />{crmSections[area]}<span>{doc[area].filter(item => !item.archived).length}</span></button>)}</nav></aside>
      <main className="cmsMain" id="crm-main">
        {conflict && <section className="cmsMessage" role="alert"><strong>Periksa versi tersimpan</strong><p>Data berubah di tab lain atau belum bisa dibaca. Unduh pekerjaan Anda sebelum memuat ulang.</p><button className="editorSecondary" onClick={reload}>Muat versi tersimpan</button></section>}
        {error && <div ref={errorBox} tabIndex={-1} className="cmsMessage cmsError" role="alert">{error}</div>}{notice && <p className="cmsMessage" role="status">{notice}</p>}
        {pendingImport && <section className="cmsMessage" aria-label="Konfirmasi pemulihan"><strong>Ganti seluruh data CRM lokal?</strong><p>Cadangan berisi {pendingImport.contacts.length} kontak, {pendingImport.companies.length} perusahaan, {pendingImport.deals.length} peluang, dan {pendingImport.tasks.length} tindak lanjut. Unduh cadangan saat ini sebelum menggantinya.</p><button className="editorPrimary" disabled={saving || (conflict && !unreadable)} onClick={async () => { if (canLeave() && await persist(pendingImport, "Cadangan CRM dipulihkan.", true)) { setPendingImport(null); setEditing(null); setNote(""); } }}>Ganti dengan cadangan</button><button className="editorTextButton" disabled={saving} onClick={() => setPendingImport(null)}>Batal</button></section>}
        <header className="cmsHeading"><div><h1>{crmSections[section]}</h1><p>{descriptions[section]}</p></div><div className="crmHeadingActions"><button className="editorPrimary" disabled={!loaded || saving || conflict || doc[section].length >= 1000} onClick={() => open(section)}><EditorIcon name="plus" />Tambah {singular[section]}</button><BackupMenu download={backup} restore={() => fileInput.current?.click()} downloadDisabled={!loaded || saving} restoreDisabled={!loaded || saving || (conflict && !unreadable)} /><input ref={fileInput} type="file" className="editorSrOnly" accept=".json,application/json" aria-label="File cadangan CRM" onChange={async event => { const file = event.target.files?.[0]; if (!file) return; try { if (file.size > 2_000_000) throw new Error("Cadangan melebihi 2 MB."); setPendingImport(parseCrm(await file.text())); } catch (e) { setError(e instanceof Error ? e.message : "File tidak valid."); } finally { if (fileInput.current) fileInput.current.value = ""; } }} /></div></header>
        {editing ? <section className="crmDetail"><div className="cmsEditToolbar"><button className="editorTextButton" onClick={() => { if (canLeave()) { setEditing(null); setNote(""); } }}><EditorIcon name="back" />Kembali ke daftar</button><span>{dirty || !savedRecord ? "Belum disimpan" : editing.archived ? "Di arsip" : "Tersimpan lokal"}</span></div>
          <div className="crmDetailGrid"><form onSubmit={event => { event.preventDefault(); void save(); }}><fieldset disabled={saving || conflict} className="crmFields"><legend className="editorSrOnly">Detail {singular[section]}</legend>
            <label className="editorField">{section === "contacts" ? "Nama lengkap" : section === "companies" ? "Nama perusahaan" : section === "deals" ? "Nama peluang" : "Apa yang perlu dilakukan?"}<input ref={nameInput} required maxLength={160} value={editing.name} onChange={event => update({ name: event.target.value })} /></label>
            {section === "contacts" && <><div className="crmFieldPair"><label className="editorField">Email<input type="email" maxLength={254} value={(editing as Contact).email} onChange={event => update({ email: event.target.value.trim() })} autoComplete="off" /></label><label className="editorField">Nomor telepon<input type="tel" maxLength={40} value={(editing as Contact).phone} onChange={event => update({ phone: event.target.value })} /></label></div><label className="editorField">Perusahaan<select value={(editing as Contact).companyId} onChange={event => update({ companyId: event.target.value })}><option value="">Tanpa perusahaan</option>{doc.companies.filter(item => !item.archived || item.id === (editing as Contact).companyId).map(item => <option key={item.id} value={item.id}>{item.name}{item.archived ? " (arsip)" : ""}</option>)}</select></label><div className="crmFieldPair"><label className="editorField">Hubungan<select value={(editing as Contact).status} onChange={event => update({ status: event.target.value as Contact["status"] })}><option value="lead">Prospek</option><option value="customer">Pelanggan</option></select></label><label className="editorField">Sumber kontak<input maxLength={100} value={(editing as Contact).source} onChange={event => update({ source: event.target.value })} placeholder="Misalnya: rekomendasi" /></label></div><label className="editorField">Izin komunikasi pemasaran<select value={(editing as Contact).consent} onChange={event => update({ consent: event.target.value as Contact["consent"] })}><option value="unknown">Belum dikonfirmasi</option><option value="allowed">Diizinkan</option><option value="denied">Tidak diizinkan</option></select><small>Catat persetujuan pelanggan. Pengaturan ini tidak mengirim pesan.</small></label></>}
            {section === "companies" && <><label className="editorField">Domain website<input maxLength={200} placeholder="contoh.com" value={(editing as Company).domain} onChange={event => update({ domain: event.target.value.trim().toLowerCase() })} /><small>Tanpa https:// atau garis miring. Dipakai untuk mencegah duplikasi.</small></label><label className="editorField">Bidang usaha<input maxLength={100} value={(editing as Company).industry} onChange={event => update({ industry: event.target.value })} /></label></>}
            {section === "deals" && <><label className="editorField">Kontak terkait<select required value={(editing as Deal).contactId} onChange={event => update({ contactId: event.target.value })}>{contactOptions((editing as Deal).contactId)}</select><small>Tambahkan kontak terlebih dahulu jika daftar masih kosong.</small></label><div className="crmFieldPair"><label className="editorField">Nilai peluang (Rp)<input required inputMode="numeric" pattern="[0-9]{1,12}" maxLength={12} value={(editing as Deal).amount} onChange={event => update({ amount: event.target.value })} /><small>Angka tanpa titik atau koma.</small></label><label className="editorField">Target kesepakatan<input type="date" value={(editing as Deal).due} onChange={event => update({ due: event.target.value })} /></label></div><label className="editorField">Tahap penjualan<select value={(editing as Deal).stage} onChange={event => update({ stage: event.target.value as Deal["stage"] })}>{Object.entries(stages).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label></>}
            {section === "tasks" && <><label className="editorField">Peluang terkait<select value={(editing as Task).dealId} onChange={event => update({ dealId: event.target.value, contactId: doc.deals.find(item => item.id === event.target.value)?.contactId || "" })}><option value="">Tanpa peluang</option>{doc.deals.filter(item => !item.archived || item.id === (editing as Task).dealId).map(item => <option key={item.id} value={item.id}>{item.name}</option>)}</select></label><label className="editorField">Kontak terkait<select disabled={!!(editing as Task).dealId} value={(editing as Task).contactId} onChange={event => update({ contactId: event.target.value })}>{contactOptions((editing as Task).contactId)}</select><small>Kontak mengikuti peluang yang dipilih.</small></label><div className="crmFieldPair"><label className="editorField">Tanggal tindak lanjut<input required type="date" value={(editing as Task).due} onChange={event => update({ due: event.target.value })} /></label><label className="editorField">Prioritas<select value={(editing as Task).priority} onChange={event => update({ priority: event.target.value as Task["priority"] })}><option value="normal">Normal</option><option value="high">Tinggi</option></select></label></div><label className="crmCheckbox"><input type="checkbox" checked={(editing as Task).done} onChange={event => update({ done: event.target.checked })} />Tindak lanjut selesai</label></>}
            <label className="editorField">Catatan internal<textarea rows={4} maxLength={10000} value={editing.notes} onChange={event => update({ notes: event.target.value })} /></label>
            {["contacts", "deals"].includes(section) && <label className="editorField">Tambahkan interaksi<textarea rows={3} maxLength={4000} value={note} onChange={event => setNote(event.target.value)} placeholder="Apa yang dibicarakan, dan apa langkah berikutnya?" /><small>Ditambahkan ke riwayat saat Anda menyimpan.</small></label>}
            <div className="cmsSave"><p>{dirty || !savedRecord ? "Simpan untuk menyimpan catatan di perangkat ini." : "Data tersimpan hanya di browser ini."}</p><button className="editorPrimary" type="submit" disabled={!dirty}> {saving ? "Menyimpan…" : "Simpan perubahan"}</button></div>
          </fieldset></form><aside className="crmContext"><h2>{section === "companies" ? "Kontak perusahaan" : "Hubungan & aktivitas"}</h2>
            {section === "companies" ? <>{doc.contacts.filter(item => item.companyId === editing.id && !item.archived).map(item => <button key={item.id} className="crmRelated" onClick={() => open("contacts", item)}>{item.name}<span>{item.email || "Kontak"}</span></button>)}{savedRecord && <button className="editorTextButton" onClick={() => open("contacts", undefined, { companyId: editing.id })}>Tambah kontak perusahaan</button>}</> : <>
              {section === "contacts" && <><h3>Peluang terkait</h3>{linkedDeals.length ? linkedDeals.map(item => <button className="crmRelated" key={item.id} onClick={() => open("deals", item)}>{item.name}<span>{money(item.amount)} · {stages[item.stage]}</span></button>) : <p>Belum ada peluang.</p>}{savedRecord && !editing.archived && <button className="editorTextButton" onClick={() => open("deals", undefined, { contactId: editing.id })}>Tambah peluang</button>}</>}
              {section === "deals" && <p>Kontak: <button className="editorTextButton" onClick={() => { const contact = doc.contacts.find(item => item.id === (editing as Deal).contactId); if (contact) open("contacts", contact); }}>{contactName((editing as Deal).contactId)}</button></p>}
              {["contacts", "deals"].includes(section) && <><h3>Tindak lanjut berikutnya</h3>{linkedTasks.length ? linkedTasks.map(item => <button className="crmRelated" key={item.id} onClick={() => open("tasks", item)}>{item.name}<span>{dateLabel(item.due)}{item.due < today ? " · Terlewat" : ""}</span></button>) : <p>Belum ada tindak lanjut terbuka.</p>}{savedRecord && !editing.archived && <button className="editorTextButton" onClick={() => open("tasks", undefined, { contactId: section === "contacts" ? editing.id : (editing as Deal).contactId, dealId: section === "deals" ? editing.id : "" })}>Jadwalkan tindak lanjut</button>}<h3>Riwayat interaksi</h3>{activities.length ? <ol className="crmTimeline">{activities.map(item => <li key={item.id}><time dateTime={item.at}>{new Intl.DateTimeFormat("id-ID", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" }).format(new Date(item.at))}</time><p>{item.text}</p></li>)}</ol> : <p>Interaksi yang Anda simpan akan muncul di sini.</p>}</>}
              {section === "tasks" && <p>Tindak lanjut membantu Anda mengingat langkah berikutnya. Pengingat otomatis belum aktif.</p>}
            </>}{!savedRecord && <p>Simpan catatan ini untuk mulai menghubungkannya.</p>}</aside></div>
        </section> : <>
          {section === "deals" && <p className="crmSummary">{activeDeals.length} peluang terbuka <span>Nilai total {money(activeDeals.reduce((sum, item) => sum + Number(item.amount), 0))}</span></p>}
          <div className="cmsFilters">{section === "tasks" && <div className="crmViewSwitch" role="group" aria-label="Tampilan aktivitas"><button aria-pressed={taskView === "agenda"} onClick={() => setTaskView("agenda")}><EditorIcon name="layers" />Agenda</button><button aria-pressed={taskView === "list"} onClick={() => setTaskView("list")}><EditorIcon name="menu" />Daftar</button></div>}{section === "deals" && <div className="crmViewSwitch" role="group" aria-label="Tampilan peluang"><button aria-pressed={view === "board" && filter !== "archive"} disabled={filter === "archive"} onClick={() => setView("board")}><EditorIcon name="layers" />Pipeline</button><button aria-pressed={view === "list" || filter === "archive"} onClick={() => setView("list")}><EditorIcon name="menu" />Daftar</button></div>}<label><span className="editorSrOnly">Cari {singular[section]}</span><input type="search" value={query} placeholder={`Cari ${singular[section]}…`} onChange={event => setQuery(event.target.value)} /></label><label className="crmFilter"><span>Tampilkan</span><select value={filter} onChange={event => setFilter(event.target.value)}><option value="active">{section === "tasks" ? "Belum selesai" : "Semua aktif"}</option>{section === "contacts" && <><option value="lead">Prospek</option><option value="customer">Pelanggan</option></>}{section === "deals" && Object.entries(stages).map(([value, label]) => <option key={value} value={value}>{label}</option>)}{section === "tasks" && <><option value="overdue">Terlewat</option><option value="done">Selesai</option></>}<option value="archive">Arsip</option></select></label></div>
          <div className="crmResultsToolbar"><p className="cmsResults" role="status">{loaded ? `${visible.length} ${singular[section]}${filter === "archive" ? " di arsip" : ""}` : "Memuat CRM…"}</p><label className="crmSort"><span>Urutkan</span><select aria-label="Urutkan" value={sort} onChange={event => setSort(event.target.value)}><option value="recent">{section === "tasks" ? "Jadwal terdekat" : "Terakhir diperbarui"}</option><option value="name">Nama A–Z</option>{section === "deals" && <option value="value">Nilai tertinggi</option>}</select></label></div>
          {section === "tasks" && taskView === "agenda" && loaded ? <CrmAgenda tasks={visible as Task[]} doc={doc} today={today} disabled={saving || conflict} filter={filter} setFilter={setFilter} open={item => open("tasks",item)} add={due => open("tasks",undefined,{due})} reset={() => {setFilter("active");setQuery("");}} update={async (item,values) => {
            const task = {...item,...values,updatedAt:new Date().toISOString()};
            const text = values.done !== undefined ? task.done ? `Selesai: ${task.name}` : `Dibuka kembali: ${task.name}` : `Jadwal ${task.name} diubah ke ${dateLabel(task.due)}.`;
            return persist(withHistory(replaceRecord(doc,"tasks",task),task,text),text);
          }} /> : section === "deals" && view === "board" && filter !== "archive" && loaded ? <CrmBoard deals={visible as Deal[]} contacts={doc.contacts} filter={filter} disabled={saving || conflict} open={item => open("deals", item)} add={stage => open("deals", undefined, { stage })} move={(item, stage) => {
            const next = { ...item, stage, updatedAt: new Date().toISOString() };
            void persist(withHistory(replaceRecord(doc, "deals", next), next, `Tahap berubah: ${stages[stage]}.`), `${item.name} dipindahkan ke ${stages[stage]}.`);
          }} /> : visible.length ? <CrmRecords section={section} records={visible} doc={doc} today={today} open={item => open(section, item)} actions={item => <>{section === "tasks" && !item.archived && <button className="editorTextButton" disabled={saving || conflict} onClick={() => { const task = { ...(item as Task), done: !(item as Task).done, updatedAt: new Date().toISOString() }; void persist(withHistory(replaceRecord(doc, "tasks", task), task, task.done ? `Selesai: ${task.name}` : `Dibuka kembali: ${task.name}`), task.done ? "Tindak lanjut selesai." : "Tindak lanjut dibuka kembali."); }}>{(item as Task).done ? "Buka lagi" : "Selesaikan"}</button>}<button className="editorTextButton" disabled={saving || conflict} onClick={() => void toggleArchive(item)}>{item.archived ? "Pulihkan" : "Arsipkan"}</button></>} /> : loaded && <section className="cmsEmpty"><EditorIcon name="layers" /><h2>{query || filter !== "active" ? "Tidak ada catatan yang cocok." : `Mulai dari ${singular[section]} pertama.`}</h2><p>{query || filter !== "active" ? "Ubah filter atau kosongkan pencarian untuk melihat catatan lainnya." : section === "contacts" ? "Simpan orang yang tertarik pada bisnis Anda, lalu tentukan langkah berikutnya." : descriptions[section]}</p>{query || filter !== "active" ? <button className="editorSecondary" onClick={() => { setQuery(""); setFilter("active"); }}>Reset pencarian & filter</button> : <button className="editorSecondary" disabled={conflict} onClick={() => open(section)}>Tambah {singular[section]}</button>}</section>}
        </>}
      </main>
    </div>
  </div>;
}
