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
  const [filters, setFilters] = useState({ region: "", supportType: "", gender: "" });

  const filtered = allCaregivers.filter((c) => {
    if (filters.region && !c.regions.includes(filters.region as never)) return false;
    if (filters.supportType && !c.support_types.includes(filters.supportType as never)) return false;
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
            <p className="text-gray-500 text-sm py-10 text-center">{t("noResult")}</p>
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
