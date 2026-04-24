import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Link from "next/link";

export const metadata: Metadata = {
  title: "連携パートナー | FUKU-TABI",
  description:
    "FUKU-TABIが連携する福祉タクシー会社をご紹介します。車椅子対応車両・有資格ドライバーで、移動の不安をゼロにします。",
};

const vehicleFeatures = [
  "車椅子リフト付き（電動車椅子対応）",
  "ストレッチャー対応車両あり",
  "乗降介助・移乗サポート",
  "鹿児島空港・鹿児島中央駅からの直接送迎",
  "観光地間のチャーター運行",
  "緊急時の対応マニュアル整備済み",
];

const driverQualifications = [
  "介護福祉士",
  "介護職員初任者研修（旧ヘルパー2級）修了",
  "福祉有償運送運転者講習修了",
  "普通・大型第二種運転免許",
];

export default function PartnerPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        {/* ヒーロー */}
        <section className="bg-teal-700 text-white py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block bg-teal-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-4 tracking-wide">
              PARTNER
            </span>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              連携パートナー
            </h1>
            <p className="text-teal-100 text-lg max-w-2xl mx-auto leading-relaxed">
              FUKU-TABIは、鹿児島の福祉タクシー会社と正式に連携しています。
              旅のすべての移動を、安心してお任せください。
            </p>
          </div>
        </section>

        {/* 連携の意義 */}
        <section className="py-14 px-4 bg-teal-50">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center text-teal-700 font-bold text-sm">
                  ✓
                </span>
                なぜ福祉タクシーとの連携が重要なのか
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                旅行を諦める理由の多くは「移動できるか不安」という一点につきます。
                介護タクシーを個人で手配するのは複雑で、旅先での急な変更にも対応しにくい。
              </p>
              <p className="text-gray-600 leading-relaxed">
                FUKU-TABIは旅行計画の段階から移動手段を確保し、
                サポーター・ドライバー・旅行者の三者が連携して旅を実現します。
                「移動」は旅の入り口です。ここを安心に変えることが、私たちの使命です。
              </p>
            </div>
          </div>
        </section>

        {/* タクシー会社紹介 */}
        <section className="py-14 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
              連携タクシー会社
            </h2>

            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
              {/* プレースホルダー：後で差し替え */}
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="w-full md:w-48 h-32 bg-gray-200 rounded-xl flex items-center justify-center text-gray-400 text-sm flex-shrink-0">
                  ロゴ・写真（準備中）
                </div>
                <div className="flex-1">
                  <div className="inline-block bg-teal-100 text-teal-700 text-xs font-bold px-2 py-0.5 rounded mb-2">
                    鹿児島市内・近郊対応
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    （タクシー会社名 掲載予定）
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-4">
                    鹿児島市内を中心に、空港・駅・観光地間の福祉輸送を行う専門会社です。
                    FUKU-TABIのツアーに合わせた専属対応が可能です。
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {vehicleFeatures.map((f, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 text-sm text-gray-600"
                      >
                        <svg
                          className="w-4 h-4 text-teal-500 flex-shrink-0"
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
                        {f}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ドライバー資格 */}
        <section className="py-14 px-4 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
              ドライバーの資格・研修
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {driverQualifications.map((q, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl p-4 flex items-center gap-3 shadow-sm"
                >
                  <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-5 h-5 text-teal-600"
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
                  </div>
                  <span className="text-sm font-medium text-gray-700">{q}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-14 px-4 bg-teal-700 text-white text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">まずはご相談ください</h2>
            <p className="text-teal-100 mb-8 leading-relaxed">
              移動手段・送迎エリア・車両の空き状況など、
              お気軽にお問い合わせください。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/traveler/apply"
                className="bg-white text-teal-700 font-bold px-6 py-3 rounded-xl hover:bg-teal-50 transition-colors"
              >
                旅行を申し込む
              </Link>
              <Link
                href="/tours"
                className="border border-white text-white font-bold px-6 py-3 rounded-xl hover:bg-teal-600 transition-colors"
              >
                ツアーを見る
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
