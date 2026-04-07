import type { ApplicationStatus, DisabilityType, Gender, SupportType } from "./common";

export type MobilityLevel =
  | "wheelchair_full"
  | "wheelchair_partial"
  | "walking_aid"
  | "independent";

export type AccommodationType =
  | "hotel"
  | "ryokan"
  | "guesthouse"
  | "rental"
  | "undecided";

export type BudgetRange =
  | "under_30k"
  | "30k_50k"
  | "50k_100k"
  | "over_100k"
  | "undecided";

export const MOBILITY_LEVEL_LABELS: Record<MobilityLevel, string> = {
  wheelchair_full: "電動・手動車椅子を常用",
  wheelchair_partial: "長距離のみ車椅子を使用",
  walking_aid: "杖・歩行器を使用",
  independent: "自立歩行（その他支援が必要）",
};

export const ACCOMMODATION_TYPE_LABELS: Record<AccommodationType, string> = {
  hotel: "ホテル",
  ryokan: "旅館",
  guesthouse: "ゲストハウス",
  rental: "レンタル住居",
  undecided: "未定",
};

export const BUDGET_RANGE_LABELS: Record<BudgetRange, string> = {
  under_30k: "3万円未満",
  "30k_50k": "3〜5万円",
  "50k_100k": "5〜10万円",
  over_100k: "10万円以上",
  undecided: "未定",
};

export interface TravelerApplyFormValues {
  // 基本情報
  name: string;
  name_kana: string;
  email: string;
  phone: string;
  birth_date: string;
  gender: Gender;
  // 障害・支援ニーズ
  disability_types: DisabilityType[];
  mobility_level: MobilityLevel;
  required_supports: SupportType[];
  medical_notes: string;
  // 旅行情報
  destination: string;
  travel_start_date: string;
  travel_end_date: string;
  travel_purpose: string;
  accommodation_type: AccommodationType | "";
  budget_range: BudgetRange | "";
  // サポーター希望
  supporter_gender_pref: Gender | "no_preference" | "";
  supporter_age_pref: string;
  message_to_supporter: string;
}

export interface TravelerApplication extends TravelerApplyFormValues {
  id: string;
  travel_nights: number;
  status: ApplicationStatus;
  admin_memo: string | null;
  created_at: string;
  updated_at: string;
}
