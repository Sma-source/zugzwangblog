"use server";

import { createSupabaseServerClient } from "../supabase";

export const readUsers = async () => {
  const supabase = await createSupabaseServerClient();
  return supabase
    .from("users")
    .select("*")
    .order("created_at", { ascending: true });
};
