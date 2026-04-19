import { createServiceClient } from "@/lib/supabase/server";
import StatsCard from "@/components/admin/StatsCard";
import Link from "next/link";

async function getStats() {
  try {
    const supabase = createServiceClient();
    const [
      { count: totalTravelers },
      { count: pendingTravelers },
      { count: totalSupporters },
      { count: activeSupporters },
      { count: matchedCount },
    ] = await Promise.all([
      supabase
        .from("traveler_applications")
        .select("*", { count: "exact", head: true }),
      supabase
        .from("traveler_applications")
        .select("*", { count: "exact", head: true })
        .eq("status", "pending"),
      supabase
        .from("supporter_registrations")
        .select("*", { count: "exact", head: true }),
      supabase
        .from("supporter_registrations")
        .select("*", { count: "exact", head: true })
        .eq("status", "active"),
      supabase
        .from("traveler_applications")
        .select("*", { count: "exact", head: true })
        .eq("status", "matched"),
    ]);

    // 今月の申込数
    const now = new Date();
    const firstOfMonth = new Date(
      now.getFullYear(),
      now.getMonth(),
      1,
    ).toISOString();
    const { count: thisMonthTravelers } = await supabase
      .from("traveler_applications")
      .select("*", { count: "exact", head: true })
      .gte("created_at", firstOfMonth);

    return {
      totalTravelers: totalTravelers ?? 0,
      pendingTravelers: pendingTravelers ?? 0,
      totalSupporters: totalSupporters ?? 0,
      activeSupporters: activeSupporters ?? 0,
      matchedCount: matchedCount ?? 0,
      thisMonthTravelers: thisMonthTravelers ?? 0,
    };
  } catch {
    return {
      totalTravelers: 0,
      pendingTravelers: 0,
      totalSupporters: 0,
      activeSupporters: 0,
      matchedCount: 0,
      thisMonthTravelers: 0,
    };
  }
}

export default async function AdminDashboard() {
  const stats = await getStats();

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">ダッシュボード</h1>
        <p className="text-gray-500 text-sm mt-1">
          {new Date().toLocaleDateString("ja-JP", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}{" "}
          時点
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
        <StatsCard
          title="旅行者申込 総数"
          value={stats.totalTravelers}
          description="累計申込件数"
          color="blue"
        />
        <StatsCard
          title="今月の申込数"
          value={stats.thisMonthTravelers}
          description="当月の新規申込"
          color="blue"
        />
        <StatsCard
          title="対応待ち申込"
          value={stats.pendingTravelers}
          description="ステータス：受付済み"
          color="yellow"
        />
        <StatsCard
          title="サポーター 総数"
          value={stats.totalSupporters}
          description="累計登録数"
          color="green"
        />
        <StatsCard
          title="承認済みサポーター"
          value={stats.activeSupporters}
          description="現在活動可能な人数"
          color="green"
        />
        <StatsCard
          title="マッチング済み"
          value={stats.matchedCount}
          description="マッチング成立件数"
          color="purple"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link
          href="/admin/travelers"
          className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow group"
        >
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold text-gray-800">旅行者申込一覧</h2>
            <svg
              className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </div>
          <p className="text-gray-500 text-sm">
            申込一覧の確認・ステータス管理
          </p>
        </Link>
        <Link
          href="/admin/supporters"
          className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow group"
        >
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold text-gray-800">サポーター一覧</h2>
            <svg
              className="w-5 h-5 text-gray-400 group-hover:text-amber-700 transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </div>
          <p className="text-gray-500 text-sm">
            登録者一覧の確認・審査状況の管理
          </p>
        </Link>
        <Link
          href="/admin/products"
          className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow group"
        >
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold text-gray-800">旅行商品管理</h2>
            <svg
              className="w-5 h-5 text-gray-400 group-hover:text-amber-700 transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </div>
          <p className="text-gray-500 text-sm">
            旅行プランの作成・旅程エディタ・公開管理
          </p>
        </Link>
        <Link
          href="/admin/reservations"
          className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow group"
        >
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold text-gray-800">予約・問い合わせ管理</h2>
            <svg
              className="w-5 h-5 text-gray-400 group-hover:text-amber-700 transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </div>
          <p className="text-gray-500 text-sm">
            予約・相談の一覧確認とステータス管理
          </p>
        </Link>
      </div>
    </div>
  );
}
