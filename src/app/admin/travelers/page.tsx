import { createServiceClient } from "@/lib/supabase/server";
import TravelerTable from "@/components/admin/TravelerTable";
import type { TravelerApplication } from "@/types/traveler";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "旅行者申込一覧 | 管理画面" };

async function getTravelers(): Promise<TravelerApplication[]> {
  try {
    const supabase = createServiceClient();
    const { data, error } = await supabase
      .from("traveler_applications")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return (data as TravelerApplication[]) || [];
  } catch {
    return [];
  }
}

export default async function TravelersAdminPage() {
  const travelers = await getTravelers();

  const statusCounts = travelers.reduce(
    (acc, t) => {
      acc[t.status] = (acc[t.status] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">旅行者申込一覧</h1>
        <p className="text-gray-500 text-sm mt-1">合計 {travelers.length} 件</p>
      </div>

      {/* ステータス別バッジ */}
      <div className="flex flex-wrap gap-2 mb-6">
        {Object.entries(statusCounts).map(([status, count]) => (
          <span
            key={status}
            className="text-xs bg-white border border-gray-200 rounded-full px-3 py-1 text-gray-600"
          >
            {status}: {count}件
          </span>
        ))}
      </div>

      <TravelerTable travelers={travelers} />

      <div className="mt-4 p-4 bg-blue-50 rounded-lg text-sm text-blue-700">
        <strong>ヒント：</strong>
        ステータスの変更はSupabaseダッシュボードから直接編集できます。
        今後のアップデートで詳細表示・編集機能を追加予定です。
      </div>
    </div>
  );
}
