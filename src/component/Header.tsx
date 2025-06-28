import Link from "next/link";
import React, { FC } from "react";

const Header: FC = () => {
  return (
    <>
      <header className="bg-[#0c0a28] text-white mb-0 h-24">
        <div className="flex justify-between pt-8 pl-[30px] pr-[30px]">
          <h1 className="pr-[280px] text-3xl font-bold">求人検索アプリ</h1>
          <button className="text-white cursor-pointer hover:underline">
            <Link href="/">求人検索</Link>
          </button>
          <button className="text-white cursor-pointer hover:underline">
            <Link href="/post">求人投稿</Link>
          </button>
        </div>
      </header>
    </>
  );
};

export default Header;
