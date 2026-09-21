# @saas/contracts

Implemented: `@saas/contracts/website` exports the version-1 local website document, section types, aggregate size limit and import validation. It is browser-safe and imports neither application nor database code.

Other planned request, response, event and job contracts remain scaffolds; the website validator currently uses explicit TypeScript checks, not Zod.

See docs/planning/implementation.md, docs/architecture/boundaries.md and docs/runbooks/website-editor.md.
