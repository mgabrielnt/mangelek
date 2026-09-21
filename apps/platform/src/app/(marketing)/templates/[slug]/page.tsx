import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { templateCategories } from "@/data/templates";
import { TemplateCustomizer } from "@/components/templates/TemplateCustomizer";
import { TemplateConcept } from "@/components/templates/TemplateConcept";
import { demoContent } from "@/data/template-designs";
import "@/styles/template-customizer.css";
export const dynamicParams=false;
export function generateStaticParams(){return templateCategories.map(item=>({slug:item.id}));}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{const {slug}=await params;const item=templateCategories.find(item=>item.id===slug);return {title:item ? `${item.title} — Live Preview | Mangelek` : "Template tidak ditemukan",description:"Jelajahi template, coba palet warna dan font, lalu pilih desain untuk website bisnis Anda."};}
export default async function TemplateDetailPage({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const item=templateCategories.find(item=>item.id===slug);if(!item)notFound();if(!Object.hasOwn(demoContent,slug))return <TemplateConcept item={item}/>;return <Suspense fallback={<main id="blog-main" className="blogLoading" role="status">Menyiapkan studio preview…</main>}><TemplateCustomizer item={item}/></Suspense>;}
