import { getTranslations, setRequestLocale } from "next-intl/server";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageHeader from "@/components/common/PageHeader";
import CtaSection from "@/components/common/CtaSection";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  return { title: t("aboutTitle") };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("about");

  const values = [
    { title: t("value1Title"), desc: t("value1Desc") },
    { title: t("value2Title"), desc: t("value2Desc") },
    { title: t("value3Title"), desc: t("value3Desc") },
  ];

  const operatorInfo = [
    { label: t("operatorName"), value: t("operatorNameValue") },
    { label: t("operatorArea"), value: t("operatorAreaValue") },
    { label: t("operatorContact"), value: t("operatorContactValue") },
  ];

  return (
    <>
      <Header />
      <main>
        <PageHeader
          title={t("pageTitle")}
          description={t("pageDescription")}
          color="blue"
        />

        {/* Representative profile */}
        <section className="max-w-4xl mx-auto px-4 py-14">
          <h2 className="section-title mb-10 text-center">{t("repTitle")}</h2>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="flex flex-col md:flex-row gap-0">
              {/* Photo */}
              <div className="md:w-56 flex-shrink-0 bg-gradient-to-br from-blue-50 to-blue-100 flex flex-col items-center justify-center py-10 px-6 gap-3">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-200 to-blue-300 flex items-center justify-center border-4 border-white shadow">
                  <svg
                    className="w-16 h-16 text-blue-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <p className="text-xs text-blue-400 text-center">
                  {t("repPhotoNote")}
                </p>
              </div>
              {/* Info */}
              <div className="flex-1 p-8">
                <p className="text-xs font-bold text-blue-600 tracking-widest uppercase mb-1">
                  {t("repRole")}
                </p>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">
                  {t("repName")}
                </h3>
                <p className="text-sm text-gray-500 mb-5">{t("repNameRuby")}</p>
                <p className="text-gray-700 leading-relaxed text-sm mb-6 whitespace-pre-line">
                  {t("repDesc")}
                </p>
                {/* Credentials */}
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">
                    {t("repCredTitle")}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {(t("repCredList") as unknown as string)
                      .split(",")
                      .map((cred: string) => (
                        <span
                          key={cred.trim()}
                          className="inline-block bg-blue-50 text-blue-700 text-xs font-medium px-3 py-1 rounded-full border border-blue-100"
                        >
                          {cred.trim()}
                        </span>
                      ))}
                  </div>
                </div>
                {/* Travel license */}
                <div className="mt-5 pt-5 border-t border-gray-100">
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">
                    {t("repLicenseTitle")}
                  </p>
                  <p className="text-sm text-gray-700">
                    {t("repLicenseValue")}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {t("repLicenseNote")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission */}
        <section className="max-w-3xl mx-auto px-4 py-14">
          <h2 className="section-title mb-6">{t("missionTitle")}</h2>
          <p className="text-gray-700 leading-relaxed whitespace-pre-line text-lg">
            {t("missionDesc")}
          </p>
        </section>

        {/* Story */}
        <section className="bg-blue-50 py-14 px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="section-title mb-6">{t("storyTitle")}</h2>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {t("storyDesc")}
            </p>
          </div>
        </section>

        {/* Values */}
        <section className="max-w-4xl mx-auto px-4 py-14">
          <h2 className="section-title text-center mb-10">
            {t("valuesTitle")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((v, i) => (
              <div key={v.title} className="text-center">
                <div className="w-14 h-14 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {i + 1}
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{v.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Operator info */}
        <section className="bg-gray-50 py-12 px-4">
          <div className="max-w-2xl mx-auto">
            <h2 className="section-title mb-6">{t("operatorTitle")}</h2>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <table className="w-full text-sm">
                <tbody>
                  {operatorInfo.map((row, i) => (
                    <tr
                      key={row.label}
                      className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}
                    >
                      <td className="py-4 px-6 font-medium text-gray-700 w-36 border-r border-gray-100">
                        {row.label}
                      </td>
                      <td className="py-4 px-6 text-gray-700">{row.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <CtaSection
          title={t("ctaTitle")}
          description={t("ctaDescription")}
          primaryLabel={t("ctaButton")}
          primaryHref="/contact"
        />
      </main>
      <Footer />
    </>
  );
}
