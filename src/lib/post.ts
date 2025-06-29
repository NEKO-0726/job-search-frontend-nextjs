import { prisma } from "@/lib/prisma";
import { PostContent } from "@/types";

export const getPosts = async (): Promise<PostContent[]> => {
  try {
    return await prisma.post.findMany({ orderBy: { id: "desc" } });
  } catch (error) {
    console.error("DB fetch error:", error);
    return []; // DBが落ちていても空配列で継続
  }
};
