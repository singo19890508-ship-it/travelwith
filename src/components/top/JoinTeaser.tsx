import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function JoinTeaser() {
  const t = await getTranslations("joinTeaser");

  return (
    <section className="py-14 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-teal-700 rounded-2xl p-8 md:p-10 text-white">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="flex-shrink-0 w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <div className="flex-1">
              <h2 className="text-xl md:text-2xl font-bold mb-2">{t("title")}</h2>
              <p className="text-teal-100 text-base leading-relaxed mb-5">
                {t("description")}
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/join"
                  className="inline-flex items-center justify-center px-5 py-2.5 bg-white text-teal-700 font-bold text-sm rounded-lg hover:bg-teal-50 transition-colors"
                >
                  {t("linkJoin")}
                </Link>
                <Link
                  href="/training"
                  className="inline-flex items-center justify-center px-5 py-2.5 bg-teal-600 text-white font-bold text-sm rounded-lg hover:bg-teal-500 transition-colors border border-white/30"
                >
                  {t("linkTraining")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
