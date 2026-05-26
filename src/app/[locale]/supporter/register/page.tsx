import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SupporterRegisterForm from "@/components/forms/SupporterRegisterForm";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  return {
    title: t("supporterRegisterTitle"),
    description: t("supporterRegisterDescription"),
  };
}

export default async function SupporterRegisterPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("supporterRegister");

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        <div className="bg-gradient-to-r from-green-600 to-teal-500 text-white py-12">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">{t("pageTitle")}</h1>
            <p className="text-green-100 text-lg">{t("pageDescription")}</p>
          </div>
        </div>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-8 text-sm text-green-800">
            <strong>{t("noticeLabel")}</strong> {t("notice")}
          </div>
          <SupporterRegisterForm />
        </div>
      </main>
      <Footer />
    </>
  );
}
