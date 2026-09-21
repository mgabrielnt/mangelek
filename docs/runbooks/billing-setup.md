# Billing setup

The checkout UI and Midtrans hosted-payment adapter are implemented. Payments are disabled by default. No real payment or database migration was executed during implementation.

## Configure sandbox

1. Configure Supabase authentication using the existing auth runbook. Apply `packages/db/migrations/20260920_billing.sql` to that project's database using the Supabase SQL editor or the project's migration pipeline.
2. Set server environment variables from `apps/platform/.env.example`: `SUPABASE_SERVICE_ROLE_KEY`, `MIDTRANS_SERVER_KEY`, `APP_URL`, `MIDTRANS_ENVIRONMENT=sandbox`, and `BILLING_ENABLED=true`. Keep secret keys server-only. The public Supabase URL and anonymous key must also be configured for sign-in.
3. In Midtrans, set the HTTPS payment notification URL to `<APP_URL>/api/billing/notification`. Use a publicly reachable staging origin; localhost cannot receive provider notifications. The server supplies the finish URL for each order.
4. Restart the application and test with a verified staging account and Midtrans sandbox data.

## Prices and behavior

- Monthly: Rp200,000 for one month. Yearly: Rp2,400,000 for twelve months. No annual discount or automatic renewal.
- Exactly two purchasable live demos: `service` and `restaurant`. Palette/font selections persist through preview, checkout, and authentication redirects.
- Prices and user ownership are checked on the server. RLS restricts order reads to their owner; only the service role can write.
- Signed notifications trigger an authenticated status lookup at Midtrans. URL query parameters never mark an order paid. Duplicate notifications do not extend the expiry date.
- A stable request ID prevents repeated submits from creating a second order in the same checkout session. If the provider request has an uncertain outcome, use the order status link before starting a new checkout. Refreshing the page creates a new client request ID.
- Paid records track a subscription period. Website provisioning, CMS delivery, refunds, and renewals are not automated by this change; activation and renewal require the Mangelek team.

## Required staging verification before production

Exercise paid, pending, expired, denied, refund, duplicate notification, invalid signature, wrong amount, cross-account access, concurrent submit, and lost provider response scenarios. Verify RLS using a second account. Confirm enabled payment methods in the merchant dashboard. These provider/database integration checks remain unexecuted without credentials.

Only after staging passes, configure production credentials, `MIDTRANS_ENVIRONMENT=production`, and an HTTPS `APP_URL`. Configure the production notification URL separately. Never mix sandbox and production keys.
