import type { Metadata } from "next";
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
        <PageHeader
          title="旅行に行く"
          description="安心して旅に出るために、まずここから始めましょう"
          color="blue"
        />

        {/* CTAバナー */}
        <section className="bg-blue-600 text-white py-8 px-4">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-white/80 text-sm mb-4">
              ご利用の流れを確認して、すぐに申し込みもできます
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/traveler/apply"
                className="inline-block px-8 py-3 bg-white text-blue-700 font-bold rounded-xl hover:bg-blue-50 transition-colors shadow-sm"
              >
                旅行者として申し込む（無料）
              </Link>
              <Link
                href="/contact"
                className="inline-block px-8 py-3 bg-blue-500 text-white font-bold rounded-xl border border-white/30 hover:bg-blue-400 transition-colors"
              >
                まず相談する
              </Link>
            </div>
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
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-blue-100 hidden sm:block" />
              <div className="space-y-6">
                {steps.map((step, i) => (
                  <div key={i} className="relative flex gap-5 sm:gap-8">
                    <div className="relative flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm z-10">
                      {step.num}
                    </div>
                    <div className="flex-1 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm pb-7">
                      <div className="flex items-start gap-3 mb-3">
                        <div className="flex-shrink-0 mt-0.5 text-blue-600">
                          {stepIcons[i]}
                        </div>
                        <h2 className="text-xl font-bold text-gray-800">
                          {step.title}
                        </h2>
                      </div>
                      <p className="text-gray-600 text-base leading-relaxed mb-3">
                        {step.desc}
                      </p>
                      <div className="flex items-center gap-2 text-sm text-blue-600 bg-blue-50 rounded-lg px-3 py-2 w-fit">
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
          title="一歩踏み出してみませんか"
          description="まずはお気軽にご相談ください。旅行の計画段階でも、具体的なご依頼でも、何でもお聞きします。"
          primaryLabel="旅行者として申し込む（無料）"
          primaryHref="/traveler/apply"
          secondaryLabel="まず相談する"
          secondaryHref="/contact"
        />
      </main>
      <Footer />
    </>
  );
}
