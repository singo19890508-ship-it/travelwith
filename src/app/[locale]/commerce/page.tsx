import { getTranslations, setRequestLocale } from "next-intl/server";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageHeader from "@/components/common/PageHeader";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  return { title: t("commerceTitle") };
}

export default async function CommercePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("commerce");

  const rows = [
    { label: t("row1Label"), value: t("row1Value") },
    { label: t("row2Label"), value: t("row2Value") },
    { label: t("row3Label"), value: t("row3Value") },
    { label: t("row4Label"), value: t("row4Value") },
    { label: t("row5Label"), value: t("row5Value") },
    { label: t("row6Label"), value: t("row6Value") },
    { label: t("row7Label"), value: t("row7Value") },
    { label: t("row8Label"), value: t("row8Value") },
    { label: t("row9Label"), value: t("row9Value") },
    { label: t("row10Label"), value: t("row10Value") },
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
        <article className="max-w-3xl mx-auto px-4 py-12">
          <p className="text-sm text-gray-400 mb-6">{t("updated")}</p>
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-10">
            <p className="text-sm text-amber-800">{t("note")}</p>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <table className="w-full text-sm">
              <tbody>
                {rows.map((row, i) => (
                  <tr key={row.label} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="py-4 px-6 font-medium text-gray-700 align-top w-44 border-r border-gray-100">
                      {row.label}
                    </td>
                    <td className="py-4 px-6 text-gray-700 leading-relaxed whitespace-pre-line">
                      {row.value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
