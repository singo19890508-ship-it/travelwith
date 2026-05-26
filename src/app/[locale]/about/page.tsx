import { getTranslations, setRequestLocale } from "next-intl/server";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageHeader from "@/components/common/PageHeader";
import CtaSection from "@/components/common/CtaSection";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  return { title: t("aboutTitle") };
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
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
          <h2 className="section-title text-center mb-10">{t("valuesTitle")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((v, i) => (
              <div key={v.title} className="text-center">
                <div className="w-14 h-14 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {i + 1}
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{v.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{v.desc}</p>
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
                    <tr key={row.label} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
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
