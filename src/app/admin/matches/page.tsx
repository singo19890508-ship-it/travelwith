"use client";

import { useState, useEffect } from "react";

interface MatchResult {
  supporter: {
    id: string;
    name: string;
    gender: string;
    prefecture: string;
    available_supports: string[];
    available_regions: string[];
    experience_years: number;
    qualifications: string[];
  };
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

interface TravelerResult {
  traveler: {
    id: string;
    name: string;
    gender: string;
    destination: string;
    travel_start_date: string;
    travel_end_date: string;
    required_supports: string[];
    disability_types: string[];
    mobility_level: string;
    status: string;
    created_at: string;
  };
  matches: MatchResult[];
}

interface Summary {
  totalTravelers: number;
  totalSupporters: number;
  matched: number;
}

export default function MatchesPage() {
  const [results, setResults] = useState<TravelerResult[]>([]);
  const [summary, setSummary] = useState<Summary | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedTraveler, setSelectedTraveler] = useState<string | null>(null);
  const [confirming, setConfirming] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/matches")
      .then((r) => r.json())
      .then((data) => {
        setResults(data.results ?? []);
        setSummary(data.summary ?? null);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const confirmMatch = async (travelerId: string, supporterId: string) => {
    setConfirming(supporterId);
    try {
      const res = await fetch("/api/admin/matches", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ travelerId, supporterId }),
      });
      if (res.ok) {
        setResults((prev) =>
          prev.map((r) =>
            r.traveler.id === travelerId
              ? { ...r, traveler: { ...r.traveler, status: "matched" } }
              : r,
          ),
        );
        alert("マッチングを確定しました");
      }
    } finally {
      setConfirming(null);
    }
  };

  const selectedResult = results.find(
    (r) => r.traveler.id === selectedTraveler,
  );

  const scoreColor = (score: number) => {
    if (score >= 80) return "text-green-400";
    if (score >= 50) return "text-amber-400";
    if (score > 0) return "text-orange-400";
    return "text-gray-500";
  };

  const scoreBar = (score: number) => {
    const pct = Math.min(100, score);
    const color =
      score >= 80
        ? "bg-green-500"
        : score >= 50
          ? "bg-amber-500"
          : score > 0
            ? "bg-orange-500"
            : "bg-gray-700";
    return (
      <div className="w-full bg-gray-800 rounded-full h-1.5 mt-1">
        <div
          className={`${color} h-1.5 rounded-full`}
          style={{ width: `${pct}%` }}
        />
      </div>
    );
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* ヘッダー */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">マッチング管理</h1>
        <p className="text-gray-400 text-sm mt-1">
          旅行者とサポーターの最適マッチングを確認・確定します
        </p>
      </div>

      {/* サマリーカード */}
      {summary && (
        <div className="grid grid-cols-3 gap-4 mb-6">
          {[
            {
              label: "申込中の旅行者",
              value: summary.totalTravelers,
              color: "text-blue-400",
            },
            {
              label: "対応可能サポーター",
              value: summary.totalSupporters,
              color: "text-green-400",
            },
            {
              label: "マッチング済み",
              value: summary.matched,
              color: "text-amber-400",
            },
          ].map((s) => (
            <div
              key={s.label}
              className="bg-gray-800 rounded-xl p-4 border border-gray-700"
            >
              <p className="text-gray-400 text-xs">{s.label}</p>
              <p className={`text-2xl font-bold mt-1 ${s.color}`}>{s.value}</p>
            </div>
          ))}
        </div>
      )}

      {loading ? (
        <div className="text-gray-400 text-center py-20">読み込み中...</div>
      ) : results.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg">申込中の旅行者がいません</p>
          <p className="text-gray-600 text-sm mt-2">
            旅行者が申し込むと自動的にマッチング候補が表示されます
          </p>
        </div>
      ) : (
        <div className="flex gap-6">
          {/* 左：旅行者リスト */}
          <div className="w-72 flex-shrink-0 space-y-2">
            <h2 className="text-gray-400 text-xs font-medium uppercase tracking-wider mb-3">
              旅行者一覧
            </h2>
            {results.map(({ traveler, matches }) => {
              const topScore = matches[0]?.score ?? 0;
              const isSelected = selectedTraveler === traveler.id;
              const isMatched = traveler.status === "matched";
              return (
                <button
                  key={traveler.id}
                  onClick={() => setSelectedTraveler(traveler.id)}
                  className={`w-full text-left p-3 rounded-xl border transition-all ${
                    isSelected
                      ? "border-amber-600 bg-amber-900/20"
                      : "border-gray-700 bg-gray-800 hover:border-gray-600"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="text-white text-sm font-medium truncate">
                        {traveler.name}
                      </p>
                      <p className="text-gray-400 text-xs truncate mt-0.5">
                        📍 {traveler.destination}
                      </p>
                      <p className="text-gray-500 text-xs mt-0.5">
                        {traveler.travel_start_date} 〜{" "}
                        {traveler.travel_end_date}
                      </p>
                    </div>
                    <div className="flex-shrink-0 text-right">
                      {isMatched ? (
                        <span className="text-xs bg-green-900/40 text-green-400 px-2 py-0.5 rounded-full">
                          確定済
                        </span>
                      ) : (
                        <span
                          className={`text-sm font-bold ${scoreColor(topScore)}`}
                        >
                          {topScore}点
                        </span>
                      )}
                    </div>
                  </div>
                  {!isMatched && scoreBar(topScore)}
                </button>
              );
            })}
          </div>

          {/* 右：マッチング詳細 */}
          <div className="flex-1 min-w-0">
            {!selectedResult ? (
              <div className="flex items-center justify-center h-64 text-gray-500">
                旅行者を選択するとマッチング候補が表示されます
              </div>
            ) : (
              <div>
                {/* 旅行者情報 */}
                <div className="bg-gray-800 rounded-xl p-4 border border-gray-700 mb-4">
                  <h3 className="text-white font-bold mb-3">
                    {selectedResult.traveler.name} さんの旅行
                  </h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-gray-500">目的地：</span>
                      <span className="text-white">
                        {selectedResult.traveler.destination}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-500">期間：</span>
                      <span className="text-white">
                        {selectedResult.traveler.travel_start_date} 〜{" "}
                        {selectedResult.traveler.travel_end_date}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-500">障害区分：</span>
                      <span className="text-white">
                        {selectedResult.traveler.disability_types?.join("・") ||
                          "未記載"}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-500">移動レベル：</span>
                      <span className="text-white">
                        {selectedResult.traveler.mobility_level}
                      </span>
                    </div>
                  </div>
                  {selectedResult.traveler.required_supports?.length > 0 && (
                    <div className="mt-2">
                      <span className="text-gray-500 text-sm">
                        必要サポート：
                      </span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {selectedResult.traveler.required_supports.map((s) => (
                          <span
                            key={s}
                            className="text-xs bg-blue-900/40 text-blue-300 px-2 py-0.5 rounded-full"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* マッチング候補 */}
                <h3 className="text-gray-400 text-xs font-medium uppercase tracking-wider mb-3">
                  マッチング候補（上位{selectedResult.matches.length}件）
                </h3>

                {selectedResult.matches.length === 0 ? (
                  <div className="bg-gray-800 rounded-xl p-8 text-center border border-gray-700">
                    <p className="text-gray-500">
                      条件に合うサポーターが見つかりません
                    </p>
                    <p className="text-gray-600 text-sm mt-1">
                      サポーターの登録を増やすか、条件を確認してください
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {selectedResult.matches.map((match, i) => (
                      <div
                        key={match.supporter.id}
                        className={`bg-gray-800 rounded-xl p-4 border transition-colors ${
                          match.score >= 80
                            ? "border-green-700/50"
                            : match.score >= 50
                              ? "border-amber-700/50"
                              : "border-gray-700"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-gray-500 text-xs">
                                #{i + 1}
                              </span>
                              <h4 className="text-white font-bold">
                                {match.supporter.name}
                              </h4>
                              <span className="text-gray-400 text-xs">
                                {match.supporter.gender} /{" "}
                                {match.supporter.prefecture}
                              </span>
                              {match.supporter.experience_years > 0 && (
                                <span className="text-xs text-gray-500">
                                  経験{match.supporter.experience_years}年
                                </span>
                              )}
                            </div>

                            {/* スコア内訳 */}
                            <div className="grid grid-cols-4 gap-2 mb-2">
                              {[
                                {
                                  label: "地域",
                                  val: match.scoreBreakdown.regionScore,
                                  max: 40,
                                },
                                {
                                  label: "サポート",
                                  val: match.scoreBreakdown.supportScore,
                                  max: 30,
                                },
                                {
                                  label: "旅行者性別",
                                  val: match.scoreBreakdown.travelerGenderScore,
                                  max: 15,
                                },
                                {
                                  label: "希望性別",
                                  val: match.scoreBreakdown
                                    .supporterGenderScore,
                                  max: 15,
                                },
                              ].map((item) => (
                                <div key={item.label} className="text-center">
                                  <p className="text-gray-500 text-xs">
                                    {item.label}
                                  </p>
                                  <p
                                    className={`text-sm font-bold ${
                                      item.val === item.max
                                        ? "text-green-400"
                                        : item.val > 0
                                          ? "text-amber-400"
                                          : "text-gray-600"
                                    }`}
                                  >
                                    {item.val}/{item.max}
                                  </p>
                                </div>
                              ))}
                            </div>

                            {/* 一致サポート */}
                            {match.matchedSupports.length > 0 && (
                              <div className="flex flex-wrap gap-1 mb-2">
                                {match.matchedSupports.map((s) => (
                                  <span
                                    key={s}
                                    className="text-xs bg-green-900/30 text-green-400 px-2 py-0.5 rounded-full"
                                  >
                                    ✓ {s}
                                  </span>
                                ))}
                              </div>
                            )}

                            {/* 注記 */}
                            {match.notes.length > 0 && (
                              <div className="flex flex-wrap gap-1">
                                {match.notes.map((n) => (
                                  <span
                                    key={n}
                                    className="text-xs bg-orange-900/30 text-orange-400 px-2 py-0.5 rounded-full"
                                  >
                                    ⚠ {n}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>

                          {/* スコア＋確定ボタン */}
                          <div className="flex-shrink-0 text-right">
                            <div
                              className={`text-2xl font-bold mb-1 ${scoreColor(match.score)}`}
                            >
                              {match.score}
                              <span className="text-sm text-gray-500">
                                /100
                              </span>
                            </div>
                            {!match.scoreBreakdown.dateOverlap && (
                              <p className="text-xs text-red-400 mb-1">日程×</p>
                            )}
                            {selectedResult.traveler.status !== "matched" &&
                              match.score > 0 && (
                                <button
                                  onClick={() =>
                                    confirmMatch(
                                      selectedResult.traveler.id,
                                      match.supporter.id,
                                    )
                                  }
                                  disabled={confirming === match.supporter.id}
                                  className="text-xs bg-amber-600 hover:bg-amber-500 disabled:opacity-50 text-white px-3 py-1.5 rounded-lg transition-colors"
                                >
                                  {confirming === match.supporter.id
                                    ? "処理中..."
                                    : "マッチング確定"}
                                </button>
                              )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
