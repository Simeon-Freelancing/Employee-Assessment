import { createClient } from "@supabase/supabase-js";
// The Expo CLI will automatically inject the values for these prefixed variables
const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;
if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  // Keep this lightweight — in production surface a clear error
  console.warn(
    "Supabase credentials not found. Set SUPABASE_URL and SUPABASE_ANON_KEY in environment."
  );
}

export const supabase = createClient(SUPABASE_URL || "", SUPABASE_ANON_KEY || "");
