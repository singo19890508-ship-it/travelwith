"use client";

import { useRouter } from "next/navigation";
import { useFormStatus } from "react-dom";
import type { Caregiver } from "@/lib/caregivers";

const SUPPORT_TYPES = [
  { value: "wheelchair", label: "車椅子操作" },
  { value: "walking", label: "歩行介助" },
  { value: "meal", label: "食事介助" },
  { value: "restroom", label: "トイレ介助" },
  { value: "visual", label: "視覚障害サポート" },
  { value: "communication", label: "コミュニケーション補助" },
  { value: "luggage", label: "荷物サポート" },
  { value: "transportation", label: "交通機関の乗降" },
  { value: "medication", label: "服薬管理" },
];

const REGIONS = [
  "鹿児島市内",
  "薩摩半島",
  "大隅半島",
  "奄美大島",
  "離島・その他",
  "全県対応",
];

const AGE_RANGES = ["20代", "30代", "40代", "50代", "60代以上"];

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="px-6 py-2.5 bg-blue-600 text-white text-sm font-bold rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
    >
      {pending ? "保存中..." : "保存する"}
    </button>
  );
}

interface Props {
  caregiver?: Caregiver;
  action: (formData: FormData) => Promise<void>;
}

export default function CaregiverForm({ caregiver, action }: Props) {
  const router = useRouter();

  return (
    <form action={action} className="space-y-6 max-w-2xl">
      {/* 基本情報 */}
      <section className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
        <h2 className="font-bold text-gray-700 text-sm uppercase tracking-wide">基本情報</h2>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              氏名 <span className="text-red-500">*</span>
            </label>
            <input
              name="name"
              defaultValue={caregiver?.name ?? ""}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">性別</label>
            <select
              name="gender"
              defaultValue={caregiver?.gender ?? "female"}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="female">女性</option>
              <option value="male">男性</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">年齢層</label>
            <select
              name="age_range"
              defaultValue={caregiver?.age_range ?? "30代"}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {AGE_RANGES.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">表示順</label>
            <input
              name="sort_order"
              type="number"
              defaultValue={caregiver?.sort_order ?? 0}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">写真URL</label>
          <input
            name="photo"
            type="url"
            defaultValue={caregiver?.photo ?? ""}
            placeholder="https://..."
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex gap-6">
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input
              name="training_completed"
              type="checkbox"
              defaultChecked={caregiver?.training_completed ?? false}
              className="w-4 h-4 rounded text-blue-600"
            />
            研修修了
          </label>
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input
              name="available"
              type="checkbox"
              defaultChecked={caregiver?.available ?? true}
              className="w-4 h-4 rounded text-blue-600"
            />
            受付中（公開）
          </label>
        </div>
      </section>

      {/* 資格・経験 */}
      <section className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
        <h2 className="font-bold text-gray-700 text-sm uppercase tracking-wide">資格・経験</h2>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            資格（1行に1つ）
          </label>
          <textarea
            name="qualifications"
            rows={3}
            defaultValue={(caregiver?.qualifications ?? []).join("\n")}
            placeholder="介護福祉士&#10;普通自動車免許"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">経験サマリー</label>
          <textarea
            name="experience_summary"
            rows={2}
            defaultValue={caregiver?.experience_summary ?? ""}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </section>

      {/* 対応エリア・サポート種別 */}
      <section className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
        <h2 className="font-bold text-gray-700 text-sm uppercase tracking-wide">対応エリア・サポート</h2>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">対応エリア</label>
          <div className="flex flex-wrap gap-3">
            {REGIONS.map((r) => (
              <label key={r} className="flex items-center gap-1.5 text-sm cursor-pointer">
                <input
                  name="regions"
                  type="checkbox"
                  value={r}
                  defaultChecked={(caregiver?.regions ?? []).includes(r as never)}
                  className="w-4 h-4 rounded text-blue-600"
                />
                {r}
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">サポート種別</label>
          <div className="grid grid-cols-2 gap-2">
            {SUPPORT_TYPES.map((s) => (
              <label key={s.value} className="flex items-center gap-1.5 text-sm cursor-pointer">
                <input
                  name="support_types"
                  type="checkbox"
                  value={s.value}
                  defaultChecked={(caregiver?.support_types ?? []).includes(s.value as never)}
                  className="w-4 h-4 rounded text-blue-600"
                />
                {s.label}
              </label>
            ))}
          </div>
        </div>
      </section>

      {/* メッセージ */}
      <section className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
        <h2 className="font-bold text-gray-700 text-sm uppercase tracking-wide">メッセージ</h2>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            一言メッセージ（カード表示用）
          </label>
          <textarea
            name="message"
            rows={2}
            defaultValue={caregiver?.message ?? ""}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            詳細メッセージ（プロフィールページ用）
          </label>
          <textarea
            name="detail_message"
            rows={5}
            defaultValue={caregiver?.detail_message ?? ""}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">趣味</label>
            <input
              name="hobbies"
              defaultValue={caregiver?.hobbies ?? ""}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">注意事項</label>
            <input
              name="notes"
              defaultValue={caregiver?.notes ?? ""}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </section>

      {/* ボタン */}
      <div className="flex items-center gap-3 pb-8">
        <SubmitButton />
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-2.5 bg-white text-gray-600 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          キャンセル
        </button>
      </div>
    </form>
  );
}
