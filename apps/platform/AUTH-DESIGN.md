# Authentication surface

Mode: Operate. Routes: /login, /signup, /forgot-password, /reset-password, /account.

## Direction contract
THESIS: A quiet entrance to the website workspace; real account actions lead, brand illustration supports.
OWN-WORLD: Extend Mangelek's Manrope, charcoal text and white space with the existing website-editor image and its olive tones. White form field, restrained outlines, no floating decorative controls.
STORY: Choose Google or email, understand validation, recover access, reach a verified account. No invented auth success or dashboard data.
FIRST VIEWPORT: Brand and home link above a two-column view. A large existing editor illustration with concise product copy at left; a 400px form with a Google action and clearly labeled fields at right. On mobile only the focused form remains, with brand and home navigation.
FORM: Brief-pinned Apple restraint and existing Mangelek visual assets. Code-led continuation of the user's approved workflow. Native forms, password manager support, stable loading controls, semantic status messages.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Motion
Feedback: 160ms interruptible press scale. Entry: one restrained opacity/translate reveal, no per-field delays. Keyboard operations remain immediate; reduced motion disables nonessential transforms. No recurring decorative loops or artificial delays.

## Asset provenance
Reused public/images/marketing/features/website-editor.webp from the existing repository, unchanged; illustration rather than a live product screenshot. Local Manrope files and their existing OFL license are reused.

## Integration boundary
Supabase Auth adapter selected as a working implementation default because identity is a planned stub. Public project URL and publishable key configured via environment. Google client secret belongs in provider settings, never in the frontend. Live authentication requires user-owned provider configuration; no external account is created by this task.
