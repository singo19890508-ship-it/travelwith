"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { travelerSchema, TravelerSchemaType } from "@/lib/validations/travelerSchema";
import { DisabilityType, SupportType, Gender } from "@/types/common";
import { MobilityLevel, AccommodationType, BudgetRange } from "@/types/traveler";
import FormField from "./FormField";
import FormSelect from "./FormSelect";
import FormCheckboxGroup from "./FormCheckboxGroup";
import SubmitButton from "./SubmitButton";

export default function TravelerApplyForm() {
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const t = useTranslations("travelerApply");
  const c = useTranslations("common");

  const GENDER_OPTIONS = (["male", "female", "other", "no_answer"] as Gender[]).map((v) => ({
    value: v,
    label: c(`gender${v.charAt(0).toUpperCase() + v.slice(1).replace(/_([a-z])/g, (_, l) => l.toUpperCase())}` as never),
  }));

  const DISABILITY_OPTIONS = (["visual", "hearing", "physical", "internal", "intellectual", "mental", "other"] as DisabilityType[]).map((v) => ({
    value: v,
    label: c(`disability${v.charAt(0).toUpperCase() + v.slice(1)}` as never),
  }));

  const SUPPORT_OPTIONS = (["wheelchair_operation", "transfer", "walking_support", "meal", "restroom", "communication", "luggage", "transportation", "sightseeing_guide", "medication", "other"] as SupportType[]).map((v) => ({
    value: v,
    label: (() => {
      const map: Record<string, string> = {
        wheelchair_operation: c("supportWheelchair"),
        transfer: c("supportTransfer"),
        walking_support: c("supportWalking"),
        meal: c("supportMeal"),
        restroom: c("supportRestroom"),
        communication: c("supportCommunication"),
        luggage: c("supportLuggage"),
        transportation: c("supportTransportation"),
        sightseeing_guide: c("supportSightseeing"),
        medication: c("supportMedication"),
        other: c("supportOther"),
      };
      return map[v];
    })(),
  }));

  const MOBILITY_OPTIONS = (["wheelchair_full", "wheelchair_partial", "walking_aid", "independent"] as MobilityLevel[]).map((v) => ({
    value: v,
    label: (() => {
      const map: Record<string, string> = {
        wheelchair_full: c("mobilityWheelchairFull"),
        wheelchair_partial: c("mobilityWheelchairPartial"),
        walking_aid: c("mobilityWalkingAid"),
        independent: c("mobilityIndependent"),
      };
      return map[v];
    })(),
  }));

  const ACCOMMODATION_OPTIONS = (["hotel", "ryokan", "guesthouse", "rental", "undecided"] as AccommodationType[]).map((v) => ({
    value: v,
    label: (() => {
      const map: Record<string, string> = {
        hotel: c("accommodationHotel"),
        ryokan: c("accommodationRyokan"),
        guesthouse: c("accommodationGuesthouse"),
        rental: c("accommodationRental"),
        undecided: c("accommodationUndecided"),
      };
      return map[v];
    })(),
  }));

  const BUDGET_OPTIONS = (["under_30k", "30k_50k", "50k_100k", "over_100k", "undecided"] as BudgetRange[]).map((v) => ({
    value: v,
    label: (() => {
      const map: Record<string, string> = {
        under_30k: c("budgetUnder30k"),
        "30k_50k": c("budget30k50k"),
        "50k_100k": c("budget50k100k"),
        over_100k: c("budgetOver100k"),
        undecided: c("budgetUndecided"),
      };
      return map[v];
    })(),
  }));

  const SUPPORTER_GENDER_OPTIONS = [
    { value: "no_preference", label: c("genderNoPreference") },
    { value: "male", label: c("genderMale") },
    { value: "female", label: c("genderFemale") },
  ];

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TravelerSchemaType>({
    resolver: zodResolver(travelerSchema),
    defaultValues: {
      disability_types: [],
      required_supports: [],
      medical_notes: "",
      travel_purpose: "",
      accommodation_type: "",
      budget_range: "",
      supporter_gender_pref: "",
      supporter_age_pref: "",
      message_to_supporter: "",
    },
  });

  const onSubmit = async (data: TravelerSchemaType) => {
    setServerError(null);
    try {
      const res = await fetch("/api/traveler", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const json = await res.json();
        setServerError(json.message || t("sendFailed"));
        return;
      }
      setSubmitted(true);
    } catch {
      setServerError(t("networkError"));
    }
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto text-center py-20 px-4">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">{t("successTitle")}</h2>
        <p className="text-gray-600 leading-relaxed mb-8 whitespace-pre-line">{t("successMessage")}</p>
        <Link href="/" className="btn-primary inline-flex">{t("backToTop")}</Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
      {/* Section 1 */}
      <section className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
        <h2 className="section-title">{t("section1")}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <FormField
            label={t("fieldName")}
            required
            placeholder={t("placeholderName")}
            error={errors.name?.message}
            {...register("name")}
          />
          <FormField
            label={t("fieldNameKana")}
            required
            placeholder={t("placeholderNameKana")}
            error={errors.name_kana?.message}
            {...register("name_kana")}
          />
          <FormField
            label={t("fieldEmail")}
            required
            type="email"
            placeholder={t("placeholderEmail")}
            error={errors.email?.message}
            {...register("email")}
          />
          <FormField
            label={t("fieldPhone")}
            required
            type="tel"
            placeholder={t("placeholderPhone")}
            error={errors.phone?.message}
            {...register("phone")}
          />
          <FormField
            label={t("fieldBirthDate")}
            required
            type="date"
            error={errors.birth_date?.message}
            {...register("birth_date")}
          />
          <Controller
            name="gender"
            control={control}
            render={({ field }) => (
              <FormSelect
                label={t("fieldGender")}
                required
                options={GENDER_OPTIONS}
                placeholder={t("placeholderSelect")}
                error={errors.gender?.message}
                {...field}
              />
            )}
          />
        </div>
      </section>

      {/* Section 2 */}
      <section className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
        <h2 className="section-title">{t("section2")}</h2>
        <div className="space-y-6">
          <Controller
            name="disability_types"
            control={control}
            render={({ field }) => (
              <FormCheckboxGroup
                label={t("fieldDisabilityTypes")}
                required
                options={DISABILITY_OPTIONS}
                values={field.value || []}
                onChange={field.onChange}
                error={errors.disability_types?.message}
              />
            )}
          />
          <Controller
            name="mobility_level"
            control={control}
            render={({ field }) => (
              <FormSelect
                label={t("fieldMobilityLevel")}
                required
                options={MOBILITY_OPTIONS}
                placeholder={t("placeholderSelect")}
                error={errors.mobility_level?.message}
                {...field}
              />
            )}
          />
          <Controller
            name="required_supports"
            control={control}
            render={({ field }) => (
              <FormCheckboxGroup
                label={t("fieldRequiredSupports")}
                required
                options={SUPPORT_OPTIONS}
                values={field.value || []}
                onChange={field.onChange}
                error={errors.required_supports?.message}
              />
            )}
          />
          <FormField
            as="textarea"
            label={t("fieldMedicalNotes")}
            placeholder={t("placeholderMedicalNotes")}
            error={errors.medical_notes?.message}
            rows={3}
            {...register("medical_notes")}
          />
        </div>
      </section>

      {/* Section 3 */}
      <section className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
        <h2 className="section-title">{t("section3")}</h2>
        <div className="space-y-5">
          <FormField
            label={t("fieldDestination")}
            required
            placeholder={t("placeholderDestination")}
            error={errors.destination?.message}
            {...register("destination")}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <FormField
              label={t("fieldTravelStartDate")}
              required
              type="date"
              error={errors.travel_start_date?.message}
              {...register("travel_start_date")}
            />
            <FormField
              label={t("fieldTravelEndDate")}
              required
              type="date"
              error={errors.travel_end_date?.message}
              {...register("travel_end_date")}
            />
          </div>
          <FormField
            as="textarea"
            label={t("fieldTravelPurpose")}
            placeholder={t("placeholderTravelPurpose")}
            error={errors.travel_purpose?.message}
            rows={3}
            {...register("travel_purpose")}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Controller
              name="accommodation_type"
              control={control}
              render={({ field }) => (
                <FormSelect
                  label={t("fieldAccommodationType")}
                  options={ACCOMMODATION_OPTIONS}
                  placeholder={t("placeholderSelectOptional")}
                  error={errors.accommodation_type?.message}
                  {...field}
                />
              )}
            />
            <Controller
              name="budget_range"
              control={control}
              render={({ field }) => (
                <FormSelect
                  label={t("fieldBudgetRange")}
                  options={BUDGET_OPTIONS}
                  placeholder={t("placeholderSelectOptional")}
                  error={errors.budget_range?.message}
                  {...field}
                />
              )}
            />
          </div>
        </div>
      </section>

      {/* Section 4 */}
      <section className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
        <h2 className="section-title">{t("section4")}</h2>
        <div className="space-y-5">
          <Controller
            name="supporter_gender_pref"
            control={control}
            render={({ field }) => (
              <FormSelect
                label={t("fieldSupporterGenderPref")}
                options={SUPPORTER_GENDER_OPTIONS}
                placeholder={t("placeholderSelect")}
                error={errors.supporter_gender_pref?.message}
                {...field}
              />
            )}
          />
          <FormField
            label={t("fieldSupporterAgePref")}
            placeholder={t("placeholderSupporterAgePref")}
            error={errors.supporter_age_pref?.message}
            {...register("supporter_age_pref")}
          />
          <FormField
            as="textarea"
            label={t("fieldMessageToSupporter")}
            placeholder={t("placeholderMessageToSupporter")}
            error={errors.message_to_supporter?.message}
            rows={4}
            {...register("message_to_supporter")}
          />
        </div>
      </section>

      {serverError && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700 text-sm">
          {serverError}
        </div>
      )}

      <div className="pb-8">
        <SubmitButton loading={isSubmitting} loadingText={t("submitting")}>
          {t("submitButton")}
        </SubmitButton>
        <p className="text-center text-xs text-gray-400 mt-3">
          {t("privacyConsent")}
        </p>
      </div>
    </form>
  );
}
