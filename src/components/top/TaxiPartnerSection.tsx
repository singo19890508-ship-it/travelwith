import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function TaxiPartnerSection() {
  const t = await getTranslations("taxi");

  const features = [
    {
      icon: (
        <svg
          className="w-7 h-7 text-teal-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
          />
        </svg>
      ),
      title: t("feature1Title"),
      desc: t("feature1Desc"),
    },
    {
      icon: (
        <svg
          className="w-7 h-7 text-teal-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      ),
      title: t("feature2Title"),
      desc: t("feature2Desc"),
    },
    {
      icon: (
        <svg
          className="w-7 h-7 text-teal-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          />
        </svg>
      ),
      title: t("feature3Title"),
      desc: t("feature3Desc"),
    },
  ];

  return (
    <section className="py-16 bg-teal-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* バッジ */}
        <div className="flex justify-center mb-6">
          <span className="inline-flex items-center gap-2 bg-teal-600 text-white text-sm font-semibold px-4 py-1.5 rounded-full shadow">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            {t("badge")}
          </span>
        </div>

        {/* 見出し */}
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
            {t("heading")}
          </h2>
          <p className="text-gray-600 text-base max-w-xl mx-auto leading-relaxed">
            {t("description")}
          </p>
        </div>

        {/* 3つの特長 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {features.map((f, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-6 shadow-sm flex flex-col items-center text-center gap-3"
            >
              <div className="w-14 h-14 bg-teal-50 rounded-full flex items-center justify-center">
                {f.icon}
              </div>
              <h3 className="font-bold text-gray-800">{f.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/partner"
            className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
          >
            {t("ctaLink")}
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
