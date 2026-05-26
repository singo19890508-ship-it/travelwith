export type SupportType =
  | "wheelchair"
  | "walking"
  | "meal"
  | "restroom"
  | "visual"
  | "communication"
  | "luggage"
  | "transportation"
  | "medication";

export type Region =
  | "鹿児島市内"
  | "薩摩半島"
  | "大隅半島"
  | "奄美大島"
  | "離島・その他"
  | "全県対応";

export interface Caregiver {
  slug: string;
  name: string;
  nickname?: string;
  photo: string | null;
  gender: "male" | "female";
  age_range: string;
  qualifications: string[];
  experience_summary: string;
  support_types: SupportType[];
  regions: Region[];
  training_completed: boolean;
  message: string;
  detail_message: string;
  hobbies?: string;
  notes?: string;
  available: boolean;
}

export const SUPPORT_TYPE_LABELS: Record<SupportType, string> = {
  wheelchair: "車椅子操作",
  walking: "歩行介助",
  meal: "食事介助",
  restroom: "トイレ介助",
  visual: "視覚障害サポート",
  communication: "コミュニケーション補助",
  luggage: "荷物サポート",
  transportation: "交通機関の乗降",
  medication: "服薬管理",
};

export const caregivers: Caregiver[] = [
  {
    slug: "tanaka-hanako",
    name: "田中 花子",
    photo: null,
    gender: "female",
    age_range: "30代",
    qualifications: ["介護福祉士", "普通自動車免許"],
    experience_summary: "介護施設での勤務経験7年。車椅子ユーザーの方との旅行同行実績あり。",
    support_types: ["wheelchair", "walking", "meal", "restroom", "luggage", "transportation"],
    regions: ["鹿児島市内", "薩摩半島"],
    training_completed: true,
    message: "旅行をあきらめていた方の「行けた！」という笑顔が、私の一番の喜びです。",
    detail_message: "介護施設での7年間の経験をもとに、旅行同行のサービスに携わっています。「旅をしたいけど、一人では不安」という方のそばに寄り添い、安心して旅を楽しんでいただけるよう丁寧にサポートします。旅行前の打ち合わせをしっかり行い、ご本人のペースに合わせた旅を一緒に作ります。",
    hobbies: "国内旅行、料理",
    notes: "医療的ケアが必要な場合は事前にご相談ください。",
    available: true,
  },
  {
    slug: "yamamoto-kenji",
    name: "山本 健二",
    photo: null,
    gender: "male",
    age_range: "40代",
    qualifications: ["ホームヘルパー2級", "普通自動車免許"],
    experience_summary: "訪問介護10年以上。高齢者・肢体不自由の方の外出支援に多数携わってきた。",
    support_types: ["wheelchair", "walking", "luggage", "transportation", "medication"],
    regions: ["鹿児島市内", "薩摩半島", "大隅半島"],
    training_completed: true,
    message: "長年の外出支援の経験で、どんな場所でも安全にサポートできます。一緒に新しい景色を見に行きましょう。",
    detail_message: "訪問介護の現場で10年以上、高齢者や肢体不自由の方の外出支援をしてきました。バリアフリー情報の調査も得意で、旅先での動きやすいルートを事前に確認して安心の旅をご提供します。体力には自信があり、長距離の移動も安心してお任せください。",
    hobbies: "ドライブ、登山",
    available: true,
  },
  {
    slug: "nakamura-yuki",
    name: "中村 由紀",
    photo: null,
    gender: "female",
    age_range: "20代",
    qualifications: ["看護師", "普通自動車免許"],
    experience_summary: "病院での看護師経験3年。医療的な観点からのサポートが得意。",
    support_types: ["walking", "meal", "medication", "communication", "restroom"],
    regions: ["鹿児島市内"],
    training_completed: true,
    message: "医療の知識を活かして、健康面が心配な方も安心してご旅行いただけるよう全力でサポートします。",
    detail_message: "看護師として病院勤務の経験があり、健康管理や緊急時の対応に安心感をお伝えできます。「持病があるから旅行は難しい」とあきらめている方も、ぜひご相談ください。体調管理をしながら、無理のない旅程を一緒に考えます。",
    hobbies: "温泉めぐり、読書",
    notes: "医療的ケアの同行については事前相談が必要です。",
    available: true,
  },
  {
    slug: "sato-hiroshi",
    name: "佐藤 大",
    photo: null,
    gender: "male",
    age_range: "50代",
    qualifications: ["介護福祉士", "社会福祉士", "普通自動車免許"],
    experience_summary: "社会福祉の現場20年。多様な障がいのある方の外出・旅行支援の豊富な経験。",
    support_types: ["wheelchair", "walking", "visual", "communication", "luggage", "transportation"],
    regions: ["鹿児島市内", "薩摩半島", "大隅半島", "全県対応"],
    training_completed: true,
    message: "どんな状況でも「旅を楽しむ権利」はすべての人にある、と信じています。一緒に素敵な旅を作りましょう。",
    detail_message: "社会福祉の現場で20年間、さまざまな障がいをお持ちの方の生活・外出支援に携わってきました。視覚障がいや重度肢体不自由の方の旅行同行も経験豊富です。鹿児島県内であればどこでも対応可能で、離島への旅行同行の実績もあります。旅を通じて「できた」という経験を一緒に積み重ねましょう。",
    hobbies: "写真撮影、鹿児島の郷土料理",
    available: true,
  },
  {
    slug: "kawano-miho",
    name: "川野 美穂",
    photo: null,
    gender: "female",
    age_range: "30代",
    qualifications: ["手話通訳士", "普通自動車免許"],
    experience_summary: "手話通訳士として聴覚障がいのある方のコミュニケーション支援に特化。",
    support_types: ["communication", "luggage", "transportation", "walking"],
    regions: ["鹿児島市内", "薩摩半島"],
    training_completed: true,
    message: "聴覚に障がいのある方が旅先でも安心してコミュニケーションできるよう、丁寧に通訳・サポートします。",
    detail_message: "手話通訳士として10年、聴覚障がいのある方のさまざまな場面でのコミュニケーション支援を行ってきました。旅行中は観光地でのガイド通訳・ホテルでのやりとり・交通機関での案内など、あらゆる場面でスムーズにコミュニケーションが取れるよう支援します。「旅先での意思疎通が心配」という方は、ぜひご相談ください。",
    hobbies: "手話劇、旅行",
    available: true,
  },
  {
    slug: "ishida-tomoko",
    name: "石田 友子",
    photo: null,
    gender: "female",
    age_range: "40代",
    qualifications: ["ホームヘルパー1級", "普通自動車免許"],
    experience_summary: "15年の介護経験。奄美大島在住で離島旅行の同行が得意。",
    support_types: ["wheelchair", "walking", "meal", "restroom", "luggage"],
    regions: ["奄美大島", "離島・その他"],
    training_completed: true,
    message: "奄美の自然の中でゆったりとした旅を。離島特有の移動も熟知しています。",
    detail_message: "奄美大島在住で、島内の地理・バリアフリー情報・フェリーの利用方法など、離島旅行に必要な知識を豊富に持っています。「離島に行きたいけど難しそう」という方も、事前にしっかり準備してご案内します。奄美の海・自然・食を、一緒に楽しみましょう。",
    hobbies: "シュノーケリング、三線",
    available: true,
  },
];

export function getCaregiverBySlug(slug: string): Caregiver | undefined {
  return caregivers.find((c) => c.slug === slug);
}

export function filterCaregivers(params: {
  region?: string;
  supportType?: SupportType;
  gender?: "male" | "female" | "";
}): Caregiver[] {
  return caregivers.filter((c) => {
    if (!c.available) return false;
    if (params.region && !c.regions.includes(params.region as Region)) return false;
    if (params.supportType && !c.support_types.includes(params.supportType)) return false;
    if (params.gender && c.gender !== params.gender) return false;
    return true;
  });
}
