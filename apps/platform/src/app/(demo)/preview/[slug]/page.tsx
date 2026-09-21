import { notFound } from "next/navigation";
import { TemplateDemo } from "@/components/templates/TemplateDemo";
import { demoContent, resolveDesign } from "@/data/template-designs";
import "@/styles/template-demo.css";
export const metadata={title:"Live Preview — Mangelek",robots:{index:false,follow:false}};
export default async function DemoPage({params,searchParams}:{params:Promise<{slug:string}>;searchParams:Promise<{palette?:string;font?:string}>}){
  const {slug}=await params;if(!Object.hasOwn(demoContent,slug))notFound();
  const query=await searchParams;
  return <TemplateDemo initial={resolveDesign({template:slug,palette:query.palette,font:query.font})}/>;
}
