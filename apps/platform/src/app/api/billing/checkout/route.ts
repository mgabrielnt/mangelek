import { NextRequest,NextResponse } from "next/server";
import { createHash } from "node:crypto";
import { getVerifiedUser } from "@/lib/auth/server";
import { billingConfig,billingDb,midtrans,allowedPaymentUrl } from "@/lib/billing/server";
import { validateCheckout,periods } from "@/lib/billing/validation";
export const runtime="nodejs";
export async function POST(request:NextRequest){
  const config=billingConfig();if(!config)return NextResponse.json({error:"Pembayaran belum tersedia. Pilihan Anda tetap tersimpan. Silakan coba lagi nanti."},{status:503});
  if(request.headers.get("origin")!==config.origin)return NextResponse.json({error:"Permintaan tidak diizinkan."},{status:403});
  const user=await getVerifiedUser();if(!user?.email)return NextResponse.json({error:"Masuk ke akun Anda untuk melanjutkan."},{status:401});
  if(Number(request.headers.get("content-length")??0)>8000)return NextResponse.json({error:"Data terlalu besar."},{status:413});
  let raw:unknown;try{const text=await request.text();if(text.length>8000)throw new Error();raw=JSON.parse(text);}catch{return NextResponse.json({error:"Data checkout tidak valid."},{status:400});}
  const input=validateCheckout(raw);if(!input)return NextResponse.json({error:"Periksa nama, bisnis, dan pilihan template Anda."},{status:400});
  const period=periods.find(p=>p.id===input.period)!;
  const id=`mgl-${createHash("sha256").update(`${user.id}:${input.requestId}`).digest("hex").slice(0,32)}`;
  try{
    const db=billingDb();
    const {data:previous}=await db.from("billing_orders").select("*").eq("id",id).eq("user_id",user.id).maybeSingle();
    if(previous){
      if(previous.template!==input.template||previous.palette!==input.palette||previous.font!==input.font||previous.period!==input.period)return NextResponse.json({error:"Pilihan berubah. Muat ulang checkout untuk membuat pesanan baru."},{status:409});
      if(previous.status!=="pending")return NextResponse.json({url:`/checkout/status?order=${id}`});
      if(previous.payment_url&&allowedPaymentUrl(previous.payment_url,config.production))return NextResponse.json({url:previous.payment_url});
      return NextResponse.json({error:"Pesanan sedang diproses. Periksa statusnya sebelum mencoba lagi.",statusUrl:`/checkout/status?order=${id}`},{status:409});
    }
    const {count,error:countError}=await db.from("billing_orders").select("id",{count:"exact",head:true}).eq("user_id",user.id).gte("created_at",new Date(Date.now()-3600000).toISOString());
    if(countError)throw countError;
    if((count??0)>=5)return NextResponse.json({error:"Terlalu banyak percobaan. Periksa pesanan Anda atau coba kembali nanti."},{status:429});
    const {error}=await db.from("billing_orders").insert({id,user_id:user.id,template:input.template,palette:input.palette,font:input.font,period:input.period,amount:period.amount,business:input.business,status:"pending"});if(error)throw error;
    const payment=await midtrans("/transactions",{transaction_details:{order_id:id,gross_amount:period.amount},item_details:[{id:`website-${input.period}`,price:period.amount,quantity:1,name:`Website + CMS ${period.months} bulan`}],customer_details:{first_name:input.name,email:user.email},callbacks:{finish:`${config.origin}/checkout/status?order=${id}`},expiry:{unit:"hours",duration:24}});
    if(!allowedPaymentUrl(payment.redirect_url,config.production))throw new Error("invalid_redirect");
    const {error:saveError}=await db.from("billing_orders").update({payment_url:payment.redirect_url}).eq("id",id);if(saveError)throw saveError;
    return NextResponse.json({url:payment.redirect_url});
  }catch{return NextResponse.json({error:"Pembayaran belum dapat dibuka. Periksa status pesanan sebelum mencoba kembali.",statusUrl:`/checkout/status?order=${id}`},{status:502});}
}
