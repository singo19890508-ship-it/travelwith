import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function HeroSection() {
  const t = await getTranslations("hero");

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
      label: t("strength1"),
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
      label: t("strength2"),
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
      label: t("strength3"),
    },
  ];

  return (
    <section className="relative text-white overflow-hidden min-h-[580px]">
      {/* 背景画像 */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/sakurajima-hero.jpg')" }}
      />

      {/* オーバーレイ：左を暗く・右は写真を活かす */}
      <div className="absolute inset-0 bg-gradient-to-r from-satsuma-800/92 via-satsuma-700/65 to-satsuma-800/50" />
      <div className="absolute inset-0 bg-gradient-to-b from-satsuma-900/30 via-transparent to-satsuma-900/50" />

      {/* コンテンツ：左右2カラム */}
      <div className="relative max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 py-20 lg:py-28">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10">
          {/* ── 左：キャッチコピー ── */}
          <div className="max-w-lg">
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

            <p className="text-lg text-white/90 leading-relaxed mb-8 whitespace-pre-line drop-shadow">
              {t("description")}
            </p>

            {/* 3つの安心バッジ */}
            <div className="flex flex-wrap gap-3">
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
          </div>

          {/* ── 右：大きなCTAボタン2枚 ── */}
          <div className="flex flex-col gap-4 lg:flex-shrink-0 lg:w-72 xl:w-80">
            {/* 旅行を選ぶ */}
            <Link
              href="/tours"
              className="group flex items-center gap-4 bg-white/10 hover:bg-amber-500 backdrop-blur-md border-2 border-white/30 hover:border-amber-400 rounded-2xl px-6 py-5 text-white transition-all duration-200 shadow-lg hover:shadow-amber-500/30 hover:shadow-xl"
            >
              <div className="w-14 h-14 bg-amber-400/25 group-hover:bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors">
                <svg
                  className="w-7 h-7"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.8}
                    d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                  />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-amber-300 group-hover:text-white/80 font-semibold tracking-widest mb-0.5">
                  TOURS
                </p>
                <p className="text-xl font-bold leading-tight">旅行を選ぶ</p>
                <p className="text-xs text-white/65 group-hover:text-white/80 mt-0.5">
                  バリアフリーツアー一覧
                </p>
              </div>
              <svg
                className="w-5 h-5 text-white/50 group-hover:text-white group-hover:translate-x-1 transition-all flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>

            {/* 介助者を選ぶ */}
            <Link
              href="/caregivers"
              className="group flex items-center gap-4 bg-white/10 hover:bg-teal-500 backdrop-blur-md border-2 border-white/30 hover:border-teal-400 rounded-2xl px-6 py-5 text-white transition-all duration-200 shadow-lg hover:shadow-teal-500/30 hover:shadow-xl"
            >
              <div className="w-14 h-14 bg-teal-400/25 group-hover:bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors">
                <svg
                  className="w-7 h-7"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.8}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-teal-300 group-hover:text-white/80 font-semibold tracking-widest mb-0.5">
                  CAREGIVER
                </p>
                <p className="text-xl font-bold leading-tight">介助者を選ぶ</p>
                <p className="text-xs text-white/65 group-hover:text-white/80 mt-0.5">
                  サポーター紹介を見る
                </p>
              </div>
              <svg
                className="w-5 h-5 text-white/50 group-hover:text-white group-hover:translate-x-1 transition-all flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>

            {/* 小さめの相談CTA */}
            <Link
              href="/contact"
              className="flex items-center justify-center gap-2 text-white/75 hover:text-white text-sm font-medium py-2 transition-colors"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
              まず無料で相談する
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
