import { NextRequest,NextResponse } from "next/server";
import { billingConfig,verifyNotification,syncOrder } from "@/lib/billing/server";
export const runtime="nodejs";
export async function POST(request:NextRequest){
  if(!billingConfig())return NextResponse.json({error:"unavailable"},{status:503});
  try{const text=await request.text();if(text.length>32000)return NextResponse.json({error:"too_large"},{status:413});const body=JSON.parse(text);if(!body||typeof body!=="object"||!verifyNotification(body)||typeof body.order_id!=="string"||!/^mgl-[a-f0-9]{32}$/.test(body.order_id))return NextResponse.json({error:"invalid_notification"},{status:403});await syncOrder(body.order_id);return NextResponse.json({received:true});}catch{return NextResponse.json({error:"retry_later"},{status:503});}
}
