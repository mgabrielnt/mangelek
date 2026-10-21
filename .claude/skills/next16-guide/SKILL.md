---
name: next16-guide
description: Cara menulis kode Next.js 16 dan React 19 di repo Mangelek - membaca docs lokal Next 16, pola Server/Client Component, route group, dan perintah tes/typecheck apps/platform.
user-invocable: false
---
# Next.js 16 di Mangelek

- Versi: next 16.3.x, react 19.2, TypeScript 7 (lihat `apps/platform/package.json`). API bisa berbeda dari data latih.
- Sebelum memakai API Next (routing, caching, metadata, middleware/proxy, server actions, image), cari di
  `node_modules/next/dist/docs/` (Grep nama API), baca bagian yang relevan saja. Ikuti peringatan deprecation.
- Repo memakai `src/proxy.ts` (bukan middleware.ts lama): cek docs sebelum mengubahnya.
- Server Component bawaan. `"use client"` hanya untuk komponen yang butuh state/efek/event; jaga sekecil mungkin.
- Route group `(marketing)`, `(auth)`, `(dashboard)`, `(admin)`, `(commerce)` bukan proteksi: otorisasi di server.
- Browser hanya boleh mengimpor `@saas/contracts`, `@saas/ui`, `@saas/themes`, `@saas/site-renderer`.
- Tes: `pnpm --filter @saas/platform test` (node --test + jsdom, pola `apps/platform/tests/*.test.tsx`).
- Typecheck: `pnpm --filter @saas/platform typecheck`. Build: `pnpm --filter @saas/platform build`.
- Blok `nextjs-agent-rules` di `apps/platform/AGENTS.md` ditulis ulang oleh `next dev`; biarkan.
