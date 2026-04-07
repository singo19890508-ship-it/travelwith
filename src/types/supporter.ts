import type { Gender, Qualification, SupportType, SupporterStatus } from "./common";

export type AvailableDuration =
  | "day_trip"
  | "1_2_nights"
  | "3_5_nights"
  | "week_or_more"
  | "flexible";

export const AVAILABLE_DURATION_LABELS: Record<AvailableDuration, string> = {
  day_trip: "日帰りのみ",
  "1_2_nights": "1〜2泊",
  "3_5_nights": "3〜5泊",
  week_or_more: "1週間以上",
  flexible: "柔軟に対応可能",
};

export interface SupporterRegisterFormValues {
  // 基本情報
  name: string;
  name_kana: string;
  email: string;
  phone: string;
  birth_date: string;
  gender: Gender;
  prefecture: string;
  occupation: string;
  // 資格・経験
  qualifications: Qualification[];
  experience_years: number;
  experience_details: string;
  available_supports: SupportType[];
  // 対応可能条件
  available_traveler_gender: Gender | "no_preference" | "";
  available_regions: string[];
  available_period_from: string;
  available_period_to: string;
  available_duration: AvailableDuration | "";
  // 動機・PR
  motivation: string;
  self_introduction: string;
  emergency_contact: string;
  // 同意
  agreed_to_terms: boolean;
}

export interface SupporterRegistration extends SupporterRegisterFormValues {
  id: string;
  agreed_at: string | null;
  status: SupporterStatus;
  admin_memo: string | null;
  created_at: string;
  updated_at: string;
}
