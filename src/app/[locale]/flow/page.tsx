import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CtaSection from "@/components/common/CtaSection";
import { Link } from "@/i18n/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  return { title: t("flowTitle"), description: t("description") };
}

const stepIcons = [
  <svg
    key="1"
    className="w-7 h-7"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
    />
  </svg>,
  <svg
    key="2"
    className="w-7 h-7"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
    />
  </svg>,
  <svg
    key="3"
    className="w-7 h-7"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
    />
  </svg>,
  <svg
    key="4"
    className="w-7 h-7"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>,
  <svg
    key="5"
    className="w-7 h-7"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064"
    />
  </svg>,
  <svg
    key="6"
    className="w-7 h-7"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
    />
  </svg>,
];

export default async function FlowPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("flow");

  const steps = [
    {
      num: t("step1Number"),
      title: t("step1Title"),
      desc: t("step1Description"),
      note: t("step1Note"),
    },
    {
      num: t("step2Number"),
      title: t("step2Title"),
      desc: t("step2Description"),
      note: t("step2Note"),
    },
    {
      num: t("step3Number"),
      title: t("step3Title"),
      desc: t("step3Description"),
      note: t("step3Note"),
    },
    {
      num: t("step4Number"),
      title: t("step4Title"),
      desc: t("step4Description"),
      note: t("step4Note"),
    },
    {
      num: t("step5Number"),
      title: t("step5Title"),
      desc: t("step5Description"),
      note: t("step5Note"),
    },
    {
      num: t("step6Number"),
      title: t("step6Title"),
      desc: t("step6Description"),
      note: t("step6Note"),
    },
  ];

  return (
    <>
      <Header />
      <main>
        {/* SVG線画ヒーロー */}
        <section className="relative text-white py-20 md:py-28 overflow-hidden bg-satsuma-900">
          {/* 線画イラスト */}
          <svg
            viewBox="0 0 1000 300"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute inset-0 w-full h-full"
            preserveAspectRatio="xMidYMid slice"
            aria-hidden="true"
          >
            {/* 遠景の丘 */}
            <path
              d="M0 255 Q150 215 300 238 Q450 262 600 232 Q750 202 900 228 Q960 238 1000 232 L1000 300 L0 300 Z"
              stroke="white"
              strokeWidth="1"
              strokeOpacity="0.18"
              fill="white"
              fillOpacity="0.05"
            />
            {/* 手前の丘 */}
            <path
              d="M0 278 Q200 255 400 268 Q600 282 800 258 Q900 248 1000 262 L1000 300 L0 300 Z"
              stroke="white"
              strokeWidth="1"
              strokeOpacity="0.12"
              fill="white"
              fillOpacity="0.04"
            />

            {/* 桜島（メイン） */}
            <path
              d="M670 300 L748 162 L826 300"
              stroke="white"
              strokeWidth="2"
              strokeOpacity="0.5"
            />
            {/* 桜島（サブ） */}
            <path
              d="M720 300 L792 188 L864 300"
              stroke="white"
              strokeWidth="1.5"
              strokeOpacity="0.32"
            />
            {/* 火口縁 */}
            <path
              d="M737 167 Q748 160 759 167"
              stroke="white"
              strokeWidth="2"
              strokeOpacity="0.6"
            />
            {/* 噴煙 */}
            <path
              d="M748 158 Q743 144 750 130 Q757 116 748 102"
              stroke="white"
              strokeWidth="1.5"
              strokeOpacity="0.38"
              strokeLinecap="round"
            />
            <path
              d="M756 162 Q763 146 758 130 Q753 114 762 100"
              stroke="white"
              strokeWidth="1.5"
              strokeOpacity="0.28"
              strokeLinecap="round"
            />

            {/* 太陽 */}
            <circle
              cx="890"
              cy="68"
              r="26"
              stroke="white"
              strokeWidth="2"
              strokeOpacity="0.5"
            />
            <line
              x1="890"
              y1="34"
              x2="890"
              y2="24"
              stroke="white"
              strokeWidth="2"
              strokeOpacity="0.5"
            />
            <line
              x1="890"
              y1="102"
              x2="890"
              y2="112"
              stroke="white"
              strokeWidth="2"
              strokeOpacity="0.5"
            />
            <line
              x1="856"
              y1="68"
              x2="846"
              y2="68"
              stroke="white"
              strokeWidth="2"
              strokeOpacity="0.5"
            />
            <line
              x1="924"
              y1="68"
              x2="934"
              y2="68"
              stroke="white"
              strokeWidth="2"
              strokeOpacity="0.5"
            />
            <line
              x1="866"
              y1="42"
              x2="859"
              y2="35"
              stroke="white"
              strokeWidth="2"
              strokeOpacity="0.5"
            />
            <line
              x1="914"
              y1="94"
              x2="921"
              y2="101"
              stroke="white"
              strokeWidth="2"
              strokeOpacity="0.5"
            />
            <line
              x1="914"
              y1="42"
              x2="921"
              y2="35"
              stroke="white"
              strokeWidth="2"
              strokeOpacity="0.5"
            />
            <line
              x1="866"
              y1="94"
              x2="859"
              y2="101"
              stroke="white"
              strokeWidth="2"
              strokeOpacity="0.5"
            />

            {/* 鳥 */}
            <path
              d="M140 55 Q149 49 158 55"
              stroke="white"
              strokeWidth="1.5"
              strokeOpacity="0.5"
            />
            <path
              d="M168 42 Q177 36 186 42"
              stroke="white"
              strokeWidth="1.5"
              strokeOpacity="0.5"
            />
            <path
              d="M200 68 Q209 62 218 68"
              stroke="white"
              strokeWidth="1.5"
              strokeOpacity="0.4"
            />
            <path
              d="M558 42 Q567 36 576 42"
              stroke="white"
              strokeWidth="1.5"
              strokeOpacity="0.4"
            />
            <path
              d="M586 56 Q595 50 604 56"
              stroke="white"
              strokeWidth="1.5"
              strokeOpacity="0.35"
            />

            {/* 点線の道 */}
            <path
              d="M0 292 Q100 282 180 278 Q290 268 360 272 Q455 280 528 270 Q600 258 680 262"
              stroke="white"
              strokeWidth="2"
              strokeOpacity="0.42"
              strokeDasharray="14 7"
            />

            {/* 温泉マーク（山の近く） */}
            <path
              d="M910 188 Q906 175 911 162 Q916 149 910 136"
              stroke="white"
              strokeWidth="1.5"
              strokeOpacity="0.38"
              strokeLinecap="round"
            />
            <path
              d="M926 192 Q922 179 927 166 Q932 153 926 140"
              stroke="white"
              strokeWidth="1.5"
              strokeOpacity="0.3"
              strokeLinecap="round"
            />
            <path
              d="M942 188 Q938 175 943 162 Q948 149 942 136"
              stroke="white"
              strokeWidth="1.5"
              strokeOpacity="0.25"
              strokeLinecap="round"
            />
            <path
              d="M898 202 Q920 208 952 202"
              stroke="white"
              strokeWidth="1.5"
              strokeOpacity="0.38"
            />
            <path
              d="M898 212 Q920 218 952 212"
              stroke="white"
              strokeWidth="1.5"
              strokeOpacity="0.28"
            />

            {/* 目的地ピン */}
            <path
              d="M515 244 C515 235 522 228 531 228 C540 228 547 235 547 244 C547 255 531 268 531 268 C531 268 515 255 515 244 Z"
              stroke="white"
              strokeWidth="2"
              strokeOpacity="0.52"
            />
            <circle
              cx="531"
              cy="243"
              r="5"
              stroke="white"
              strokeWidth="1.5"
              strokeOpacity="0.52"
            />

            {/* 電車シルエット（遠景） */}
            <rect
              x="18"
              y="248"
              width="82"
              height="28"
              rx="4"
              stroke="white"
              strokeWidth="1.5"
              strokeOpacity="0.28"
            />
            <rect
              x="26"
              y="254"
              width="12"
              height="9"
              rx="1"
              stroke="white"
              strokeWidth="1"
              strokeOpacity="0.28"
            />
            <rect
              x="44"
              y="254"
              width="12"
              height="9"
              rx="1"
              stroke="white"
              strokeWidth="1"
              strokeOpacity="0.28"
            />
            <rect
              x="62"
              y="254"
              width="12"
              height="9"
              rx="1"
              stroke="white"
              strokeWidth="1"
              strokeOpacity="0.28"
            />
            <circle
              cx="33"
              cy="278"
              r="3.5"
              stroke="white"
              strokeWidth="1"
              strokeOpacity="0.28"
            />
            <circle
              cx="83"
              cy="278"
              r="3.5"
              stroke="white"
              strokeWidth="1"
              strokeOpacity="0.28"
            />

            {/* 旅行者（左寄り） */}
            {/* 頭 */}
            <circle cx="300" cy="195" r="18" stroke="white" strokeWidth="2.5" />
            {/* 体 */}
            <line
              x1="300"
              y1="213"
              x2="300"
              y2="260"
              stroke="white"
              strokeWidth="2.5"
            />
            {/* 右腕（前方へ） */}
            <line
              x1="300"
              y1="228"
              x2="328"
              y2="242"
              stroke="white"
              strokeWidth="2.5"
            />
            {/* 左腕（スーツケースへ） */}
            <line
              x1="300"
              y1="228"
              x2="272"
              y2="240"
              stroke="white"
              strokeWidth="2.5"
            />
            {/* 左足 */}
            <line
              x1="300"
              y1="260"
              x2="284"
              y2="292"
              stroke="white"
              strokeWidth="2.5"
            />
            {/* 右足（踏み出し） */}
            <line
              x1="300"
              y1="260"
              x2="316"
              y2="292"
              stroke="white"
              strokeWidth="2.5"
            />
            {/* スーツケース本体 */}
            <rect
              x="250"
              y="240"
              width="24"
              height="30"
              rx="3"
              stroke="white"
              strokeWidth="2.5"
            />
            <line
              x1="250"
              y1="252"
              x2="274"
              y2="252"
              stroke="white"
              strokeWidth="1.5"
            />
            {/* ハンドル */}
            <path
              d="M257 240 L257 234 L267 234 L267 240"
              stroke="white"
              strokeWidth="2"
            />
            {/* キャスター */}
            <circle cx="256" cy="270" r="3" stroke="white" strokeWidth="2" />
            <circle cx="268" cy="270" r="3" stroke="white" strokeWidth="2" />
            {/* 笑顔 */}
            <path
              d="M294 193 Q300 198 306 193"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
            />

            {/* サポーター（旅行者の右・やや背高） */}
            {/* 頭 */}
            <circle cx="372" cy="182" r="20" stroke="white" strokeWidth="2.5" />
            {/* 体 */}
            <line
              x1="372"
              y1="202"
              x2="372"
              y2="256"
              stroke="white"
              strokeWidth="2.5"
            />
            {/* 左腕（旅行者へ） */}
            <line
              x1="372"
              y1="222"
              x2="330"
              y2="238"
              stroke="white"
              strokeWidth="2.5"
            />
            {/* 右腕 */}
            <line
              x1="372"
              y1="222"
              x2="396"
              y2="238"
              stroke="white"
              strokeWidth="2.5"
            />
            {/* 左足 */}
            <line
              x1="372"
              y1="256"
              x2="356"
              y2="292"
              stroke="white"
              strokeWidth="2.5"
            />
            {/* 右足 */}
            <line
              x1="372"
              y1="256"
              x2="388"
              y2="292"
              stroke="white"
              strokeWidth="2.5"
            />
            {/* 笑顔 */}
            <path
              d="M366 180 Q372 185 378 180"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
            />

            {/* 二人の間のハート */}
            <path
              d="M336 212 C336 209 339 207 342 210 C345 207 348 209 348 212 C348 216 342 221 342 221 C342 221 336 216 336 212 Z"
              stroke="white"
              strokeWidth="1.5"
              fill="white"
              fillOpacity="0.3"
              strokeOpacity="0.7"
            />
          </svg>

          {/* グラデーションオーバーレイ（左を暗く） */}
          <div className="absolute inset-0 bg-gradient-to-r from-satsuma-900/92 via-satsuma-800/65 to-transparent" />

          {/* テキストコンテンツ */}
          <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6">
            <p className="text-satsuma-200 text-sm font-semibold tracking-widest uppercase mb-3">
              How It Works
            </p>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              {t("pageTitle")}
            </h1>
            <p className="text-white/85 text-lg md:text-xl leading-relaxed max-w-xl">
              {t("pageDescription")}
            </p>
          </div>
        </section>

        {/* 福祉タクシー連携バナー */}
        <section className="py-8 px-4 bg-teal-50 border-b border-teal-100">
          <div className="max-w-3xl mx-auto">
            <div className="flex flex-col sm:flex-row items-center gap-4 bg-white rounded-2xl p-5 shadow-sm">
              <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-6 h-6 text-teal-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                  />
                </svg>
              </div>
              <div className="flex-1 text-center sm:text-left">
                <p className="font-bold text-gray-800 mb-0.5">
                  移動の不安ゼロ — 福祉タクシー連携あり
                </p>
                <p className="text-sm text-gray-500">
                  空港・駅からのお迎え、観光地間の移動まで、リフト付き専用車両でサポートします。
                </p>
              </div>
              <Link
                href="/partner"
                className="text-sm font-bold text-teal-600 hover:text-teal-700 whitespace-nowrap flex items-center gap-1"
              >
                詳しく見る
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
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        <section className="py-12 bg-gray-50">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <p className="text-center text-gray-600 text-base mb-12 leading-relaxed">
              {t("intro")}
            </p>
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-satsuma-100 hidden sm:block" />
              <div className="space-y-6">
                {steps.map((step, i) => (
                  <div key={i} className="relative flex gap-5 sm:gap-8">
                    <div className="relative flex-shrink-0 w-12 h-12 bg-satsuma-600 text-white rounded-full flex items-center justify-center font-bold text-sm z-10">
                      {step.num}
                    </div>
                    <div className="flex-1 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm pb-7">
                      <div className="flex items-start gap-3 mb-3">
                        <div className="flex-shrink-0 mt-0.5 text-satsuma-600">
                          {stepIcons[i]}
                        </div>
                        <h2 className="text-xl font-bold text-gray-800">
                          {step.title}
                        </h2>
                      </div>
                      <p className="text-gray-600 text-base leading-relaxed mb-3">
                        {step.desc}
                      </p>
                      <div className="flex items-center gap-2 text-sm text-satsuma-600 bg-satsuma-50 rounded-lg px-3 py-2 w-fit">
                        <svg
                          className="w-4 h-4 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        {step.note}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        <CtaSection
          title={t("ctaSectionTitle")}
          description={t("ctaSectionDesc")}
          primaryLabel={t("ctaSectionButton")}
          primaryHref="/traveler/apply"
        />
      </main>
      <Footer />
    </>
  );
}
