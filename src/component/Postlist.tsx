// import { PostContent } from "@/types";
import { PostContent } from "@/types";
import Post from "./Post";
import Sidebar from "./Sidebar";

// //SSRでデータを取得するための関数
// const getPosts = async (): Promise<PostContent[]> => {
//   console.log("NEXT_PUBLIC_API_URL:", process.env.NEXT_PUBLIC_API_URL);
//   try {
//     const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts`, {
//       cache: "no-store",
//     });
//     if (!res.ok) {
//       throw new Error("Failed to fetch posts");
//     }

//     const data: PostContent[] = await res.json();
//     return data;
//   } catch (error) {
//     console.error("Error fetching posts with fetch:", error);
//     throw new Error("Failed to fetch posts");
//   }
// };

type Props = {
  initialPosts: PostContent[];
};

const PostList = async ({ initialPosts }: Props) => {
  return (
    <div className="flex">
      <Sidebar />
      <Post initialPosts={initialPosts} />
    </div>
  );
};

export default PostList;
