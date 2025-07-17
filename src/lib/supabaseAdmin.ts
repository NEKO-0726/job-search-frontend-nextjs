// lib/supabaseAdmin.ts
import { createClient } from "@supabase/supabase-js";

export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!, // Project URL
  process.env.SUPABASE_SERVICE_ROLE_KEY! // Service Role Key（サーバー専用）
);
