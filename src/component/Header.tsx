import Link from "next/link";
import React, { FC } from "react";

const Header: FC = () => {
  return (
    <>
      <header className="bg-[#0c0a28] text-white mb-0 h-24 sm:h-30 px-4 sm:px-8">
        <div className="flex justify-between pt-9 sm:pt-12 items-center">
          <Link href="/" className="text-2xl font-bold sm:text-3xl">
            求人検索アプリ
          </Link>
          <div className="flex gap-5 sm:gap-10 text-white cursor-pointer">
            <Link href="/" className="hover:underline">
              求人検索
            </Link>
            <Link href="/post" className="hover:underline">
              求人投稿
            </Link>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
