"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

// ─── 型 ───────────────────────────────────────────────
type Tour = {
  id: string;
  badge: string;
  badgeColor: string;
  title: string;
  subtitle: string;
  duration: string;
  area: string;
  price: string;
  priceNote: string;
  tags: string[];
  highlights: string[];
  imageUrl: string;
  status: string;
  published: boolean;
};

const BADGE_COLORS = [
  { label: "オレンジ（人気）", value: "bg-orange-500" },
  { label: "ティール（限定）", value: "bg-teal-600" },
  { label: "ブルー（初心者）", value: "bg-blue-600" },
  { label: "パープル（神社・特別）", value: "bg-purple-600" },
  { label: "グリーン（自然・世界遺産）", value: "bg-green-600" },
  { label: "レッド（期間限定）", value: "bg-red-500" },
];

const emptyTour = (): Tour => ({
  id: `tour-${Date.now()}`,
  badge: "",
  badgeColor: "bg-teal-600",
  title: "",
  subtitle: "",
  duration: "",
  area: "",
  price: "",
  priceNote: "（1名・介助費用込み）",
  tags: [],
  highlights: [],
  imageUrl: "",
  status: "準備中",
  published: true,
});

// ─── ツアーフォーム ────────────────────────────────────
function TourForm({
  tour,
  onSave,
  onCancel,
}: {
  tour: Tour;
  onSave: (t: Tour) => void;
  onCancel: () => void;
}) {
  const [form, setForm] = useState<Tour>(tour);
  const [tagsText, setTagsText] = useState(tour.tags.join("、"));
  const [highlightsText, setHighlightsText] = useState(
    tour.highlights.join("\n"),
  );

  const set = (key: keyof Tour, val: unknown) =>
    setForm((f) => ({ ...f, [key]: val }));

  const handleSave = () => {
    const tags = tagsText
      .split(/[、,，\n]/)
      .map((s) => s.trim())
      .filter(Boolean);
    const highlights = highlightsText
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);
    onSave({ ...form, tags, highlights });
  };

  const inputCls =
    "w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500";
  const labelCls = "block text-xs font-semibold text-gray-600 mb-1";

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 space-y-4">
      {/* 写真URL */}
      <div>
        <label className={labelCls}>
          📸 写真URL
          <span className="font-normal text-gray-400 ml-2">
            （Google フォト・Cloudinary などの公開URLを貼り付け）
          </span>
        </label>
        <input
          className={inputCls}
          placeholder="https://example.com/image.jpg"
          value={form.imageUrl}
          onChange={(e) => set("imageUrl", e.target.value)}
        />
        {form.imageUrl && (
          <div className="mt-2 relative h-40 w-full rounded-xl overflow-hidden bg-gray-100">
            <Image
              src={form.imageUrl}
              alt="プレビュー"
              fill
              className="object-cover"
              onError={() => set("imageUrl", form.imageUrl)}
              unoptimized
            />
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* タイトル */}
        <div className="sm:col-span-2">
          <label className={labelCls}>ツアータイトル *</label>
          <input
            className={inputCls}
            value={form.title}
            onChange={(e) => set("title", e.target.value)}
            placeholder="例: 桜島と霧島温泉 ゆったり1泊2日"
          />
        </div>

        {/* サブタイトル */}
        <div className="sm:col-span-2">
          <label className={labelCls}>サブタイトル</label>
          <input
            className={inputCls}
            value={form.subtitle}
            onChange={(e) => set("subtitle", e.target.value)}
            placeholder="例: 鹿児島を代表する絶景と名湯を、介助付きで"
          />
        </div>

        {/* バッジ */}
        <div>
          <label className={labelCls}>バッジテキスト</label>
          <input
            className={inputCls}
            value={form.badge}
            onChange={(e) => set("badge", e.target.value)}
            placeholder="例: 人気No.1"
          />
        </div>

        {/* バッジ色 */}
        <div>
          <label className={labelCls}>バッジの色</label>
          <select
            className={inputCls}
            value={form.badgeColor}
            onChange={(e) => set("badgeColor", e.target.value)}
          >
            {BADGE_COLORS.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
        </div>

        {/* 日程 */}
        <div>
          <label className={labelCls}>日程</label>
          <input
            className={inputCls}
            value={form.duration}
            onChange={(e) => set("duration", e.target.value)}
            placeholder="例: 1泊2日 / 日帰り"
          />
        </div>

        {/* エリア */}
        <div>
          <label className={labelCls}>エリア</label>
          <input
            className={inputCls}
            value={form.area}
            onChange={(e) => set("area", e.target.value)}
            placeholder="例: 鹿児島市・霧島市"
          />
        </div>

        {/* 料金 */}
        <div>
          <label className={labelCls}>料金</label>
          <input
            className={inputCls}
            value={form.price}
            onChange={(e) => set("price", e.target.value)}
            placeholder="例: ¥58,000〜"
          />
        </div>

        {/* 料金注記 */}
        <div>
          <label className={labelCls}>料金の注記</label>
          <input
            className={inputCls}
            value={form.priceNote}
            onChange={(e) => set("priceNote", e.target.value)}
            placeholder="例: （1名・介助費用込み）"
          />
        </div>

        {/* ステータス */}
        <div>
          <label className={labelCls}>ステータス</label>
          <select
            className={inputCls}
            value={form.status}
            onChange={(e) => set("status", e.target.value)}
          >
            <option>準備中</option>
            <option>受付中</option>
            <option>満席</option>
            <option>終了</option>
          </select>
        </div>

        {/* 公開 */}
        <div className="flex items-center gap-3 pt-5">
          <input
            type="checkbox"
            id="published"
            checked={form.published}
            onChange={(e) => set("published", e.target.checked)}
            className="w-4 h-4 accent-amber-600"
          />
          <label
            htmlFor="published"
            className="text-sm font-medium text-gray-700"
          >
            サイトに公開する
          </label>
        </div>
      </div>

      {/* タグ */}
      <div>
        <label className={labelCls}>
          タグ
          <span className="font-normal text-gray-400 ml-2">
            （読点「、」またはカンマ区切り）
          </span>
        </label>
        <input
          className={inputCls}
          value={tagsText}
          onChange={(e) => setTagsText(e.target.value)}
          placeholder="例: 車椅子対応、温泉入浴介助あり、福祉タクシー送迎"
        />
      </div>

      {/* ハイライト */}
      <div>
        <label className={labelCls}>
          ハイライト（特徴）
          <span className="font-normal text-gray-400 ml-2">（1行1項目）</span>
        </label>
        <textarea
          className={`${inputCls} h-28 resize-none`}
          value={highlightsText}
          onChange={(e) => setHighlightsText(e.target.value)}
          placeholder={
            "桜島フェリーで雄大な景色を体感\nバリアフリー対応の霧島温泉旅館"
          }
        />
      </div>

      {/* ボタン */}
      <div className="flex gap-3 pt-2">
        <button
          onClick={handleSave}
          className="bg-amber-600 hover:bg-amber-700 text-white font-bold px-6 py-2 rounded-xl text-sm transition-colors"
        >
          保存する
        </button>
        <button
          onClick={onCancel}
          className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium px-6 py-2 rounded-xl text-sm transition-colors"
        >
          キャンセル
        </button>
      </div>
    </div>
  );
}

// ─── メインページ ─────────────────────────────────────
export default function AdminToursPage() {
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);
  const [toast, setToast] = useState<{
    msg: string;
    type: "ok" | "err";
  } | null>(null);

  const showToast = (msg: string, type: "ok" | "err" = "ok") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const load = useCallback(async () => {
    const res = await fetch("/api/admin/tours");
    setTours(await res.json());
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const save = async (updated: Tour[]) => {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/tours", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated),
      });
      if (!res.ok) throw new Error("保存失敗");
      setTours(updated);
      showToast("📤 本番に反映中...");
      await fetch("/api/admin/git-push", { method: "POST" });
      showToast("✅ 保存＆本番反映完了！（2〜3分で反映）");
    } catch {
      showToast("保存に失敗しました", "err");
    } finally {
      setSaving(false);
    }
  };

  const handleSaveTour = async (tour: Tour) => {
    let next: Tour[];
    if (editingId === "__new__") {
      next = [...tours, tour];
    } else {
      next = tours.map((t) => (t.id === tour.id ? tour : t));
    }
    await save(next);
    setEditingId(null);
    setAdding(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("このツアーを削除しますか？")) return;
    await save(tours.filter((t) => t.id !== id));
  };

  const moveUp = async (i: number) => {
    if (i === 0) return;
    const next = [...tours];
    [next[i - 1], next[i]] = [next[i], next[i - 1]];
    await save(next);
  };

  const moveDown = async (i: number) => {
    if (i === tours.length - 1) return;
    const next = [...tours];
    [next[i], next[i + 1]] = [next[i + 1], next[i]];
    await save(next);
  };

  if (loading) {
    return (
      <div className="p-8 text-gray-500 text-sm animate-pulse">
        読み込み中...
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* ヘッダー */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-800">🗺️ ツアー管理</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            ツアーの追加・編集・削除、写真の設定ができます
          </p>
        </div>
        <button
          onClick={() => {
            setAdding(true);
            setEditingId("__new__");
          }}
          className="bg-amber-600 hover:bg-amber-700 text-white font-bold px-4 py-2 rounded-xl text-sm transition-colors"
          disabled={saving}
        >
          ＋ ツアーを追加
        </button>
      </div>

      {/* 注意書き */}
      <div className="bg-green-50 border border-green-200 rounded-xl p-3 mb-6 text-sm text-green-700">
        ✅
        保存ボタンを押すと、自動的に本番サイト（fuku-tabi.com）へ反映されます。反映まで約2〜3分かかります。
      </div>

      {/* 新規追加フォーム */}
      {adding && editingId === "__new__" && (
        <div className="mb-6">
          <h2 className="text-sm font-bold text-gray-600 mb-3">
            ✏️ 新しいツアーを追加
          </h2>
          <TourForm
            tour={emptyTour()}
            onSave={handleSaveTour}
            onCancel={() => {
              setAdding(false);
              setEditingId(null);
            }}
          />
        </div>
      )}

      {/* ツアーリスト */}
      <div className="space-y-4">
        {tours.map((tour, i) => (
          <div
            key={tour.id}
            className={`border rounded-2xl overflow-hidden shadow-sm ${
              tour.published
                ? "border-gray-200"
                : "border-dashed border-gray-300 opacity-60"
            }`}
          >
            {editingId === tour.id ? (
              <div className="p-4">
                <TourForm
                  tour={tour}
                  onSave={handleSaveTour}
                  onCancel={() => setEditingId(null)}
                />
              </div>
            ) : (
              <div className="flex items-start gap-4 p-4 bg-white">
                {/* 写真サムネイル */}
                <div className="w-24 h-20 flex-shrink-0 rounded-xl overflow-hidden bg-gray-100 flex items-center justify-center">
                  {tour.imageUrl ? (
                    <Image
                      src={tour.imageUrl}
                      alt={tour.title}
                      width={96}
                      height={80}
                      className="object-cover w-full h-full"
                      unoptimized
                    />
                  ) : (
                    <span className="text-gray-400 text-xs text-center px-1">
                      写真未設定
                    </span>
                  )}
                </div>

                {/* 内容 */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      className={`${tour.badgeColor} text-white text-xs font-bold px-2 py-0.5 rounded-full`}
                    >
                      {tour.badge || "バッジなし"}
                    </span>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        tour.status === "受付中"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {tour.status}
                    </span>
                    {!tour.published && (
                      <span className="text-xs text-gray-400 font-medium">
                        非公開
                      </span>
                    )}
                  </div>
                  <p className="font-bold text-gray-800 mt-1 text-sm leading-snug">
                    {tour.title || "（タイトル未入力）"}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {tour.duration} / {tour.area} / {tour.price}
                  </p>
                </div>

                {/* 操作ボタン */}
                <div className="flex flex-col gap-1 flex-shrink-0">
                  <button
                    onClick={() => setEditingId(tour.id)}
                    className="text-xs bg-amber-100 hover:bg-amber-200 text-amber-700 font-medium px-3 py-1 rounded-lg transition-colors"
                  >
                    編集
                  </button>
                  <button
                    onClick={() => handleDelete(tour.id)}
                    className="text-xs bg-red-50 hover:bg-red-100 text-red-600 font-medium px-3 py-1 rounded-lg transition-colors"
                  >
                    削除
                  </button>
                  <div className="flex gap-1 mt-1">
                    <button
                      onClick={() => moveUp(i)}
                      disabled={i === 0}
                      className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold px-2 py-1 rounded-lg disabled:opacity-30"
                      title="上へ"
                    >
                      ↑
                    </button>
                    <button
                      onClick={() => moveDown(i)}
                      disabled={i === tours.length - 1}
                      className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold px-2 py-1 rounded-lg disabled:opacity-30"
                      title="下へ"
                    >
                      ↓
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {tours.length === 0 && !adding && (
        <div className="text-center py-16 text-gray-400 text-sm">
          ツアーがまだありません。「＋ ツアーを追加」から作成してください。
        </div>
      )}

      {/* トースト */}
      {toast && (
        <div
          className={`fixed bottom-6 right-6 px-5 py-3 rounded-xl text-white text-sm font-medium shadow-lg z-50 ${
            toast.type === "ok" ? "bg-green-600" : "bg-red-600"
          }`}
        >
          {toast.msg}
        </div>
      )}
    </div>
  );
}
