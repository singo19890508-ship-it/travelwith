import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function HeroSection() {
  const t = await getTranslations("hero");

  const strengths = [
    {
      icon: (
        <svg
          className="w-5 h-5 flex-shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 2a2 2 0 100 4 2 2 0 000-4zM5 20v-4l3-3 2 4 2-3 2 3 3-4v4H5z"
          />
        </svg>
      ),
      label: t("strength1"),
    },
    {
      icon: (
        <svg
          className="w-5 h-5 flex-shrink-0"
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
      ),
      label: t("strength2"),
    },
    {
      icon: (
        <svg
          className="w-5 h-5 flex-shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      label: t("strength3"),
    },
    {
      icon: (
        <svg
          className="w-5 h-5 flex-shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
          />
        </svg>
      ),
      label: t("strength4"),
    },
  ];

  return (
    <section className="relative text-white overflow-hidden min-h-[640px]">
      {/* 背景画像：25%で空を少し切り桜島ぎりぎり＋人を見せる */}
      <div
        className="absolute inset-0 bg-cover bg-no-repeat"
        style={{
          backgroundImage: "url('/images/sakurajima-hero.jpg')",
          backgroundPosition: "center 25%",
        }}
      />

      {/* オーバーレイ：左（テキスト）は濃く・右（桜島）は透明で写真を活かす */}
      <div className="absolute inset-0 bg-gradient-to-r from-satsuma-900/92 via-satsuma-800/70 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-satsuma-900/30 via-transparent to-satsuma-900/55" />

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

            <p className="text-lg text-white leading-relaxed mb-8 whitespace-pre-line drop-shadow font-medium">
              {t("description")}
            </p>

            {/* 4つの特徴バッジ：常時2列で幅均等 */}
            <div className="grid grid-cols-2 gap-2">
              {strengths.map((s, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 bg-black/50 border border-white/30 backdrop-blur-sm rounded-xl px-4 py-3 text-sm font-semibold text-white"
                >
                  {s.icon}
                  <span>{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── 右：大きなCTAボタン2枚 ── */}
          <div className="flex flex-col gap-5 lg:flex-shrink-0 lg:w-80 xl:w-96">
            {/* 旅行を選ぶ */}
            <Link
              href="/tours"
              className="group flex items-center gap-5 bg-black/55 hover:bg-amber-500 backdrop-blur-md border-2 border-white/40 hover:border-amber-400 rounded-2xl px-7 py-6 text-white transition-all duration-200 shadow-xl hover:shadow-amber-500/30 hover:shadow-2xl"
            >
              <div className="w-16 h-16 bg-amber-400/30 group-hover:bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors">
                <svg
                  className="w-9 h-9"
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
                <p className="text-xs text-amber-300 group-hover:text-white/80 font-bold tracking-widest mb-1">
                  TOURS
                </p>
                <p className="text-2xl font-bold leading-tight">旅行を選ぶ</p>
                <p className="text-sm text-white/75 group-hover:text-white/90 mt-1">
                  バリアフリーツアー一覧
                </p>
              </div>
              <svg
                className="w-6 h-6 text-white/50 group-hover:text-white group-hover:translate-x-1 transition-all flex-shrink-0"
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
              className="group flex items-center gap-5 bg-black/55 hover:bg-teal-500 backdrop-blur-md border-2 border-white/40 hover:border-teal-400 rounded-2xl px-7 py-6 text-white transition-all duration-200 shadow-xl hover:shadow-teal-500/30 hover:shadow-2xl"
            >
              <div className="w-16 h-16 bg-teal-400/30 group-hover:bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors">
                <svg
                  className="w-9 h-9"
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
                <p className="text-xs text-teal-300 group-hover:text-white/80 font-bold tracking-widest mb-1">
                  CAREGIVER
                </p>
                <p className="text-2xl font-bold leading-tight">介助者を選ぶ</p>
                <p className="text-sm text-white/75 group-hover:text-white/90 mt-1">
                  サポーター紹介を見る
                </p>
              </div>
              <svg
                className="w-6 h-6 text-white/50 group-hover:text-white group-hover:translate-x-1 transition-all flex-shrink-0"
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
