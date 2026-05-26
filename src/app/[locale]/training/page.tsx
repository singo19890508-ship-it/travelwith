import { getTranslations, setRequestLocale } from "next-intl/server";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageHeader from "@/components/common/PageHeader";
import CtaSection from "@/components/common/CtaSection";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  return { title: t("trainingTitle") };
}

export default async function TrainingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("training");

  const curriculum = [
    { title: t("curriculum1Title"), desc: t("curriculum1Desc"), num: "01" },
    { title: t("curriculum2Title"), desc: t("curriculum2Desc"), num: "02" },
    { title: t("curriculum3Title"), desc: t("curriculum3Desc"), num: "03" },
    { title: t("curriculum4Title"), desc: t("curriculum4Desc"), num: "04" },
    { title: t("curriculum5Title"), desc: t("curriculum5Desc"), num: "05" },
  ];

  const formats = [
    { label: t("format1Label"), value: t("format1Value") },
    { label: t("format2Label"), value: t("format2Value") },
    { label: t("format3Label"), value: t("format3Value") },
    { label: t("format4Label"), value: t("format4Value") },
  ];

  const targets = [t("target1"), t("target2"), t("target3")];

  return (
    <>
      <Header />
      <main>
        <PageHeader
          title={t("pageTitle")}
          description={t("pageDescription")}
          color="green"
        />

        {/* Intro */}
        <section className="max-w-3xl mx-auto px-4 py-10">
          <div className="bg-green-50 border border-green-200 rounded-2xl p-6">
            <p className="text-gray-700 leading-relaxed">{t("intro")}</p>
          </div>
        </section>

        {/* Overview */}
        <section className="max-w-3xl mx-auto px-4 pb-10">
          <h2 className="section-title mb-4">{t("overviewTitle")}</h2>
          <p className="text-gray-700 leading-relaxed">{t("overviewDesc")}</p>
        </section>

        {/* Curriculum */}
        <section className="bg-gray-50 py-12 px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="section-title mb-8">{t("curriculumTitle")}</h2>
            <div className="space-y-4">
              {curriculum.map((item) => (
                <div
                  key={item.num}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex gap-4"
                >
                  <div className="w-10 h-10 rounded-full bg-green-100 text-green-700 flex items-center justify-center font-bold text-sm flex-shrink-0">
                    {item.num}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Format */}
        <section className="max-w-2xl mx-auto px-4 py-12">
          <h2 className="section-title mb-6">{t("formatTitle")}</h2>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <table className="w-full text-sm">
              <tbody>
                {formats.map((f, i) => (
                  <tr key={f.label} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="py-4 px-6 font-medium text-gray-700 w-36 border-r border-gray-100">
                      {f.label}
                    </td>
                    <td className="py-4 px-6 text-gray-700">{f.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Target */}
        <section className="bg-green-50 py-12 px-4">
          <div className="max-w-2xl mx-auto">
            <h2 className="section-title mb-6">{t("targetTitle")}</h2>
            <ul className="space-y-3">
              {targets.map((target) => (
                <li key={target} className="flex items-start gap-3">
                  <span className="mt-1 w-5 h-5 rounded-full bg-green-500 text-white flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span className="text-gray-700">{target}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <CtaSection
          title={t("ctaTitle")}
          description={t("ctaDescription")}
          primaryLabel={t("ctaButton")}
          primaryHref="/contact"
          secondaryLabel={t("ctaJoin")}
          secondaryHref="/join"
        />
      </main>
      <Footer />
    </>
  );
}
