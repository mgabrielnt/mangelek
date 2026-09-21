# Home and subscription refinement — 2026-09-21

User correction supersedes the previous opaque Home navbar. Preserve Home imagery, content, carousel behavior, two live demos, commerce pricing and provider boundaries.

THESIS: Browsing stays uninterrupted; account information stays clear.
OWN-WORLD: Existing Manrope, ink/white and quiet green commerce surfaces. Apple-design material guidance supplies a floating translucent navigation layer, with solid reduced-transparency fallback.
STORY: Explore the full-width template rail, navigate a stable mega-menu, and inspect subscription status and payment history.
FIRST VIEWPORT: Home starts with a transparent full-width header over the existing hero. After 48px scroll it floats centered with a 1360px maximum, 16px corners, 20px blur and 88% white material. Subscription uses a title, compact section navigation, split status/plan summary and payment history below; phone layout stacks.
FORM: Keep existing semantics and native links. Glass surface materializes with opacity/scale over 200ms; reduced motion removes it. Hover may cross the navbar gap; mouse click does not undo hover-open. Escape/outside focus still close. No invented orders or active status.
FINISH: Desktop and phone evidence, regression tests, independent review and scoped documentation. Hydration evidence from user contains injected fdprocessedid attributes; do not suppress hydration warnings globally. html declares data-scroll-behavior="smooth" per Next.js guidance.

The carousel's internal 1600px clipping boundary is removed. Neighbour slides may peek at physical viewport edges; dragging, arrows and category selection still bring every card fully into view.

Finish: independent fresh review **ship**, no material fixes. Eight valid desktop/phone captures, production build, 28 tests and final TypeScript check passed. Authenticated states remain source/unit-tested only; live provider/payment and physical-device QA are not claimed.
