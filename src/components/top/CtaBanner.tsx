import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function CtaBanner() {
  const t = await getTranslations("cta");

  return (
    <section className="py-20 bg-blue-600">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight">
          {t("title")}
        </h2>
        <p className="text-blue-100 text-base md:text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
          {t("description")}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/contact"
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-white text-blue-700 font-bold text-base rounded-xl hover:bg-blue-50 transition-colors shadow-lg"
          >
            {t("applyButton")}
          </Link>
          <Link
            href="/faq"
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-blue-500 text-white font-bold text-base rounded-xl hover:bg-blue-400 transition-colors border border-white/30"
          >
            {t("registerButton")}
          </Link>
        </div>
      </div>
    </section>
  );
}
