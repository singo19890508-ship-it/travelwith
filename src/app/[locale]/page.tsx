import { setRequestLocale } from "next-intl/server";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/top/HeroSection";
import ServiceIntro from "@/components/top/ServiceIntro";
import FlowPreview from "@/components/top/FlowPreview";
import SafetyTeaser from "@/components/top/SafetyTeaser";
import JoinTeaser from "@/components/top/JoinTeaser";
import CtaBanner from "@/components/top/CtaBanner";

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <ServiceIntro />
        <FlowPreview />
        <SafetyTeaser />
        <JoinTeaser />
        <CtaBanner />
      </main>
      <Footer />
    </>
  );
}
