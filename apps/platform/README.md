# @saas/platform

Frontend marketing dan platform SaaS berbasis Next.js + React + TypeScript.

## Runtime
- Node.js 24 LTS
- pnpm 12
- Next.js 16.3 Active LTS
- React 19.2
- TypeScript 7

## Menjalankan
1. Dari root: `corepack enable`
2. `pnpm install`
3. `pnpm dev:platform`
4. Buka `http://localhost:3000`

## Quality gate
- `pnpm typecheck:platform`
- `pnpm build:platform`

Homepage berada di `src/app/(marketing)/page.tsx`.
Komponen khusus homepage berada di `src/components/home`.
CSS dipisah per tanggung jawab agar file kecil dan mudah dirawat.
