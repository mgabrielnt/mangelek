# Mangelek scroll story — 12 September 2026

## Intent

Make section 2 wrap continuously in either direction. Connect image and text
motion to page scrolling, and add an Aceternity-inspired timeline to section 4.
This follow-up supersedes the previous native rail and one-time reveal decisions.
The user's new section 4 request expands the previously preserved Fey area.

## Experience

- Section 2: six original cards form a continuous carousel with a centered selection.
- Drag, touch, arrows, category buttons, and horizontal wheel gestures select cards.
- Left/right, Home, and End keys work within the carousel; dialogs retain their keys.
- Vertical wheel scrolling stays native. Images and headings respond to page progress.
- Section 3 continues the story with scroll-linked headings and the platform preview.
- Section 4 introduces three steps: Temukan, Bentuk, Tumbuh.
- A growing line connects sticky text to layered visuals in ivory, sage, and charcoal.
- Fey Cards close the timeline with a restrained scroll zoom before the contact section.
- Fey entry starts in view; card interactions also support focus and touch.

## Implementation

- Pin embla-carousel-react to stable 8.6.0; update only its lockfile entries.
- Embla repositions original slides. No clones or duplicate dialog IDs are introduced.
- Limit the rail to 1600px so six cards still satisfy looping geometry on wide screens.
- Embla controls slide transforms; decorative transforms stay on inner card elements.
- useScroll and MotionValues update styles without React state updates every frame.
- Separate gallery/wheel hooks, timeline primitives, journey data, visuals, and styles.
- Replace the unused Reveal helper with a shared ScrollScene wrapper.
- Use overflow: clip on the page and timeline section so sticky elements can work.
- Keep native document scrolling, responsive image sizing, and reduced-motion support.
- Reduced motion removes decorative transforms and disables the extended sticky finale.
- Every changed TS/TSX/CSS file stays below 70 lines.

## Primary references

The visual composition and restrained palette are project-specific design judgments.

- [Aceternity Timeline](https://ui.aceternity.com/components/timeline): sticky text and scroll-progress beam.
- [Motion scroll animations](https://motion.dev/docs/react-scroll-animations): useScroll and transform mapping.
- [Embla stable v8](https://www.embla-carousel.com/docs/v8): carousel looping and input handling.
- [Motion accessibility](https://motion.dev/docs/react-accessibility): reduced-motion preferences.

## Verification

- TypeScript validation and production build passed.
- Prerendered HTML checked for six unique cards/dialogs and three ordered timeline steps.
- Loop geometry checked against the installed Embla implementation across viewport widths.
- Diff whitespace and source-file length checks passed.
- Header and hero source files are unchanged.
- Browser visual, gesture, and device-performance checks remain unverified because
  the environment's browser policy blocked local preview access.
