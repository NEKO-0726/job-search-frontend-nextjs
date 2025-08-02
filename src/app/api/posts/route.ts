// app/api/posts/route.ts
import { NextResponse } from "next/server";

// GET: 全求人取得
export async function GET() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/posts?select=*&order=id.desc`, {
    headers: {
      apikey: process.env.SUPABASE_SERVICE_ROLE_KEY!,
      Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY!}`,
    },
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("Supabase fetch error:", text);
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 });
  }

  const posts = await res.json();
  return NextResponse.json(posts);
}

// POST: 新しい求人を追加
// export async function POST(req: Request) {
//   try {
//     const { title, salary, jobCategory } = await req.json();

//     const { data: newPost, error } = await supabaseAdmin
//       .from("posts")
//       .insert([{ title, salary, jobCategory }])
//       .select()
//       .single();

//     if (error) {
//       console.error("Error creating post:", error);
//       return NextResponse.json({ error: "Failed to create post" }, { status: 500 });
//     }

//     return NextResponse.json(newPost, { status: 201 });
//   } catch (err) {
//     console.error("Unexpected error:", err);
//     return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
//   }
// }

// POST: 新しい求人を追加
export async function POST(req: Request) {
  try {
    const { title, salary, jobCategory } = await req.json();

    const newPost = {
      title,
      salary,
      jobCategory,
    };

    const res = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/posts`, {
      method: "POST",
      headers: {
        apikey: process.env.SUPABASE_SERVICE_ROLE_KEY!,
        Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY!}`,
        "Content-Type": "application/json",
        Prefer: "return=representation", // 挿入後のデータを返す設定
      },
      body: JSON.stringify([newPost]), // Supabase RESTは配列で受け取る
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("Error creating post:", text);
      return NextResponse.json({ error: "Failed to create post" }, { status: 500 });
    }

    const createdPosts = await res.json();
    return NextResponse.json(createdPosts[0], { status: 201 }); // .single() 相当
  } catch (err) {
    console.error("Unexpected error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
