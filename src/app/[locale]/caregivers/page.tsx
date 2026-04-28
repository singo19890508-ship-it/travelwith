import { getTranslations, setRequestLocale } from "next-intl/server";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageHeader from "@/components/common/PageHeader";
import CtaSection from "@/components/common/CtaSection";
import CaregiverListClient from "@/components/caregivers/CaregiverListClient";
import { getAvailableCaregivers } from "@/lib/caregivers";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  return { title: t("caregiversTitle") };
}

export default async function CaregiversPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [t, allCaregivers] = await Promise.all([
    getTranslations("caregivers"),
    getAvailableCaregivers(),
  ]);

  return (
    <>
      <Header />
      <main>
        <PageHeader accent="teal"
          title={t("pageTitle")}
          description={t("pageDescription")}
          color="blue"
        />
        <CaregiverListClient allCaregivers={allCaregivers} />
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
