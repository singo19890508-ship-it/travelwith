"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import type { Caregiver } from "@/lib/caregivers";
import CaregiverCard from "./CaregiverCard";
import CaregiverFilter from "./CaregiverFilter";

interface Props {
  allCaregivers: Caregiver[];
}

export default function CaregiverListClient({ allCaregivers }: Props) {
  const t = useTranslations("caregivers");
  const [filters, setFilters] = useState({
    region: "",
    supportType: "",
    gender: "",
  });

  const filtered = allCaregivers.filter((c) => {
    if (filters.region && !c.regions.includes(filters.region as never))
      return false;
    if (
      filters.supportType &&
      !c.support_types.includes(filters.supportType as never)
    )
      return false;
    if (filters.gender && c.gender !== filters.gender) return false;
    return true;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        {/* Filter sidebar */}
        <div className="lg:col-span-1">
          <CaregiverFilter filters={filters} onChange={setFilters} />
        </div>

        {/* List */}
        <div className="lg:col-span-3">
          <p className="text-sm text-gray-500 mb-4">
            {t("count", { count: filtered.length })}
          </p>
          {filtered.length === 0 ? (
            <div>
              <p className="text-gray-500 text-sm mb-6 text-center">
                {t("noResult")}
              </p>
              {/* Placeholder cards — shown until real data is registered */}
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 opacity-40 pointer-events-none select-none">
                {[1, 2, 3].map((n) => (
                  <div
                    key={n}
                    className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden"
                  >
                    {/* Photo placeholder */}
                    <div className="bg-gradient-to-br from-gray-100 to-gray-200 h-44 flex flex-col items-center justify-center gap-2">
                      <div className="w-20 h-20 rounded-full bg-gray-300 flex items-center justify-center">
                        <svg
                          className="w-10 h-10 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                      </div>
                      <span className="text-xs text-gray-400 font-medium">
                        {t("photoComingSoon")}
                      </span>
                    </div>
                    {/* Info placeholder */}
                    <div className="p-4 space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-2/3" />
                      <div className="h-3 bg-gray-100 rounded w-1/2" />
                      <div className="h-3 bg-gray-100 rounded w-full mt-3" />
                      <div className="h-3 bg-gray-100 rounded w-5/6" />
                      <div className="flex gap-1 mt-2">
                        <div className="h-5 bg-gray-100 rounded-full w-16" />
                        <div className="h-5 bg-gray-100 rounded-full w-16" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-center text-xs text-gray-400 mt-6">
                {t("placeholderNote")}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {filtered.map((c) => (
                <CaregiverCard key={c.slug} caregiver={c} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
