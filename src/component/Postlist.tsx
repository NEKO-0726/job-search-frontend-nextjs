import { PostContent } from "@/types";
import Post from "./Post";
import Sidebar from "./Sidebar";

//SSRでデータを取得するための関数
const getPosts = async (): Promise<PostContent[]> => {
  try {
    const res = await fetch("/api/posts");
    if (!res.ok) {
      throw new Error("Failed to fetch posts");
    }

    const data: PostContent[] = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching posts with fetch:", error);
    throw new Error("Failed to fetch posts");
  }
};

const PostList = async () => {
  const initialPosts = await getPosts();
  return (
    <div className="flex">
      <Sidebar />
      <Post initialPosts={initialPosts} />
    </div>
  );
};

export default PostList;
