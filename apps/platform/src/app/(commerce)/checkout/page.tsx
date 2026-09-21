import { Suspense } from "react";
import { getVerifiedUser } from "@/lib/auth/server";
import { billingConfig } from "@/lib/billing/server";
import { CheckoutForm } from "@/components/billing/CheckoutForm";
export const metadata={title:"Checkout — Mangelek",robots:{index:false,follow:false}};
export const dynamic="force-dynamic";
export default async function CheckoutPage(){const user=await getVerifiedUser();const config=billingConfig();return <Suspense fallback={<main id="checkout-main" className="checkoutMain" role="status">Menyiapkan checkout…</main>}><CheckoutForm email={user?.email??null} name={typeof user?.user_metadata?.full_name==="string"?user.user_metadata.full_name:""} enabled={Boolean(config)} sandbox={!config?.production}/></Suspense>;}
