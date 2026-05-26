import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function FlowPreview() {
  const t = await getTranslations("flowPreview");

  const steps = [
    { num: "01", title: t("step1Title"), desc: t("step1Desc") },
    { num: "02", title: t("step2Title"), desc: t("step2Desc") },
    { num: "03", title: t("step3Title"), desc: t("step3Desc") },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
            {t("title")}
          </h2>
          <p className="text-gray-500 text-base">{t("subtitle")}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {steps.map((step, i) => (
            <div key={i} className="relative">
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-blue-100 z-0 -ml-3" />
              )}
              <div className="relative bg-gray-50 rounded-2xl p-6 border border-gray-100 z-10">
                <div className="text-3xl font-bold text-blue-200 mb-2 leading-none">
                  {step.num}
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">{step.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center">
          <Link
            href="/flow"
            className="inline-flex items-center gap-2 text-blue-600 font-semibold text-base hover:text-blue-700 transition-colors"
          >
            {t("detailLink")}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
