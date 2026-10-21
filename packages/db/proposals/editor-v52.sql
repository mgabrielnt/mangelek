-- Apply ONLY after the reviewed v5.2 base schema, RLS and provisioning migration.
-- Deliberately not in migrations/: the existing billing_orders prototype is not
-- the v5.2 orders/subscription_periods schema. Never manufacture entitlements here.
begin;
create or replace function public.editor_draft_v52(
  p_actor uuid, p_site uuid, p_correlation text,
  p_document jsonb default null, p_etag text default null
) returns jsonb language plpgsql security definer set search_path = '' as $$
declare
  site_row public.sites;
  revision_row public.site_revisions;
  tenant_status text;
  next_revision bigint;
  asset uuid;
  collection_name text;
begin
  -- Same site lock for every writer; stale saves cannot silently overwrite.
  select s.* into site_row from public.sites s
    join public.memberships m on m.tenant_id = s.tenant_id
    where s.id = p_site and m.user_id = p_actor and m.role = 'owner'
      and s.deleted_at is null and s.status <> 'deleted'
    for update of s;
  if not found then return jsonb_build_object('status',404,'code','not_found'); end if;
  perform 1 from public.memberships where tenant_id = site_row.tenant_id and user_id = p_actor and role = 'owner' for share;
  if not found then return jsonb_build_object('status',404,'code','not_found'); end if;
  select status into tenant_status from public.tenants where id = site_row.tenant_id for share;
  if tenant_status in ('deleting','deleted') then return jsonb_build_object('status',404,'code','not_found'); end if;
  select * into revision_row from public.site_revisions
    where site_id = p_site and tenant_id = site_row.tenant_id order by revision_no desc limit 1;
  if not found then return jsonb_build_object('status',404,'code','not_found'); end if;
  if p_document is not null then
    if tenant_status <> 'active' or site_row.status not in ('ready','published') then return jsonb_build_object('status',403,'code','forbidden'); end if;
    -- A paid period, not a browser flag or billing_orders prototype, grants writes.
    perform 1 from public.subscriptions s
      join public.subscription_periods p on p.subscription_id = s.id and p.tenant_id = s.tenant_id
      join public.order_lines l on l.id = p.order_line_id and l.tenant_id = p.tenant_id
      join public.orders o on o.id = l.order_id and o.tenant_id = l.tenant_id
      where s.tenant_id = site_row.tenant_id and s.status = 'active'
        and p.starts_at <= now() and p.ends_at > now()
        and l.kind = 'subscription' and o.status = 'paid'
      for share of s, p, l, o;
    if not found then return jsonb_build_object('status',403,'code','forbidden'); end if;
    if p_etag is distinct from ('"' || revision_row.id::text || '"') then return jsonb_build_object('status',409,'code','revision_conflict'); end if;
    if revision_row.created_at > now() - interval '1 second' then return jsonb_build_object('status',429,'code','rate_limited'); end if;
    -- Full per-block schema validation is performed by the server-only API.
    if p_document ? 'cms_snapshot' or (p_document->>'schema_version') is distinct from '1'
       or jsonb_typeof(p_document->'pages') is distinct from 'array'
       or octet_length(p_document::text) > 1100000 then return jsonb_build_object('status',422,'code','invalid_document'); end if;
    if jsonb_array_length(p_document->'pages') not between 1 and 20 then return jsonb_build_object('status',422,'code','invalid_document'); end if;
    for asset in select distinct (b->'props'->>'asset_id')::uuid
      from jsonb_array_elements(p_document->'pages') p,
           jsonb_array_elements(p->'blocks') b where b->'props' ? 'asset_id'
    loop
      perform 1 from public.media_assets where id=asset and site_id=p_site
        and tenant_id=site_row.tenant_id and status='ready' and delete_after is null for share;
      if not found then return jsonb_build_object('status',422,'code','invalid_document'); end if;
    end loop;
    for collection_name in select distinct b->'props'->>'collection_key'
      from jsonb_array_elements(p_document->'pages') p, jsonb_array_elements(p->'blocks') b
      where b->'props' ? 'collection_key'
    loop
      perform 1 from public.cms_collections where site_id=p_site and tenant_id=site_row.tenant_id and key=collection_name for share;
      if not found then return jsonb_build_object('status',422,'code','invalid_document'); end if;
    end loop;
    next_revision := revision_row.revision_no + 1;
    insert into public.site_revisions (id,tenant_id,site_id,revision_no,schema_version,document,content_hash,created_by,created_at)
      values(gen_random_uuid(),site_row.tenant_id,p_site,next_revision,1,p_document,
        encode(sha256(convert_to(p_document::text,'UTF8')),'hex'),p_actor,now()) returning * into revision_row;
    insert into public.revision_assets(id,tenant_id,site_id,revision_id,media_asset_id,created_at)
      select gen_random_uuid(),site_row.tenant_id,p_site,revision_row.id,asset_id,now()
      from (select distinct (b->'props'->>'asset_id')::uuid as asset_id
        from jsonb_array_elements(p_document->'pages') p,jsonb_array_elements(p->'blocks') b
        where b->'props' ? 'asset_id') assets;
    insert into public.audit_events(id,tenant_id,actor_ref,action,object_type,object_id,outcome,correlation_id,metadata_redacted,created_at)
      values(gen_random_uuid(),site_row.tenant_id,p_actor::text,'draft.saved','site_revision',revision_row.id::text,'success',p_correlation,jsonb_build_object('revision_no',next_revision),now());
  end if;
  return jsonb_build_object('status',200,'draft',jsonb_build_object(
    'revision_id',revision_row.id,'revision_no',revision_row.revision_no,
    'etag','"' || revision_row.id::text || '"','document',revision_row.document,'updated_at',revision_row.created_at));
end; $$;
revoke all on function public.editor_draft_v52(uuid,uuid,text,jsonb,text) from public,anon,authenticated;
grant execute on function public.editor_draft_v52(uuid,uuid,text,jsonb,text) to service_role;
commit;
