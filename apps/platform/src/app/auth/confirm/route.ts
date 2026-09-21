import { NextRequest, NextResponse } from "next/server";
import { createAuthServer } from "@/lib/auth/server";
import { safeAuthDestination } from "@/lib/auth/validation";

export async function GET(request: NextRequest) {
  const tokenHash = request.nextUrl.searchParams.get("token_hash");
  const type = request.nextUrl.searchParams.get("type");
  const client = await createAuthServer();
  if (client && tokenHash && (type === "signup" || type === "recovery")) {
    try {
      const { error } = await client.auth.verifyOtp({ token_hash: tokenHash, type });
      if (!error) return NextResponse.redirect(new URL(type === "recovery" ? "/reset-password" : safeAuthDestination(request.nextUrl.searchParams.get("next")), request.url), { headers: { "Cache-Control": "private, no-store" } });
    } catch { /* Expired and invalid tokens share one recoverable error. */ }
  }
  return NextResponse.redirect(new URL("/login?error=callback", request.url), { headers: { "Cache-Control": "private, no-store" } });
}
