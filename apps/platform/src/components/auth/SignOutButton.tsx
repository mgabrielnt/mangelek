"use client";
import { useState } from "react";
import { createAuthClient } from "@/lib/auth/client";

export function SignOutButton() {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  return <><button type="button" className="authTextButton" disabled={pending} onClick={async () => {
    setPending(true); setError("");
    try {
      const result = await createAuthClient().auth.signOut({ scope: "local" });
      if (result.error) throw result.error;
      window.location.assign("/login");
    } catch { setError("Belum dapat keluar. Periksa koneksi dan coba lagi."); setPending(false); }
  }}>{pending ? "Keluar…" : "Keluar dari akun"}</button><p className="authFieldError" role="alert">{error}</p></>;
}
