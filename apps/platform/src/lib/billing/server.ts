import "server-only";
import { createClient } from "@supabase/supabase-js";
import { createHash, timingSafeEqual } from "node:crypto";
import { paymentState, allowedPaymentUrl } from "./validation";
export function billingConfig(){
  const url=process.env.NEXT_PUBLIC_SUPABASE_URL, key=process.env.SUPABASE_SERVICE_ROLE_KEY, serverKey=process.env.MIDTRANS_SERVER_KEY, origin=process.env.APP_URL;
  if(!url||!key||!serverKey||!origin||process.env.BILLING_ENABLED!=="true")return null;
  const production=process.env.MIDTRANS_ENVIRONMENT==="production";
  try{const parsed=new URL(origin);if(production&&parsed.protocol!=="https:")return null;return {url,key,serverKey,origin:parsed.origin,production};}catch{return null;}
}
export function billingDb(){const c=billingConfig();if(!c)throw new Error("billing_unavailable");return createClient(c.url,c.key,{auth:{persistSession:false,autoRefreshToken:false}});}
export async function midtrans(path:string,body?:unknown){
  const c=billingConfig();if(!c)throw new Error("billing_unavailable");
  const host=body ? (c.production?"https://app.midtrans.com/snap/v1":"https://app.sandbox.midtrans.com/snap/v1") : (c.production?"https://api.midtrans.com/v2":"https://api.sandbox.midtrans.com/v2");
  const response=await fetch(`${host}${path}`,{method:body?"POST":"GET",headers:{Authorization:`Basic ${Buffer.from(`${c.serverKey}:`).toString("base64")}`,"Content-Type":"application/json",Accept:"application/json"},...(body?{body:JSON.stringify(body)}:{}),cache:"no-store",signal:AbortSignal.timeout(15000)});
  if(!body&&response.status===404)return null;
  if(!response.ok)throw new Error("payment_provider_unavailable");
  return response.json();
}
export function verifyNotification(body:Record<string,unknown>){
  const c=billingConfig();if(!c||typeof body.signature_key!=="string"||!/^[a-f0-9]{128}$/i.test(body.signature_key)||![body.order_id,body.status_code,body.gross_amount].every(v=>typeof v==="string"))return false;
  const expected=createHash("sha512").update(`${body.order_id}${body.status_code}${body.gross_amount}${c.serverKey}`).digest();
  return timingSafeEqual(expected,Buffer.from(body.signature_key,"hex"));
}
export async function syncOrder(id:string){
  const db=billingDb();const {data:order,error}=await db.from("billing_orders").select("*").eq("id",id).single();if(error||!order)throw new Error("order_unavailable");
  const provider=await midtrans(`/${encodeURIComponent(id)}/status`);
  if(!provider)return order;
  if(provider.order_id!==id||Number(provider.gross_amount)!==order.amount||provider.currency!=="IDR")throw new Error("payment_mismatch");
  const state=paymentState(provider.transaction_status,provider.fraud_status);
  const {error:syncError}=await db.rpc("apply_billing_status",{p_order_id:id,p_status:state});if(syncError)throw new Error("status_unavailable");
  const {data:updated,error:readError}=await db.from("billing_orders").select("*").eq("id",id).single();if(readError)throw readError;return updated;
}
export { allowedPaymentUrl };
