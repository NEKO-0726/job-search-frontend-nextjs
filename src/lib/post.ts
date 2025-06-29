import { prisma } from "@/lib/prisma";
import { PostContent } from "@/types";

export const getPosts = async (): Promise<PostContent[]> => {
  return await prisma.post.findMany({
    orderBy: { id: "desc" },
  });
};
