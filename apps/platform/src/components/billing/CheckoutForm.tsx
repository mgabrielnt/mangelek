"use client";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useRef,useState,type FormEvent } from "react";
import { resolveDesign,designQuery,palettes,fontPacks } from "@/data/template-designs";
import { templateCategories } from "@/data/templates";
import { periods } from "@/lib/billing/validation";
import { formatRupiah } from "@/data/pricing/plan";
import { BlogIcon } from "@/components/blogs/BlogIcon";
type Props={email:string|null;name:string;enabled:boolean;sandbox:boolean};
export function CheckoutForm({email,name,enabled,sandbox}:Props){
  const params=useSearchParams();
  const design=resolveDesign({template:params.get("template")??undefined,palette:params.get("palette")??undefined,font:params.get("font")??undefined});
  const period=periods.find(p=>p.id===params.get("period"))??periods[0];
  const item=templateCategories.find(t=>t.id===design.template)!;
  const [pending,setPending]=useState(false),[error,setError]=useState(""),[statusUrl,setStatusUrl]=useState("");
  const [errors,setErrors]=useState<Record<string,string>>({});
  const busy=useRef(false),requestId=useRef(""),fingerprint=useRef("");
  const query=`${designQuery(design)}&period=${period.id}`;
  const login=`/login?next=${encodeURIComponent(`/checkout?${query}`)}`;
  function choosePeriod(id:string){window.history.replaceState(null,"",`/checkout?${designQuery(design)}&period=${id}`);setError("");setStatusUrl("");}
  async function pay(event:FormEvent<HTMLFormElement>){
    event.preventDefault();if(busy.current)return;
    const form=event.currentTarget,fields=new FormData(form);
    const fullName=String(fields.get("name")??"").trim(),business=String(fields.get("business")??"").trim();
    const nextErrors:Record<string,string>={};
    if(!fullName)nextErrors.name="Masukkan nama lengkap Anda.";
    if(!business)nextErrors.business="Masukkan nama bisnis Anda.";
    setErrors(nextErrors);setError("");
    const first=Object.keys(nextErrors)[0];if(first){(form.elements.namedItem(first) as HTMLInputElement)?.focus();return;}
    if(!enabled){setError("Pembayaran belum tersedia. Pilihan desain Anda tersimpan di tautan halaman ini. Silakan coba lagi nanti atau hubungi kami.");return;}
    if(!email){window.location.assign(login);return;}
    busy.current=true;setPending(true);
    const nextFingerprint=JSON.stringify([design,period.id,fullName,business]);
    if(!requestId.current||fingerprint.current!==nextFingerprint){requestId.current=crypto.randomUUID();fingerprint.current=nextFingerprint;}
    try{
      const response=await fetch("/api/billing/checkout",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({...design,period:period.id,name:fullName,business,requestId:requestId.current}),signal:AbortSignal.timeout(25000)});
      const data=await response.json();
      if(response.status===401){window.location.assign(login);return;}
      if(!response.ok){setError(data.error??"Pembayaran belum berhasil dibuka. Coba kembali.");setStatusUrl(data.statusUrl??"");return;}
      window.location.assign(data.url);
    }catch{setError("Koneksi terputus. Coba lagi dengan pilihan yang sama agar pesanan tidak dibuat dua kali.");}
    finally{busy.current=false;setPending(false);}
  }
  return <main id="checkout-main" className="checkoutMain" tabIndex={-1}>
    <Link className="checkoutBack" href={`/templates/${item.id}?${designQuery(design)}`}><BlogIcon name="back"/> Kembali ke desain</Link>
    <header className="checkoutIntro"><h1>Selangkah lagi.<br/>Ruang baru untuk bisnis Anda.</h1><p>Tinjau pilihan dan periode langganan sebelum membayar.</p></header>
    <div className="checkoutGrid"><form onSubmit={pay} noValidate aria-busy={pending} className="checkoutForm">
      <fieldset disabled={pending} className="checkoutPeriod"><legend>Pilih periode langganan</legend><div>{periods.map(p=><label key={p.id} className={period.id===p.id?"isSelected":""}><input type="radio" name="period" checked={p.id===period.id} value={p.id} onChange={()=>choosePeriod(p.id)}/><span><strong>{p.label}</strong><small>{p.months===1?"1 bulan akses":"12 bulan akses"}</small></span><span className="periodPrice">{formatRupiah(p.amount)}<small>dibayar di awal</small></span></label>)}</div><p>Rp200.000 per bulan untuk kedua pilihan. Tanpa perpanjangan otomatis.</p></fieldset>
      <section className="checkoutDetails" aria-labelledby="checkout-details-title"><h2 id="checkout-details-title">Detail pelanggan</h2>{email?<p className="checkoutAccount">Akun Anda: <strong>{email}</strong></p>:<p>Sudah punya akun? <Link href={login}>Masuk untuk melanjutkan</Link></p>}
        <div className="checkoutField"><label htmlFor="billing-name">Nama lengkap</label><input id="billing-name" name="name" autoComplete="name" defaultValue={name} required maxLength={100} disabled={pending} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name?"billing-name-error":undefined}/>{errors.name&&<p id="billing-name-error" className="checkoutFieldError">{errors.name}</p>}</div>
        <div className="checkoutField"><label htmlFor="billing-business">Nama bisnis</label><input id="billing-business" name="business" autoComplete="organization" required maxLength={120} disabled={pending} aria-invalid={Boolean(errors.business)} aria-describedby={errors.business?"billing-business-error":undefined}/>{errors.business&&<p id="billing-business-error" className="checkoutFieldError">{errors.business}</p>}</div>
      </section>
      <section className="checkoutPayment" aria-labelledby="checkout-payment-title"><h2 id="checkout-payment-title">Pembayaran</h2><p>Pilih metode pembayaran yang tersedia di halaman Midtrans. Data kartu tidak dimasukkan di Mangelek.</p><div className="paymentMethods"><span>QRIS</span><span>Virtual account</span><span>E-wallet</span></div>{!enabled?<p className="checkoutNotice">Pembayaran belum dibuka. Anda tetap dapat meninjau desain dan rincian langganan.</p>:sandbox&&<p className="checkoutNotice">Mode sandbox. Gunakan data uji; tidak ada pembayaran nyata.</p>}</section>
      {error&&<div className="checkoutError" role="alert"><p>{error}</p>{statusUrl?<Link href={statusUrl}>Periksa status pesanan</Link>:<Link href="/#contact">Hubungi Mangelek</Link>}</div>}
      <button className="checkoutPay" type="submit" disabled={pending}>{pending?"Menyiapkan pembayaran…":!enabled?"Periksa ketersediaan pembayaran":!email?"Masuk & lanjutkan pembayaran":"Lanjutkan ke pembayaran"}<BlogIcon name="arrow"/></button>
      <p className="checkoutFine">Langganan aktif setelah pembayaran terverifikasi. Pembelian dan perpanjangan domain dibayar terpisah.</p>
    </form>
    <aside className="checkoutSummary" aria-label="Ringkasan pesanan"><div className="checkoutSummaryImage"><Image src={`/images/templates/${item.id}.webp`} alt={`Desain ${item.title}`} fill sizes="(max-width:760px) 90vw,400px" priority/><span>{item.title}</span></div><div className="checkoutSummaryBody"><h2>Website + CMS</h2><p>{item.title}</p><dl className="checkoutDesign"><div><dt>Palet warna</dt><dd>{palettes.find(p=>p.id===design.palette)?.name}</dd></div><div><dt>Font pack</dt><dd>{fontPacks.find(f=>f.id===design.font)?.name}</dd></div><div><dt>Periode</dt><dd>{period.months} bulan</dd></div></dl><ul><li>Website editor dan CMS</li><li>Hosting dan koneksi domain</li><li>Formulir, media, dan insight</li></ul><div className="checkoutTotal" aria-live="polite"><span>Total pembayaran</span><strong>{formatRupiah(period.amount)}</strong><small>Dibayar untuk {period.months} bulan akses.</small></div></div></aside></div>
  </main>;
}
