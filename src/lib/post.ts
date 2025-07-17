import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { PostContent } from "@/types";

export const getPosts = async (): Promise<PostContent[]> => {
  const { data, error } = await supabaseAdmin
    .from<"posts", PostContent>("posts")
    .select("*")
    .order("id", { ascending: false });

  if (error) {
    console.error("Supabase fetch error:", error);
    return [];
  }
  return data || [];
};
