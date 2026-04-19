"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type ItineraryItem = {
  day: number;
  time: string;
  place: string;
  note: string;
};

type BarrierFreeInfo = {
  wheelchair: boolean;
  medical_equipment: boolean;
  welfare_vehicle: boolean;
  meal_support: boolean;
};

type ProductFormData = {
  title: string;
  description: string;
  area: string;
  duration_days: number;
  price_base: number;
  price_supporter: number;
  max_participants: number;
  status: "draft" | "published" | "archived";
  barrier_free_info: BarrierFreeInfo;
  itinerary: ItineraryItem[];
};

const defaultForm: ProductFormData = {
  title: "",
  description: "",
  area: "鹿児島県",
  duration_days: 1,
  price_base: 0,
  price_supporter: 15000,
  max_participants: 4,
  status: "draft",
  barrier_free_info: {
    wheelchair: false,
    medical_equipment: false,
    welfare_vehicle: false,
    meal_support: false,
  },
  itinerary: [{ day: 1, time: "", place: "", note: "" }],
};

export default function ProductForm({
  initial,
  productId,
}: {
  initial?: Partial<ProductFormData>;
  productId?: string;
}) {
  const router = useRouter();
  const [form, setForm] = useState<ProductFormData>({
    ...defaultForm,
    ...initial,
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const isEdit = !!productId;

  function setField<K extends keyof ProductFormData>(
    key: K,
    value: ProductFormData[K],
  ) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function setItinerary(
    index: number,
    key: keyof ItineraryItem,
    value: string | number,
  ) {
    setForm((f) => {
      const items = [...f.itinerary];
      items[index] = { ...items[index], [key]: value };
      return { ...f, itinerary: items };
    });
  }

  function addItineraryItem() {
    setForm((f) => ({
      ...f,
      itinerary: [
        ...f.itinerary,
        { day: f.duration_days, time: "", place: "", note: "" },
      ],
    }));
  }

  function removeItineraryItem(index: number) {
    setForm((f) => ({
      ...f,
      itinerary: f.itinerary.filter((_, i) => i !== index),
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const url = isEdit
        ? `/api/admin/products/${productId}`
        : "/api/admin/products";
      const method = isEdit ? "PATCH" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "保存に失敗しました");
      }
      router.push("/admin/products");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "エラーが発生しました");
    } finally {
      setSaving(false);
    }
  }

  const barrierFreeLabels: { key: keyof BarrierFreeInfo; label: string }[] = [
    { key: "wheelchair", label: "車椅子対応" },
    { key: "medical_equipment", label: "医療機器持込可" },
    { key: "welfare_vehicle", label: "福祉車両送迎" },
    { key: "meal_support", label: "食事介助対応" },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-3xl">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm">
          {error}
        </div>
      )}

      {/* 基本情報 */}
      <section className="bg-white rounded-xl border border-gray-200 p-6 space-y-5">
        <h2 className="font-bold text-gray-800 text-lg">基本情報</h2>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            商品名 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            value={form.title}
            onChange={(e) => setField("title", e.target.value)}
            placeholder="例: 指宿砂むし温泉 日帰りプラン"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            説明文
          </label>
          <textarea
            rows={4}
            value={form.description}
            onChange={(e) => setField("description", e.target.value)}
            placeholder="旅行の特徴・魅力・対象となる方などを記入してください"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              エリア
            </label>
            <input
              type="text"
              value={form.area}
              onChange={(e) => setField("area", e.target.value)}
              placeholder="例: 鹿児島県"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              日数
            </label>
            <select
              value={form.duration_days}
              onChange={(e) =>
                setField("duration_days", Number(e.target.value))
              }
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              {[1, 2, 3, 4, 5].map((d) => (
                <option key={d} value={d}>
                  {d}日{d > 1 ? `（${d - 1}泊${d}日）` : "（日帰り）"}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              基本料金（円）
            </label>
            <input
              type="number"
              min={0}
              step={500}
              value={form.price_base}
              onChange={(e) => setField("price_base", Number(e.target.value))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              サポーター料金（円/名）
            </label>
            <input
              type="number"
              min={0}
              step={500}
              value={form.price_supporter}
              onChange={(e) =>
                setField("price_supporter", Number(e.target.value))
              }
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              最大参加人数
            </label>
            <input
              type="number"
              min={1}
              max={20}
              value={form.max_participants}
              onChange={(e) =>
                setField("max_participants", Number(e.target.value))
              }
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            ステータス
          </label>
          <select
            value={form.status}
            onChange={(e) =>
              setField("status", e.target.value as ProductFormData["status"])
            }
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
          >
            <option value="draft">下書き（非公開）</option>
            <option value="published">公開中</option>
            <option value="archived">アーカイブ</option>
          </select>
        </div>
      </section>

      {/* バリアフリー情報 */}
      <section className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
        <h2 className="font-bold text-gray-800 text-lg">バリアフリー情報</h2>
        <div className="grid grid-cols-2 gap-3">
          {barrierFreeLabels.map(({ key, label }) => (
            <label key={key} className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={form.barrier_free_info[key]}
                onChange={(e) =>
                  setField("barrier_free_info", {
                    ...form.barrier_free_info,
                    [key]: e.target.checked,
                  })
                }
                className="w-4 h-4 accent-amber-700"
              />
              <span className="text-sm text-gray-700">{label}</span>
            </label>
          ))}
        </div>
      </section>

      {/* 旅程エディタ */}
      <section className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-gray-800 text-lg">旅程</h2>
          <button
            type="button"
            onClick={addItineraryItem}
            className="text-sm text-amber-700 hover:text-amber-800 font-medium flex items-center gap-1"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            行程を追加
          </button>
        </div>

        <div className="space-y-3">
          {form.itinerary.map((item, i) => (
            <div
              key={i}
              className="flex items-start gap-3 p-4 bg-amber-50 rounded-lg border border-amber-100"
            >
              <div className="flex items-center justify-center w-6 h-6 bg-amber-700 text-white rounded-full text-xs font-bold shrink-0 mt-1">
                {i + 1}
              </div>
              <div className="flex-1 grid grid-cols-12 gap-2">
                <div className="col-span-2">
                  <input
                    type="text"
                    value={item.time}
                    onChange={(e) => setItinerary(i, "time", e.target.value)}
                    placeholder="09:00"
                    className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                <div className="col-span-5">
                  <input
                    type="text"
                    value={item.place}
                    onChange={(e) => setItinerary(i, "place", e.target.value)}
                    placeholder="場所・行程"
                    className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                <div className="col-span-5">
                  <input
                    type="text"
                    value={item.note}
                    onChange={(e) => setItinerary(i, "note", e.target.value)}
                    placeholder="補足・注意事項"
                    className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>
              {form.itinerary.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeItineraryItem(i)}
                  className="text-gray-400 hover:text-red-500 transition-colors mt-1"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 送信ボタン */}
      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={saving}
          className="px-6 py-2.5 bg-amber-700 text-white font-medium rounded-lg hover:bg-amber-800 transition-colors disabled:opacity-50"
        >
          {saving ? "保存中..." : isEdit ? "変更を保存" : "商品を作成"}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-2.5 border border-gray-300 text-gray-600 font-medium rounded-lg hover:bg-gray-50 transition-colors"
        >
          キャンセル
        </button>
      </div>
    </form>
  );
}
