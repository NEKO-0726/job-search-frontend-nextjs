import PostList from "@/component/Postlist";

export const dynamic = "force-dynamic";

export default async function Home() {
  return (
    <>
      <PostList />
    </>
  );
}
