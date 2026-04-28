import { getTranslations, setRequestLocale } from "next-intl/server";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CtaSection from "@/components/common/CtaSection";
import FaqAccordion from "@/components/faq/FaqAccordion";
import PageHeader from "@/components/common/PageHeader";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  return { title: t("faqTitle") };
}

export default async function FaqPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("faq");

  const faqItems = [
    { q: t("q1"), a: t("a1"), cat: t("cat1") },
    { q: t("q2"), a: t("a2"), cat: t("cat2") },
    { q: t("q3"), a: t("a3"), cat: t("cat3") },
    { q: t("q4"), a: t("a4"), cat: t("cat4") },
    { q: t("q5"), a: t("a5"), cat: t("cat5") },
    { q: t("q6"), a: t("a6"), cat: t("cat6") },
    { q: t("q7"), a: t("a7"), cat: t("cat7") },
    { q: t("q8"), a: t("a8"), cat: t("cat8") },
    { q: t("q9"), a: t("a9"), cat: t("cat9") },
    { q: t("q10"), a: t("a10"), cat: t("cat10") },
  ];

  const categories = [...new Set(faqItems.map((item) => item.cat))];

  return (
    <>
      <Header />
      <main>
        <PageHeader
          accent="silver"
          label="FAQ"
          title={t("pageTitle")}
          description={t("pageDescription")}
        />
        <section className="max-w-3xl mx-auto px-4 py-12">
          <FaqAccordion
            items={faqItems}
            categories={categories}
            labelAll={t("catAll")}
            noResult={t("noResult")}
          />
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
