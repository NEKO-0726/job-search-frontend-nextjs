import type { Metadata } from "next";
import "./globals.css";
import Header from "@/component/Header";

export const metadata: Metadata = {
  title: "求人検索サイト",
  description: "求人検索サイトの説明",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>
        <div className="w-full mx-auto py-5 px-2">
          <Header />
          {children}
        </div>
      </body>
    </html>
  );
}
