"use client";

import { useTranslations } from "next-intl";
import type { Region, SupportType } from "@/lib/caregivers";

const REGIONS: Region[] = [
  "鹿児島市内",
  "薩摩半島",
  "大隅半島",
  "奄美大島",
  "離島・その他",
  "全県対応",
];

const SUPPORT_TYPES: SupportType[] = [
  "wheelchair",
  "walking",
  "meal",
  "restroom",
  "visual",
  "communication",
  "luggage",
  "transportation",
  "medication",
];

const REGION_LABEL_KEYS: Record<Region, string> = {
  "鹿児島市内": "regionKagoshima",
  "薩摩半島": "regionSatsuma",
  "大隅半島": "regionOsumi",
  "奄美大島": "regionAmami",
  "離島・その他": "regionRemote",
  "全県対応": "regionAll",
};

const SUPPORT_LABEL_KEYS: Record<SupportType, string> = {
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

interface FilterState {
  region: string;
  supportType: string;
  gender: string;
}

interface CaregiverFilterProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
}

export default function CaregiverFilter({ filters, onChange }: CaregiverFilterProps) {
  const t = useTranslations("caregivers");

  const set = (key: keyof FilterState, value: string) => {
    onChange({ ...filters, [key]: value });
  };

  const clear = () => {
    onChange({ region: "", supportType: "", gender: "" });
  };

  const hasFilter = filters.region || filters.supportType || filters.gender;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-bold text-gray-800">{t("filterTitle")}</h2>
        {hasFilter && (
          <button
            onClick={clear}
            className="text-xs text-blue-600 hover:underline"
          >
            {t("clearFilter")}
          </button>
        )}
      </div>

      <div className="space-y-5">
        {/* Region */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t("filterRegion")}
          </label>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => set("region", "")}
              className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                !filters.region
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-600 border-gray-200 hover:border-blue-300"
              }`}
            >
              {t("filterAll")}
            </button>
            {REGIONS.map((r) => (
              <button
                key={r}
                onClick={() => set("region", r === filters.region ? "" : r)}
                className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                  filters.region === r
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-gray-600 border-gray-200 hover:border-blue-300"
                }`}
              >
                {t(REGION_LABEL_KEYS[r] as Parameters<typeof t>[0])}
              </button>
            ))}
          </div>
        </div>

        {/* Support type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t("filterSupportType")}
          </label>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => set("supportType", "")}
              className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                !filters.supportType
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-600 border-gray-200 hover:border-blue-300"
              }`}
            >
              {t("filterAll")}
            </button>
            {SUPPORT_TYPES.map((s) => (
              <button
                key={s}
                onClick={() => set("supportType", s === filters.supportType ? "" : s)}
                className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                  filters.supportType === s
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-gray-600 border-gray-200 hover:border-blue-300"
                }`}
              >
                {t(SUPPORT_LABEL_KEYS[s] as Parameters<typeof t>[0])}
              </button>
            ))}
          </div>
        </div>

        {/* Gender */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t("filterGender")}
          </label>
          <div className="flex gap-2">
            {(["", "female", "male"] as const).map((g) => (
              <button
                key={g}
                onClick={() => set("gender", g)}
                className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                  filters.gender === g
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-gray-600 border-gray-200 hover:border-blue-300"
                }`}
              >
                {g === "" ? t("filterAll") : g === "female" ? t("filterGenderFemale") : t("filterGenderMale")}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
