# Website Editor — 2026-09-21

Mode: Operate. User-directed code-led extension of Mangelek. Scope: appearance, text, images, page structure. Repository plan: choose template → edit CMS → publish. Original ERD and tenant/site provisioning are not implemented; this surface uses explicitly device-local drafts, with JSON backup/restore. It never claims online publication or cloud persistence.

THESIS: Select what you see, change it, and keep your work.
OWN-WORLD: Local Manrope, white/ink tools, olive selection, existing two demo designs and licensed imagery. The working website carries expression; tool chrome stays quiet.
STORY: Open a template draft, select a section, edit content/style, arrange sections, preview at real desktop/mobile widths, save or download a backup.
FIRST VIEWPORT: Compact document toolbar; section outline at left; large live website canvas in the center; contextual properties at right. On narrow screens, a persistent panel selector reveals structure/content/design beneath a compact canvas.
FORM: Native inputs and buttons. Immediate content changes; restrained 150ms press feedback, no typing or keyboard animation. Undo/redo, local storage errors, image validation, import validation, visible focus, reduced motion, keyboard reordering, truthful save status.
FINISH: Test edits, reorder/undo, restore, invalid data/images, mobile overflow and browser persistence. Publish is explained as unavailable until site provisioning is connected; it is not simulated.

## Implemented scope

The editor uses the existing two templates, six palettes, and three font packs. The outline supports four section kinds (hero, about, collection, contact), at most 20 sections, and at least one visible section. Native contextual fields edit identity/content and bounded local raster images. Undo/redo, explicit local save, validated JSON backup/import confirmation, and unsaved-navigation feedback complete the local workflow.

The three-pane layout is 230px / flexible / 290px, narrowing at 1250px; at 1000px a panel selector shares the right pane; at 700px a 440px canvas sits above the active panel. Desktop content uses a minimum 960px layout scaled to fit; phone preview caps at 390px. Local Editor Manrope aliases the incumbent Manrope assets. Durable editor tokens and interactions extend `DESIGN.md` and `.impeccable/design.json` without replacing previous surfaces.

## Architecture and persistence boundary

`apps/platform` owns tools, browser persistence, and preview messaging. `packages/contracts` owns the versioned document and validation; `packages/themes` owns catalog/initial content; `packages/site-renderer` owns shared editing/read-only rendering. Packages do not import app source or secrets. The iframe checks origin and source identity. Rendering accepts validated data, not arbitrary HTML; custom image input accepts bounded PNG/JPEG/WebP data URLs, not SVG or arbitrary external URLs.

Local drafts are keyed by template and shared within the browser profile, without authenticated tenant isolation. Raster uploads are limited to 1,500,000 bytes; aggregate compact JSON is limited to 4,500,000 UTF-8 bytes before mutation. Save/export share the same compact serializer and import enforces the document limit. Capacity errors retain the previous usable draft. These are local safeguards, not a cloud quota or production media-validation claim.

The original ERD/role model and site provisioning contract remain missing. Cloud persistence, authorized tenant media, publication snapshots, verified hostname routing, and the `apps/sites` publication adapter require the handoff in `../../docs/runbooks/website-editor.md`. No online publication is simulated.

## Verification boundary

Four desktop/phone browser captures were accepted by the original reviewer. Its aggregate-capacity finding was corrected, and 36 tests passed. Final verdict and production-build confirmation are pending. Detector output contained one local font alias, three colors, and twelve font-size advisories against earlier documentation; these are evidence for scoped documentation, not permission to widen other surfaces or canonize every compact detail. No physical-device, live database/provider, tenant-isolation, or public publication acceptance is claimed.
