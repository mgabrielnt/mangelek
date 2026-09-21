# Website Editor verification — 2026-09-21

- Production build and TypeScript passed after workspace extraction and aggregate-capacity fix. All 36 tests passed.
- Browser: edited heading appears in iframe, explicit save survives reload, reordering/undo, palette change/undo, add/remove/undo, read-only preview removes edit controls. Replaced hero image using existing service.webp through local file picker and restored it through undo.
- Fresh final page: error/warning console entries empty. Earlier HMR messages arose during workspace package installation, not on final load.
- Desktop 1440x960: document dimensions equal viewport; initial hidden-input overflow fixed by containing positioned inputs in panels. User-width1786 and mobile390 inspected. Mobile has no horizontal document overflow. No physical-device QA.
- Four valid final captures: desktop.png, user-1786.png, design.png, mobile.png. Initial malformed resize captures were replaced and opened before review.
- Detector ran once: one local Manrope alias, three color additions, twelve size additions relative to incumbent docs. No other families.
- Independent review initially returned one material capacity fix. change() now rejects aggregate UTF-8 payloads over4.5MB before committing, preserving last valid document; upload and duplicate follow this path. Save and export share compact serialization; boundary/combined-image/duplication tests pass. Verdict pass pending.
- Original ERD, cloud site identity and publication pipeline remain unavailable. This stage is an explicitly local editor; server persistence, media bucket, public hostname rendering and publication are not claimed.
