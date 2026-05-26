"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import FormField from "./FormField";
import FormSelect from "./FormSelect";
import SubmitButton from "./SubmitButton";

type ContactFormValues = {
  name: string;
  email: string;
  phone?: string;
  inquiry_type: "use" | "join" | "other";
  travel_plan?: string;
  support_needs?: string;
  message: string;
};

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const t = useTranslations("contact");

  const contactSchema = z.object({
    name: z.string().min(1, t("requiredName")),
    email: z.string().min(1, t("requiredEmail")).email(t("invalidEmail")),
    phone: z.string().optional(),
    inquiry_type: z.enum(["use", "join", "other"], { required_error: t("requiredInquiryType") }),
    travel_plan: z.string().optional(),
    support_needs: z.string().optional(),
    message: z.string().min(10, t("messageTooShort")).max(2000, t("requiredMessage")),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormValues) => {
    setServerError(null);
    try {
      const res = await fetch("/api/contact", {
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
      <div className="max-w-2xl mx-auto text-center py-16 px-4">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">{t("successTitle")}</h2>
        <p className="text-gray-600 leading-relaxed mb-8 whitespace-pre-line text-base">
          {t("successMessage")}
        </p>
        <Link href="/" className="btn-primary inline-flex">{t("backToTop")}</Link>
      </div>
    );
  }

  const inquiryTypeOptions = [
    { value: "use", label: t("inquiryTypeUse") },
    { value: "join", label: t("inquiryTypeJoin") },
    { value: "other", label: t("inquiryTypeOther") },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Basic info */}
      <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 space-y-5">
        <h2 className="section-title">{t("sectionBasic")}</h2>
        <FormField
          label={t("fieldName")}
          required
          placeholder={t("placeholderName")}
          error={errors.name?.message}
          {...register("name")}
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
          type="tel"
          placeholder={t("placeholderPhone")}
          error={errors.phone?.message}
          {...register("phone")}
        />

        {/* inquiry type — manual select since Controller not used here */}
        <div>
          <label className="form-label">
            {t("fieldInquiryType")}
            <span className="text-red-500 ml-1">*</span>
          </label>
          <select
            className="form-input"
            {...register("inquiry_type")}
            defaultValue=""
          >
            <option value="" disabled>{t("placeholderSelect")}</option>
            {inquiryTypeOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          {errors.inquiry_type && (
            <p className="form-error">{errors.inquiry_type.message}</p>
          )}
        </div>
      </div>

      {/* Travel info */}
      <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 space-y-5">
        <h2 className="section-title">{t("sectionTravelInfo")}</h2>
        <FormField
          label={t("fieldTravelPlan")}
          placeholder={t("placeholderTravelPlan")}
          error={errors.travel_plan?.message}
          {...register("travel_plan")}
        />
        <FormField
          as="textarea"
          label={t("fieldSupportNeeds")}
          placeholder={t("placeholderSupportNeeds")}
          error={errors.support_needs?.message}
          rows={3}
          {...register("support_needs")}
        />
      </div>

      {/* Message */}
      <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 space-y-5">
        <h2 className="section-title">{t("sectionMessage")}</h2>
        <FormField
          as="textarea"
          label={t("fieldMessage")}
          required
          placeholder={t("placeholderMessage")}
          error={errors.message?.message}
          rows={6}
          {...register("message")}
        />
      </div>

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
