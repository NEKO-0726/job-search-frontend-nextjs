import { PostContent } from "@/types";
import Post from "./Post";
import Sidebar from "./Sidebar";
import apiClient from "@/lib/apiClient";

//SSRでデータを取得するための関数
const getPosts = async (): Promise<PostContent[]> => {
  try {
    const res = await apiClient.get<PostContent[]>("/posts");
    return res.data;
  } catch (error) {
    console.error("Error fetching posts with apiClient:", error);
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
