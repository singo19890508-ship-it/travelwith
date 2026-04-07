import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageHeader from "@/components/common/PageHeader";
import ContactForm from "@/components/forms/ContactForm";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  return { title: t("contactTitle"), description: t("description") };
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("contact");

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        <PageHeader
          title={t("pageTitle")}
          description={t("pageDescription")}
          color="blue"
        />
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-8 text-sm text-blue-800 leading-relaxed">
            <strong>{t("noticeLabel")}</strong>
            {t("notice")}
          </div>
          <ContactForm />
        </div>
      </main>
      <Footer />
    </>
  );
}
