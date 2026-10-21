import { handleCloudDraft } from "@/lib/editor/cloud-api";
import { cloudDraftGateway, verifiedDraftActor } from "@/lib/editor/cloud-server";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
async function handle(request: Request, context: { params: Promise<{ id: string }> }) {
  return handleCloudDraft(request, (await context.params).id, { actor: () => verifiedDraftActor(request), gateway: cloudDraftGateway });
}
export { handle as GET, handle as PATCH };
