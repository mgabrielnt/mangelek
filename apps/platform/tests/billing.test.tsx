import assert from "node:assert/strict";
import { test } from "node:test";
import { validateCheckout,periods,paymentState,allowedPaymentUrl } from "../src/lib/billing/validation";
import { safeAuthDestination } from "../src/lib/auth/validation";
import { resolveDesign,demoContent } from "../src/data/template-designs";
const valid={template:"service",palette:"forest",font:"editorial",period:"monthly",name:"Ayu",business:"Studio Ayu",requestId:"0d966027-c470-4c2e-99e9-dae723628819"};
test("Checkout rejects unconfigured templates, periods, palettes, and incomplete customers",()=>{
  assert.ok(validateCheckout(valid));
  for(const patch of [{template:"company"},{template:"__proto__"},{period:"free"},{palette:"red"},{font:"url(evil)"},{name:" "},{business:""},{requestId:"1"}])assert.equal(validateCheckout({...valid,...patch}),null);
  assert.equal(validateCheckout(null),null);
});
test("Checkout discards client prices; authoritative monthly and annual totals have no discount",()=>{
  const parsed=validateCheckout({...valid,amount:1,user_id:"another-user",status:"paid"});
  assert.ok(parsed);assert.equal("amount" in parsed,false);assert.equal("user_id" in parsed,false);assert.equal("status" in parsed,false);
  assert.equal(periods.find(p=>p.id===parsed.period)?.amount,200000);
  assert.equal(periods[1].amount,periods[0].amount*12);
});
test("Only settled or accepted captures activate a subscription",()=>{
  assert.equal(paymentState("settlement"),"paid");assert.equal(paymentState("capture","accept"),"paid");
  for(const state of ["pending","authorize","success","unknown"])assert.equal(paymentState(state),"pending");
  assert.equal(paymentState("capture","challenge"),"pending");assert.equal(paymentState("expire"),"failed");assert.equal(paymentState("refund"),"refunded");
});
test("Payment redirects must use the configured Midtrans HTTPS host",()=>{
  assert.ok(allowedPaymentUrl("https://app.sandbox.midtrans.com/snap/v3/redirection/test",false));
  for(const url of ["https://evil.test/snap/test","https://app.midtrans.com/snap/test","http://app.sandbox.midtrans.com/snap/test","https://evil@app.sandbox.midtrans.com/snap/test"])assert.equal(allowedPaymentUrl(url,false),false);
});
test("Authentication preserves allowlisted checkout choices and rejects external destinations",()=>{
  const next=safeAuthDestination("/checkout?template=service&palette=ocean&font=modern&period=yearly&next=https://evil.test");
  assert.equal(next,"/checkout?template=service&palette=ocean&font=modern&period=yearly");
  for(const path of ["//evil.test","/\\evil.test","https://evil.test","/checkout/../admin"])assert.equal(safeAuthDestination(path),"/account");
  assert.equal(safeAuthDestination("/subscription"),"/subscription");
});
test("Only two live demos ship and invalid style choices fall back safely",()=>{
  assert.deepEqual(Object.keys(demoContent).sort(),["restaurant","service"]);
  assert.deepEqual(resolveDesign({template:"__proto__",palette:"unknown",font:"unknown"}),{template:"restaurant",palette:"forest",font:"editorial"});
});
