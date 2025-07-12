"use client";
import { PostContent } from "@/types";
import React, { useEffect, useState } from "react";

type Props = {
  initialPosts: PostContent[];
};

//CSRでデータを取得するためのコンポーネント
//初期値としてSSRで取得したデータを受け取る
//useEffectを使ってクライアントサイドでデータを取得し、
//状態を更新することで再レンダリングを行う
const Post = ({ initialPosts }: Props) => {
  const [posts, setPosts] = useState<PostContent[]>(initialPosts);

  const [selectedJobCategories, setSelectedJobCategories] = useState<string[]>(
    []
  );
  //求人絞り込み条件で選択された年収
  const [selectedSalary, setSelectedSalary] = useState<string>("");

  const [currentPage, setCurrentPage] = useState<number>(1);
  const tasksPerPage = 10;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/posts");
        if (!res.ok) throw new Error("Failed to fetch posts");

        const data = await res.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, []);

  useEffect(() => {
    const updateFilters = () => {
      // ローカルストレージから職業カテゴリを取得
      const storedJobCategories = localStorage.getItem("selectedJobCategories");
      if (storedJobCategories) {
        setSelectedJobCategories(JSON.parse(storedJobCategories));
      }

      // ローカルストレージから年収を取得
      const storedSalary = localStorage.getItem("selectedSalary");
      if (storedSalary) {
        setSelectedSalary(JSON.parse(storedSalary));
      }
    };
    // 初回マウント時とイベント発火時の両方で実行
    updateFilters();

    // カスタムイベントを監視
    window.addEventListener("jobFiltersChanged", updateFilters);

    // クリーンアップ
    return () => {
      window.removeEventListener("jobFiltersChanged", updateFilters);
    };
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedJobCategories, selectedSalary]); // カテゴリや年収が変更されたときにページを1に戻す

  // ページ番号をクリックした時、画面の上側へ
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const filteredPosts = posts.filter((post) => {
    const matchCategory =
      selectedJobCategories.length === 0 ||
      selectedJobCategories.includes(post.jobCategory);
    const matchSalary = selectedSalary === "" || post.salary >= selectedSalary;
    return matchCategory && matchSalary;
  });

  // フィルター後の表示範囲をスライス
  const indexOfLastPost = currentPage * tasksPerPage; //現在のページで表示する最後のインデックス。
  const indexOfFirstPost = indexOfLastPost - tasksPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost); //10件分のデータだけを取得
  const totalPages = Math.ceil(filteredPosts.length / tasksPerPage);

  // 前・次へ
  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  return (
    <>
      <main className="w-full max-w-[600px] px-5">
        <h2 className="pt-5 text-2xl font-semibold">求人一覧</h2>

        <p className="pt-2 pb-2">該当件数: {filteredPosts.length} 件</p>
        {currentPosts.map((post) => (
          <div
            key={post.id}
            className="border rounded-[5px] mb-5 px-5 pb-7 border-gray-300"
          >
            <h2 className="font-bold text-xl pt-2">{post.title}</h2>
            <p>カテゴリ：{post.jobCategory}</p>
            <p>年収:{post.salary}万円</p>
          </div>
        ))}

        {/* Pagination */}
        <div className="flex items-center gap-2 mt-4 justify-center">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className={`px-3 py-1 rounded border ${
              currentPage === 1
                ? "text-gray-300 border-gray-200"
                : "hover:bg-gray-100"
            }`}
          >
            ◀
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded border ${
                currentPage === i + 1
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 rounded border ${
              currentPage === totalPages
                ? "text-gray-300 border-gray-200"
                : "hover:bg-gray-100"
            }`}
          >
            ▶
          </button>
        </div>
      </main>
    </>
  );
};

export default Post;
