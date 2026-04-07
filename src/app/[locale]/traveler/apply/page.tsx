import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import TravelerApplyForm from "@/components/forms/TravelerApplyForm";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  return {
    title: t("travelerApplyTitle"),
    description: t("travelerApplyDescription"),
  };
}

export default async function TravelerApplyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("travelerApply");

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white py-12">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">{t("pageTitle")}</h1>
            <p className="text-blue-100 text-lg">{t("pageDescription")}</p>
          </div>
        </div>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-8 text-sm text-blue-800">
            <strong>{t("noticeLabel")}</strong> {t("notice")}
          </div>
          <TravelerApplyForm />
        </div>
      </main>
      <Footer />
    </>
  );
}
