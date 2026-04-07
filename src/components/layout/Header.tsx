import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import LocaleSwitcher from "./LocaleSwitcher";
import MobileMenu from "./MobileMenu";

export default async function Header() {
  const t = await getTranslations("header");

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
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <span className="text-xl font-bold text-blue-600 leading-tight">
              TravelWith
            </span>
          </Link>

          {/* PC nav */}
          <nav className="hidden md:flex items-center gap-1 flex-1 justify-center">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors whitespace-nowrap"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 shrink-0">
            <LocaleSwitcher />
            <Link
              href="/contact"
              className="hidden md:inline-flex px-4 py-2 text-sm font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap"
            >
              {t("consultButton")}
            </Link>
            {/* Mobile hamburger */}
            <MobileMenu />
          </div>
        </div>
      </div>
    </header>
  );
}
