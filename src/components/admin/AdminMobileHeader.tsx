"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LogoutButton from "./LogoutButton";

const navItems = [
  { href: "/admin", label: "ダッシュボード", exact: true, icon: "🏠" },
  { href: "/admin/travelers", label: "旅行者申込一覧", icon: "🧳" },
  { href: "/admin/supporters", label: "サポーター一覧", icon: "❤️" },
  { href: "/admin/matches", label: "マッチング管理", icon: "🔗" },
  { href: "/admin/caregivers", label: "介助者管理", icon: "👤" },
  { href: "/admin/tours", label: "ツアー管理", icon: "🗺️" },
  { href: "/admin/field-posts", label: "現場から 投稿", icon: "✏️" },
  { href: "/admin/training-registrations", label: "講座仮登録", icon: "📋" },
  { href: "/admin/content", label: "コンテンツ編集", icon: "📝" },
  { href: "/admin/products", label: "旅行商品管理", icon: "⚖️" },
  { href: "/admin/reservations", label: "予約管理", icon: "📅" },
  { href: "/admin/agents", label: "AI社員室", icon: "🤖" },
  { href: "/admin/knowledge", label: "共有知識ベース", icon: "📄" },
];

export default function AdminMobileHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname.startsWith(href);

  const currentPage =
    navItems.find((item) => isActive(item.href, item.exact))?.label ??
    "管理画面";

  return (
    <>
      {/* モバイルヘッダーバー */}
      <header className="md:hidden bg-gray-900 text-white flex items-center justify-between px-4 py-3 sticky top-0 z-40">
        <div>
          <span className="font-bold text-base tracking-wide">FUKU-TABI</span>
          <p className="text-xs text-gray-400">{currentPage}</p>
        </div>
        <button
          onClick={() => setOpen(true)}
          className="p-2 rounded-lg hover:bg-gray-700 transition-colors"
          aria-label="メニューを開く"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </header>

      {/* オーバーレイ */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* ドロワー */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gray-900 text-gray-300 z-50 flex flex-col transform transition-transform duration-200 md:hidden ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* ドロワーヘッダー */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-700">
          <div>
            <Link
              href="/"
              className="text-white font-bold text-lg"
              onClick={() => setOpen(false)}
            >
              FUKU-TABI
            </Link>
            <p className="text-xs text-gray-500">管理画面</p>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="p-1 rounded hover:bg-gray-700"
            aria-label="メニューを閉じる"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* ナビ */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const active = isActive(item.href, item.exact);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 px-3 py-3 rounded-lg text-sm transition-colors ${
                  active
                    ? "bg-amber-700 text-white font-medium"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`}
              >
                <span className="text-base">{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* フッター */}
        <div className="px-5 py-4 border-t border-gray-700 space-y-2">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="block text-xs text-gray-500 hover:text-gray-300"
          >
            ← サイトトップへ戻る
          </Link>
          <LogoutButton />
        </div>
      </div>
    </>
  );
}
