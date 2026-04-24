import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import LocaleSwitcher from "./LocaleSwitcher";
import MobileMenu from "./MobileMenu";

export default async function Header() {
  const t = await getTranslations("header");

  const navItems = [
    { href: "/", label: t("home") },
    { href: "/tours", label: "ツアー" },
    { href: "/flow", label: "旅行に行く" },
    { href: "/join", label: "介助者になる" },
    { href: "/field", label: "サポート日記" },
    { href: "/faq", label: "Q&A" },
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <span className="text-xl font-bold text-satsuma-600 leading-tight tracking-wide">
              FUKU-TABI
            </span>
          </Link>

          {/* PC nav */}
          <nav className="hidden md:flex items-center gap-1 flex-1 justify-center">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-satsuma-600 hover:bg-satsuma-50 rounded-lg transition-colors whitespace-nowrap"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 shrink-0">
            <LocaleSwitcher />
            {/* Mobile hamburger */}
            <MobileMenu />
          </div>
        </div>
      </div>
    </header>
  );
}
