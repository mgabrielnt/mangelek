# Verification — 2026-09-20

- Production build passed; final iframe hydration handshake also passed TypeScript checking.
- 24 automated tests passed, including six billing validation/redirect tests.
- Browser: palette and font update same-origin demo CSS without navigation; checkout preserves those choices; annual selection shows Rp2,400,000; empty submit focuses the name input; unconfigured payment displays an actionable error without contacting a provider.
- Desktop 1440px and phone 390px captures are adjacent. Customizer document had no horizontal overflow at 320px. Phone dimensions are browser emulation, not a physical-device test.
- Navbar mobile menu opens and Escape closes; desktop Products menu opens using keyboard Enter. Existing header behavior tests passed.
- Catalog shows six designs with exactly two live demos. The four others are explicitly concepts.
- HTTP: service and restaurant demo routes 200; company demo route 404. Checkout/subscription 200. Forged payment status query does not produce paid state. Missing-config billing POST returns 503.
- Midtrans/Supabase credentials absent: no migration or payment-provider integration test executed. No real payment, refund, deployment, or subscription purchase performed.
- Detector warnings concern new surface colors, sizes, radii, and font aliases absent from the previous design documentation; no separate primary anti-pattern families were reported.
