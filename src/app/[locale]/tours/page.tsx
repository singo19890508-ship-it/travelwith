import { getTranslations, setRequestLocale } from "next-intl/server";
import PageHeader from "@/components/common/PageHeader";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Link } from "@/i18n/navigation";
import fs from "fs";
import path from "path";
import Image from "next/image";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  return {
    title: t("toursTitle"),
    description: t("toursDescription"),
  };
}

type Tour = {
  id: string;
  badge: string;
  badgeColor: string;
  title: string;
  subtitle: string;
  duration: string;
  area: string;
  price: string;
  priceNote: string;
  tags: string[];
  highlights: string[];
  imageUrl: string;
  status: string;
  published: boolean;
};

function loadTours(): Tour[] {
  try {
    const raw = fs.readFileSync(
      path.join(process.cwd(), "src", "data", "tours.json"),
      "utf-8",
    );
    return (JSON.parse(raw) as Tour[]).filter((t) => t.published !== false);
  } catch {
    return [];
  }
}

export default async function ToursPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("tours");
  const tours = loadTours();

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        {/* SVG線画ヒーロー — ツアー */}
        <PageHeader accent="amber" label="TOURS" title={t("pageTitle")} description={t("pageDescription")} />

        {/* 準備中バナー */}
        <div className="bg-amber-50 border-b border-amber-200 py-3 px-4 text-center">
          <p className="text-amber-700 text-sm font-medium">
            ⚡ {t("preparingBanner")}
            <Link href="/traveler/apply" className="underline font-bold ml-1">
              {t("preparingLink")}
            </Link>
            。
          </p>
        </div>

        {/* ツアー一覧 */}
        <section className="py-14 px-4">
          <div className="max-w-5xl mx-auto space-y-8">
            {tours.map((tour) => (
              <div
                key={tour.id}
                className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col md:flex-row">
                  {/* 写真エリア */}
                  <div className="w-full md:w-64 h-48 md:h-auto bg-gray-100 flex items-center justify-center flex-shrink-0 relative">
                    {tour.imageUrl ? (
                      <Image
                        src={tour.imageUrl}
                        alt={tour.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 256px"
                        className="object-cover"
                        unoptimized
                      />
                    ) : (
                      <span className="text-gray-400 text-sm">
                        {t("noPhoto")}
                      </span>
                    )}
                    <span
                      className={`absolute top-3 left-3 ${tour.badgeColor} text-white text-xs font-bold px-2.5 py-1 rounded-full`}
                    >
                      {tour.badge}
                    </span>
                  </div>

                  {/* 内容 */}
                  <div className="flex-1 p-6">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {tour.tags.map((tag) => (
                        <span
                          key={tag}
                          className="bg-teal-50 text-teal-700 text-xs font-medium px-2.5 py-0.5 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <h2 className="text-xl font-bold text-gray-800 mb-1">
                      {tour.title}
                    </h2>
                    <p className="text-gray-500 text-sm mb-4">
                      {tour.subtitle}
                    </p>

                    <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                      <div className="flex items-center gap-2 text-gray-600">
                        <svg
                          className="w-4 h-4 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        {tour.duration}
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <svg
                          className="w-4 h-4 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                        </svg>
                        {tour.area}
                      </div>
                    </div>

                    <ul className="space-y-1 mb-5">
                      {tour.highlights.map((h, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-sm text-gray-600"
                        >
                          <svg
                            className="w-4 h-4 text-teal-500 mt-0.5 flex-shrink-0"
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
                          {h}
                        </li>
                      ))}
                    </ul>

                    <div className="flex items-center justify-between flex-wrap gap-4">
                      <div>
                        <span className="text-2xl font-bold text-gray-800">
                          {tour.price}
                        </span>
                        <span className="text-gray-400 text-sm ml-1">
                          {tour.priceNote}
                        </span>
                      </div>
                      <Link
                        href="/traveler/apply"
                        className="bg-teal-600 hover:bg-teal-700 text-white font-bold px-6 py-2.5 rounded-xl transition-colors text-sm"
                      >
                        {t("applyButton")}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* カスタムツアーCTA */}
        <section className="py-14 px-4 bg-gray-50">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {t("customTitle")}
            </h2>
            <p className="text-gray-500 mb-8 leading-relaxed">
              {t("customDesc")}
            </p>
            <Link
              href="/traveler/apply"
              className="inline-block bg-teal-600 hover:bg-teal-700 text-white font-bold px-8 py-3 rounded-xl transition-colors"
            >
              {t("customButton")}
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
