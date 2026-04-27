import { getTranslations, setRequestLocale } from "next-intl/server";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

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
        {/* SVG線画ヒーロー — 全幅 */}
        <section className="relative bg-teal-700 text-white py-16 md:py-24 overflow-hidden">
          {/* 線画イラスト */}
          <svg
            viewBox="0 0 1000 280"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute inset-0 w-full h-full"
            preserveAspectRatio="xMidYMid slice"
            aria-hidden="true"
          >
            {/* 遠景の丘 */}
            <path
              d="M0 238 Q200 205 400 222 Q600 240 800 215 Q900 205 1000 218 L1000 280 L0 280 Z"
              stroke="white"
              strokeWidth="1"
              strokeOpacity="0.18"
              fill="white"
              fillOpacity="0.05"
            />
            {/* 手前の丘 */}
            <path
              d="M0 258 Q250 240 500 252 Q750 264 1000 246 L1000 280 L0 280 Z"
              stroke="white"
              strokeWidth="1"
              strokeOpacity="0.12"
              fill="white"
              fillOpacity="0.04"
            />

            {/* 山シルエット（桜島）*/}
            <path
              d="M820 280 L896 142 L972 280"
              stroke="white"
              strokeWidth="2"
              strokeOpacity="0.45"
            />
            <path
              d="M860 280 L930 168 L1000 280"
              stroke="white"
              strokeWidth="1.5"
              strokeOpacity="0.28"
            />
            {/* 火口縁 */}
            <path
              d="M884 147 Q896 140 908 147"
              stroke="white"
              strokeWidth="2"
              strokeOpacity="0.55"
            />
            {/* 噴煙 */}
            <path
              d="M896 138 Q890 122 897 106 Q904 90 895 74"
              stroke="white"
              strokeWidth="1.5"
              strokeOpacity="0.35"
              strokeLinecap="round"
            />

            {/* 太陽 */}
            <circle
              cx="960"
              cy="65"
              r="28"
              stroke="white"
              strokeWidth="2"
              strokeOpacity="0.48"
            />
            <line
              x1="960"
              y1="29"
              x2="960"
              y2="18"
              stroke="white"
              strokeWidth="2"
              strokeOpacity="0.48"
            />
            <line
              x1="960"
              y1="101"
              x2="960"
              y2="112"
              stroke="white"
              strokeWidth="2"
              strokeOpacity="0.48"
            />
            <line
              x1="924"
              y1="65"
              x2="913"
              y2="65"
              stroke="white"
              strokeWidth="2"
              strokeOpacity="0.48"
            />
            <line
              x1="996"
              y1="65"
              x2="1007"
              y2="65"
              stroke="white"
              strokeWidth="2"
              strokeOpacity="0.48"
            />
            <line
              x1="934"
              y1="39"
              x2="926"
              y2="31"
              stroke="white"
              strokeWidth="2"
              strokeOpacity="0.48"
            />
            <line
              x1="986"
              y1="91"
              x2="994"
              y2="99"
              stroke="white"
              strokeWidth="2"
              strokeOpacity="0.48"
            />

            {/* 鳥 */}
            <path
              d="M510 48 Q520 42 530 48"
              stroke="white"
              strokeWidth="1.5"
              strokeOpacity="0.5"
            />
            <path
              d="M544 34 Q554 28 564 34"
              stroke="white"
              strokeWidth="1.5"
              strokeOpacity="0.5"
            />
            <path
              d="M578 55 Q588 49 598 55"
              stroke="white"
              strokeWidth="1.5"
              strokeOpacity="0.4"
            />
            <path
              d="M620 38 Q630 32 640 38"
              stroke="white"
              strokeWidth="1.5"
              strokeOpacity="0.38"
            />

            {/* 点線の道 */}
            <path
              d="M0 270 Q150 262 280 266 Q420 274 560 258 Q680 245 760 252"
              stroke="white"
              strokeWidth="2"
              strokeOpacity="0.4"
              strokeDasharray="14 7"
            />

            {/* ── 旅行者（右エリア・大きめ） ── */}
            {/* 頭 */}
            <circle cx="632" cy="165" r="22" stroke="white" strokeWidth="2.5" />
            {/* 体 */}
            <line
              x1="632"
              y1="187"
              x2="632"
              y2="240"
              stroke="white"
              strokeWidth="2.5"
            />
            {/* 右腕（サポーターへ） */}
            <line
              x1="632"
              y1="206"
              x2="668"
              y2="222"
              stroke="white"
              strokeWidth="2.5"
            />
            {/* 左腕（スーツケース） */}
            <line
              x1="632"
              y1="206"
              x2="596"
              y2="218"
              stroke="white"
              strokeWidth="2.5"
            />
            {/* 左足 */}
            <line
              x1="632"
              y1="240"
              x2="614"
              y2="276"
              stroke="white"
              strokeWidth="2.5"
            />
            {/* 右足（踏み出し） */}
            <line
              x1="632"
              y1="240"
              x2="650"
              y2="276"
              stroke="white"
              strokeWidth="2.5"
            />
            {/* スーツケース本体 */}
            <rect
              x="572"
              y="218"
              width="26"
              height="34"
              rx="3"
              stroke="white"
              strokeWidth="2.5"
            />
            <line
              x1="572"
              y1="232"
              x2="598"
              y2="232"
              stroke="white"
              strokeWidth="1.5"
            />
            {/* ハンドル */}
            <path
              d="M580 218 L580 210 L590 210 L590 218"
              stroke="white"
              strokeWidth="2"
            />
            {/* キャスター */}
            <circle cx="579" cy="252" r="4" stroke="white" strokeWidth="2" />
            <circle cx="591" cy="252" r="4" stroke="white" strokeWidth="2" />
            {/* 笑顔 */}
            <path
              d="M626 163 Q632 169 638 163"
              stroke="white"
              strokeWidth="1.8"
              strokeLinecap="round"
            />

            {/* ── サポーター（旅行者の右・やや高め・大きめ） ── */}
            {/* 頭 */}
            <circle cx="724" cy="150" r="26" stroke="white" strokeWidth="2.5" />
            {/* 体 */}
            <line
              x1="724"
              y1="176"
              x2="724"
              y2="240"
              stroke="white"
              strokeWidth="2.5"
            />
            {/* 左腕（旅行者を支える） */}
            <line
              x1="724"
              y1="198"
              x2="672"
              y2="218"
              stroke="white"
              strokeWidth="2.5"
            />
            {/* 右腕 */}
            <line
              x1="724"
              y1="198"
              x2="758"
              y2="218"
              stroke="white"
              strokeWidth="2.5"
            />
            {/* 左足 */}
            <line
              x1="724"
              y1="240"
              x2="706"
              y2="276"
              stroke="white"
              strokeWidth="2.5"
            />
            {/* 右足 */}
            <line
              x1="724"
              y1="240"
              x2="742"
              y2="276"
              stroke="white"
              strokeWidth="2.5"
            />
            {/* 笑顔 */}
            <path
              d="M717 148 Q724 155 731 148"
              stroke="white"
              strokeWidth="1.8"
              strokeLinecap="round"
            />

            {/* ハート（二人の間） */}
            <path
              d="M674 188 C674 184 678 181 682 185 C686 181 690 184 690 188 C690 194 682 200 682 200 C682 200 674 194 674 188 Z"
              stroke="white"
              strokeWidth="1.8"
              fill="white"
              fillOpacity="0.35"
              strokeOpacity="0.75"
            />

            {/* 装飾ドット（左端） */}
            <circle cx="60" cy="50" r="3" fill="white" fillOpacity="0.12" />
            <circle cx="90" cy="80" r="2" fill="white" fillOpacity="0.1" />
            <circle cx="40" cy="110" r="4" fill="white" fillOpacity="0.08" />
            <circle cx="110" cy="140" r="2" fill="white" fillOpacity="0.1" />
          </svg>

          {/* グラデーションオーバーレイ（左を暗く） */}
          <div className="absolute inset-0 bg-gradient-to-r from-teal-800/90 via-teal-700/65 to-transparent" />

          {/* テキスト */}
          <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6">
            <p className="text-teal-200 text-sm font-semibold tracking-widest uppercase mb-3">
              Join Us
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-4">
              {t("pageTitle")}
            </h1>
            <p className="text-white/85 text-base md:text-lg leading-relaxed max-w-xl">
              {t("pageDescription")}
            </p>
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
      </main>
      <Footer />
    </>
  );
}
