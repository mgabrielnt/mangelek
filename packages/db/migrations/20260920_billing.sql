-- Apply to the same Supabase project as authentication before BILLING_ENABLED=true.
create table if not exists public.billing_orders (
 id text primary key,
 user_id uuid not null references auth.users(id),
 template text not null check(template in ('service','restaurant')),
 palette text not null check(palette in ('forest','sand','ocean','rose','mono','olive')),
 font text not null check(font in ('editorial','modern','expressive')),
 period text not null check(period in ('monthly','yearly')),
 amount integer not null,
 business text not null,
 status text not null default 'pending' check(status in ('pending','paid','failed','refunded')),
 payment_url text,
 created_at timestamptz not null default now(),
 paid_at timestamptz,
 expires_at timestamptz,
 constraint billing_price check((period='monthly' and amount=200000) or (period='yearly' and amount=2400000))
);
create index if not exists billing_orders_user_created on public.billing_orders(user_id,created_at desc);
alter table public.billing_orders enable row level security;
revoke all on public.billing_orders from anon,authenticated;
grant select on public.billing_orders to authenticated;
create policy "Read own orders" on public.billing_orders for select to authenticated using(auth.uid()=user_id);
-- Only verified provider status can reach this service-role-only function.
-- Locking and paid_at make duplicate notifications idempotent.
create or replace function public.apply_billing_status(p_order_id text,p_status text) returns void
language plpgsql security definer set search_path=public as $$
declare current_order public.billing_orders;
begin
 if p_status not in ('pending','paid','failed','refunded') then raise exception 'invalid status'; end if;
 select * into current_order from public.billing_orders where id=p_order_id for update;
 if not found then raise exception 'unknown order'; end if;
 if current_order.status='refunded' then return; end if;
 if current_order.status='paid' and p_status in ('pending','failed') then return; end if;
 if current_order.status='failed' and p_status='pending' then return; end if;
 update public.billing_orders set status=p_status,
 paid_at=case when p_status='paid' then coalesce(paid_at,now()) else paid_at end,
 expires_at=case when p_status='paid' then coalesce(expires_at,now()+case when period='yearly' then interval '12 months' else interval '1 month' end) else expires_at end
 where id=p_order_id;
end; $$;
revoke all on function public.apply_billing_status(text,text) from public,anon,authenticated;
grant execute on function public.apply_billing_status(text,text) to service_role;

grant all on public.billing_orders to service_role;
