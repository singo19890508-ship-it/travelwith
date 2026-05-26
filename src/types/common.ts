export type ApplicationStatus =
  | "pending"
  | "reviewing"
  | "matched"
  | "completed"
  | "cancelled";

export type SupporterStatus =
  | "pending"
  | "active"
  | "inactive"
  | "rejected";

export type Gender = "male" | "female" | "other" | "no_answer";

export type DisabilityType =
  | "visual"
  | "hearing"
  | "physical"
  | "internal"
  | "intellectual"
  | "mental"
  | "other";

export type SupportType =
  | "wheelchair_operation"
  | "transfer"
  | "walking_support"
  | "meal"
  | "restroom"
  | "communication"
  | "luggage"
  | "transportation"
  | "sightseeing_guide"
  | "medication"
  | "other";

export type Qualification =
  | "care_worker"
  | "home_helper"
  | "social_worker"
  | "nurse"
  | "physical_therapist"
  | "occupational_therapist"
  | "sign_language"
  | "none";

export interface SelectOption<T extends string = string> {
  value: T;
  label: string;
}

// 障害種別ラベル
export const DISABILITY_TYPE_LABELS: Record<DisabilityType, string> = {
  visual: "視覚障害",
  hearing: "聴覚・言語障害",
  physical: "肢体不自由",
  internal: "内部障害",
  intellectual: "知的障害",
  mental: "精神障害",
  other: "その他",
};

// 介助内容ラベル
export const SUPPORT_TYPE_LABELS: Record<SupportType, string> = {
  wheelchair_operation: "車椅子操作補助",
  transfer: "移乗介助",
  walking_support: "歩行介助",
  meal: "食事介助",
  restroom: "トイレ介助",
  communication: "コミュニケーション補助",
  luggage: "荷物管理・運搬",
  transportation: "交通機関の乗降補助",
  sightseeing_guide: "観光案内・情報収集",
  medication: "服薬管理補助",
  other: "その他",
};

// 資格ラベル
export const QUALIFICATION_LABELS: Record<Qualification, string> = {
  care_worker: "介護福祉士",
  home_helper: "ホームヘルパー（訪問介護員）",
  social_worker: "社会福祉士",
  nurse: "看護師・准看護師",
  physical_therapist: "理学療法士",
  occupational_therapist: "作業療法士",
  sign_language: "手話通訳士",
  none: "資格なし（経験者）",
};

// 性別ラベル
export const GENDER_LABELS: Record<Gender, string> = {
  male: "男性",
  female: "女性",
  other: "その他",
  no_answer: "回答しない",
};

// 申込ステータスラベル
export const APPLICATION_STATUS_LABELS: Record<ApplicationStatus, string> = {
  pending: "受付済み",
  reviewing: "確認中",
  matched: "マッチング済み",
  completed: "旅行完了",
  cancelled: "キャンセル",
};

// サポーターステータスラベル
export const SUPPORTER_STATUS_LABELS: Record<SupporterStatus, string> = {
  pending: "審査待ち",
  active: "承認済み",
  inactive: "一時停止",
  rejected: "非承認",
};

// 都道府県一覧
export const PREFECTURES = [
  "北海道", "青森県", "岩手県", "宮城県", "秋田県", "山形県", "福島県",
  "茨城県", "栃木県", "群馬県", "埼玉県", "千葉県", "東京都", "神奈川県",
  "新潟県", "富山県", "石川県", "福井県", "山梨県", "長野県", "岐阜県",
  "静岡県", "愛知県", "三重県", "滋賀県", "京都府", "大阪府", "兵庫県",
  "奈良県", "和歌山県", "鳥取県", "島根県", "岡山県", "広島県", "山口県",
  "徳島県", "香川県", "愛媛県", "高知県", "福岡県", "佐賀県", "長崎県",
  "熊本県", "大分県", "宮崎県", "鹿児島県", "沖縄県",
] as const;
