import Link from "next/link";
import type { Metadata } from "next";
import AdminNav from "@/components/admin/AdminNav";
import LogoutButton from "@/components/admin/LogoutButton";

export const metadata: Metadata = {
  title: "管理画面 | FUKU-TABI",
  robots: "noindex,nofollow",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* サイドバー */}
      <aside className="w-56 bg-gray-900 text-gray-300 flex flex-col flex-shrink-0">
        <div className="px-5 py-5 border-b border-gray-700">
          <Link href="/" className="text-white font-bold text-lg tracking-wide">
            FUKU-TABI
          </Link>
          <p className="text-xs text-gray-500 mt-0.5">管理画面</p>
        </div>
        <AdminNav />
        <div className="px-5 py-4 border-t border-gray-700 space-y-2">
          <Link
            href="/"
            className="block text-xs text-gray-500 hover:text-gray-300 transition-colors"
          >
            ← サイトトップへ戻る
          </Link>
          <LogoutButton />
        </div>
      </aside>

      {/* メインコンテンツ */}
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}
