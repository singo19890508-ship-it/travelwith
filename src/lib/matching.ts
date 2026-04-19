// マッチングロジック — 旅行者 ↔ サポーター

export interface TravelerApplication {
  id: string;
  name: string;
  gender: string;
  disability_types: string[];
  mobility_level: string;
  required_supports: string[];
  destination: string;
  travel_start_date: string;
  travel_end_date: string;
  supporter_gender_pref: string | null;
  supporter_age_pref: string | null;
  status: string;
  created_at: string;
}

export interface SupporterRegistration {
  id: string;
  name: string;
  gender: string;
  prefecture: string;
  qualifications: string[];
  available_supports: string[];
  available_traveler_gender: string; // "no_preference" | "male" | "female"
  available_regions: string[];
  available_period_from: string;
  available_period_to: string;
  available_duration: string;
  status: string;
  experience_years: number;
}

export interface MatchResult {
  supporter: SupporterRegistration;
  score: number;
  scoreBreakdown: {
    dateOverlap: boolean;
    regionScore: number;
    supportScore: number;
    travelerGenderScore: number;
    supporterGenderScore: number;
  };
  matchedSupports: string[];
  notes: string[];
}

/**
 * 日程が重複しているか判定
 */
function hasDateOverlap(
  tStart: string,
  tEnd: string,
  sFrom: string,
  sTo: string,
): boolean {
  const ts = new Date(tStart).getTime();
  const te = new Date(tEnd).getTime();
  const sf = new Date(sFrom).getTime();
  const st = new Date(sTo).getTime();
  // 重複あり: 旅行開始 <= サポーター終了 かつ 旅行終了 >= サポーター開始
  return ts <= st && te >= sf;
}

/**
 * 地域マッチング（40点）
 * 旅行者の目的地がサポーターの対応地域に含まれるか
 */
function calcRegionScore(
  destination: string,
  availableRegions: string[],
): number {
  if (!destination || !availableRegions?.length) return 0;
  const dest = destination.toLowerCase();
  const match = availableRegions.some((r) => {
    const region = r.toLowerCase();
    return (
      dest.includes(region) ||
      region.includes(dest) ||
      region === "全国" ||
      region === "全域" ||
      // 鹿児島関連の特別マッチング
      (dest.includes("鹿児島") &&
        (region.includes("鹿児島") || region.includes("九州")))
    );
  });
  return match ? 40 : 0;
}

/**
 * サポート内容マッチング（最大30点）
 * 必要なサポートのうち何割対応できるか
 */
function calcSupportScore(
  requiredSupports: string[],
  availableSupports: string[],
): { score: number; matched: string[] } {
  if (!requiredSupports?.length || !availableSupports?.length) {
    return { score: 0, matched: [] };
  }
  const matched = requiredSupports.filter((req) =>
    availableSupports.some(
      (avail) =>
        avail.toLowerCase().includes(req.toLowerCase()) ||
        req.toLowerCase().includes(avail.toLowerCase()),
    ),
  );
  const score = Math.round((matched.length / requiredSupports.length) * 30);
  return { score, matched };
}

/**
 * 旅行者性別対応スコア（15点）
 * サポーターが旅行者の性別に対応しているか
 */
function calcTravelerGenderScore(
  travelerGender: string,
  availableTravelerGender: string, // DBは文字列: "no_preference" | "male" | "female"
): number {
  if (!availableTravelerGender) return 15;
  const g = availableTravelerGender.toLowerCase();
  if (g === "no_preference" || g === "no_answer") return 15;
  return g === (travelerGender?.toLowerCase() || "") ? 15 : 0;
}

/**
 * サポーター性別希望スコア（15点）
 * 旅行者の希望性別とサポーターの性別が一致するか
 */
function calcSupporterGenderScore(
  supporterGenderPref: string | null,
  supporterGender: string,
): number {
  if (
    !supporterGenderPref ||
    supporterGenderPref === "問わない" ||
    supporterGenderPref === ""
  ) {
    return 15; // 希望なし = フルマッチ
  }
  return supporterGenderPref === supporterGender ? 15 : 0;
}

/**
 * メインマッチング関数
 * 1人の旅行者に対して、全サポーターをスコアリングして返す
 */
export function matchTravelerWithSupporters(
  traveler: TravelerApplication,
  supporters: SupporterRegistration[],
): MatchResult[] {
  const results: MatchResult[] = [];

  for (const supporter of supporters) {
    // ステータスチェック（active のみ対象）
    if (supporter.status !== "active") continue;

    // 日程チェック（必須条件）
    const dateOverlap = hasDateOverlap(
      traveler.travel_start_date,
      traveler.travel_end_date,
      supporter.available_period_from,
      supporter.available_period_to,
    );

    const notes: string[] = [];
    if (!dateOverlap) {
      notes.push("日程が合いません");
    }

    // スコア計算
    const regionScore = calcRegionScore(
      traveler.destination,
      supporter.available_regions,
    );
    const { score: supportScore, matched: matchedSupports } = calcSupportScore(
      traveler.required_supports,
      supporter.available_supports,
    );
    const travelerGenderScore = calcTravelerGenderScore(
      traveler.gender,
      supporter.available_traveler_gender,
    );
    const supporterGenderScore = calcSupporterGenderScore(
      traveler.supporter_gender_pref,
      supporter.gender,
    );

    // 日程が合わない場合はスコア大幅減点（表示はするが低順位）
    const totalScore = dateOverlap
      ? regionScore + supportScore + travelerGenderScore + supporterGenderScore
      : 0;

    // 補足メモ
    if (regionScore === 0) notes.push("対応地域外の可能性あり");
    if (supportScore < 15 && traveler.required_supports?.length > 0) {
      notes.push(
        `サポート対応率 ${Math.round((matchedSupports.length / traveler.required_supports.length) * 100)}%`,
      );
    }

    results.push({
      supporter,
      score: totalScore,
      scoreBreakdown: {
        dateOverlap,
        regionScore,
        supportScore,
        travelerGenderScore,
        supporterGenderScore,
      },
      matchedSupports,
      notes,
    });
  }

  // スコア降順でソート
  return results.sort((a, b) => b.score - a.score);
}

/**
 * 全旅行者×全サポーターのマッチング結果を返す
 */
export function runFullMatching(
  travelers: TravelerApplication[],
  supporters: SupporterRegistration[],
): Array<{
  traveler: TravelerApplication;
  matches: MatchResult[];
}> {
  return travelers.map((traveler) => ({
    traveler,
    matches: matchTravelerWithSupporters(traveler, supporters).slice(0, 5), // 上位5件
  }));
}
