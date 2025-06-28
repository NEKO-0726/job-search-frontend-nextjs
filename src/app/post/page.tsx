"use client";
import React, { useState } from "react";
// import apiClient from "../../lib/apiClient";
import { useRouter } from "next/navigation";

const jobCategories: string[] = [
  "事務",
  "エンジニア",
  "営業",
  "デザイン",
  "マーケティング",
  "財務・経理",
  "人事",
  "カスタマーサポート",
  "製造",
  "医療・介護",
];

const Page = () => {
  //各求人の収入とタイトルと職業を管理するためのステート
  const [salaryText, setSalaryText] = useState<string>("");
  const [titleText, setTitleText] = useState<string>("");
  const [jobCategoryText, setJobCategoryText] = useState<string>("");

  const router = useRouter();

  const handleSubmit = async () => {
    if (!salaryText || !titleText || !jobCategoryText) {
      alert("全ての項目を入力してください。");
      return;
    }

    if (!/^[a-zA-Z0-9]+$/.test(salaryText)) {
      alert("年収は英数字のみで入力してください。");
      return;
    }

    // try {
    //   await apiClient.post("/post", {
    //     salary: salaryText,
    //     title: titleText,
    //     jobCategory: jobCategoryText,
    //   });
    // } catch (error) {
    //   console.error("Error posting job:", error);
    //   alert("求人の投稿中にエラーが発生しました。");
    // }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          salary: salaryText,
          title: titleText,
          jobCategory: jobCategoryText,
        }),
      });

      if (!res.ok) {
        throw new Error("投稿に失敗しました");
      }
    } catch (error) {
      console.error("Error posting job:", error);
      alert("求人の投稿中にエラーが発生しました。");
      return;
    }

    setSalaryText("");
    setTitleText("");
    setJobCategoryText("");
    //投稿が成功したら、トップページにリダイレクトする
    router.push("/");
  };

  return (
    <div className="pl-[20px]">
      <h2 className="pt-5 text-2xl font-semibold">求人投稿</h2>
      <select
        className="w-50 p-2 border mt-5 border-gray-400 rounded"
        onChange={(e) => setJobCategoryText(e.target.value)}
        value={jobCategoryText}
      >
        <option value="" disabled>
          求人カテゴリ選択
        </option>
        {jobCategories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>

      <p className="pt-5 pb-2">年収(万円)</p>
      <input
        className="w-[187px] h-[30px] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
        onChange={(e) => setSalaryText(e.target.value)}
        value={salaryText}
      />

      <p className="pt-2 pb-2">求人タイトル</p>
      <input
        className="w-[500px] h-[30px] px-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
        onChange={(e) => setTitleText(e.target.value)}
        value={titleText}
      />
      <br />
      <br />
      <button
        className="bg-sky-400 text-white w-[200px] h-[40px] rounded hover:opacity-80 cursor-pointer"
        onClick={() => {
          handleSubmit();
        }}
      >
        投稿
      </button>
    </div>
  );
};
export default Page;
