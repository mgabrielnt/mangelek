import { isUuid, MAX_CLOUD_DOCUMENT_BYTES, parseDraftPatch, type CloudDraft, type CloudDocument } from "@saas/contracts/cloud-document";

export type DraftResult = { status: 200; draft: CloudDraft } | { status: 403 | 404 | 409 | 422 | 429 | 503; code: string };
export type DraftGateway = { execute: (actor: string, site: string, correlation: string, patch?: { document: CloudDocument; etag: string }) => Promise<DraftResult> };
const headers = { "Cache-Control": "private, no-store", "X-Robots-Tag": "noindex, nofollow", Vary: "Cookie, Authorization" };
const messages: Record<string, string> = { revision_conflict: "Draft berubah. Unduh perubahan Anda, lalu muat revisi terbaru.", forbidden: "Langganan aktif diperlukan untuk menyimpan perubahan.", not_found: "Website tidak ditemukan.", unavailable: "Draft cloud belum tersedia. Coba lagi setelah layanan terhubung.", invalid_document: "Dokumen atau referensi media tidak valid.", rate_limited: "Terlalu banyak penyimpanan. Coba lagi sebentar." };
export async function handleCloudDraft(request: Request, site: string, dependencies: { actor: () => Promise<string | null>; gateway: () => DraftGateway | null }) {
  const correlation = crypto.randomUUID();
  const fail = (status: number, code: string, message = messages[code] ?? "Permintaan tidak dapat diproses.") => Response.json({ code, message, retryable: status === 503 || status === 429, correlation_id: correlation }, { status, headers: { ...headers, "X-Correlation-ID": correlation, ...(status === 429 ? { "Retry-After": "2" } : {}) } });
  try {
    const actor = await dependencies.actor();
    if (!actor) return fail(401, "unauthorized", "Masuk kembali untuk membuka draft website Anda.");
    if (!isUuid(site)) return fail(422, "invalid_site", "ID website tidak valid.");
    if (request.method !== "GET" && request.method !== "PATCH") return fail(405, "method_not_allowed");
    let patch: { document: CloudDocument; etag: string } | undefined;
    if (request.method === "PATCH") {
      // Cookie-authenticated browser mutations must originate from this application.
      if (request.headers.has("cookie") && request.headers.get("origin") !== new URL(request.url).origin) return fail(403, "invalid_origin", "Muat ulang editor dari Mangelek.");
      const etag = request.headers.get("if-match");
      if (!etag || !/^"[0-9a-f-]{36}"$/i.test(etag)) return fail(422, "missing_revision", "Muat revisi terbaru sebelum menyimpan.");
      if (request.headers.get("content-type")?.split(";")[0]?.trim() !== "application/json") return fail(422, "invalid_document");
      let document: CloudDocument;
      try {
        const reader = request.body?.getReader(); if (!reader) return fail(422, "invalid_document");
        let size = 0; const chunks: Uint8Array[] = [];
        while (true) { const { done, value } = await reader.read(); if (done) break; size += value.byteLength; if (size > MAX_CLOUD_DOCUMENT_BYTES + 64) { await reader.cancel(); return fail(422, "payload_too_large", "Dokumen terlalu besar."); } chunks.push(value); }
        const bytes = new Uint8Array(size); let offset = 0; for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.length; }
        document = parseDraftPatch(JSON.parse(new TextDecoder("utf-8", { fatal: true }).decode(bytes)));
      } catch (error) { return fail(422, "invalid_document", error instanceof Error ? error.message : messages.invalid_document); }
      patch = { document, etag };
    }
    const gateway = dependencies.gateway(); if (!gateway) return fail(503, "unavailable");
    const result = await gateway.execute(actor, site, correlation, patch);
    if (result.status !== 200) return fail(result.status, result.code);
    return Response.json(result.draft, { headers: { ...headers, ETag: result.draft.etag, "X-Correlation-ID": correlation } });
  } catch { return fail(503, "unavailable"); }
}
