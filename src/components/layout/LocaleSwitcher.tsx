"use client";

import { useLocale } from "next-intl";
import { usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

const LOCALE_NAMES: Record<string, string> = {
  ja: "日本語",
  en: "English",
  ko: "한국어",
  zh: "中文",
  hi: "हिंदी",
  es: "Español",
};

export default function LocaleSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLocale = e.target.value;
    document.cookie = `NEXT_LOCALE=${newLocale};path=/;max-age=31536000`;
    const path = pathname === "/" ? "" : pathname;
    window.location.href = `/${newLocale}${path}`;
  };

  return (
    <select
      value={locale}
      onChange={handleChange}
      className="text-sm text-gray-600 border border-gray-200 rounded-md px-2 py-1 bg-white hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
      aria-label="言語を選択 / Select language"
    >
      {routing.locales.map((loc) => (
        <option key={loc} value={loc}>
          {LOCALE_NAMES[loc]}
        </option>
      ))}
    </select>
  );
}
