# Preview, checkout, and Home navigation

User-directed code-led extension/replacement, 2026-09-20. Priority P0: complete template inspection and purchase flow. Supersedes previous concept-only detail and no-checkout constraints; keeps Rp200,000 monthly baseline. Annual period is twelve months at Rp2,400,000 without an invented discount. Midtrans hosted checkout adapter, disabled until configured; missing configuration must never imply a paid subscription.

THESIS: Try a design, make it yours, understand the bill. Operate mode for customizer/checkout; Home navbar supports discovery.
OWN-WORLD: Mangelek Manrope, white/ink interface. Squarespace reference supplies full-width navigation, generous mega-menu, large browser canvas beside a narrow style inspector. No Squarespace branding/copy/assets.
STORY: Catalog → live template → palettes/font packs/device preview → checkout with preserved design → provider checkout → independently verified status.
FIRST VIEWPORT: Wide working demo inside quiet gray workspace, compact browser toolbar, inspector with title, choose-template CTA, palette swatches and font specimen buttons. Preview content is original fictional business demo, labelled. Checkout is a clear two-column form and fixed-price summary, stacked on mobile.
FORM: URL encodes template/palette/font. Demo lives in same-origin iframe so mobile viewport truly changes responsive layout. Keyboard-native controls, visible focus, no scroll traps. Full demo opens separately. Typography and color updates happen immediately without losing scroll. Single restrained press feedback; reduced motion removes it. Home navigation keeps working Escape/outside close and responsive menu.
FINISH: Bounded desktop/mobile checks, security/price tests, finish reviewer and scoped design documentation. No unverified payment success or live-provider claim.

Exactly two live demos: Service Modern and Restaurant Premium. Four remaining categories retain their concept detail pages.

Images: original preview compositions use two Unsplash photographs (provenance file under public/images/templates) and self-hosted OFL fonts from google/fonts. Existing concept imagery remains on Home. Not a published customer website; no invented testimonials or customer metrics.

Implementation boundary: no automatic renewal. Monthly Rp200,000; annual Rp2,400,000 for twelve months; domain separate. Supabase migration and environment configuration are prerequisites for payment activation. Midtrans is disabled without configuration; no migration, real payment, or provider/database verification was performed. Paid state is verified server-side; website/CMS provisioning and renewal remain manual. Operational setup and outstanding staging checks: `../../docs/runbooks/billing-setup.md`.

Finish disposition: ship for the final verdict pass on the single icon-consistency fix; this was not a fresh review of the entire UI. A single inconsistent-icon finding was fixed with shared decorative BlogIcon SVGs. Final production build and all 24 tests passed. Seven final captures in repository-root `.impeccable/review/commerce`: preview-desktop, preview-mobile, service-desktop, checkout-desktop, checkout-mobile, navbar-desktop, navbar-mobile. Subscription/status were source-reviewed; phone captures use browser emulation. The detector identified only new-system colors, font aliases, sizes, and radii absent from prior documentation; these are now captured in DESIGN.md and its existing sidecar. The verdict does not establish live-payment readiness.


2026-09-21 amendment: Home header and subscription presentation are superseded by `HOME-SUBSCRIPTION-FIXES.md`: transparent-to-floating glass, stable menu crossing, viewport-wide rail, and a responsive subscription overview/history/help layout. Prior demo/payment boundaries remain unchanged.
