# Verification — 2026-09-21

- Production build succeeded. 28 tests passed, including regression coverage for hover-open followed by mouse click, crossing the trigger/panel gap, scroll-state changes, and guest/active/expired/pending/unavailable subscription states.
- Final centering, narrow-phone CTA, and retry-link adjustments passed TypeScript checking.
- Browser: Home at the user's default 1786px width and phone at 390px. All screenshot files were opened and inspected. The carousel now measures left=0 and right=document width rather than clipping inside a 1600px frame.
- A mouse click on Products followed by Coba live preview successfully navigated to the restaurant template. Keyboard Enter and Escape also work. Mobile menu includes Langganan saya.
- At 320px, document scrollWidth305 equals available width305; the floating navbar stays within the viewport. Subscription also has no horizontal document overflow at this width.
- Fresh Home tab: error/warn logs empty, no fdprocessedid attributes, html data-scroll-behavior=smooth present. The user's pasted warning contains injected fdprocessedid attributes, absent from application source. No global hydration suppression was added; browser-extension interference cannot be repaired by application rendering.
- Guest subscription state visually verified. Other states are tested using fixed synthetic inputs, never exposed as real account data. Supabase/Midtrans credentials remain unavailable; no live payment or account changes were made.
- Detector ran once on changed material/subscription surfaces: only documented-system additions (three colors, eighteen font sizes), no other finding families.
