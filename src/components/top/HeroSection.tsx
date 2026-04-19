import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

const strengths = [
  {
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
        />
      </svg>
    ),
    label: "鍼灸師・介護福祉士が運営",
  },
  {
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
    ),
    label: "旅行保険に加入",
  },
  {
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),
    label: "鹿児島に特化・旅行業登録",
  },
];

export default async function HeroSection() {
  const t = await getTranslations("hero");

  return (
    <section className="relative text-white overflow-hidden min-h-[580px]">
      {/* 桜島の写真（背景） */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/sakurajima-hero.jpg')" }}
      />

      {/* オーバーレイ：左側を暗く（文字読みやすく）右は写真を活かす */}
      <div className="absolute inset-0 bg-gradient-to-r from-satsuma-800/90 via-satsuma-700/60 to-transparent" />
      {/* 上部にも薄くかける */}
      <div className="absolute inset-0 bg-gradient-to-b from-satsuma-900/30 via-transparent to-satsuma-900/50" />

      {/* コンテンツ */}
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="max-w-xl">
          {/* バッジ */}
          <div className="inline-flex items-center gap-2 bg-white/15 border border-white/25 text-white text-sm font-semibold px-4 py-1.5 rounded-full mb-6 tracking-wide backdrop-blur-sm">
            <span className="w-2 h-2 bg-wagold-400 rounded-full animate-pulse" />
            {t("badge")}
          </div>

          {/* キャッチコピー */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 drop-shadow-lg">
            {t("title")}
            <br />
            <span className="text-wagold-400">{t("titleHighlight")}</span>
          </h1>

          <p className="text-lg text-white/90 leading-relaxed mb-8 max-w-lg whitespace-pre-line drop-shadow">
            {t("description")}
          </p>

          {/* 3つの安心バッジ */}
          <div className="flex flex-wrap gap-3 mb-10">
            {strengths.map((s, i) => (
              <div
                key={i}
                className="flex items-center gap-2 bg-black/30 border border-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium text-white"
              >
                {s.icon}
                {s.label}
              </div>
            ))}
          </div>

          {/* CTA ボタン */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-satsuma-700 font-bold text-lg rounded-xl hover:bg-sunaha-100 transition-colors shadow-xl"
            >
              {t("applyButton")}
              <svg
                className="ml-2 w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* 下部の波形区切り */}
      <div
        className="absolute bottom-0 left-0 right-0 h-10 bg-sunaha-100"
        style={{ clipPath: "polygon(0 100%, 100% 100%, 100% 0)" }}
      />
    </section>
  );
}
