"use client";
import { useId, useRef, useState } from "react";
import { draftImages, type SiteDraft } from "@/lib/editor/document";
import { EditorIcon } from "./EditorIcon";

export function EditorImageLibrary({ document, current, choose }: { document: SiteDraft; current: string; choose: (src: string, alt: string) => boolean }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [notice, setNotice] = useState("");
  const trigger = useRef<HTMLButtonElement>(null);
  const id = useId();
  const images = draftImages(document);
  const matches = images.filter(image => `${image.alt} ${image.pages.join(" ")}`.toLocaleLowerCase("id").includes(query.trim().toLocaleLowerCase("id")));
  function close() { setOpen(false); trigger.current?.focus(); }
  return <div className="editorImageLibrary">
    <button ref={trigger} className="editorSecondary" aria-expanded={open} aria-controls={id} onClick={() => { setOpen(!open); setNotice(""); }}><EditorIcon name="image" />Pilih dari website</button>
    {open && <section id={id} aria-label="Gambar di website" onKeyDown={event => { if (event.key === "Escape") { event.stopPropagation(); close(); } }}>
      <div className="editorLibraryHeading"><h3>Gambar di website</h3><button className="editorTool" aria-label="Tutup pilihan gambar" onClick={close}><EditorIcon name="close" /></button></div>
      <p className="editorMuted">Pakai kembali gambar dari draft ini. Gambar di halaman asal tetap tersimpan.</p>
      <label className="editorField">Cari gambar<input type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Deskripsi atau nama halaman" /></label>
      <p className="editorMuted" role="status">{matches.length} gambar tersedia</p>
      {matches.length ? <div className="editorLibraryGrid">{matches.map((image, index) => <button key={image.src} className="editorLibraryImage" aria-pressed={image.src === current} onClick={() => { if (choose(image.src, image.alt)) { close(); setNotice("Gambar dipakai. Periksa deskripsi gambar agar sesuai dengan halaman ini."); } }}>
        <img src={image.src} alt="" loading="lazy" width={160} height={110} /><span>{image.alt || `Gambar ${index + 1}`}</span><small>{image.pages.join(" · ")}</small>{image.src === current && <strong><EditorIcon name="check" />Sedang dipakai</strong>}
      </button>)}</div> : <p className="editorLibraryEmpty">{images.length ? "Tidak ada gambar yang cocok. Coba kata lain." : "Belum ada gambar di draft. Gunakan Ganti gambar untuk mengunggah gambar pertama."}</p>}
    </section>}
    {notice && <p className="editorMuted" role="status">{notice}</p>}
  </div>;
}
