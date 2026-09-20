---
name: Mangelek Scoped Surfaces
description: Scoped visual systems for pricing, authentication, blogs, and templates; Home retains its own design authority.
colors:
  ink: "#20242a"
  muted: "#606872"
  line: "#dce1e6"
  porcelain: "#f7f8fa"
  white: "#ffffff"
  soft-fill: "#eef1f4"
  action-hover: "#39434d"
  focus: "#2463a0"
  check: "#435e50"
  status-dot: "#667582"
  selection: "#344b61"
  auth-story: "#e6e2d9"
  auth-story-ink: "#272d26"
  auth-story-muted: "#4e5349"
  auth-field-line: "#bac2cb"
  auth-error: "#a02c2c"
  auth-status-error-bg: "#fff0f0"
  auth-status-error-ink: "#912d2d"
  auth-status-success-bg: "#edf4ee"
  auth-status-success-ink: "#31583d"
  library-focus: "#52633c"
  library-selection: "#dce5c6"
  library-category-fill: "#edf0e7"
  library-category-ink: "#354128"
  library-category-hover: "#f1f3ed"
  blog-featured: "#f5f6f2"
  blog-cover: "#eef0eb"
  template-artwork: "#f2f3ef"
typography:
  library-display:
    fontFamily: "Manrope, sans-serif"
    fontSize: "clamp(36px, 4.3vw, 60px)"
    fontWeight: 600
    lineHeight: 1.12
    letterSpacing: "-.04em"
  blog-prose:
    fontFamily: "Manrope, sans-serif"
    fontSize: "17px"
    lineHeight: 1.85
  template-detail-heading:
    fontFamily: "Manrope, sans-serif"
    fontSize: "46px"
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: "-.04em"
  auth-heading:
    fontFamily: "Manrope, Arial, sans-serif"
    fontSize: "clamp(28px, 2.8vw, 36px)"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-.04em"
  auth-input:
    fontFamily: "Manrope, Arial, sans-serif"
    fontSize: "16px"
  display:
    fontFamily: "Manrope, Arial, Helvetica, sans-serif"
    fontSize: "clamp(34px, 4.6vw, 56px)"
    fontWeight: 600
    lineHeight: 1.12
    letterSpacing: "-.04em"
  headline:
    fontFamily: "Manrope, Arial, Helvetica, sans-serif"
    fontSize: "26px"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "-.03em"
  title:
    fontFamily: "Manrope, Arial, Helvetica, sans-serif"
    fontSize: "24px"
    fontWeight: 650
    lineHeight: 1.3
    letterSpacing: "-.03em"
  body:
    fontFamily: "Manrope, Arial, Helvetica, sans-serif"
    fontSize: "14px"
    lineHeight: 1.7
  label:
    fontFamily: "Manrope, Arial, Helvetica, sans-serif"
    fontSize: "12px"
    fontWeight: 550
    lineHeight: 1.5
rounded:
  button: "8px"
  icon: "10px"
  summary: "12px"
  plan: "16px"
  pill: "30px"
spacing:
  compact: "12px"
  small: "16px"
  mobile-panel: "20px"
  panel: "24px"
  plan: "32px"
  columns: "40px"
  section: "48px"
  wide: "64px"
components:
  library-category-selected:
    backgroundColor: "{colors.library-category-fill}"
    textColor: "{colors.library-category-ink}"
    rounded: "{rounded.button}"
    padding: "10px 15px"
  template-contact:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.white}"
    rounded: "{rounded.button}"
    padding: "12px 20px"
  auth-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.white}"
    rounded: "{rounded.icon}"
    padding: "12px 18px"
  auth-input:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    typography: "{typography.auth-input}"
    rounded: "{rounded.icon}"
    height: "50px"
    padding: "12px 14px"
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.white}"
    rounded: "{rounded.button}"
    padding: "12px 18px"
  button-primary-hover:
    backgroundColor: "{colors.action-hover}"
  button-secondary:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.button}"
    padding: "12px 18px"
  status:
    backgroundColor: "{colors.soft-fill}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "6px 10px"
  plan:
    backgroundColor: "{colors.white}"
    rounded: "{rounded.plan}"
    padding: "32px"
  summary:
    backgroundColor: "{colors.porcelain}"
    rounded: "{rounded.summary}"
    padding: "24px"
---

# Design System: Mangelek Scoped Surfaces

## Overview

**Creative North Star: "Minimal premium pricing"**

This document records the implemented **/pricing surface and the separately scoped authentication, Blogs, and Templates surfaces**. It does not replace Home's visual system or authorize applying these tokens to unrelated routes. The supplied React Bits Pricing 14 reference and minimal premium direction inform the restrained package specification and subscription summary. Existing unprefixed specifications below describe pricing unless authentication is explicitly named.

White space, quiet borders, compact feature rows, and a dark primary action establish hierarchy. Indonesian copy and the Mangelek wordmark anchor the page. Source authority is `src/styles/pricing/*.css`, `src/components/pricing`, and the pricing route; the page brief remains in `PRICING-DESIGN.md`.

**Key Characteristics:**

- A neutral, light surface with restrained functional color.
- A single package container and a softly tinted summary.
- Responsive ordering, visible keyboard focus, and native disclosures.

Finish review: ship. The final production build, post-font TypeScript check, static route generation, and 13 tests passed. Browser verification confirmed the local font family and skip-link focus. The reported desktop and mobile screenshot review found no material findings. Physical phone QA was not performed. These are bounded review observations, not a claim of comprehensive accessibility or device certification.

**Authentication — quiet workspace entrance.** `/login`, `/signup`, `/forgot-password`, `/reset-password`, and `/account` pair focused account actions with the existing editor illustration and olive tones. Authority: `src/styles/auth/*.css`, `src/components/auth`, and `AUTH-DESIGN.md`. Reuse the unchanged `public/images/marketing/features/website-editor.webp` illustration and existing local Manrope assets; the illustration is not a live product screenshot. Auth review corrected placeholder contrast to muted text (5.64:1 on white); pricing-only detector advisories are resolved through the explicit auth scope here. The 17 tests, production build, and TypeScript check passed. Live Supabase and Google authentication remains deferred until provider configuration is supplied; see `../../docs/runbooks/auth-setup.md`.

**Blogs and Templates extension.** `/blogs`, `/blogs/[slug]`, `/templates`, and `/templates/[slug]` extend the incumbent identity using local Manrope, white space, fine borders, and olive selection feedback. This is an ordinary scoped extension, not a new global visual direction. Source authority is `src/styles/blogs.css`, `src/styles/template-library.css`, the corresponding route/component folders, and the surface contracts in `BLOG-DESIGN.md` and `TEMPLATES-DESIGN.md`. Original pricing/authentication tokens and their scope remain intact. Review evidence is at repository-root `.impeccable/review/library`; the reported production build and 18 tests passed. Independent review identified template image cropping, corrected to contain the complete concept artwork. Desktop article and mobile template screenshots were also checked for this documentation pass; this is not physical-device QA.

## Colors

Ink is the primary action and text color. White and porcelain distinguish the page, plan, and summary; muted text and pale lines separate supporting information without a shadow. Soft fill supports status and secondary hover. Focus blue identifies keyboard focus and FAQ hover, subdued green marks included features, and the status dot uses a quiet gray. Selection has its own dark blue-gray fill.

**The Scope Rule.** Apply this palette inside /pricing; preserve other routes' existing visual authority.

**Authentication palette.** Auth independently uses ink, muted, line, white, focus, and selection values above through its `--auth-*` properties. `auth-*` frontmatter entries describe only its illustration panel, field borders, and feedback colors. Error and success also carry readable text and semantic status, rather than color alone.

**Library palette.** The blogs/templates wrapper independently shares ink, muted, line, and white. `library-*` names cover olive focus, text selection, selected categories, and category hover; `blog-*` fills belong to editorial illustrations and the featured panel; `template-artwork` frames the complete concept image. These additions do not replace pricing's blue focus or authentication feedback colors.

## Typography

Display and body use locally hosted Manrope with Arial, Helvetica, and sans-serif fallbacks. The pricing route loads regular (400) and semibold (600) TTF files using `next/font/local` with `display: swap`. CSS also requests 500, 550, 650, and 750; these are requested weights, not additional shipped font files.

The display role serves the hero. The headline role serves FAQ and pending price status; plan titles use the title role. Body copy is generally 14px, with 1.6–1.8 line height depending on context. Hero support text is 17px and becomes 15px on mobile. Supporting labels are 12–13px. Headings use balanced wrapping; hero support uses pretty wrapping. Configured monetary values use tabular numerals and wrap safely without value animation.

**Authentication typography:** local Manrope with Arial and sans-serif fallbacks. Form headings use auth-heading, with 32px at 900px and 29px at 420px; support copy is 14px/1.75, labels 13px/1.5 at weight 600, and inputs 16px. The story heading uses `clamp(30px, 3.2vw, 44px)` at weight 600 and line-height 1.15.

**Library typography:** local Manrope regular and semibold, loaded per route with swap. Use library-display for listing headings (38px on mobile), blog-prose for readable article text, and template-detail-heading for concept detail titles (36px at 900px). Article titles use `clamp(34px, 4.3vw, 56px)` with 1.18 line height. Search inputs remain 16px; category controls and navigation are 14px.

## Layout

Content, navigation, and footer share a centered maximum width of 1080px with 32px desktop side gutters. The hero is limited to 760px. The plan has a header divided from its body; the main grid pairs flexible details with a 360px summary and a 40px gap. The FAQ follows with a 72px top margin and a 1:1.5 column ratio.

At 820px and below, gutters become 20px, plan padding becomes 24px, summary width becomes 300px, and the main gap becomes 24px. At 680px and below, the plan stacks with summary first in source and visual order, navigation wraps, plan padding becomes 20px, and FAQ becomes one column. At 380px and below, plan and summary padding become 16px, navigation tightens, summary rows may wrap, and the footer copyright gets its own row.

Safe-area insets protect horizontal content and the footer. The page uses a minimum height of 100svh. Preserve flexible widths and wrapping instead of clipping overflow.

**Authentication layout:** a 1320px maximum shell with 24px safe-area-aware gutters, equal desktop columns, and a 400px maximum form. At 1100px the gap becomes 40px; at 900px the story is hidden and the form centers; at 420px gutters become 20px and the home link becomes an accessible icon target. Keep the form unboxed and preserve 100svh minimum height.

**Library layout:** centered 1160px maximum containers with 40px side gutters, reduced to 20px at 600px. Blog results use three columns, two at 900px, and one at 600px. Featured stories pair image and copy, then stack on mobile. Article reading layout pairs a 240px sticky contents column with prose capped at 68ch; at 900px the contents column becomes 190px, and at 600px it becomes an inline list above prose. Template listings use two columns, then one at 600px. Concept details use a 1.25:1 grid with sticky copy and become a mobile column with copy before artwork. Navigation wraps while retaining every destination.

## Elevation & Depth

The implemented pricing system has no shadows. Thin borders and the porcelain summary provide separation and depth. Buttons communicate interaction through immediate color change and a small press scale; cards do not lift.

Authentication is also shadow-free. The olive story panel and its image-edge gradients establish separation; the form remains on white.

Blogs and templates also remain shadow-free. Editorial fills and thin dividers establish grouping; template art itself supplies photographic depth without elevated card chrome.

## Shapes

The outer plan has the broadest rounded rectangle, the inset summary uses a smaller radius, and buttons are gently rounded. The plan icon sits in its own bordered square, shrinking from 44px to 36px on mobile. Status uses a pill with a small circular dot. Borders are 1px and use the line token.

Authentication uses 10px input/action corners, a 16px story panel, 8px feedback corners, and 1px field borders in auth-field-line.

Library images and featured panels use 12px corners; category buttons, search borders, and contact actions use 8px corners. Template previews contain the full artwork inside a 1.3 aspect-ratio frame; detail artwork uses a 2:3 frame. Editorial covers intentionally use cover cropping.

## Components

- **Actions:** Primary and secondary links have a minimum height of 48px, centered labels, and a 12px gap. Primary hover uses action-hover; secondary hover uses soft-fill. Active press scales to .98 through a 160ms `cubic-bezier(.23, 1, .32, 1)` transition. Hover styling is restricted to fine pointers that support hover.
- **Plan and summary:** Keep details and purchase information visually distinct using the border and inset surface. Preserve truthful pending-price presentation and existing destinations; this design does not introduce checkout or fictional selectable extras.
- **Status:** The dot and label communicate current launch/subscription status. It is static text, not an interactive control.
- **Navigation:** Visible text links have at least 44px height. The current route is underlined, and mobile wrapping retains all links. A focus-revealed skip link targets the main content.
- **FAQ:** Native `details` and `summary` provide disclosure behavior. Rows have a minimum height of 64px and thin dividers; the plus changes to minus with 160ms transform and opacity transitions. The icon is decorative.
- **Billing selector:** When multiple billing options exist, native radios inside a labeled fieldset provide selection. The selected segment uses ink and white. Segments have at least 44px height; updates use a polite atomic live region. The current pending state does not display fabricated options or prices.
- **Focus and reduced motion:** Focus uses a 2px blue outline with 5px offset, or 3px offset on billing segments. Focused action and FAQ icon transitions are immediate. Reduced motion removes animations, transitions, smooth scrolling, and press scaling within pricing. Touch targets use manipulation and suppress tap highlight while retaining visible keyboard focus.

**Authentication interactions:** Google and primary actions have a 50px minimum height; inputs are 50px tall and password reveal targets are 44px. Retain native autocomplete, associated error descriptions, first-invalid-field focus, pending labels and disabled controls, and focused semantic status messages. Focus is 2px blue with 4px offset (2px on inputs). Fine-pointer hover changes fill; pointer press scales to .98 over 160ms using `cubic-bezier(.23, 1, .32, 1)`. Keyboard focus cancels press transforms. A single 200ms opacity/6px entry transition has no field stagger; reduced motion removes transitions and transforms. Account content requires verified server identity and must not imply a CMS dashboard or paid subscription.

**Library interactions:** semantic category buttons expose pressed state, search fields have labels, result counts announce politely, and empty states offer reset. Query/category changes replace URL state through `q` and `kategori`; controls retain focus. Article cards are native links with linked contents and related guides on detail pages. Concept contact links prefill the existing contact form via `/?template=<id>#contact`; they do not install a theme. Targets are generally at least 44px, search fields 46px, and concept contact actions 48px. Focus uses library-focus with a 2px outline and 5px offset (3px around search). Fine-pointer hover translates arrows 4px over 180ms `cubic-bezier(.16,1,.3,1)`; reduced motion removes transitions. Template preview/detail images must retain `object-fit: contain`.

## Do's and Don'ts



- **Do** keep Blogs and Templates extensions scoped to their four route patterns and preserve complete concept artwork.
- **Don't** imply concept previews are installed themes or editorial illustrations are live product screenshots.

- **Do** keep pricing and authentication specifications scoped to their respective routes.
- **Do** preserve local typography, neutral surfaces, native controls, visible focus, and reduced-motion behavior.
- **Do** retain summary-first mobile ordering and wrapping navigation.
- **Don't** apply this page's composition or palette as a global Home redesign.
- **Don't** introduce decorative elevation, animated monetary values, or unverified pricing claims.
- **Don't** describe screenshot review as physical phone QA.

