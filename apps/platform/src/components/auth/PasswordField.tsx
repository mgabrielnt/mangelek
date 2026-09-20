"use client";

import { useState } from "react";
import { AuthIcon } from "./AuthIcon";

export function PasswordField({ isNew, error, disabled }: { isNew: boolean; error?: string | undefined; disabled: boolean }) {
  const [visible, setVisible] = useState(false);
  return <div className="authField">
    <label htmlFor="password">{isNew ? "Buat kata sandi" : "Kata sandi"}</label>
    <div className="authPassword">
      <input id="password" name="password" type={visible ? "text" : "password"} autoComplete={isNew ? "new-password" : "current-password"}
        required minLength={isNew ? 8 : undefined} maxLength={128} disabled={disabled} aria-invalid={Boolean(error)} aria-describedby={error ? "password-error" : isNew ? "password-hint" : undefined} />
      <button type="button" className="authReveal" aria-label={visible ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"}
        aria-pressed={visible} onClick={() => setVisible(!visible)} disabled={disabled}><AuthIcon name={visible ? "eye-off" : "eye"} /></button>
    </div>
    {error ? <p id="password-error" className="authFieldError">{error}</p> : isNew && <p id="password-hint" className="authHint">Minimal 8 karakter. Gunakan kata sandi yang unik.</p>}
  </div>;
}
