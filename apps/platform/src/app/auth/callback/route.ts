import { NextRequest, NextResponse } from "next/server";
import { createAuthServer } from "@/lib/auth/server";
import { safeAuthDestination } from "@/lib/auth/validation";

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  const client = await createAuthServer();
  const destination = safeAuthDestination(request.nextUrl.searchParams.get("next"));
  if (client && code) {
    try {
      const { error } = await client.auth.exchangeCodeForSession(code);
      if (!error) return NextResponse.redirect(new URL(destination, request.url), { headers: { "Cache-Control": "private, no-store" } });
    } catch { /* Return only a fixed public error, never provider details. */ }
  }
  return NextResponse.redirect(new URL("/login?error=callback", request.url), { headers: { "Cache-Control": "private, no-store" } });
}
