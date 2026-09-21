import "./setup.mjs";
import assert from "node:assert/strict";
import { test } from "node:test";
import { renderToStaticMarkup } from "react-dom/server";
import { SubscriptionOverview, type SubscriptionOrder } from "../src/components/billing/SubscriptionOverview";
const now = Date.parse("2026-09-21T00:00:00Z");
const order: SubscriptionOrder = { id:"mgl-test", template:"restaurant", period:"monthly", amount:200000, business:"Bisnis uji", status:"paid", created_at:"2026-09-20T00:00:00Z", expires_at:"2026-10-20T00:00:00Z" };
test("Guest subscription overview preserves sign-in destination without claiming an active plan", () => {
  const html = renderToStaticMarkup(<SubscriptionOverview email={null} orders={[]} unavailable={false} now={now}/>);
  assert.ok(html.includes('/login?next=%2Fsubscription'));
  assert.ok(html.includes('Paket yang tersedia'));
  assert.ok(!html.includes('data-active="true"'));
});
test("Subscription overview distinguishes active, expired, pending and unavailable data", () => {
  const render = (orders: SubscriptionOrder[], unavailable=false) => renderToStaticMarkup(<SubscriptionOverview email="uji@example.test" orders={orders} unavailable={unavailable} now={now}/>);
  assert.ok(render([order]).includes('data-active="true"'));
  const expired = render([{...order, expires_at:"2026-09-01T00:00:00Z"}]);
  assert.ok(expired.includes('Masa akses berakhir'));
  assert.ok(!expired.includes('data-active="true"'));
  const pending = render([{...order, status:"pending", expires_at:null}]);
  assert.ok(pending.includes('Menunggu pembayaran'));
  assert.ok(!pending.includes('data-active="true"'));
  assert.ok(render([],true).includes('Data langganan belum tersedia.'));
  assert.ok(!render([],true).includes('Belum ada pembayaran.'));
});
