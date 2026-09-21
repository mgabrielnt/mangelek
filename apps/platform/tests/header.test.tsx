import { window, setMedia } from "./setup.mjs";
import assert from "node:assert/strict";
import { afterEach, beforeEach, test } from "node:test";
import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { Header } from "../src/components/home/header/Header";

let root: Root;
const button = (id: string) => document.querySelector<HTMLButtonElement>(`[aria-controls="${id}"]`)!;
const panel = (id: string) => document.getElementById(id)!;
beforeEach(async () => {
  root = createRoot(document.getElementById("test-root")!);
  await act(() => root.render(<Header />));
});
afterEach(async () => { await act(() => root.unmount()); });

test("Products opens by click; Escape closes and restores trigger focus", async () => {
  assert.equal(button("nav-products").getAttribute("aria-expanded"), "false");
  await act(() => button("nav-products").click());
  assert.equal(panel("nav-products").hidden, false);
  await act(() => panel("nav-products").querySelector<HTMLAnchorElement>("a")!.focus());
  await act(() => document.dispatchEvent(new window.KeyboardEvent("keydown", { key: "Escape" })));
  assert.equal(panel("nav-products").hidden, true);
  assert.equal(document.activeElement, button("nav-products"));
});

test("Touch can open dropdown without hover, then focus outside closes it", async () => {
  const event = new window.MouseEvent("pointerover", { bubbles: true });
  Object.defineProperty(event, "pointerType", { value: "touch" });
  await act(() => button("nav-support").dispatchEvent(event));
  assert.equal(panel("nav-support").hidden, true);
  await act(() => { button("nav-support").focus(); button("nav-support").click(); });
  assert.equal(panel("nav-support").hidden, false);
  await act(() => document.getElementById("outside")!.focus());
  assert.equal(panel("nav-support").hidden, true);
});

test("Mobile menu closes on link activation, outside click, and breakpoint change", async () => {
  const trigger = button("mobile-navigation");
  await act(() => trigger.click());
  assert.equal(panel("mobile-navigation").hidden, false);
  await act(() => panel("mobile-navigation").querySelector<HTMLAnchorElement>("a")!.click());
  assert.equal(panel("mobile-navigation").hidden, true);
  await act(() => trigger.click());
  await act(() => document.getElementById("outside")!.dispatchEvent(new window.Event("pointerdown", { bubbles: true })));
  assert.equal(panel("mobile-navigation").hidden, true);
  await act(() => trigger.click());
  await act(() => setMedia("(min-width: 961px)", true));
  assert.equal(panel("mobile-navigation").hidden, true);
});

test("Mobile Escape restores focus to its trigger", async () => {
  await act(() => button("mobile-navigation").click());
  await act(() => panel("mobile-navigation").querySelector<HTMLAnchorElement>("a")!.focus());
  await act(() => document.dispatchEvent(new window.KeyboardEvent("keydown", { key: "Escape" })));
  assert.equal(panel("mobile-navigation").hidden, true);
  assert.equal(document.activeElement, button("mobile-navigation"));
});

test("Mouse can cross the space between a trigger and its panel without dismissing it", async () => {
  const trigger = button("nav-products");
  const enter = new window.MouseEvent("pointerover", { bubbles: true });
  Object.defineProperty(enter, "pointerType", { value: "mouse" });
  await act(() => trigger.dispatchEvent(enter));
  assert.equal(panel("nav-products").hidden, false);
  await act(() => trigger.dispatchEvent(new window.MouseEvent("click", { bubbles: true, detail: 1 })));
  assert.equal(panel("nav-products").hidden, false, "a mouse click must not undo hover opening");
  await act(() => trigger.dispatchEvent(new window.MouseEvent("pointerout", {
    bubbles: true, relatedTarget: document.querySelector(".navShell"),
  })));
  assert.equal(panel("nav-products").hidden, false, "the navbar gap is inside the safe area");
  await act(() => panel("nav-products").querySelector<HTMLAnchorElement>("a")!.focus());
  assert.equal(panel("nav-products").hidden, false);
});

test("Home navbar floats after scrolling and returns to transparent state at the top", async () => {
  const header = document.querySelector(".siteHeader")!;
  assert.equal(header.getAttribute("data-scrolled"), "false");
  Object.defineProperty(window, "scrollY", { configurable: true, value: 120 });
  await act(() => window.dispatchEvent(new window.Event("scroll")));
  assert.equal(header.getAttribute("data-scrolled"), "true");
  Object.defineProperty(window, "scrollY", { configurable: true, value: 0 });
  await act(() => window.dispatchEvent(new window.Event("scroll")));
  assert.equal(header.getAttribute("data-scrolled"), "false");
});
