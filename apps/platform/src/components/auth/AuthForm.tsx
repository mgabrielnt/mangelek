"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { AuthIcon, GoogleIcon } from "./AuthIcon";
import { PasswordField } from "./PasswordField";
import { signInWithGoogle, submitAuth } from "@/lib/auth/operations";
import { validateAuth, type AuthErrors, type AuthMode } from "@/lib/auth/validation";

const copy = {
  login: { title: "Selamat datang kembali.", description: "Masuk untuk melanjutkan cerita bisnis Anda.", action: "Masuk", busy: "Memeriksa akun…" },
  signup: { title: "Mulai cerita Anda.", description: "Buat akun untuk memulai website bisnis Anda.", action: "Buat akun", busy: "Membuat akun…" },
  forgot: { title: "Lupa kata sandi?", description: "Masukkan email akun Anda. Kami akan mengirim tautan untuk mengatur ulang kata sandi.", action: "Kirim tautan pemulihan", busy: "Mengirim tautan…" },
  reset: { title: "Kata sandi baru.", description: "Pilih kata sandi yang unik untuk akun Mangelek Anda.", action: "Simpan kata sandi", busy: "Menyimpan…" },
};

export function AuthForm({ mode, initialError = "", next = "/account" }: { mode: AuthMode; initialError?: string; next?: string }) {
  const [errors, setErrors] = useState<AuthErrors>({});
  const [error, setError] = useState(initialError);
  const [message, setMessage] = useState("");
  const [pending, setPending] = useState<"email" | "google" | null>(null);
  const busy = useRef(false);
  const status = useRef<HTMLDivElement>(null);
  const details = copy[mode];
  const full = mode === "login" || mode === "signup";
  useEffect(() => { if (error || message) status.current?.focus(); }, [error, message]);
  // Returning from a cancelled OAuth navigation must leave controls usable.
  useEffect(() => {
    const reset = () => { busy.current = false; setPending(null); };
    window.addEventListener("pageshow", reset);
    return () => window.removeEventListener("pageshow", reset);
  }, []);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy.current) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    const values = { name: String(data.get("name") ?? "").trim(), email: String(data.get("email") ?? "").trim(), password: String(data.get("password") ?? "") };
    const nextErrors = validateAuth(mode, values);
    setErrors(nextErrors); setError("");
    const first = Object.keys(nextErrors)[0];
    if (first) { (form.elements.namedItem(first) as HTMLInputElement)?.focus(); return; }
    busy.current = true; setPending("email");
    const result = await submitAuth(mode, values, next);
    if (result.destination) { window.location.assign(result.destination); return; }
    if (result.error) setError(result.error);
    if (result.message) { form.reset(); setMessage(result.message); }
    busy.current = false; setPending(null);
  }

  async function google() {
    if (busy.current) return;
    busy.current = true; setPending("google"); setError("");
    const result = await signInWithGoogle(next);
    if (result.error) { setError(result.error); busy.current = false; setPending(null); }
  }

  return <div className="authFormWrap">
    {full && <nav className="authModeNav" aria-label="Akses akun">
      <Link href={`/login?next=${encodeURIComponent(next)}`} aria-current={mode === "login" ? "page" : undefined}>Masuk</Link>
      <Link href={`/signup?next=${encodeURIComponent(next)}`} aria-current={mode === "signup" ? "page" : undefined}>Daftar</Link>
    </nav>}
    <div className="authIntro"><h1 id="auth-title">{message ? "Periksa email Anda." : details.title}</h1><p>{message ? "Satu langkah lagi untuk melanjutkan." : details.description}</p></div>
    <div ref={status} tabIndex={-1} className={`authStatus ${error ? "isError" : message ? "isSuccess" : ""}`} role={error ? "alert" : "status"} aria-live={error ? "assertive" : "polite"}>
      {(error || message) && <><AuthIcon name={error ? "lock" : "check"} /><p>{error || message}</p></>}
    </div>
    {message ? <div className="authConfirmation"><Link className="authPrimary" href={`/login?next=${encodeURIComponent(next)}`}>Kembali ke halaman masuk</Link><button className="authTextButton" type="button" onClick={() => setMessage("")}>Gunakan email lain</button></div> : <>
      {full && <><button className="authGoogle" type="button" onClick={google} disabled={Boolean(pending)}><GoogleIcon />{pending === "google" ? "Menghubungkan ke Google…" : "Lanjutkan dengan Google"}</button><div className="authDivider"><span>atau dengan email</span></div></>}
      <form onSubmit={onSubmit} noValidate aria-busy={Boolean(pending)}>
        {mode === "signup" && <div className="authField"><label htmlFor="name">Nama lengkap</label><input id="name" name="name" autoComplete="name" maxLength={100} required disabled={Boolean(pending)} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "name-error" : undefined} placeholder="Nama Anda" />{errors.name && <p className="authFieldError" id="name-error">{errors.name}</p>}</div>}
        {mode !== "reset" && <div className="authField"><label htmlFor="email">Email</label><input id="email" name="email" type="email" inputMode="email" autoComplete="email" autoCapitalize="none" spellCheck={false} maxLength={254} required disabled={Boolean(pending)} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "email-error" : undefined} placeholder="nama@bisnis.com" />{errors.email && <p className="authFieldError" id="email-error">{errors.email}</p>}</div>}
        {mode !== "forgot" && <PasswordField isNew={mode !== "login"} error={errors.password} disabled={Boolean(pending)} />}
        {mode === "login" && <div className="authRecovery"><Link href="/forgot-password">Lupa kata sandi?</Link></div>}
        <button className="authPrimary" type="submit" disabled={Boolean(pending)}>{pending === "email" ? details.busy : details.action}<AuthIcon name="arrow" /></button>
      </form>
      <p className="authSwitch">{mode === "login" ? <>Belum punya akun? <Link href={`/signup?next=${encodeURIComponent(next)}`}>Daftar sekarang</Link></> : mode === "signup" ? <>Sudah punya akun? <Link href={`/login?next=${encodeURIComponent(next)}`}>Masuk</Link></> : <Link href={`/login?next=${encodeURIComponent(next)}`}>Kembali ke halaman masuk</Link>}</p>
    </>}
    {mode === "signup" && <p className="authFinePrint">Membuat akun tidak memulai langganan berbayar.<br /><Link href="/pricing">Lihat paket dan harga</Link></p>}
  </div>;
}
