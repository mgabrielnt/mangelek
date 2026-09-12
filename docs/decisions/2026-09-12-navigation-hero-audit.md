# Navigation, hero, and footer audit — 12 September 2026

## Findings addressed

- Header dropdowns were hover-only and lacked click/keyboard dismissal behavior.
- Header links referenced unimplemented routes and a missing login anchor.
- The header changed shape during scrolling despite the requested consistent header.
- Hero had no h1, small mobile targets, raw full-resolution images, and animated left.
- Footer navigation and hierarchy needed a stronger close to the page.

## Changes

- Constant translucent navigation shell with Products/Support disclosure groups.
- Native buttons, expanded/control semantics, Escape and focus-return behavior.
- Mobile disclosure closes on navigation, outside interaction, focus exit, and resize.
- Move the banner outside main and add a keyboard skip link.
- Link only to existing sections; navigation content lives in data/navigation.ts.
- Introduce a concise h1 and CTA before the original shop/menu/waiter composition.
- Use next/image sizes/srcset for hero layers, with one high-priority background.
- Move the waiter using transform and a CSS variable; react to reduced motion immediately.
- On phones, provide six separate category links with 48px minimum height.
- Category links select matching carousel cards, including repeated hash navigation.
- Anchor the counter to the scene bottom, accounting for transparent image padding.
- Footer uses a clear closing CTA, grouped links, a wordmark, and back-to-top navigation.
- Keep footer rendering on the server; remove unused header and waiter implementations.
- Set contact field text to 16px across layouts to avoid small text on touch devices.
- Source, tests, and scripts remain below 70 lines per file.

## Verification

- pnpm --filter @saas/platform typecheck: passed.
- pnpm --filter @saas/platform build: passed.
- pnpm --filter @saas/platform test: 10 passed.
- Tests cover disclosure/focus/Escape, touch activation, breakpoint dismissal,
  reduced motion, category anchors, and repeated carousel wrapping.
- Carousel tests use simulated geometry at 320, 768, 1440, and 3840px.
- Prerendered HTML has one h1/main/banner/footer; IDs and ARIA references resolve.
- Every rendered navigation anchor points to an existing target.
- Hero image layers have responsive source sets and declared loading behavior.
- Existing workspace importers, package resolutions, and snapshots are preserved.
- Diff whitespace and source-file length checks passed.

## Performance scope and limits

- Initial script gzip total: 235,818 → 236,636 bytes (+818 bytes); 8 scripts in each build.
- These are build artifact sizes, not measured network transfer or Core Web Vitals.
- Production dependencies are unchanged. jsdom and tsx are development-only test tools.
- esbuild lifecycle scripts remain disabled; tests use its packaged native executable.
- Frozen installation passed in the available local workspace; full remote importer entries are preserved.
- Browser visual, touch-gesture, screen-reader, and real-device speed checks remain unverified.
- Browser policy previously blocked local preview; DOM tests do not replace those checks.
- The background PNG is preserved in the remote repository; its optimizer response was not benchmarked locally.
- The contact form still prepares a copyable request; delivery requires a separate backend.

## Primary references

- [WAI disclosure navigation](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/examples/disclosure-navigation/): semantics, focus, dismissal.
- [Next.js Image](https://nextjs.org/docs/app/api-reference/components/image): responsive sizing and loading priority.
- [web.dev responsive design](https://web.dev/articles/responsive-web-design-basics): fluid layouts and input-aware design.
- [WAI target size](https://www.w3.org/WAI/WCAG22/Understanding/target-size-enhanced.html): larger interactive targets.

The palette, typography, and composition are project-specific design judgments.
