// import { PostContent } from "@/types";
import { PostContent } from "@/types";
import Post from "./Post";
import Sidebar from "./Sidebar";

type Props = {
  initialPosts: PostContent[];
};

const PostList = ({ initialPosts }: Props) => {
  return (
    <div className="flex">
      <Sidebar />
      <Post initialPosts={initialPosts} />
    </div>
  );
};

export default PostList;
