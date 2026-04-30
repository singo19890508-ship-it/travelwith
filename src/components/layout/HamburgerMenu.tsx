"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function HamburgerMenu() {
  const [open, setOpen] = useState(false);
  const t = useTranslations("header");

  const navItems = [
    { href: "/tours", label: t("tours") },
    { href: "/caregivers", label: t("caregivers") },
    { href: "/join", label: t("join") },
    { href: "/field", label: t("field") },
    { href: "/faq", label: t("faq") },
  ];

  return (
    <>
      {/* ハンバーガーボタン（全画面サイズで表示） */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="p-2 rounded-lg text-gray-600 hover:text-satsuma-600 hover:bg-gray-100 transition-colors"
        aria-label={open ? t("menuClose") : t("menuOpen")}
      >
        {open ? (
          /* × アイコン */
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
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          /* 三本線 */
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
        )}
      </button>

      {/* ドロップダウンメニュー */}
      {open && (
        <>
          {/* 背景オーバーレイ（クリックで閉じる） */}
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />

          {/* メニューパネル */}
          <div className="absolute top-16 right-0 left-0 bg-white shadow-lg border-t border-gray-100 z-50">
            <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-4 py-4 text-base font-medium text-gray-700 hover:text-satsuma-600 hover:bg-satsuma-50 rounded-xl transition-colors"
                >
                  <span className="w-1.5 h-1.5 bg-satsuma-400 rounded-full flex-shrink-0" />
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </>
      )}
    </>
  );
}
