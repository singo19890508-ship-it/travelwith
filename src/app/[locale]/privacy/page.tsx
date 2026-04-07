import { getTranslations, setRequestLocale } from "next-intl/server";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageHeader from "@/components/common/PageHeader";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  return { title: t("privacyTitle") };
}

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("privacy");

  const sections = [
    { title: t("s1Title"), body: t("s1Body") },
    { title: t("s2Title"), body: t("s2Body") },
    { title: t("s3Title"), body: t("s3Body") },
    { title: t("s4Title"), body: t("s4Body") },
    { title: t("s5Title"), body: t("s5Body") },
    { title: t("s6Title"), body: t("s6Body") },
    { title: t("s7Title"), body: t("s7Body") },
  ];

  return (
    <>
      <Header />
      <main>
        <PageHeader
          title={t("pageTitle")}
          description={t("pageDescription")}
          color="teal"
        />
        <article className="max-w-3xl mx-auto px-4 py-12">
          <p className="text-sm text-gray-400 mb-6">{t("updated")}</p>
          <p className="text-gray-700 leading-relaxed mb-10">{t("intro")}</p>
          <div className="space-y-10">
            {sections.map((s) => (
              <section key={s.title}>
                <h2 className="text-lg font-bold text-gray-900 mb-3">{s.title}</h2>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line text-sm">{s.body}</p>
              </section>
            ))}
            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-3">{t("contactTitle")}</h2>
              <p className="text-gray-700 leading-relaxed text-sm">{t("contactBody")}</p>
            </section>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
