import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { templateCategories } from "@/data/templates";
import { BlogIcon } from "@/components/blogs/BlogIcon";
export const dynamicParams=false;
export function generateStaticParams(){return templateCategories.map(item=>({slug:item.id}));}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{const {slug}=await params;const item=templateCategories.find(item=>item.id===slug);return {title:item ? `${item.title} — Templates Mangelek` : "Template tidak ditemukan",description:item ? `Lihat konsep ${item.title} dan diskusikan kebutuhan website bisnis Anda bersama Mangelek.` : undefined};}
export default async function TemplateDetailPage({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params;const item=templateCategories.find(item=>item.id===slug);if(!item)notFound();
  return <main className="blogMain" id="blog-main" tabIndex={-1}><nav className="blogBreadcrumb" aria-label="Breadcrumb"><Link href="/templates">Semua template</Link><span aria-hidden="true">/</span><span>{item.label}</span></nav><div className="templateDetail"><div className="templateDetailArtwork"><Image src={`/images/marketing/categories/${item.image}`} alt={`Konsep desain ${item.title}`} fill priority sizes="(max-width:600px) 90vw, 600px"/></div><section className="templateDetailCopy"><h1>{item.title}</h1><p>Arah visual untuk bisnis {item.label.toLowerCase()}. Gunakan konsep ini sebagai bahan awal untuk menentukan tampilan website Anda.</p><h2>Jadikan sesuai bisnis Anda</h2><ul><li>Siapkan logo, warna, dan identitas bisnis.</li><li>Pilih foto dan tulisan yang mewakili layanan Anda.</li><li>Diskusikan susunan halaman dan kebutuhan konten.</li></ul><Link className="templateDetailCta" href={`/?template=${item.id}#contact`}>Diskusikan konsep ini <BlogIcon name="arrow"/></Link><p className="templateDetailNote">Gambar merupakan pratinjau konsep visual. Detail desain dan penerapannya dibahas bersama tim Mangelek.</p><Link className="templateDetailPrice" href="/pricing">Lihat paket Rp200.000 / bulan</Link></section></div></main>;
}
