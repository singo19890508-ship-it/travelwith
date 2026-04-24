import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Link from "next/link";

export const metadata: Metadata = {
  title: "ツアー一覧 | FUKU-TABI",
  description:
    "車椅子・介護が必要な方向けの鹿児島バリアフリーツアー。福祉タクシー＋介助サポーター付きで、安心して旅を楽しめます。",
};

const tours = [
  {
    id: "sakurajima-onsen",
    badge: "人気No.1",
    badgeColor: "bg-orange-500",
    title: "桜島と霧島温泉 ゆったり1泊2日",
    subtitle: "鹿児島を代表する絶景と名湯を、介助付きで",
    duration: "1泊2日",
    area: "鹿児島市・霧島市",
    price: "¥58,000〜",
    priceNote: "（1名・介助費用込み）",
    tags: ["車椅子対応", "温泉入浴介助あり", "福祉タクシー送迎"],
    highlights: [
      "桜島フェリーで雄大な景色を体感",
      "バリアフリー対応の霧島温泉旅館",
      "温泉入浴介助（有資格サポーター同行）",
      "空港〜ホテル間リフト付き車両で送迎",
    ],
    status: "準備中",
  },
  {
    id: "ibusuki-satsumaimo",
    badge: "鹿児島限定",
    badgeColor: "bg-teal-600",
    title: "指宿砂むし温泉と薩摩の食めぐり",
    subtitle: "砂むし体験と新鮮な薩摩料理を楽しむ日帰りツアー",
    duration: "日帰り",
    area: "指宿市",
    price: "¥28,000〜",
    priceNote: "（1名・介助費用込み）",
    tags: ["車椅子対応", "日帰り", "食事付き"],
    highlights: [
      "指宿名物・砂むし温泉を安心体験",
      "バリアフリー対応施設のみ厳選",
      "新鮮な地魚・薩摩料理のランチ付き",
      "往復リフト付き専用車両",
    ],
    status: "準備中",
  },
  {
    id: "kagoshima-city",
    badge: "初めての方に",
    badgeColor: "bg-blue-600",
    title: "鹿児島市内 歴史と文化の半日散策",
    subtitle: "仙巌園・城山・維新ふるさと館を介助サポーターと巡る",
    duration: "半日（約5時間）",
    area: "鹿児島市内",
    price: "¥18,000〜",
    priceNote: "（1名・介助費用込み）",
    tags: ["車椅子対応", "半日", "市内観光"],
    highlights: [
      "世界文化遺産・仙巌園をゆっくり見学",
      "城山展望台から桜島の絶景",
      "維新ふるさと館（バリアフリー完備）",
      "鹿児島中央駅発着",
    ],
    status: "準備中",
  },
];

export default function ToursPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        {/* ヒーロー */}
        <section className="bg-satsuma-800 text-white py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block bg-satsuma-600 text-white text-xs font-bold px-3 py-1 rounded-full mb-4 tracking-wide">
              TOURS
            </span>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              バリアフリーツアー
            </h1>
            <p className="text-satsuma-100 text-lg max-w-2xl mx-auto leading-relaxed">
              福祉タクシー＋介助サポーターがセットになった、
              鹿児島のバリアフリーツアーをご用意しています。
              「移動」「介助」「観光」すべてお任せください。
            </p>
          </div>
        </section>

        {/* 準備中バナー */}
        <div className="bg-amber-50 border-b border-amber-200 py-3 px-4 text-center">
          <p className="text-amber-700 text-sm font-medium">
            ⚡ 現在ツアーを準備中です。詳細・予約は
            <Link href="/traveler/apply" className="underline font-bold ml-1">
              まずご相談
            </Link>
            ください。
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
                    <span className="text-gray-400 text-sm">
                      写真（準備中）
                    </span>
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
                        申し込む・相談する
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
              希望のツアーが見当たらない方へ
            </h2>
            <p className="text-gray-500 mb-8 leading-relaxed">
              行きたい場所・泊まりたい宿・必要な介助内容をお聞かせください。
              オーダーメイドのプランをご提案します。
            </p>
            <Link
              href="/traveler/apply"
              className="inline-block bg-teal-600 hover:bg-teal-700 text-white font-bold px-8 py-3 rounded-xl transition-colors"
            >
              お問い合わせ・ご相談
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
