import { window } from "./setup.mjs";
import assert from "node:assert/strict";
import { test } from "node:test";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { AuthForm } from "../src/components/auth/AuthForm";
import { safeAuthDestination, validateAuth } from "../src/lib/auth/validation";
import { submitAuth, signInWithGoogle } from "../src/lib/auth/operations";

test("Auth redirects accept only the recovery destination or the account page", () => {
  for (const value of [null, "https://evil.example", "//evil.example", "/\\evil.example", "/reset-password?next=//evil.example", "/admin"]) {
    assert.equal(safeAuthDestination(value), "/account");
  }
  assert.equal(safeAuthDestination("/reset-password"), "/reset-password");
});

test("Signup validates all required fields; login does not impose new-password rules", () => {
  assert.deepEqual(Object.keys(validateAuth("signup", { name: " ", email: "no-email", password: "123" })), ["name", "email", "password"]);
  assert.deepEqual(validateAuth("login", { name: "", email: "owner@example.com", password: "old" }), {});
  assert.deepEqual(validateAuth("forgot", { name: "", email: "owner@example.com", password: "" }), {});
});

test("Missing provider configuration never produces a fake login or Google success", async () => {
  const oldUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  delete process.env.NEXT_PUBLIC_SUPABASE_URL;
  try {
    const result = await submitAuth("login", { name: "", email: "owner@example.com", password: "example-only" });
    assert.match(result.error!, /belum tersedia/);
    assert.equal(result.destination, undefined);
    assert.match((await signInWithGoogle()).error!, /belum tersedia/);
  } finally {
    if (oldUrl === undefined) delete process.env.NEXT_PUBLIC_SUPABASE_URL;
    else process.env.NEXT_PUBLIC_SUPABASE_URL = oldUrl;
  }
});

test("Signup focuses the first invalid field and password visibility preserves the value", async () => {
  const container = document.getElementById("test-root")!;
  const root = createRoot(container);
  const previousFormData = globalThis.FormData;
  globalThis.FormData = window.FormData as typeof FormData;
  try {
    await act(() => root.render(<AuthForm mode="signup" />));
    await act(() => container.querySelector("form")!.dispatchEvent(new window.Event("submit", { bubbles: true, cancelable: true })));
    assert.equal(document.activeElement?.id, "name");
    assert.equal(container.querySelectorAll('[aria-invalid="true"]').length, 3);
    const password = container.querySelector<HTMLInputElement>("#password")!;
    password.value = "example-password";
    await act(() => container.querySelector<HTMLButtonElement>('[aria-label="Tampilkan kata sandi"]')!.click());
    assert.equal(password.type, "text");
    assert.equal(password.value, "example-password");
    assert.equal(password.autocomplete, "new-password");
  } finally { await act(() => root.unmount()); globalThis.FormData = previousFormData; }
});
