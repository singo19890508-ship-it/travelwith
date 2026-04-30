import { setRequestLocale } from "next-intl/server";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Link } from "@/i18n/navigation";
import TrainingRegisterForm from "@/components/training/TrainingRegisterForm";

export async function generateMetadata() {
  return {
    title: "旅行サポーター育成プログラム | FUKU-TABI",
    description:
      "使命から始まる、旅の伴走者養成講座。鍼灸師・介護福祉士・旅行業管理者が直接指導。温泉入浴介助・バリアフリー旅行の実践スキルを学ぶ。",
  };
}

const curriculum = [
  {
    num: "01",
    title: "使命と哲学",
    sub: "なぜ、この仕事をするのか",
    hours: "約2時間",
    points: [
      "使命文を読む・対話する",
      "旅行支援の現場から学ぶ（実際の事例をもとに）",
      "「諦めさせない」という在り方",
      "サポーターとしての心構えと倫理",
    ],
  },
  {
    num: "02",
    title: "知識の基礎",
    sub: "何を知るべきか",
    hours: "約2.5時間",
    points: [
      "障害の種類と特性理解（身体・知的・精神・発達）",
      "高齢者・医療的ケアが必要な方の旅行上の注意",
      "旅行業の仕組みと法律の基礎",
      "外国人旅行者への対応（文化・宗教・言語）",
      "個人情報・プライバシー保護",
    ],
  },
  {
    num: "03",
    title: "実践スキル",
    sub: "何ができるようになるか",
    hours: "約3時間（実技中心）",
    points: [
      "移動支援（車椅子・移乗・歩行介助）",
      "温泉入浴介助（鹿児島の核心スキル）",
      "食事・排泄の基礎",
      "緊急時対応（急変・転倒・救急要請）",
      "コミュニケーション技術",
    ],
    highlight: true,
  },
  {
    num: "04",
    title: "旅行サポートの実践",
    sub: "どう動くか",
    hours: "約2.5時間",
    points: [
      "旅行前の準備（医療情報・保険・持ち物）",
      "バリアフリー情報の調べ方",
      "鹿児島の観光地・温泉・宿泊施設の実情",
      "実例研究（長崎・京都・東京・神戸・広島）",
      "特別研修ツアー：日置市美山（薩摩焼×抹茶体験）",
    ],
    tour: true,
  },
  {
    num: "05",
    title: "コミュニティと働き方",
    sub: "どう続けるか",
    hours: "約2時間",
    points: [
      "FUKU-TABIプラットフォームの使い方",
      "副業としての現実的な働き方・報酬",
      "リスク管理と保険",
      "サポーター同士のつながり・定期勉強会",
      "将来の資格制度・キャリアパス",
    ],
  },
];

export default async function TrainingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Header />
      <main>
        {/* ヒーロー：使命 */}
        <section className="relative bg-satsuma-800 text-white overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-satsuma-900 via-satsuma-800 to-kinko-800 opacity-90" />
          <div className="relative max-w-3xl mx-auto px-4 py-20 text-center">
            <div className="inline-flex items-center gap-2 bg-white/15 border border-white/25 text-white text-sm font-semibold px-4 py-1.5 rounded-full mb-8 backdrop-blur-sm">
              <span className="w-2 h-2 bg-wagold-400 rounded-full animate-pulse" />
              旅行サポーター育成プログラム
            </div>
            <h1 className="text-3xl md:text-4xl font-bold leading-relaxed mb-8 drop-shadow-lg">
              使命から始まる、
              <br />
              <span className="text-wagold-400">旅の伴走者養成講座</span>
            </h1>
            <div className="text-left bg-white/10 border border-white/20 rounded-2xl p-6 md:p-8 backdrop-blur-sm text-white/90 leading-loose text-sm md:text-base space-y-2">
              <p>あなたがもし、介護が必要でも 障害があっても 病気になっても</p>
              <p className="font-semibold text-white">
                暮らしの中に喜びを抱いていてほしい
              </p>
              <p className="mt-3">
                やりたいことをやって 行きたいとこに行って 会いたい人に会って
              </p>
              <p className="font-semibold text-white">
                かけがえのない人生を楽しんでほしい
              </p>
              <p className="mt-4 text-wagold-300 font-bold text-base md:text-lg">
                そんな気持ちで目の前にいる人を支援してくれる方を募集してます。
              </p>
            </div>
          </div>
        </section>

        {/* プログラム概要 */}
        <section className="max-w-2xl mx-auto px-4 py-14">
          <p className="text-satsuma-600 font-semibold text-sm mb-3 text-center">
            OVERVIEW
          </p>
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-8 text-center">
            プログラム概要
          </h2>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {[
              {
                label: "全体時間",
                value: "約12時間（半日×3回 または 1日×2回）",
              },
              {
                label: "開催場所",
                value: "鹿児島市内（実習含む）＋ オンライン録画視聴",
              },
              { label: "初回開催", value: "2026年11月（法人設立後）" },
              { label: "参加費", value: "有料（事前説明会にて詳細をご案内）" },
              {
                label: "修了後",
                value: "FUKU-TABI 認定旅行サポーターとして活動可能",
              },
            ].map((row, i) => (
              <div
                key={row.label}
                className={`flex ${i % 2 === 0 ? "bg-white" : "bg-sunaha-50"} border-b border-gray-100 last:border-0`}
              >
                <div className="w-32 md:w-40 py-4 px-5 text-sm font-medium text-gray-600 border-r border-gray-100 flex-shrink-0">
                  {row.label}
                </div>
                <div className="py-4 px-5 text-sm text-gray-800">
                  {row.value}
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-3 text-center">
            ※ 能力と人柄を重視した選考があります。資格・経験は問いません。
          </p>
        </section>

        {/* カリキュラム */}
        <section className="bg-sunaha-100 py-14 px-4">
          <div className="max-w-3xl mx-auto">
            <p className="text-satsuma-600 font-semibold text-sm mb-3 text-center">
              CURRICULUM
            </p>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-10 text-center">
              全5章カリキュラム
            </h2>
            <div className="space-y-5">
              {curriculum.map((ch) => (
                <div
                  key={ch.num}
                  className={`bg-white rounded-2xl shadow-sm border overflow-hidden ${
                    ch.highlight
                      ? "border-wagold-400 ring-1 ring-wagold-300"
                      : ch.tour
                        ? "border-kinko-400 ring-1 ring-kinko-200"
                        : "border-gray-100"
                  }`}
                >
                  <div
                    className={`px-5 py-4 flex items-start gap-4 ${
                      ch.highlight
                        ? "bg-gradient-to-r from-wagold-50 to-white"
                        : ch.tour
                          ? "bg-gradient-to-r from-kinko-50 to-white"
                          : ""
                    }`}
                  >
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg flex-shrink-0 ${
                        ch.highlight
                          ? "bg-wagold-100 text-wagold-700"
                          : ch.tour
                            ? "bg-kinko-100 text-kinko-700"
                            : "bg-satsuma-100 text-satsuma-700"
                      }`}
                    >
                      {ch.num}
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <h3 className="font-bold text-gray-900 text-base">
                          第{ch.num}章：{ch.title}
                        </h3>
                        {ch.highlight && (
                          <span className="text-xs bg-wagold-100 text-wagold-700 font-semibold px-2 py-0.5 rounded-full">
                            ★ 鹿児島の核心スキル
                          </span>
                        )}
                        {ch.tour && (
                          <span className="text-xs bg-kinko-100 text-kinko-700 font-semibold px-2 py-0.5 rounded-full">
                            ✦ 特別研修ツアーあり
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-500 mb-3">
                        〜{ch.sub}〜　{ch.hours}
                      </p>
                      <ul className="space-y-1.5">
                        {ch.points.map((p) => (
                          <li
                            key={p}
                            className="flex items-start gap-2 text-sm text-gray-700"
                          >
                            <span className="mt-1 w-4 h-4 rounded-full bg-satsuma-100 text-satsuma-600 flex items-center justify-center flex-shrink-0 text-xs font-bold">
                              ✓
                            </span>
                            {p}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 特別ハイライト：温泉入浴介助 */}
        <section className="py-14 px-4 bg-white">
          <div className="max-w-2xl mx-auto">
            <div className="bg-gradient-to-br from-wagold-50 to-sunaha-100 border border-wagold-200 rounded-2xl p-6 md:p-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">♨️</span>
                <h3 className="font-bold text-gray-900 text-lg">
                  温泉入浴介助 ── 鹿児島にしかできない支援
                </h3>
              </div>
              <p className="text-gray-700 text-sm leading-relaxed mb-4">
                温泉王国・鹿児島。しかし「行きたくても入れない」という方が数多くいます。
                本プログラムでは、福田真悟が鹿児島県内全域で積み上げてきた入浴介助の実績をもとに、
                他では学べない実践的なスキルを直接指導します。
              </p>
              <ul className="space-y-2 text-sm text-gray-700">
                {[
                  "脱衣・着衣の介助（プライバシーに配慮した手順）",
                  "浴室内での安全確保（滑り・転倒・溺水防止）",
                  "障害・疾患別の対応（麻痺・心疾患・皮膚疾患）",
                  "混浴・貸切風呂の活用方法",
                  "実習：実際の温泉施設での演習（予定）",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="text-wagold-500 mt-0.5">▶</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* 特別研修ツアー：美山 */}
        <section className="py-14 px-4 bg-sunaha-100">
          <div className="max-w-2xl mx-auto">
            <div className="bg-gradient-to-br from-kinko-50 to-white border border-kinko-200 rounded-2xl p-6 md:p-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">🍵</span>
                <h3 className="font-bold text-gray-900 text-lg">
                  特別研修ツアー：日置市美山
                  <br />
                  <span className="text-base font-medium text-kinko-700">
                    薩摩焼の茶碗で愉しむ本格抹茶体験
                  </span>
                </h3>
              </div>
              <p className="text-gray-700 text-sm leading-relaxed mb-4">
                世界的な抹茶ブームと薩摩焼の美しさが交わる、日置市美山（苗代川）。
                研修の締めくくりとして、薩摩焼の器で本格抹茶を体験し、お土産に抹茶セットをお持ち帰りいただきます。
              </p>
              <div className="bg-white/70 rounded-xl p-4 text-sm text-gray-700 space-y-2 mb-4">
                <p className="font-semibold text-kinko-700">
                  このツアーが持つ意味：
                </p>
                <p>
                  ① サポーターとして体験 →
                  そのまま外国人ゲストへの案内ができるようになる
                </p>
                <p>② この体験がFUKU-TABIのツアー商品として販売される</p>
                <p>③ インスタ映えするコンテンツで集客・PRにも</p>
              </div>
              <p className="text-xs text-gray-500">
                ※ バリアフリー観光ルートとしての可能性も現地で確認します。
              </p>
            </div>
          </div>
        </section>

        {/* 修了要件 */}
        <section className="py-14 px-4 bg-white">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-satsuma-600 font-semibold text-sm mb-3">
              CERTIFICATION
            </p>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-8">
              修了と認定
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {[
                {
                  step: "01",
                  label: "全章受講",
                  desc: "5章すべてに出席\n（オンライン視聴含む）",
                },
                {
                  step: "02",
                  label: "実技確認",
                  desc: "移動支援・入浴介助の\n基本動作を確認",
                },
                {
                  step: "03",
                  label: "面談",
                  desc: "能力と人柄の確認\n（約15〜20分）",
                },
              ].map((s) => (
                <div
                  key={s.step}
                  className="bg-satsuma-50 rounded-2xl p-5 border border-satsuma-100"
                >
                  <div className="w-10 h-10 rounded-full bg-satsuma-600 text-white font-bold text-sm flex items-center justify-center mx-auto mb-3">
                    {s.step}
                  </div>
                  <p className="font-bold text-gray-900 mb-1">{s.label}</p>
                  <p className="text-xs text-gray-600 whitespace-pre-line">
                    {s.desc}
                  </p>
                </div>
              ))}
            </div>
            <div className="bg-satsuma-600 text-white rounded-2xl p-5">
              <p className="font-bold text-lg mb-1">
                🎓 FUKU-TABI 認定旅行サポーター
              </p>
              <p className="text-sm text-satsuma-100">
                修了証を発行。FUKU-TABIプラットフォームに登録し、活動を開始できます。
              </p>
            </div>
            <p className="text-xs text-gray-500 mt-4">
              ※
              面談は選考ではなく、あなたの得意・不得意を一緒に確認する場です。ただし、一緒に旅に出る仲間として、思いと誠実さは見させてください。
            </p>
          </div>
        </section>

        {/* 講師プロフィール */}
        <section className="bg-satsuma-800 text-white py-14 px-4">
          <div className="max-w-2xl mx-auto">
            <p className="text-wagold-400 font-semibold text-sm mb-3 text-center">
              INSTRUCTOR
            </p>
            <h2 className="text-xl font-bold mb-8 text-center">
              講師プロフィール
            </h2>
            <div className="bg-white/10 border border-white/20 rounded-2xl p-6 md:p-8">
              <p className="font-bold text-xl mb-1">福田 真悟</p>
              <p className="text-satsuma-200 text-sm mb-5">
                鹿児島県出身 / 1989年生まれ
              </p>
              <p className="text-white/90 text-sm leading-relaxed mb-5">
                22歳から旅行サポートを始め、旅行を諦めてきた方々と鹿児島・長崎・京都・東京・神戸・広島を旅してきた。鹿児島の温泉入浴介助に豊富な実績を持つ。訪問鍼灸と高齢者施設での音楽ボランティアも続けている。
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  "鍼灸師",
                  "介護福祉士",
                  "介護支援専門員",
                  "保育士",
                  "国内旅行業務取扱管理者",
                  "医療的ケア児等支援者",
                  "子育て支援員",
                ].map((q) => (
                  <span
                    key={q}
                    className="text-xs bg-white/15 border border-white/25 rounded-full px-3 py-1"
                  >
                    {q}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 仮登録フォーム */}
        <section className="py-16 px-4 bg-white" id="register">
          <div className="max-w-lg mx-auto">
            <p className="text-satsuma-600 font-semibold text-sm mb-3 text-center">
              PRE-REGISTRATION
            </p>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 text-center">
              仮登録（無料）
            </h2>
            <p className="text-gray-500 text-sm text-center mb-8 leading-relaxed">
              開催が決まり次第、優先的にご案内します。
              <br />
              初回は2026年11月を予定しています。
            </p>
            <TrainingRegisterForm />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
