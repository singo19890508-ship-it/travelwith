import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `https://fuku-tabi.com/${locale}`,
    },
  };
}
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/top/HeroSection";
import TourGallery from "@/components/top/TourGallery";
import FlowPreview from "@/components/top/FlowPreview";
import FourPillarsSection from "@/components/top/FourPillarsSection";
import CtaSection from "@/components/common/CtaSection";
export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("cta");

  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <TourGallery />
        <FlowPreview />
        <FourPillarsSection />
        <CtaSection
          title={t("title")}
          description={t("description")}
          primaryLabel={t("applyButton")}
          primaryHref="/contact"
          secondaryLabel={t("registerButton")}
          secondaryHref="/faq"
        />
      </main>
      <Footer />
    </>
  );
}
