import { createBrowserClient } from "@supabase/ssr";
import { authConfig, authUnavailableMessage } from "./config";

export function createAuthClient() {
  const config = authConfig();
  if (!config) throw new Error(authUnavailableMessage);
  return createBrowserClient(config.url, config.key);
}
