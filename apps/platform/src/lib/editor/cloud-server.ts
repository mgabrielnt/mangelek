import "server-only";
import { createClient } from "@supabase/supabase-js";
import { createAuthServer } from "@/lib/auth/server";
import type { DraftGateway, DraftResult } from "./cloud-api";
export async function verifiedDraftActor(request: Request) {
  const client = await createAuthServer(); if (!client) return null;
  const bearer = request.headers.get("authorization");
  if (bearer && !/^Bearer \S+$/i.test(bearer)) return null;
  const { data, error } = await client.auth.getUser(bearer ? bearer.slice(7) : undefined);
  return error ? null : data.user?.id ?? null;
}
export function cloudDraftGateway(): DraftGateway | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL, key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (process.env.EDITOR_CLOUD_ENABLED !== "true" || !url || !key) return null;
  const db = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
  return { async execute(actor, site, correlation, patch) {
    const { data, error } = await db.rpc("editor_draft_v52", { p_actor: actor, p_site: site, p_correlation: correlation, p_document: patch?.document ?? null, p_etag: patch?.etag ?? null });
    if (error || !data || ![200, 403, 404, 409, 422, 429].includes(data.status)) return { status: 503, code: "unavailable" };
    return data as DraftResult;
  } };
}
