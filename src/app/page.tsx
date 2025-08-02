export const dynamic = "force-dynamic";
// このページは常にサーバーサイドでレンダリングされる
import PostList from "@/component/Postlist";

const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://job-search-frontend-nextjs.vercel.app/"
    : "http://localhost:3000";

export default async function Home() {
  const res = await fetch(`${baseUrl}/api/posts`, {
    cache: "no-store",
  });
  const posts = await res.json();
  return (
    <>
      <PostList initialPosts={posts} />
    </>
  );
}
