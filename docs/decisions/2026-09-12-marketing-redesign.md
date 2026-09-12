# Mangelek marketing redesign — 12 September 2026

Follow-up: [scroll story](2026-09-12-scroll-story.md) updates carousel and motion decisions.

## Scope

Redesign template discovery, the platform feature presentation, contact, and footer.
Preserve the existing header, hero, waiter interaction, assets, and full-page Fey Cards.
Keep the current Next.js / React / Motion / Three.js stack and lockfile.

## Design choices

- Warm ivory, charcoal, muted green, and champagne connect to the existing assets.
- Short Indonesian headlines and a restrained serif accent establish hierarchy.
- Six category cards use a native scroll-snap rail, without triplicated content.
- Feature selection uses accessible tabs with one visible preview at a time.
- Contact retains the globe, with a visible SVG fallback if WebGL is unavailable.
- The new footer links to actual page sections instead of unimplemented routes.

## Motion and performance

- New reveal animations run once using IntersectionObserver and Web Animations.
- Hover and feature transitions primarily animate transform and opacity.
- Reduced-motion settings disable new decorative motion and globe auto-rotation.
- Globe rendering and its internal animation pause offscreen and in hidden tabs.
- Globe teardown disposes controls, renderer, listeners, observers, and globe layers.
- Category and feature images use next/image with responsive sizes and lazy loading.
- No new production dependencies. New and changed source files are under 70 lines.

## Organization

- components/home/templates: gallery, card/preview components, and rail hook.
- components/home/features: feature section, tab selection, and visual preview.
- components/home/shared: shared introduction and reveal behavior.
- components/home/contact and footer: contact form and closing navigation.
- components/ui/aceternity/github-globe: globe construction, rendering, and fallback.
- styles: separate files for each section, component group, and responsive rules.

## Research

Reviewed current official references; the palette and composition are design judgments.

- [Aceternity carousel](https://ui.aceternity.com/components/apple-cards-carousel): focused previews.
- [Aceternity Fey Cards](https://ui.aceternity.com/labs/fey-cards): retained existing section.
- [Linear](https://linear.app/): product-led presentation and restrained visual hierarchy.
- [web.dev animation guidance](https://web.dev/articles/animations-guide): transform/opacity and avoiding layout-heavy motion.
- [Motion accessibility](https://motion.dev/docs/react-accessibility): respecting reduced motion.

## Validation and limits

- TypeScript validation and production build passed locally.
- No duplicate rendered IDs; tab aria-controls resolve to rendered panels.
- Diff whitespace check passed; protected sections verified unchanged.
- Browser visual and interaction tests could not be completed: local preview access was blocked by browser policy.
- Responsive styles are implemented, but device-level rendering and performance are not certified.
- The existing contact form has no delivery API. It now copies a validated request summary and explicitly confirms that nothing has been sent.
- Pre-existing placeholder header routes and Fey behavior are outside this change.
