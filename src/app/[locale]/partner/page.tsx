import { getTranslations, setRequestLocale } from "next-intl/server";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Link } from "@/i18n/navigation";
import Image from "next/image";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  return {
    title: t("partnerTitle"),
    description: t("partnerDescription"),
  };
}

export default async function PartnerPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("partner");

  const vehicleFeatures = [
    t("vehicle1"),
    t("vehicle2"),
    t("vehicle3"),
    t("vehicle4"),
    t("vehicle5"),
    t("vehicle6"),
  ];

  const driverQualifications = [
    t("driver1"),
    t("driver2"),
    t("driver3"),
    t("driver4"),
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        {/* ヒーロー */}
        <section className="bg-teal-700 text-white py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block bg-teal-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-4 tracking-wide">
              PARTNER
            </span>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              {t("pageTitle")}
            </h1>
            <p className="text-teal-100 text-lg max-w-2xl mx-auto leading-relaxed">
              {t("pageDescription")}
            </p>
          </div>
        </section>

        {/* 連携の意義 */}
        <section className="py-14 px-4 bg-teal-50">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center text-teal-700 font-bold text-sm">
                  ✓
                </span>
                {t("whyTitle")}
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                {t("whyDesc1")}
              </p>
              <p className="text-gray-600 leading-relaxed">{t("whyDesc2")}</p>
            </div>
          </div>
        </section>

        {/* 実際のサポートの様子 */}
        <section className="py-14 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-3 text-center">
              {t("photosTitle")}
            </h2>
            <p className="text-center text-gray-500 text-sm mb-8">
              {t("photosNote")}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
              {[
                {
                  src: "/images/real/onsen-support.jpg",
                  alt: t("photo1Alt"),
                  caption: t("photo1Caption"),
                },
                {
                  src: "/images/real/hotel-lobby.jpg",
                  alt: t("photo2Alt"),
                  caption: t("photo2Caption"),
                },
                {
                  src: "/images/real/china-town.jpg",
                  alt: t("photo3Alt"),
                  caption: t("photo3Caption"),
                },
              ].map((photo, i) => (
                <div
                  key={i}
                  className="relative aspect-square rounded-xl overflow-hidden shadow-sm"
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2">
                    <p className="text-white text-xs font-medium">
                      {photo.caption}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            {/* 温泉写真を大きく featured */}
            <div className="relative rounded-2xl overflow-hidden shadow-md h-72 md:h-96">
              <Image
                src="/images/real/onsen-support.jpg"
                alt={t("featuredAlt")}
                fill
                sizes="100vw"
                className="object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-6">
                <div>
                  <p className="text-white font-bold text-xl mb-1">
                    {t("featuredQuote")}
                  </p>
                  <p className="text-white/80 text-sm">
                    {t("featuredQuoteCredit")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* タクシー会社紹介 */}
        <section className="py-14 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
              {t("taxiTitle")}
            </h2>

            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="w-full md:w-48 h-32 bg-gray-200 rounded-xl flex items-center justify-center text-gray-400 text-sm flex-shrink-0">
                  {t("taxiLogoPlaceholder")}
                </div>
                <div className="flex-1">
                  <div className="inline-block bg-teal-100 text-teal-700 text-xs font-bold px-2 py-0.5 rounded mb-2">
                    {t("taxiAreaBadge")}
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {t("taxiName")}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-4">
                    {t("taxiDesc")}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {vehicleFeatures.map((f, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 text-sm text-gray-600"
                      >
                        <svg
                          className="w-4 h-4 text-teal-500 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        {f}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ドライバー資格 */}
        <section className="py-14 px-4 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
              {t("driverTitle")}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {driverQualifications.map((q, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl p-4 flex items-center gap-3 shadow-sm"
                >
                  <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-5 h-5 text-teal-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-gray-700">{q}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-14 px-4 bg-teal-700 text-white text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">{t("ctaTitle")}</h2>
            <p className="text-teal-100 mb-8 leading-relaxed">{t("ctaDesc")}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/traveler/apply"
                className="bg-white text-teal-700 font-bold px-6 py-3 rounded-xl hover:bg-teal-50 transition-colors"
              >
                {t("ctaApply")}
              </Link>
              <Link
                href="/tours"
                className="border border-white text-white font-bold px-6 py-3 rounded-xl hover:bg-teal-600 transition-colors"
              >
                {t("ctaTours")}
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
