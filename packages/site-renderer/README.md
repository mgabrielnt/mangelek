# @saas/site-renderer

Renderer bersama untuk preview dan website publik.

Implemented: `@saas/site-renderer` exports `SiteRenderer`, shared by the local editor canvas and read-only preview. It renders validated plain-text documents and raster images, with no database or application imports. The host currently supplies `template-demo.css` and local font/image assets. Public hostname resolution and immutable published-snapshot loading in `apps/sites` remain unimplemented.
Lihat docs/planning/implementation.md dan docs/architecture/boundaries.md.
