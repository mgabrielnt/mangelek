# Authentication setup

Implemented routes: `/login`, `/signup`, `/forgot-password`, `/reset-password`, `/account`, `/auth/callback`, `/auth/confirm`.
Supabase owns user storage, password hashing, verification email delivery, rate limits and Google identity. The application uses the official `@supabase/ssr` and `@supabase/supabase-js` SDKs. No service-role key is needed.

## Configure the project

1. Use a Supabase project owned by Mangelek. Copy `apps/platform/.env.example` to `apps/platform/.env.local` and set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` from the project's Connect settings. Do not place a secret/service-role key here.
2. In Supabase Authentication > URL Configuration, set the real Site URL. For local development use `http://localhost:3000`. Allow these exact application redirect URLs for each deployment origin:
   - `http://localhost:3000/auth/callback`
   - `http://localhost:3000/auth/callback?next=/reset-password`
3. Enable Email provider and email confirmations. Set a minimum password length of 8 or stronger. Configure project rate limits and production SMTP before exposing signup publicly; Supabase applies these controls to direct Auth API calls too. UI validation is not a substitute for provider policy.
4. Enable Google provider. In Google Cloud create a Web application OAuth client, configure the consent screen and test users as applicable, and add the exact Supabase callback URL shown in its provider settings (`https://<project-ref>.supabase.co/auth/v1/callback`) as an authorized redirect URI. Store Google's client ID and client secret in Supabase provider settings, not in Next.js environment or browser code. This uses Google for identity, not Gmail inbox access.
5. Restart the development server after changing environment variables. Public environment values must be present when building the production application.

## Email templates

For confirmation across browsers/devices, use Supabase token-hash templates rather than requiring a PKCE verifier from the browser where signup began. Configure template links as follows:

Confirm signup:
`{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=signup`

Reset password:
`{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=recovery`

Use the proper Site URL per environment. The default PKCE `emailRedirectTo` path is also implemented, but its verifier requires the originating browser. Token types are explicitly allowlisted; arbitrary callback destinations are not accepted.

## Verification before enabling publicly

- Register a test account, follow its confirmation email, and verify `/account` shows the real authenticated email.
- Sign out, sign in with password, verify incorrect credentials and expired links, and reset the password using a received email.
- Use a configured Google test account, verify provider cancellation and successful return to `/account`.
- Verify session refresh after expiry, sign-out behavior, and denial of `/account` without a valid server-verified user.
- Verify email delivery, provider password policy, abuse protection and consent-screen configuration with the deployment's actual origin.

Without environment configuration, the pages remain reviewable and auth actions show a recoverable service-unavailable message. They never create fake accounts or claim successful login. No live provider tests were possible during implementation because project configuration was not supplied.

## Runtime notes

`src/proxy.ts` refreshes cookies only on account/auth UI routes. Protected pages call `getUser()` on the server; they never trust raw session cookies or client-side UI state. Callback responses and session-related responses are private/no-store. The account page is an authenticated entry point with links to existing content; it does not invent a working CMS dashboard, tenancy, checkout, or account entitlements.

`skipLibCheck` is enabled in the platform TS config because Supabase Auth 2.116.0's WebAuthn declaration conflicts with the project's TypeScript 7 DOM declaration for `PublicKeyCredential.toJSON()`. Application source remains strictly checked; no vendor files are patched. Revisit this compatibility workaround after the upstream declarations align.

References: [Supabase SSR](https://supabase.com/docs/guides/auth/server-side/creating-a-client), [Google provider](https://supabase.com/docs/guides/auth/social-login/auth-google), [password authentication](https://supabase.com/docs/guides/auth/passwords).
