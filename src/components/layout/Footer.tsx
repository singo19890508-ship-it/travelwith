import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function Footer() {
  const t = await getTranslations("footer");
  const h = await getTranslations("header");

  return (
    <footer className="bg-gray-800 text-gray-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <h3 className="text-white text-lg font-bold mb-3 tracking-wide">
              FUKU-TABI
            </h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              {t("description")}
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3">{t("linksTitle")}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/tours"
                  className="hover:text-white transition-colors"
                >
                  ツアー一覧
                </Link>
              </li>
              <li>
                <Link
                  href="/flow"
                  className="hover:text-white transition-colors"
                >
                  {h("flow")}
                </Link>
              </li>
              <li>
                <Link
                  href="/partner"
                  className="hover:text-white transition-colors"
                >
                  連携パートナー
                </Link>
              </li>
              <li>
                <Link
                  href="/caregivers"
                  className="hover:text-white transition-colors"
                >
                  {h("caregivers")}
                </Link>
              </li>
              <li>
                <Link
                  href="/safety"
                  className="hover:text-white transition-colors"
                >
                  {h("safety")}
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="hover:text-white transition-colors"
                >
                  {h("faq")}
                </Link>
              </li>
              <li>
                <Link
                  href="/join"
                  className="hover:text-white transition-colors"
                >
                  {h("join")}
                </Link>
              </li>
              <li>
                <Link
                  href="/training"
                  className="hover:text-white transition-colors"
                >
                  {t("training")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3">{t("contact")}</h4>
            <p className="text-sm text-gray-400 mb-3">{t("contactText")}</p>
            <a
              href="mailto:daifuku@corekara-support.com"
              className="block text-sm text-blue-400 hover:text-blue-300 transition-colors mb-3"
            >
              daifuku@corekara-support.com
            </a>
            <div className="mt-2 space-y-1 text-xs text-gray-500">
              <div>
                <Link
                  href="/about"
                  className="hover:text-gray-300 transition-colors"
                >
                  {t("about")}
                </Link>
              </div>
              <div>
                <Link
                  href="/terms"
                  className="hover:text-gray-300 transition-colors"
                >
                  {t("terms")}
                </Link>
              </div>
              <div>
                <Link
                  href="/privacy"
                  className="hover:text-gray-300 transition-colors"
                >
                  {t("privacy")}
                </Link>
              </div>
              <div>
                <Link
                  href="/commerce"
                  className="hover:text-gray-300 transition-colors"
                >
                  {t("commerce")}
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-500">
          <p>{t("copyright")}</p>
        </div>
      </div>
    </footer>
  );
}
