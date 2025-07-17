// app/api/posts/route.ts
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

// GET: 全求人取得
export async function GET() {
  try {
    const { data: posts, error } = await supabaseAdmin
      .from("posts")
      .select("*")
      .order("id", { ascending: false });

    if (error) {
      console.error("Error fetching posts:", error);
      return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 });
    }

    return NextResponse.json(posts);
  } catch (err) {
    console.error("Unexpected error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// POST: 新しい求人を追加
export async function POST(req: Request) {
  try {
    const { title, salary, jobCategory } = await req.json();

    const { data: newPost, error } = await supabaseAdmin
      .from("posts")
      .insert([{ title, salary, jobCategory }])
      .select()
      .single();

    if (error) {
      console.error("Error creating post:", error);
      return NextResponse.json({ error: "Failed to create post" }, { status: 500 });
    }

    return NextResponse.json(newPost, { status: 201 });
  } catch (err) {
    console.error("Unexpected error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
