import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { Caregiver } from "@/lib/caregivers";

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

interface CaregiverCardProps {
  caregiver: Caregiver;
}

export default function CaregiverCard({ caregiver }: CaregiverCardProps) {
  const t = useTranslations("caregivers");

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col gap-4 hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex items-start gap-4">
        <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
          <svg className="w-8 h-8 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-lg font-bold text-gray-900">{caregiver.name}</h3>
            <span className="text-sm text-gray-500">{AGE_RANGE_KEYS[caregiver.age_range] ? t(AGE_RANGE_KEYS[caregiver.age_range] as Parameters<typeof t>[0]) : caregiver.age_range}</span>
            <span className="text-sm text-gray-500">
              {caregiver.gender === "female" ? t("genderFemale") : t("genderMale")}
            </span>
          </div>
          {caregiver.training_completed && (
            <span className="inline-block mt-1 text-xs bg-teal-100 text-teal-700 px-2 py-0.5 rounded-full font-medium">
              {t("trainingBadge")}
            </span>
          )}
        </div>
      </div>

      {/* Message */}
      <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">{caregiver.message}</p>

      {/* Regions */}
      <div>
        <p className="text-xs text-gray-500 font-medium mb-1">{t("regionLabel")}</p>
        <div className="flex flex-wrap gap-1">
          {caregiver.regions.map((region) => (
            <span
              key={region}
              className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full"
            >
              {REGION_LABEL_KEYS[region] ? t(REGION_LABEL_KEYS[region] as Parameters<typeof t>[0]) : region}
            </span>
          ))}
        </div>
      </div>

      {/* Support types */}
      <div>
        <p className="text-xs text-gray-500 font-medium mb-1">{t("supportLabel")}</p>
        <div className="flex flex-wrap gap-1">
          {caregiver.support_types.slice(0, 4).map((type) => (
            <span
              key={type}
              className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full"
            >
              {SUPPORT_LABEL_KEYS[type] ? t(SUPPORT_LABEL_KEYS[type] as Parameters<typeof t>[0]) : type}
            </span>
          ))}
          {caregiver.support_types.length > 4 && (
            <span className="text-xs text-gray-400">+{caregiver.support_types.length - 4}</span>
          )}
        </div>
      </div>

      {/* Link */}
      <Link
        href={`/caregivers/${caregiver.slug}`}
        className="mt-auto w-full text-center btn-primary text-sm py-2"
      >
        {t("detailButton")}
      </Link>
    </div>
  );
}
