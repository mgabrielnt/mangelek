import { demoContent, palettes, fontPacks, type DesignSelection } from "@/data/template-designs";
export const periods=[{id:"monthly",months:1,label:"Bulanan",amount:200000},{id:"yearly",months:12,label:"Tahunan",amount:2400000}] as const;
export type CheckoutInput=DesignSelection & {period:"monthly"|"yearly";name:string;business:string;requestId:string};
export function validateCheckout(value:unknown):CheckoutInput|null{
  if(!value||typeof value!=="object")return null;
  const v=value as Record<string,unknown>;
  if(typeof v.template!=="string"||!Object.hasOwn(demoContent,v.template)||!palettes.some(p=>p.id===v.palette)||!fontPacks.some(f=>f.id===v.font)||!periods.some(p=>p.id===v.period))return null;
  if(typeof v.name!=="string"||!v.name.trim()||v.name.length>100||typeof v.business!=="string"||!v.business.trim()||v.business.length>120||typeof v.requestId!=="string"||!/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/i.test(v.requestId))return null;
  return {template:v.template,palette:v.palette as string,font:v.font as string,period:v.period as CheckoutInput["period"],name:v.name.trim(),business:v.business.trim(),requestId:v.requestId};
}
export function paymentState(status:string,fraud?:string){
  if(status==="settlement"||(status==="capture"&&fraud==="accept"))return "paid";
  if(["refund","partial_refund","chargeback","partial_chargeback"].includes(status))return "refunded";
  if(["deny","cancel","expire","failure"].includes(status))return "failed";
  return "pending";
}
export function allowedPaymentUrl(value:unknown,production:boolean){
  if(typeof value!=="string")return false;
  try{const url=new URL(value);return url.protocol==="https:"&&url.hostname===(production?"app.midtrans.com":"app.sandbox.midtrans.com")&&!url.username&&!url.password&&url.port===""&&url.pathname.startsWith("/snap/");}catch{return false;}
}
