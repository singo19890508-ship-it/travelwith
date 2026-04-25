import { getTranslations, setRequestLocale } from "next-intl/server";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageHeader from "@/components/common/PageHeader";
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
        <PageHeader
          title="介助者になる"
          description="旅を諦めてきた人の、初めての一歩を一緒に作りませんか"
          color="teal"
        />

        {/* CTAバナー */}
        <section className="bg-teal-600 text-white py-8 px-4">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-white/80 text-sm mb-4">
              資格・経験がなくても大丈夫。まずはお気軽にご連絡ください。
            </p>
            <Link
              href="/supporter/register"
              className="inline-block px-8 py-3 bg-white text-teal-700 font-bold rounded-xl hover:bg-teal-50 transition-colors shadow-sm"
            >
              サポーター登録を申し込む（無料）
            </Link>
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
                { num: "01", title: "使命と哲学", icon: "🌱" },
                { num: "02", title: "知識の基礎", icon: "📚" },
                { num: "03", title: "実践スキル", icon: "♨️", highlight: true },
                { num: "04", title: "旅行サポート実践", icon: "🍵" },
                { num: "05", title: "働き方・コミュニティ", icon: "🤝" },
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
                    <p className="text-xs text-wagold-600 mt-1">★ 核心スキル</p>
                  )}
                </div>
              ))}
            </div>

            {/* ハイライト */}
            <div className="bg-gradient-to-r from-satsuma-800 to-satsuma-700 text-white rounded-2xl p-6 mb-8">
              <div className="flex flex-col sm:flex-row gap-6 items-start">
                <div className="flex-1">
                  <p className="font-bold text-wagold-300 text-sm mb-2">
                    鹿児島ならではの核心スキル
                  </p>
                  <h3 className="font-bold text-xl mb-3">温泉入浴介助</h3>
                  <p className="text-white/80 text-sm leading-relaxed">
                    「温泉に入りたいけど、一人では無理」——そんな方が鹿児島にはたくさんいます。
                    福田が鹿児島県内全域で積み上げた入浴介助の実績を直接学べるのは、このプログラムだけです。
                  </p>
                </div>
                <div className="flex-shrink-0 text-center">
                  <div className="text-5xl mb-2">♨️</div>
                  <p className="text-xs text-white/60">第03章にて実技演習</p>
                </div>
              </div>
            </div>

            {/* 概要テーブル */}
            <div className="bg-gray-50 rounded-2xl border border-gray-100 overflow-hidden mb-8">
              {[
                {
                  label: "全体時間",
                  value: "約12時間（半日×3回 または 1日×2回）",
                },
                { label: "場所", value: "鹿児島市内＋ オンライン録画視聴" },
                {
                  label: "初回開催",
                  value: "2026年11月（法人設立後・先着順）",
                },
                { label: "参加費", value: "有料（説明会にて詳細案内）" },
                {
                  label: "修了後",
                  value: "FUKU-TABI 認定旅行サポーターとして活動可",
                },
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
                仮登録する（無料）
              </Link>
              <Link
                href="/training"
                className="inline-flex items-center justify-center px-8 py-3 bg-white text-satsuma-700 font-bold rounded-xl border border-satsuma-300 hover:bg-satsuma-50 transition-colors"
              >
                カリキュラム詳細を見る
              </Link>
            </div>
          </div>
        </section>

        <CtaSection
          title="あなたの経験が、誰かの旅になる"
          description="介護や旅行が好きな方、人の役に立ちたい方を歓迎します。"
          primaryLabel="サポーター登録を申し込む（無料）"
          primaryHref="/supporter/register"
        />
      </main>
      <Footer />
    </>
  );
}
