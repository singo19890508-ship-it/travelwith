import { Link } from "@/i18n/navigation";
import LocaleSwitcher from "./LocaleSwitcher";
import HamburgerMenu from "./HamburgerMenu";

export default async function Header() {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* ロゴ */}
          <Link href="/" className="flex items-center shrink-0">
            <span className="text-xl font-bold text-satsuma-600 leading-tight tracking-wide">
              FUKU-TABI
            </span>
          </Link>

          {/* 右：言語切替 ＋ ハンバーガー */}
          <div className="flex items-center gap-2 shrink-0">
            <LocaleSwitcher />
            <HamburgerMenu />
          </div>
        </div>
      </div>
    </header>
  );
}
