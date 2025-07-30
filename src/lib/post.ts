import { PostContent } from "@/types";

export const getPosts = async (): Promise<PostContent[]> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/posts?select=*&order=id.desc`, {
    headers: {
      apikey: process.env.SUPABASE_SERVICE_ROLE_KEY!,
      Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY!}`,
    },
  });

  if (!res.ok) {
    console.error("Supabase fetch error:", await res.text());
    return [];
  }

  const data: PostContent[] = await res.json();
  return data;
};
