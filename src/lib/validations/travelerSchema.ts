import { z } from "zod";

const phoneRegex = /^[0-9]{10,11}$|^[0-9]{2,4}-[0-9]{2,4}-[0-9]{3,4}$/;

export const travelerSchema = z
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
    disability_types: z
      .array(z.string())
      .min(1, "障害種別を1つ以上選択してください"),
    mobility_level: z.enum(
      ["wheelchair_full", "wheelchair_partial", "walking_aid", "independent"],
      { required_error: "移動能力レベルを選択してください" }
    ),
    required_supports: z
      .array(z.string())
      .min(1, "必要な介助内容を1つ以上選択してください"),
    medical_notes: z.string().max(500, "500文字以内で入力してください").optional(),
    destination: z
      .string()
      .min(1, "旅行先を入力してください")
      .max(100, "100文字以内で入力してください"),
    travel_start_date: z.string().min(1, "旅行開始日を入力してください"),
    travel_end_date: z.string().min(1, "旅行終了日を入力してください"),
    travel_purpose: z.string().max(300, "300文字以内で入力してください").optional(),
    accommodation_type: z.string().optional(),
    budget_range: z.string().optional(),
    supporter_gender_pref: z.string().optional(),
    supporter_age_pref: z.string().max(50, "50文字以内で入力してください").optional(),
    message_to_supporter: z.string().max(500, "500文字以内で入力してください").optional(),
  })
  .refine(
    (data) => {
      if (data.travel_start_date && data.travel_end_date) {
        return new Date(data.travel_end_date) >= new Date(data.travel_start_date);
      }
      return true;
    },
    {
      message: "旅行終了日は開始日以降を選択してください",
      path: ["travel_end_date"],
    }
  );

export type TravelerSchemaType = z.infer<typeof travelerSchema>;
