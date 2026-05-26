import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function HeroSection() {
  const t = await getTranslations("hero");

  return (
    <section className="relative bg-gradient-to-br from-blue-800 via-blue-700 to-teal-600 text-white overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/2 translate-y-1/2" />
      </div>
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="max-w-2xl">
          <div className="inline-block bg-white/20 text-white text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
            {t("badge")}
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            {t("title")}
            <br />
            <span className="text-yellow-300">{t("titleHighlight")}</span>
          </h1>
          <p className="text-lg text-blue-100 leading-relaxed mb-10 max-w-xl whitespace-pre-line">
            {t("description")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-700 font-bold text-lg rounded-xl hover:bg-blue-50 transition-colors shadow-lg"
            >
              {t("applyButton")}
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <Link
              href="/flow"
              className="inline-flex items-center justify-center px-8 py-4 bg-white/20 text-white font-bold text-lg rounded-xl hover:bg-white/30 transition-colors border border-white/40"
            >
              {t("registerButton")}
            </Link>
          </div>
        </div>
      </div>
      <div
        className="absolute bottom-0 left-0 right-0 h-12 bg-gray-50"
        style={{ clipPath: "polygon(0 100%, 100% 100%, 100% 0)" }}
      />
    </section>
  );
}
