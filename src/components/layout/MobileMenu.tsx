"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  const t = useTranslations("header");

  const navItems = [
    { href: "/", label: t("home") },
    { href: "/flow", label: t("flow") },
    { href: "/caregivers", label: t("caregivers") },
    { href: "/join", label: t("join") },
    { href: "/safety", label: t("safety") },
    { href: "/faq", label: t("faq") },
    { href: "/contact", label: t("contact") },
  ];

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="md:hidden p-2 rounded-lg text-gray-600 hover:text-blue-600 hover:bg-gray-100 transition-colors"
        aria-label={open ? t("menuClose") : t("menuOpen")}
      >
        {open ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      {open && (
        <div className="absolute top-16 left-0 right-0 bg-white shadow-lg border-t border-gray-100 md:hidden z-40">
          <nav className="max-w-6xl mx-auto px-4 py-4 flex flex-col gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="px-4 py-3 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-3 mt-2 border-t border-gray-100">
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="block w-full text-center px-6 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors"
              >
                {t("consultButton")}
              </Link>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
