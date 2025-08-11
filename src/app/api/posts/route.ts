// app/api/posts/route.ts
import { Client } from "pg";
import { NextResponse } from "next/server";

// GET: 全求人取得
export async function GET() {
  const client = new Client({
    connectionString: process.env.SUPABASE_DB_URL,
    ssl: { rejectUnauthorized: false },
  });

  try {
    await client.connect();

    // 最新順で取得
    const result = await client.query("SELECT * FROM posts ORDER BY id DESC");

    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("DB fetch error:", error);
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 });
  } finally {
    await client.end();
  }
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

    const client = new Client({
      connectionString: process.env.SUPABASE_DB_URL, // Supabaseの接続文字列
      ssl: { rejectUnauthorized: false }, // SupabaseはSSL必須
    });

    await client.connect();
    const result = await client.query(
      'INSERT INTO posts (title, salary, "jobCategory") VALUES ($1, $2, $3) RETURNING *',
      [title, salary, jobCategory]
    );
    await client.end();

    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (err) {
    console.error("Unexpected error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
