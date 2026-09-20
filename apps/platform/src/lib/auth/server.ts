import "server-only";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { authConfig } from "./config";

export async function createAuthServer() {
  const config = authConfig();
  if (!config) return null;
  const store = await cookies();
  return createServerClient(config.url, config.key, {
    cookies: {
      getAll: () => store.getAll(),
      setAll: (values) => {
        try { values.forEach(({ name, value, options }) => store.set(name, value, options)); }
        catch { /* Server Component cookies are refreshed by proxy. */ }
      },
    },
  });
}

export async function getVerifiedUser() {
  const client = await createAuthServer();
  if (!client) return null;
  try {
    const { data, error } = await client.auth.getUser();
    return error ? null : data.user;
  } catch { return null; }
}
