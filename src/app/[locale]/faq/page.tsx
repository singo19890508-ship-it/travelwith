import { getTranslations, setRequestLocale } from "next-intl/server";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CtaSection from "@/components/common/CtaSection";
import FaqAccordion from "@/components/faq/FaqAccordion";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  return { title: t("faqTitle") };
}

export default async function FaqPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("faq");

  const faqItems = [
    { q: t("q1"), a: t("a1"), cat: t("cat1") },
    { q: t("q2"), a: t("a2"), cat: t("cat2") },
    { q: t("q3"), a: t("a3"), cat: t("cat3") },
    { q: t("q4"), a: t("a4"), cat: t("cat4") },
    { q: t("q5"), a: t("a5"), cat: t("cat5") },
    { q: t("q6"), a: t("a6"), cat: t("cat6") },
    { q: t("q7"), a: t("a7"), cat: t("cat7") },
    { q: t("q8"), a: t("a8"), cat: t("cat8") },
    { q: t("q9"), a: t("a9"), cat: t("cat9") },
    { q: t("q10"), a: t("a10"), cat: t("cat10") },
  ];

  const categories = [...new Set(faqItems.map((item) => item.cat))];

  return (
    <>
      <Header />
      <main>
        {/* SVG線画ヒーロー — よくある質問 */}
        <section className="relative bg-teal-700 text-white py-12 md:py-16 overflow-hidden">
          {/* 線画イラスト */}
          <svg
            viewBox="0 0 1000 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute inset-0 w-full h-full"
            preserveAspectRatio="xMidYMid slice"
            aria-hidden="true"
          >
            {/* ── 大きな装飾 ? (背景) ── */}
            {/* ? の弧 */}
            <path
              d="M720 20 C720 20 770 20 770 60 C770 85 740 90 740 110"
              stroke="white"
              strokeWidth="22"
              strokeLinecap="round"
              strokeOpacity="0.07"
            />
            {/* ? のドット */}
            <circle
              cx="740"
              cy="135"
              r="11"
              stroke="white"
              strokeWidth="22"
              strokeOpacity="0.07"
            />

            {/* ── 吹き出し1（質問 Q） ── */}
            <rect
              x="480"
              y="30"
              width="185"
              height="85"
              rx="18"
              stroke="white"
              strokeWidth="2"
              strokeOpacity="0.42"
            />
            {/* 吹き出しの尻尾（左下） */}
            <path
              d="M510 115 L494 138 L530 115"
              stroke="white"
              strokeWidth="2"
              strokeOpacity="0.42"
              fill="white"
              fillOpacity="0.08"
            />
            {/* Q マーク (弧+ドット) */}
            <path
              d="M548 58 C548 50 558 44 568 48 C578 52 582 64 574 72 C570 76 566 78 566 84"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeOpacity="0.6"
            />
            <circle cx="566" cy="92" r="3" fill="white" fillOpacity="0.6" />
            {/* 波線（テキストの代わり） */}
            <path
              d="M598 63 Q610 58 622 63 Q634 68 646 63"
              stroke="white"
              strokeWidth="2"
              strokeOpacity="0.35"
              strokeLinecap="round"
            />
            <path
              d="M598 77 Q615 72 632 77"
              stroke="white"
              strokeWidth="2"
              strokeOpacity="0.28"
              strokeLinecap="round"
            />

            {/* ── 吹き出し2（回答 A） ── */}
            <rect
              x="590"
              y="128"
              width="185"
              height="68"
              rx="18"
              stroke="white"
              strokeWidth="2"
              strokeOpacity="0.32"
            />
            {/* 尻尾（右上） */}
            <path
              d="M750 128 L768 108 L745 128"
              stroke="white"
              strokeWidth="2"
              strokeOpacity="0.32"
              fill="white"
              fillOpacity="0.06"
            />
            {/* チェックマーク（答え） */}
            <path
              d="M622 162 L632 172 L652 150"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeOpacity="0.55"
            />
            {/* 横線（テキスト代わり） */}
            <path
              d="M668 158 Q682 154 696 158 Q710 162 724 158"
              stroke="white"
              strokeWidth="2"
              strokeOpacity="0.28"
              strokeLinecap="round"
            />
            <path
              d="M668 170 Q685 166 702 170"
              stroke="white"
              strokeWidth="2"
              strokeOpacity="0.22"
              strokeLinecap="round"
            />

            {/* ── 虫眼鏡 ── */}
            <circle
              cx="855"
              cy="75"
              r="34"
              stroke="white"
              strokeWidth="2"
              strokeOpacity="0.4"
            />
            <line
              x1="879"
              y1="99"
              x2="910"
              y2="132"
              stroke="white"
              strokeWidth="4"
              strokeLinecap="round"
              strokeOpacity="0.4"
            />
            {/* レンズ内の ? */}
            <path
              d="M844 60 C844 52 854 46 864 50 C874 54 876 66 868 73 C865 76 863 79 863 84"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeOpacity="0.55"
            />
            <circle cx="863" cy="91" r="3" fill="white" fillOpacity="0.55" />

            {/* ── 電球 ── */}
            <path
              d="M940 38 C940 24 956 14 972 18 C988 22 996 38 990 52 C986 60 982 64 982 72 L962 72 C962 64 958 60 954 52 C950 46 940 44 940 38 Z"
              stroke="white"
              strokeWidth="2"
              strokeOpacity="0.38"
            />
            <line
              x1="962"
              y1="72"
              x2="962"
              y2="80"
              stroke="white"
              strokeWidth="2"
              strokeOpacity="0.38"
            />
            <line
              x1="982"
              y1="72"
              x2="982"
              y2="80"
              stroke="white"
              strokeWidth="2"
              strokeOpacity="0.38"
            />
            <line
              x1="960"
              y1="80"
              x2="984"
              y2="80"
              stroke="white"
              strokeWidth="2"
              strokeOpacity="0.38"
              strokeLinecap="round"
            />
            <line
              x1="962"
              y1="86"
              x2="982"
              y2="86"
              stroke="white"
              strokeWidth="2"
              strokeOpacity="0.3"
              strokeLinecap="round"
            />
            {/* 電球の光線 */}
            <line
              x1="972"
              y1="5"
              x2="972"
              y2="0"
              stroke="white"
              strokeWidth="2"
              strokeOpacity="0.35"
              strokeLinecap="round"
            />
            <line
              x1="944"
              y1="14"
              x2="940"
              y2="10"
              stroke="white"
              strokeWidth="2"
              strokeOpacity="0.35"
              strokeLinecap="round"
            />
            <line
              x1="1000"
              y1="14"
              x2="1004"
              y2="10"
              stroke="white"
              strokeWidth="2"
              strokeOpacity="0.3"
              strokeLinecap="round"
            />

            {/* ── 小さな浮遊 ? マーク（散らばり） ── */}
            {/* ? その1 */}
            <path
              d="M420 35 C420 30 426 26 432 29 C438 32 439 40 434 44 C432 46 431 48 431 51"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeOpacity="0.3"
            />
            <circle cx="431" cy="57" r="2.5" fill="white" fillOpacity="0.3" />
            {/* ? その2 */}
            <path
              d="M380 130 C380 125 385 121 390 124 C395 127 396 134 392 138 C390 140 389 142 389 145"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeOpacity="0.22"
            />
            <circle cx="389" cy="150" r="2" fill="white" fillOpacity="0.22" />
            {/* ? その3（右上エリア） */}
            <path
              d="M860 148 C860 144 865 140 870 142 C875 144 876 151 872 155 C870 157 870 159 870 162"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeOpacity="0.25"
            />
            <circle cx="870" cy="167" r="2" fill="white" fillOpacity="0.25" />

            {/* ── 接続ドット（Q→A のつながり） ── */}
            <circle cx="570" cy="160" r="4" fill="white" fillOpacity="0.2" />
            <circle cx="586" cy="160" r="3" fill="white" fillOpacity="0.15" />
            <circle cx="600" cy="160" r="2" fill="white" fillOpacity="0.1" />

            {/* ── 左端の薄い装飾ドット ── */}
            <circle cx="60" cy="40" r="3" fill="white" fillOpacity="0.12" />
            <circle cx="80" cy="70" r="2" fill="white" fillOpacity="0.1" />
            <circle cx="45" cy="95" r="4" fill="white" fillOpacity="0.08" />
            <circle cx="100" cy="130" r="2" fill="white" fillOpacity="0.1" />
            <circle cx="70" cy="160" r="3" fill="white" fillOpacity="0.09" />
          </svg>

          {/* テキスト */}
          <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6">
            <h1 className="text-3xl md:text-4xl font-bold mb-3 leading-tight">
              {t("pageTitle")}
            </h1>
            {t("pageDescription") && (
              <p className="text-white/80 text-lg leading-relaxed">
                {t("pageDescription")}
              </p>
            )}
          </div>
        </section>
        <section className="max-w-3xl mx-auto px-4 py-12">
          <FaqAccordion
            items={faqItems}
            categories={categories}
            labelAll={t("catAll")}
            noResult={t("noResult")}
          />
        </section>
        <CtaSection
          title={t("ctaTitle")}
          description={t("ctaDescription")}
          primaryLabel={t("ctaButton")}
          primaryHref="/contact"
        />
      </main>
      <Footer />
    </>
  );
}
