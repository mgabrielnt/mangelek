# Website Editor: implementation and architecture handoff

Implemented 2026-09-21. Route `/editor?template=restaurant` or `service`.

## Available now

- Edit business identity, section headings/body, hero image/alt text/button, collection items.
- Six palettes and three font packs from the existing catalog.
- Add, reorder, duplicate, hide and remove sections; keep at least one visible section.
- Undo/redo; desktop and phone iframe preview; read-only preview mode.
- Explicit device-local save, recovery on reload, JSON download/import with confirmation, unsaved-navigation warning, validation and storage failure messages.
- Local drafts are separate by template, not by account or tenant. They are accessible to anyone using the same browser profile. This is a local editor workspace, not an authenticated tenant dashboard. Do not store sensitive customer information in the sample draft.

## Boundaries implemented

`apps/platform` owns editor interaction, browser storage, upload controls and local preview messaging.

`packages/contracts` owns the versioned document shape and import validation. `packages/themes` owns catalog metadata and initial template content. `packages/site-renderer` owns the common React renderer used by editing and read-only preview. Packages do not import application source or server secrets. Existing template routes re-export the shared catalog, preserving their behavior.

The renderer accepts a validated document, never arbitrary HTML. Uploads accept bounded raster data URLs; SVG/script/external image URLs are rejected. Preview messages verify both same origin and parent/frame identity. No draft is persisted to the server, encoded in a shareable URL, or exposed by public hostname resolution.

## Required before cloud editing and publication

1. **Apply and validate the v5.2 data model.** The Sept 22 Drive/Notion plan is now retrieved and archived. Follow `../planning/editor-v5.2-alignment.md`; the canonical schema replaces the old missing-ERD assumption. The existing billing_orders prototype is not that schema. The draft RPC proposal is not an applied migration.
2. **Supabase project and environment configuration.** Follow `auth-setup.md`; configure Google OAuth if required. Configure secrets locally or in the deployment secret store, never in chat or client code. Confirm the production/staging hostnames.
3. **Site provisioning contract.** A verified payment must map to an authorized tenant/site and entitlement. Billing order IDs alone are not site ownership. Specify site creation, trial/edit rights, expired-subscription behavior, and manual activation handoff.
4. **Cloud draft persistence.** Implement server authorization for every read/write, tenant isolation/RLS, validated document size/version, optimistic concurrency revision checks, conflict recovery and audit logs. Preserve local draft export until migration into an authorized site succeeds. Never silently attach a shared-browser draft to a signed-in account.
5. **Media storage.** Choose bucket/provider, tenant-scoped object paths, server-validated MIME/signature/size and quota, signed upload/read policy, re-encoding and cleanup of unused media. Replace embedded local raster data with authorized media references. Define retention and recovery rules.
6. **Publication adapter.** Implement immutable validated document snapshots, atomic publication pointer/outbox, rollback, cache keys containing site ID and publication version, and entitlement enforcement. Connect `apps/sites` to the same renderer. Public routing must resolve verified hostnames and read published snapshots only; private draft preview needs server authorization and no shared/public caching.
7. **Operations and acceptance.** Approve hosting/deployment adapter, domain/DNS ownership flow, backup/restore, logging, rate limits and quotas. Test cross-tenant denial, expired access, concurrent edits, malformed media/content, publish/rollback and end-to-end theme→edit→publish→lead on staging.

No live database migration, provider setup, upload bucket, public deployment, or payment was performed. Do not label cloud persistence or publication ready on the strength of local draft tests.

## 23 September 2026 update

See [v5.2 alignment](../planning/editor-v5.2-alignment.md) for current source authority, API groundwork, schema differences and activation prerequisites. Local editor saves now detect newer drafts and offer download/load recovery. Cloud API is feature-gated and not connected to the legacy local UI. No cross-device or private preview acceptance is claimed.
