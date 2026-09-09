# Frontend Runtime Decision

Status: dipilih untuk implementasi homepage marketing pada 2026-09-09.

- Node.js 24.20.0 LTS untuk runtime produksi.
- pnpm 12.4.0 sebagai package manager workspace.
- Next.js 16.3.3 Active LTS.
- React / React DOM 19.2.7.
- TypeScript 7.0.2.
- CSS native tanpa UI framework untuk mengurangi dependency dan runtime JS.
- App Router dan React Server Components dipakai secara default.
- Client component hanya untuk interaksi yang memerlukan browser.

## Prinsip performa
- Aset visual lokal memakai WebP; hero dirender lewat `next/image`.
- Sprite CSS menggabungkan preview statis untuk mengurangi request jaringan.
- Tidak ada carousel, icon, animation library, atau state manager tambahan.
- Horizontal carousel memakai native CSS scroll-snap.
- Pointer animation dinonaktifkan saat `prefers-reduced-motion`.
- Homepage server-rendered; hanya gallery dan waiter tracker yang hydrate.

## Validasi
`pnpm install`, `pnpm typecheck:platform`, lalu `pnpm build:platform`.

Lockfile harus dihasilkan oleh pnpm asli dan dikomit setelah install berhasil;
jangan membuat `pnpm-lock.yaml` secara manual.
