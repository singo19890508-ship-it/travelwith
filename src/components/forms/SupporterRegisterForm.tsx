"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { supporterSchema, SupporterSchemaType } from "@/lib/validations/supporterSchema";
import { SupportType, Gender, Qualification } from "@/types/common";
import { AvailableDuration } from "@/types/supporter";
import { PREFECTURES } from "@/types/common";
import FormField from "./FormField";
import FormSelect from "./FormSelect";
import FormCheckboxGroup from "./FormCheckboxGroup";
import SubmitButton from "./SubmitButton";

const PREFECTURE_OPTIONS = PREFECTURES.map((p) => ({ value: p, label: p }));

export default function SupporterRegisterForm() {
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const t = useTranslations("supporterRegister");
  const c = useTranslations("common");
  const terms = useTranslations("terms");

  const GENDER_OPTIONS = (["male", "female", "other", "no_answer"] as Gender[]).map((v) => ({
    value: v,
    label: (() => {
      const map: Record<string, string> = {
        male: c("genderMale"),
        female: c("genderFemale"),
        other: c("genderOther"),
        no_answer: c("genderNoAnswer"),
      };
      return map[v];
    })(),
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

  const QUALIFICATION_OPTIONS = (["care_worker", "home_helper", "social_worker", "nurse", "physical_therapist", "occupational_therapist", "sign_language", "none"] as Qualification[]).map((v) => ({
    value: v,
    label: (() => {
      const map: Record<string, string> = {
        care_worker: c("qualCareWorker"),
        home_helper: c("qualHomeHelper"),
        social_worker: c("qualSocialWorker"),
        nurse: c("qualNurse"),
        physical_therapist: c("qualPhysicalTherapist"),
        occupational_therapist: c("qualOccupationalTherapist"),
        sign_language: c("qualSignLanguage"),
        none: c("qualNone"),
      };
      return map[v];
    })(),
  }));

  const AVAILABLE_DURATION_OPTIONS = (["day_trip", "1_2_nights", "3_5_nights", "week_or_more", "flexible"] as AvailableDuration[]).map((v) => ({
    value: v,
    label: (() => {
      const map: Record<string, string> = {
        day_trip: c("durationDayTrip"),
        "1_2_nights": c("duration1to2Nights"),
        "3_5_nights": c("duration3to5Nights"),
        week_or_more: c("durationWeekOrMore"),
        flexible: c("durationFlexible"),
      };
      return map[v];
    })(),
  }));

  const TRAVELER_GENDER_OPTIONS = [
    { value: "no_preference", label: c("genderNoPreference") },
    { value: "male", label: c("genderMale") },
    { value: "female", label: c("genderFemale") },
  ];

  const REGION_OPTIONS = [
    { value: "北海道・東北", label: c("regionHokkaidoTohoku") },
    { value: "関東", label: c("regionKanto") },
    { value: "中部・東海", label: c("regionChubuTokai") },
    { value: "近畿", label: c("regionKinki") },
    { value: "中国・四国", label: c("regionChugokuShikoku") },
    { value: "九州・沖縄", label: c("regionKyushuOkinawa") },
    { value: "全国対応可", label: c("regionNationwide") },
  ];

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SupporterSchemaType>({
    resolver: zodResolver(supporterSchema),
    defaultValues: {
      qualifications: [],
      available_supports: [],
      available_regions: [],
      experience_years: 0,
      experience_details: "",
      occupation: "",
      available_period_from: "",
      available_period_to: "",
      self_introduction: "",
      emergency_contact: "",
      agreed_to_terms: false as unknown as true,
    },
  });

  const onSubmit = async (data: SupporterSchemaType) => {
    setServerError(null);
    try {
      const res = await fetch("/api/supporter", {
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
          <Controller
            name="prefecture"
            control={control}
            render={({ field }) => (
              <FormSelect
                label={t("fieldPrefecture")}
                required
                options={PREFECTURE_OPTIONS}
                placeholder={t("placeholderSelect")}
                error={errors.prefecture?.message}
                {...field}
              />
            )}
          />
          <FormField
            label={t("fieldOccupation")}
            placeholder={t("placeholderOccupation")}
            error={errors.occupation?.message}
            {...register("occupation")}
          />
        </div>
      </section>

      {/* Section 2 */}
      <section className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
        <h2 className="section-title">{t("section2")}</h2>
        <div className="space-y-6">
          <Controller
            name="qualifications"
            control={control}
            render={({ field }) => (
              <FormCheckboxGroup
                label={t("fieldQualifications")}
                required
                options={QUALIFICATION_OPTIONS}
                values={field.value || []}
                onChange={field.onChange}
                error={errors.qualifications?.message}
                columns={2}
              />
            )}
          />
          <FormField
            label={t("fieldExperienceYears")}
            required
            type="number"
            min={0}
            max={50}
            placeholder="0"
            hint={t("hintExperienceYears")}
            error={errors.experience_years?.message}
            {...register("experience_years", { valueAsNumber: true })}
          />
          <FormField
            as="textarea"
            label={t("fieldExperienceDetails")}
            placeholder={t("placeholderExperienceDetails")}
            error={errors.experience_details?.message}
            rows={3}
            {...register("experience_details")}
          />
          <Controller
            name="available_supports"
            control={control}
            render={({ field }) => (
              <FormCheckboxGroup
                label={t("fieldAvailableSupports")}
                required
                options={SUPPORT_OPTIONS}
                values={field.value || []}
                onChange={field.onChange}
                error={errors.available_supports?.message}
              />
            )}
          />
        </div>
      </section>

      {/* Section 3 */}
      <section className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
        <h2 className="section-title">{t("section3")}</h2>
        <div className="space-y-6">
          <Controller
            name="available_traveler_gender"
            control={control}
            render={({ field }) => (
              <FormSelect
                label={t("fieldAvailableTravelerGender")}
                required
                options={TRAVELER_GENDER_OPTIONS}
                placeholder={t("placeholderSelect")}
                error={errors.available_traveler_gender?.message}
                {...field}
              />
            )}
          />
          <Controller
            name="available_regions"
            control={control}
            render={({ field }) => (
              <FormCheckboxGroup
                label={t("fieldAvailableRegions")}
                required
                options={REGION_OPTIONS}
                values={field.value || []}
                onChange={field.onChange}
                error={errors.available_regions?.message}
                columns={3}
              />
            )}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <FormField
              label={t("fieldAvailablePeriodFrom")}
              type="date"
              hint={t("hintAvailablePeriodFrom")}
              error={errors.available_period_from?.message}
              {...register("available_period_from")}
            />
            <FormField
              label={t("fieldAvailablePeriodTo")}
              type="date"
              error={errors.available_period_to?.message}
              {...register("available_period_to")}
            />
          </div>
          <Controller
            name="available_duration"
            control={control}
            render={({ field }) => (
              <FormSelect
                label={t("fieldAvailableDuration")}
                required
                options={AVAILABLE_DURATION_OPTIONS}
                placeholder={t("placeholderSelect")}
                error={errors.available_duration?.message}
                {...field}
              />
            )}
          />
        </div>
      </section>

      {/* Section 4 */}
      <section className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
        <h2 className="section-title">{t("section4")}</h2>
        <div className="space-y-5">
          <FormField
            as="textarea"
            label={t("fieldMotivation")}
            required
            placeholder={t("placeholderMotivation")}
            error={errors.motivation?.message}
            rows={5}
            {...register("motivation")}
          />
          <FormField
            as="textarea"
            label={t("fieldSelfIntroduction")}
            placeholder={t("placeholderSelfIntroduction")}
            error={errors.self_introduction?.message}
            rows={4}
            {...register("self_introduction")}
          />
          <FormField
            label={t("fieldEmergencyContact")}
            type="tel"
            placeholder={t("placeholderEmergencyContact")}
            error={errors.emergency_contact?.message}
            {...register("emergency_contact")}
          />
        </div>
      </section>

      {/* Section 5 */}
      <section className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
        <h2 className="section-title">{t("section5")}</h2>
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 h-48 overflow-y-auto text-sm text-gray-600 whitespace-pre-line leading-relaxed mb-4">
          {terms("text")}
        </div>
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
            {...register("agreed_to_terms")}
          />
          <span className="text-gray-700 font-medium">
            {t("termsAgreement")}
            <span className="text-red-500 ml-1">*</span>
          </span>
        </label>
        {errors.agreed_to_terms && (
          <p className="form-error mt-1">{errors.agreed_to_terms.message}</p>
        )}
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
          {t("afterReview")}
        </p>
      </div>
    </form>
  );
}
