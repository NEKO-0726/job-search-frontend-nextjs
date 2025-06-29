import PostList from "@/component/Postlist";
import { getPosts } from "@/lib/post";

export default async function Home() {
  const posts = await getPosts(); // SSRでデータ取得
  return (
    <>
      <PostList initialPosts={posts} />
    </>
  );
}
