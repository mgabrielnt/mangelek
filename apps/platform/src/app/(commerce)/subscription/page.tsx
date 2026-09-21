import { getVerifiedUser } from "@/lib/auth/server";
import { billingConfig, billingDb } from "@/lib/billing/server";
import { SubscriptionOverview, type SubscriptionOrder } from "@/components/billing/SubscriptionOverview";
import "@/styles/subscription.css";
export const metadata = { title: "Langganan saya — Mangelek", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";
export default async function SubscriptionPage() {
  const user = await getVerifiedUser();
  let orders: SubscriptionOrder[] = [];
  let unavailable = Boolean(user && !billingConfig());
  if (user && billingConfig()) {
    try {
      const result = await billingDb().from("billing_orders")
        .select("id,template,period,amount,status,business,expires_at,created_at")
        .eq("user_id", user.id).order("created_at", { ascending: false }).limit(30);
      orders = result.data ?? [];
      unavailable = Boolean(result.error);
    } catch { unavailable = true; }
  }
  return <SubscriptionOverview email={user?.email ?? null} orders={orders} unavailable={unavailable} now={Date.now()}/>;
}
