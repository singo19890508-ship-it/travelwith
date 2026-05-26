import { z } from "zod";

const phoneRegex = /^[0-9]{10,11}$|^[0-9]{2,4}-[0-9]{2,4}-[0-9]{3,4}$/;

export const supporterSchema = z
  .object({
    name: z.string().min(1, "氏名を入力してください").max(50, "50文字以内で入力してください"),
    name_kana: z
      .string()
      .min(1, "フリガナを入力してください")
      .max(50, "50文字以内で入力してください")
      .regex(/^[ァ-ヶー\s]+$/, "カタカナで入力してください"),
    email: z.string().min(1, "メールアドレスを入力してください").email("正しいメールアドレスを入力してください"),
    phone: z
      .string()
      .min(1, "電話番号を入力してください")
      .regex(phoneRegex, "正しい電話番号を入力してください"),
    birth_date: z.string().min(1, "生年月日を入力してください"),
    gender: z.enum(["male", "female", "other", "no_answer"], {
      required_error: "性別を選択してください",
    }),
    prefecture: z.string().min(1, "都道府県を選択してください"),
    occupation: z.string().max(100, "100文字以内で入力してください").optional(),
    qualifications: z
      .array(z.string())
      .min(1, "保有資格を1つ以上選択してください"),
    experience_years: z
      .number()
      .min(0, "0以上を入力してください")
      .max(50, "50以下を入力してください"),
    experience_details: z.string().max(500, "500文字以内で入力してください").optional(),
    available_supports: z
      .array(z.string())
      .min(1, "提供可能な介助内容を1つ以上選択してください"),
    available_traveler_gender: z.string().min(1, "対応可能な旅行者性別を選択してください"),
    available_regions: z
      .array(z.string())
      .min(1, "活動可能地域を1つ以上選択してください"),
    available_period_from: z.string().optional(),
    available_period_to: z.string().optional(),
    available_duration: z.string().min(1, "対応可能日数を選択してください"),
    motivation: z
      .string()
      .min(50, "50文字以上で入力してください")
      .max(1000, "1000文字以内で入力してください"),
    self_introduction: z.string().max(1000, "1000文字以内で入力してください").optional(),
    emergency_contact: z.string().optional(),
    agreed_to_terms: z.literal(true, {
      errorMap: () => ({ message: "利用規約に同意してください" }),
    }),
  })
  .refine(
    (data) => {
      if (data.available_period_from && data.available_period_to) {
        return new Date(data.available_period_to) >= new Date(data.available_period_from);
      }
      return true;
    },
    {
      message: "活動可能終了時期は開始時期以降を選択してください",
      path: ["available_period_to"],
    }
  );

export type SupporterSchemaType = z.infer<typeof supporterSchema>;
