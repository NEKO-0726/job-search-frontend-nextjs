"use client";
import { SalaryOption } from "@/types";
import React, { useEffect, useState } from "react";

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

const desiredSalaries: SalaryOption[] = [
  { value: "300", label: "300万円以上" },
  { value: "400", label: "400万円以上" },
  { value: "500", label: "500万円以上" },
  { value: "600", label: "600万円以上" },
  { value: "700", label: "700万円以上" },
  { value: "800", label: "800万円以上" },
  { value: "900", label: "900万円以上" },
  { value: "1000", label: "1000万円以上" },
];

const Sidebar = () => {
  //求人絞り込み条件で選択された職業
  const [selectedJobCategories, setSelectedJobCategories] = useState<string[]>(
    []
  );
  //求人絞り込み条件で選択された年収
  const [selectedSalary, setSelectedSalary] = useState<string>("");

  // 職業カテゴリをローカルストレージに保存
  useEffect(() => {
    localStorage.setItem(
      "selectedJobCategories",
      JSON.stringify(selectedJobCategories)
    );
    window.dispatchEvent(new Event("jobFiltersChanged"));
  }, [selectedJobCategories]);

  // 年収をローカルストレージに保存
  useEffect(() => {
    localStorage.setItem("selectedSalary", JSON.stringify(selectedSalary));
    window.dispatchEvent(new Event("jobFiltersChanged"));
  }, [selectedSalary]);

  const handleCheckboxChange = (category: string) => {
    setSelectedJobCategories(
      (prev) =>
        prev.includes(category)
          ? prev.filter((c) => c !== category) // チェック外す
          : [...prev, category] // チェック追加
    );
  };

  return (
    <>
      <aside className="bg-gray-300 w-[230px] mt-0 pl-3">
        <h2 className="pt-5 text-2xl font-semibold mb-2">求人カテゴリ</h2>

        <div className="flex flex-col mb-4">
          {jobCategories.map((category) => (
            <label key={category}>
              <input
                type="checkbox"
                checked={selectedJobCategories.includes(category)}
                onChange={() => handleCheckboxChange(category)}
              />
              {category}
              <br />
            </label>
          ))}
        </div>

        <h2 className="pt-5 text-2xl font-semibold mb-2">年収</h2>
        <div className="w-[200px]">
          <select
            className="w-full p-2 border border-gray-400 rounded"
            value={selectedSalary}
            onChange={(e) => setSelectedSalary(e.target.value)}
          >
            <option value="" disabled>
              年収を選択
            </option>
            {desiredSalaries.map((salary) => (
              <option key={salary.value} value={salary.value}>
                {salary.label}
              </option>
            ))}
          </select>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
