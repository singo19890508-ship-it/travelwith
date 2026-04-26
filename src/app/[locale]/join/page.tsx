import { getTranslations, setRequestLocale } from "next-intl/server";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CtaSection from "@/components/common/CtaSection";
import { Link } from "@/i18n/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  return { title: t("joinTitle") };
}

export default async function JoinPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("join");

  const whyItems = [
    { title: t("why1Title"), desc: t("why1Desc"), icon: "🏅" },
    { title: t("why2Title"), desc: t("why2Desc"), icon: "✈️" },
    { title: t("why3Title"), desc: t("why3Desc"), icon: "🤝" },
    { title: t("why4Title"), desc: t("why4Desc"), icon: "🌱" },
  ];

  const flowSteps = [
    { num: t("flow1Num"), title: t("flow1Title"), desc: t("flow1Desc") },
    { num: t("flow2Num"), title: t("flow2Title"), desc: t("flow2Desc") },
    { num: t("flow3Num"), title: t("flow3Title"), desc: t("flow3Desc") },
    { num: t("flow4Num"), title: t("flow4Title"), desc: t("flow4Desc") },
  ];

  const conditions = [
    { label: t("cond1Label"), value: t("cond1Value") },
    { label: t("cond2Label"), value: t("cond2Value") },
    { label: t("cond3Label"), value: t("cond3Value") },
    { label: t("cond4Label"), value: t("cond4Value") },
  ];

  return (
    <>
      <Header />
      <main>
        {/* カスタムヒーロー：テキスト左 ＋ 線画右 */}
        <section className="bg-teal-700 text-white">
          <div className="max-w-5xl mx-auto px-6 py-14 flex flex-col md:flex-row items-center gap-8">
            {/* 左：テキスト */}
            <div className="flex-1 text-center md:text-left">
              <p className="text-teal-200 text-xs font-semibold tracking-widest uppercase mb-3">
                Join Us
              </p>
              <h1 className="text-3xl sm:text-4xl font-bold leading-tight mb-4">
                {t("pageTitle")}
              </h1>
              <p className="text-white/80 text-base leading-relaxed max-w-md mx-auto md:mx-0">
                {t("pageDescription")}
              </p>
            </div>

            {/* 右：SVG線画イラスト */}
            <div className="flex-shrink-0 w-64 sm:w-72 md:w-80">
              <svg
                viewBox="0 0 280 220"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full"
                aria-hidden="true"
              >
                {/* 丘・大地 */}
                <path
                  d="M0 185 Q70 155 140 170 Q210 185 280 162 L280 220 L0 220 Z"
                  stroke="white"
                  strokeWidth="1"
                  strokeOpacity="0.25"
                  fill="white"
                  fillOpacity="0.07"
                />

                {/* 山シルエット（桜島イメージ） */}
                <path
                  d="M30 172 L68 112 L106 172"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeOpacity="0.35"
                />
                <path
                  d="M70 172 L102 122 L134 172"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeOpacity="0.25"
                />

                {/* 太陽 */}
                <circle
                  cx="222"
                  cy="52"
                  r="17"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeOpacity="0.55"
                />
                <line
                  x1="222"
                  y1="29"
                  x2="222"
                  y2="22"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeOpacity="0.55"
                />
                <line
                  x1="247"
                  y1="52"
                  x2="254"
                  y2="52"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeOpacity="0.55"
                />
                <line
                  x1="238"
                  y1="35"
                  x2="243"
                  y2="30"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeOpacity="0.55"
                />
                <line
                  x1="206"
                  y1="35"
                  x2="201"
                  y2="30"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeOpacity="0.55"
                />
                <line
                  x1="222"
                  y1="75"
                  x2="222"
                  y2="82"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeOpacity="0.55"
                />

                {/* 鳥 */}
                <path
                  d="M22 48 Q27 43 32 48"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeOpacity="0.6"
                />
                <path
                  d="M40 38 Q45 33 50 38"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeOpacity="0.6"
                />
                <path
                  d="M58 52 Q63 47 68 52"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeOpacity="0.45"
                />

                {/* 点線の道 */}
                <path
                  d="M55 195 Q140 190 230 193"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeOpacity="0.4"
                  strokeDasharray="7 4"
                />

                {/* 旅行者（左・やや低め） */}
                {/* 頭 */}
                <circle
                  cx="128"
                  cy="113"
                  r="13"
                  stroke="white"
                  strokeWidth="2"
                />
                {/* 体 */}
                <line
                  x1="128"
                  y1="126"
                  x2="128"
                  y2="165"
                  stroke="white"
                  strokeWidth="2"
                />
                {/* 右腕（サポーターへ伸ばす） */}
                <line
                  x1="128"
                  y1="140"
                  x2="154"
                  y2="152"
                  stroke="white"
                  strokeWidth="2"
                />
                {/* 左腕（スーツケース） */}
                <line
                  x1="128"
                  y1="140"
                  x2="106"
                  y2="156"
                  stroke="white"
                  strokeWidth="2"
                />
                {/* 左足 */}
                <line
                  x1="128"
                  y1="165"
                  x2="116"
                  y2="190"
                  stroke="white"
                  strokeWidth="2"
                />
                {/* 右足 */}
                <line
                  x1="128"
                  y1="165"
                  x2="140"
                  y2="190"
                  stroke="white"
                  strokeWidth="2"
                />
                {/* スーツケース本体 */}
                <rect
                  x="93"
                  y="156"
                  width="17"
                  height="21"
                  rx="2"
                  stroke="white"
                  strokeWidth="2"
                />
                {/* スーツケース仕切り線 */}
                <line
                  x1="93"
                  y1="163"
                  x2="110"
                  y2="163"
                  stroke="white"
                  strokeWidth="1.5"
                />
                {/* ハンドル */}
                <path
                  d="M99 156 L99 150 L104 150 L104 156"
                  stroke="white"
                  strokeWidth="1.5"
                />
                {/* キャスター */}
                <circle
                  cx="97"
                  cy="177"
                  r="2"
                  stroke="white"
                  strokeWidth="1.5"
                />
                <circle
                  cx="106"
                  cy="177"
                  r="2"
                  stroke="white"
                  strokeWidth="1.5"
                />

                {/* サポーター（右・やや高め） */}
                {/* 頭 */}
                <circle
                  cx="174"
                  cy="101"
                  r="16"
                  stroke="white"
                  strokeWidth="2"
                />
                {/* 体 */}
                <line
                  x1="174"
                  y1="117"
                  x2="174"
                  y2="165"
                  stroke="white"
                  strokeWidth="2"
                />
                {/* 左腕（旅行者を支える） */}
                <line
                  x1="174"
                  y1="135"
                  x2="152"
                  y2="152"
                  stroke="white"
                  strokeWidth="2"
                />
                {/* 右腕 */}
                <line
                  x1="174"
                  y1="135"
                  x2="196"
                  y2="148"
                  stroke="white"
                  strokeWidth="2"
                />
                {/* 左足 */}
                <line
                  x1="174"
                  y1="165"
                  x2="162"
                  y2="190"
                  stroke="white"
                  strokeWidth="2"
                />
                {/* 右足 */}
                <line
                  x1="174"
                  y1="165"
                  x2="186"
                  y2="190"
                  stroke="white"
                  strokeWidth="2"
                />

                {/* ハート（二人の間） */}
                <path
                  d="M149 127 C149 124 152 122 155 125 C158 122 161 124 161 127 C161 131 155 136 155 136 C155 136 149 131 149 127 Z"
                  stroke="white"
                  strokeWidth="1.5"
                  fill="white"
                  fillOpacity="0.35"
                />

                {/* サポーターの笑顔 */}
                <path
                  d="M168 99 Q174 104 180 99"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                {/* 旅行者の笑顔 */}
                <path
                  d="M123 111 Q128 116 133 111"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>
        </section>

        {/* Intro */}
        <section className="max-w-3xl mx-auto px-4 py-10">
          <p className="text-gray-700 leading-relaxed text-lg text-center">
            {t("intro")}
          </p>
        </section>

        {/* Why section */}
        <section className="bg-gray-50 py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="section-title text-center mb-8">{t("whyTitle")}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {whyItems.map((item) => (
                <div
                  key={item.title}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6"
                >
                  <div className="text-3xl mb-3">{item.icon}</div>
                  <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Flow */}
        <section className="max-w-3xl mx-auto px-4 py-14">
          <h2 className="section-title text-center mb-10">{t("flowTitle")}</h2>
          <div className="relative">
            {flowSteps.map((step, i) => (
              <div key={step.num} className="flex gap-6 mb-8 last:mb-0">
                {/* Left: number + line */}
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-teal-600 text-white flex items-center justify-center font-bold text-lg flex-shrink-0">
                    {step.num}
                  </div>
                  {i < flowSteps.length - 1 && (
                    <div className="w-0.5 flex-1 bg-teal-200 mt-2" />
                  )}
                </div>
                {/* Right: content */}
                <div className="pb-8">
                  <h3 className="font-bold text-gray-900 text-lg mb-1">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-sm">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Conditions */}
        <section className="bg-teal-50 py-12 px-4">
          <div className="max-w-2xl mx-auto">
            <h2 className="section-title text-center mb-8">
              {t("conditionsTitle")}
            </h2>
            <div className="bg-white rounded-2xl shadow-sm border border-teal-100 overflow-hidden">
              <table className="w-full text-sm">
                <tbody>
                  {conditions.map((c, i) => (
                    <tr
                      key={c.label}
                      className={i % 2 === 0 ? "bg-white" : "bg-teal-50/50"}
                    >
                      <td className="py-4 px-6 font-medium text-gray-700 w-40 border-r border-teal-100">
                        {c.label}
                      </td>
                      <td className="py-4 px-6 text-gray-700">{c.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* 育成講座セクション */}
        <section className="py-14 px-4 bg-white">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <p className="text-satsuma-600 font-semibold text-sm mb-2 tracking-widest">
                {t("trainingLabel")}
              </p>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                {t("trainingTitle")}
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                {t("trainingDesc")}
              </p>
            </div>

            {/* カリキュラム5章サマリー */}
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 mb-8">
              {[
                { num: "01", title: t("ch1Title"), icon: "🌱" },
                { num: "02", title: t("ch2Title"), icon: "📚" },
                {
                  num: "03",
                  title: t("ch3Title"),
                  icon: "♨️",
                  highlight: true,
                },
                { num: "04", title: t("ch4Title"), icon: "🍵" },
                { num: "05", title: t("ch5Title"), icon: "🤝" },
              ].map((ch) => (
                <div
                  key={ch.num}
                  className={`rounded-2xl p-4 text-center border ${
                    ch.highlight
                      ? "bg-wagold-50 border-wagold-300"
                      : "bg-gray-50 border-gray-100"
                  }`}
                >
                  <div className="text-2xl mb-2">{ch.icon}</div>
                  <div className="text-xs font-bold text-gray-500 mb-1">
                    第{ch.num}章
                  </div>
                  <p className="text-xs font-semibold text-gray-800 leading-snug">
                    {ch.title}
                  </p>
                  {ch.highlight && (
                    <p className="text-xs text-wagold-600 mt-1">
                      {t("ch3Highlight")}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {/* ハイライト */}
            <div className="bg-gradient-to-r from-satsuma-800 to-satsuma-700 text-white rounded-2xl p-6 mb-8">
              <div className="flex flex-col sm:flex-row gap-6 items-start">
                <div className="flex-1">
                  <p className="font-bold text-wagold-300 text-sm mb-2">
                    {t("highlightBadge")}
                  </p>
                  <h3 className="font-bold text-xl mb-3">
                    {t("highlightTitle")}
                  </h3>
                  <p className="text-white/80 text-sm leading-relaxed">
                    {t("highlightDesc")}
                  </p>
                </div>
                <div className="flex-shrink-0 text-center">
                  <div className="text-5xl mb-2">♨️</div>
                  <p className="text-xs text-white/60">{t("highlightSub")}</p>
                </div>
              </div>
            </div>

            {/* 概要テーブル */}
            <div className="bg-gray-50 rounded-2xl border border-gray-100 overflow-hidden mb-8">
              {[
                { label: t("fmt1Label"), value: t("fmt1Value") },
                { label: t("fmt2Label"), value: t("fmt2Value") },
                { label: t("fmt3Label"), value: t("fmt3Value") },
                { label: t("fmt4Label"), value: t("fmt4Value") },
                { label: t("fmt5Label"), value: t("fmt5Value") },
              ].map((row, i) => (
                <div
                  key={row.label}
                  className={`flex border-b border-gray-100 last:border-0 ${i % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
                >
                  <div className="w-28 sm:w-36 py-3 px-5 text-sm font-medium text-gray-600 border-r border-gray-100 flex-shrink-0">
                    {row.label}
                  </div>
                  <div className="py-3 px-5 text-sm text-gray-800">
                    {row.value}
                  </div>
                </div>
              ))}
            </div>

            {/* 育成講座ボタン群 */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/training#register"
                className="inline-flex items-center justify-center px-8 py-3 bg-satsuma-600 text-white font-bold rounded-xl hover:bg-satsuma-700 transition-colors shadow-sm"
              >
                {t("registerBtn")}
              </Link>
              <Link
                href="/training"
                className="inline-flex items-center justify-center px-8 py-3 bg-white text-satsuma-700 font-bold rounded-xl border border-satsuma-300 hover:bg-satsuma-50 transition-colors"
              >
                {t("detailBtn")}
              </Link>
            </div>
          </div>
        </section>

        <CtaSection
          title={t("ctaSectionTitle")}
          description={t("ctaSectionDesc")}
          primaryLabel={t("bannerCta")}
          primaryHref="/supporter/register"
        />
      </main>
      <Footer />
    </>
  );
}
