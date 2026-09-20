# Pricing redesign

The user requested minimal, premium styling with React Bits Pricing 14 as the reference, preserving functionality and improving responsive behavior and accessibility. Implementation is original React/CSS. The reference's specification-and-summary layout is adapted to Mangelek's single pre-launch package; optional paid modules and invented prices are not introduced.

## Delivered

Grouped included features and explicit separate domain costs sit beside a quiet subscription summary. Mobile places the summary and theme CTA first. The existing FAQ and configuration-driven billing remain. Manrope regular and semibold are self-hosted with the OFL license in public/fonts; no runtime font request is required.

| Before | After | Why |
| --- | --- | --- |
| Dark purchase half and undifferentiated feature list | Light specification with separate summary | Clarify inclusions and the next step |
| Flat feature list | Existing data groups displayed | Improve scanning without new claims |
| Domain cost only in FAQ | Domain cost also visible beside inclusions | Expose an important purchase detail |
| Hover translation on CTA | 160ms press feedback, gated hover, no keyboard motion | Immediate, restrained interaction |
| Shared billing radio name | Stable instance-specific useId name | Avoid cross-instance radio interference |

## Skill passes

frontend-design and Impeccable craft: hierarchy, compact palette, reference-led composition.
emil-design-eng, animate, apple-design: interruptible press feedback and FAQ state indication, reduced motion, stable monetary values.
mobile-native: capability-gated hover, touch-action, active feedback, responsive stacking, safe-area padding.
web-design-guidelines and Impeccable audit/polish: semantics, focus, native controls, overflow, clean diff, bounded visual review.

## Audit

| Dimension | Score / 4 | Evidence / limitation |
| --- | --- | --- |
| Accessibility | 3 | Keyboard FAQ and skip link verified; native radios and live prices; no assistive-technology or full WCAG certification |
| Performance | 3 | Static server components except billing; local fonts; no new runtime library; no benchmark recorded |
| Theming | 3 | Scoped light palette and color-scheme; dark theme not part of this page |
| Responsive | 3 | Browser checks at 320, 390, 768 and 1440px show no horizontal overflow; physical touch device not tested |
| Implementation integrity | 4 | Detector returned []; commercial data preserved; original implementation |

13 existing tests pass, including unpublished-price and full annual-billing cases. Browser verified FAQ Enter activation, skip-link focus to main-content, font application, and correct anchor destinations. Desktop/mobile screenshots are retained in apps/platform/.impeccable/review. Independent finish reviewer disposition: ship, conditional on final post-font TypeScript validation; the production build subsequently completed TypeScript successfully. No physical phone QA or configured-price screenshot coverage claimed.
