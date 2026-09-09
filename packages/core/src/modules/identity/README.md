# identity

Identitas pengguna, sesi, integrasi autentikasi.

Status: direncanakan, belum diimplementasikan.
Tambahkan sesuai kebutuhan: identity.service.ts, identity.policy.ts,
identity.repository.ts, dan pengujian unit di dekat implementasi.
HTTP berada di apps/api; validasi bersama di packages/contracts;
schema tabel berada di packages/db. Jangan impor kode apps dari packages.