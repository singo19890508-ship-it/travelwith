import { createServiceClient } from "@/lib/supabase/server";
import SupporterTable from "@/components/admin/SupporterTable";
import type { SupporterRegistration } from "@/types/supporter";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "サポーター一覧 | 管理画面" };

async function getSupporters(): Promise<SupporterRegistration[]> {
  try {
    const supabase = createServiceClient();
    const { data, error } = await supabase
      .from("supporter_registrations")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return (data as SupporterRegistration[]) || [];
  } catch {
    return [];
  }
}

export default async function SupportersAdminPage() {
  const supporters = await getSupporters();

  const statusCounts = supporters.reduce(
    (acc, s) => {
      acc[s.status] = (acc[s.status] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">サポーター一覧</h1>
        <p className="text-gray-500 text-sm mt-1">合計 {supporters.length} 件</p>
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

      <SupporterTable supporters={supporters} />

      <div className="mt-4 p-4 bg-green-50 rounded-lg text-sm text-green-700">
        <strong>ヒント：</strong>
        サポーターの承認（active）・非承認（rejected）はSupabaseダッシュボードから変更できます。
        今後のアップデートで詳細表示・承認機能を追加予定です。
      </div>
    </div>
  );
}
