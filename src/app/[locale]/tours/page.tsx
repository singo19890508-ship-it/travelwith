import { getTranslations, setRequestLocale } from "next-intl/server";
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
        <section className="relative bg-satsuma-800 text-white py-16 md:py-20 overflow-hidden">
          {/* 線画イラスト */}
          <svg
            viewBox="0 0 1000 240"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute inset-0 w-full h-full"
            preserveAspectRatio="xMidYMid slice"
            aria-hidden="true"
          >
            {/* 地図グリッド（薄い格子） */}
            <line
              x1="0"
              y1="80"
              x2="1000"
              y2="80"
              stroke="white"
              strokeWidth="0.8"
              strokeOpacity="0.08"
            />
            <line
              x1="0"
              y1="160"
              x2="1000"
              y2="160"
              stroke="white"
              strokeWidth="0.8"
              strokeOpacity="0.08"
            />
            <line
              x1="250"
              y1="0"
              x2="250"
              y2="240"
              stroke="white"
              strokeWidth="0.8"
              strokeOpacity="0.08"
            />
            <line
              x1="500"
              y1="0"
              x2="500"
              y2="240"
              stroke="white"
              strokeWidth="0.8"
              strokeOpacity="0.08"
            />
            <line
              x1="750"
              y1="0"
              x2="750"
              y2="240"
              stroke="white"
              strokeWidth="0.8"
              strokeOpacity="0.08"
            />

            {/* 桜島シルエット（右端） */}
            <path
              d="M840 240 L910 130 L980 240"
              stroke="white"
              strokeWidth="2"
              strokeOpacity="0.4"
            />
            <path
              d="M880 240 L942 155 L1004 240"
              stroke="white"
              strokeWidth="1.5"
              strokeOpacity="0.25"
            />
            {/* 火口 */}
            <path
              d="M898 135 Q910 128 922 135"
              stroke="white"
              strokeWidth="2"
              strokeOpacity="0.5"
            />
            {/* 噴煙 */}
            <path
              d="M910 126 Q904 110 912 94 Q920 78 910 62"
              stroke="white"
              strokeWidth="1.5"
              strokeOpacity="0.3"
              strokeLinecap="round"
            />

            {/* 目的地ピン（左エリア） */}
            <path
              d="M148 60 C148 46 158 36 170 36 C182 36 192 46 192 60 C192 76 170 96 170 96 C170 96 148 76 148 60 Z"
              stroke="white"
              strokeWidth="2"
              strokeOpacity="0.52"
            />
            <circle
              cx="170"
              cy="59"
              r="8"
              stroke="white"
              strokeWidth="1.8"
              strokeOpacity="0.52"
            />
            {/* ピン下の点線（ルート） */}
            <path
              d="M170 98 Q200 115 240 108 Q290 100 330 118 Q370 134 420 128"
              stroke="white"
              strokeWidth="1.8"
              strokeOpacity="0.35"
              strokeDasharray="10 6"
              strokeLinecap="round"
            />
            {/* ルート終点ピン（小） */}
            <path
              d="M415 112 C415 106 420 101 426 101 C432 101 437 106 437 112 C437 120 426 128 426 128 C426 128 415 120 415 112 Z"
              stroke="white"
              strokeWidth="1.8"
              strokeOpacity="0.45"
            />
            <circle
              cx="426"
              cy="111"
              r="5"
              stroke="white"
              strokeWidth="1.5"
              strokeOpacity="0.45"
            />

            {/* カメラ（右上エリア） */}
            <rect
              x="760"
              y="32"
              width="68"
              height="52"
              rx="8"
              stroke="white"
              strokeWidth="2"
              strokeOpacity="0.42"
            />
            {/* レンズ */}
            <circle
              cx="794"
              cy="58"
              r="16"
              stroke="white"
              strokeWidth="2"
              strokeOpacity="0.42"
            />
            <circle
              cx="794"
              cy="58"
              r="9"
              stroke="white"
              strokeWidth="1.5"
              strokeOpacity="0.35"
            />
            {/* ファインダー */}
            <rect
              x="770"
              y="28"
              width="20"
              height="8"
              rx="3"
              stroke="white"
              strokeWidth="1.5"
              strokeOpacity="0.38"
            />
            {/* シャッターボタン */}
            <circle
              cx="820"
              cy="38"
              r="5"
              stroke="white"
              strokeWidth="1.5"
              strokeOpacity="0.38"
            />

            {/* コンパス（左下） */}
            <circle
              cx="72"
              cy="178"
              r="28"
              stroke="white"
              strokeWidth="1.5"
              strokeOpacity="0.32"
            />
            {/* 北針 */}
            <path
              d="M72 152 L78 175 L72 170 L66 175 Z"
              stroke="white"
              strokeWidth="1.5"
              strokeOpacity="0.45"
              fill="white"
              fillOpacity="0.25"
            />
            {/* 南針 */}
            <path
              d="M72 204 L66 181 L72 186 L78 181 Z"
              stroke="white"
              strokeWidth="1.5"
              strokeOpacity="0.3"
            />
            <line
              x1="44"
              y1="178"
              x2="100"
              y2="178"
              stroke="white"
              strokeWidth="1"
              strokeOpacity="0.28"
            />
            <text
              x="72"
              y="149"
              textAnchor="middle"
              fontSize="9"
              fill="white"
              fillOpacity="0.5"
            >
              N
            </text>

            {/* 飛行機（上空） */}
            <path
              d="M580 38 L608 48 L618 44 L590 30 Z"
              stroke="white"
              strokeWidth="1.5"
              strokeOpacity="0.4"
              fill="white"
              fillOpacity="0.12"
            />
            <path
              d="M594 44 L586 58 L594 54"
              stroke="white"
              strokeWidth="1.5"
              strokeOpacity="0.4"
            />
            <path
              d="M602 42 L610 50"
              stroke="white"
              strokeWidth="1"
              strokeOpacity="0.35"
            />
            {/* 飛行機雲 */}
            <path
              d="M580 38 Q550 30 520 28 Q490 26 460 30"
              stroke="white"
              strokeWidth="1"
              strokeOpacity="0.22"
              strokeDasharray="8 5"
            />

            {/* 装飾ドット（散らばり） */}
            <circle cx="350" cy="28" r="3" fill="white" fillOpacity="0.15" />
            <circle cx="480" cy="200" r="2" fill="white" fillOpacity="0.12" />
            <circle cx="680" cy="195" r="3" fill="white" fillOpacity="0.1" />
            <circle cx="120" cy="130" r="2" fill="white" fillOpacity="0.12" />
            <circle cx="280" cy="55" r="2.5" fill="white" fillOpacity="0.1" />
          </svg>

          {/* 全体オーバーレイ */}
          <div className="absolute inset-0 bg-satsuma-800/75" />

          {/* テキスト（中央） */}
          <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
            <span className="inline-block bg-white/15 border border-white/25 text-white text-xs font-bold px-4 py-1.5 rounded-full mb-4 tracking-widest backdrop-blur-sm">
              TOURS
            </span>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              {t("pageTitle")}
            </h1>
            <p className="text-satsuma-100/85 text-lg max-w-2xl mx-auto leading-relaxed">
              {t("pageDescription")}
            </p>
          </div>
        </section>

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
