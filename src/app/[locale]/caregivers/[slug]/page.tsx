import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { getCaregiverBySlug } from "@/lib/caregivers";

const AGE_RANGE_KEYS: Record<string, string> = {
  "20代": "age20s",
  "30代": "age30s",
  "40代": "age40s",
  "50代": "age50s",
  "60代以上": "age60s",
};

const REGION_LABEL_KEYS: Record<string, string> = {
  "鹿児島市内": "regionKagoshima",
  "薩摩半島": "regionSatsuma",
  "大隅半島": "regionOsumi",
  "奄美大島": "regionAmami",
  "離島・その他": "regionRemote",
  "全県対応": "regionAll",
};

const SUPPORT_LABEL_KEYS: Record<string, string> = {
  wheelchair: "supportWheelchair",
  walking: "supportWalking",
  meal: "supportMeal",
  restroom: "supportRestroom",
  visual: "supportVisual",
  communication: "supportCommunication",
  luggage: "supportLuggage",
  transportation: "supportTransportation",
  medication: "supportMedication",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const caregiver = await getCaregiverBySlug(slug);
  if (!caregiver) return {};
  const t = await getTranslations({ locale, namespace: "metadata" });
  return { title: `${caregiver.name} | ${t("caregiversTitle")}` };
}

export default async function CaregiverDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const caregiver = await getCaregiverBySlug(slug);
  if (!caregiver) notFound();

  const t = await getTranslations("caregivers");

  return (
    <>
      <Header />
      <main className="bg-gray-50 min-h-screen">
        {/* Hero banner */}
        <div className="bg-gradient-to-r from-blue-800 via-blue-700 to-teal-600 text-white py-12 px-4">
          <div className="max-w-3xl mx-auto flex items-center gap-6">
            <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
              <svg className="w-12 h-12 text-white/80" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">{caregiver.name}</h1>
              <p className="mt-1 text-blue-100">
                {AGE_RANGE_KEYS[caregiver.age_range] ? t(AGE_RANGE_KEYS[caregiver.age_range] as Parameters<typeof t>[0]) : caregiver.age_range} ·{" "}
                {caregiver.gender === "female" ? t("genderFemale") : t("genderMale")}
              </p>
              {caregiver.training_completed && (
                <span className="inline-block mt-2 text-xs bg-teal-400/30 border border-teal-300 text-white px-3 py-1 rounded-full">
                  {t("trainingBadge")}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-3xl mx-auto px-4 py-10 space-y-8">
          {/* Message card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">
              {t("message")}
            </h2>
            <blockquote className="text-gray-700 leading-relaxed border-l-4 border-blue-400 pl-4 italic">
              {caregiver.message}
            </blockquote>
          </div>

          {/* Detail message */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {caregiver.detail_message}
            </p>
          </div>

          {/* Info grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Qualifications */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
              <h2 className="text-sm font-bold text-gray-500 mb-3">{t("qualifications")}</h2>
              <ul className="space-y-1">
                {caregiver.qualifications.map((q) => (
                  <li key={q} className="text-sm text-gray-700 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                    {q}
                  </li>
                ))}
              </ul>
            </div>

            {/* Regions */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
              <h2 className="text-sm font-bold text-gray-500 mb-3">{t("regionLabel")}</h2>
              <div className="flex flex-wrap gap-2">
                {caregiver.regions.map((r) => (
                  <span
                    key={r}
                    className="text-sm bg-blue-50 text-blue-700 px-3 py-1 rounded-full"
                  >
                    {REGION_LABEL_KEYS[r] ? t(REGION_LABEL_KEYS[r] as Parameters<typeof t>[0]) : r}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Support types */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
            <h2 className="text-sm font-bold text-gray-500 mb-3">{t("supportLabel")}</h2>
            <div className="flex flex-wrap gap-2">
              {caregiver.support_types.map((s) => (
                <span
                  key={s}
                  className="text-sm bg-gray-100 text-gray-700 px-3 py-1 rounded-full"
                >
                  {SUPPORT_LABEL_KEYS[s] ? t(SUPPORT_LABEL_KEYS[s] as Parameters<typeof t>[0]) : s}
                </span>
              ))}
            </div>
          </div>

          {/* Hobbies */}
          {caregiver.hobbies && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
              <h2 className="text-sm font-bold text-gray-500 mb-2">{t("hobbies")}</h2>
              <p className="text-sm text-gray-700">{caregiver.hobbies}</p>
            </div>
          )}

          {/* Notes */}
          {caregiver.notes && (
            <div className="bg-amber-50 rounded-2xl border border-amber-200 p-5">
              <h2 className="text-sm font-bold text-amber-700 mb-2">{t("notes")}</h2>
              <p className="text-sm text-amber-800">{caregiver.notes}</p>
            </div>
          )}

          {/* CTA */}
          <div className="bg-blue-50 rounded-2xl p-6 text-center space-y-3">
            <Link
              href="/contact"
              className="btn-primary inline-block px-8 py-3"
            >
              {t("consultButton")}
            </Link>
            <div>
              <Link
                href="/caregivers"
                className="text-sm text-blue-600 hover:underline"
              >
                ← {t("backToList")}
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
