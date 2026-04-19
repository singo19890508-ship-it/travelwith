import { createServiceClient } from "@/lib/supabase/server";
import Link from "next/link";

type ProductRow = {
  id: string;
  title: string;
  area: string | null;
  duration_days: number;
  price_base: number;
  status: string;
  created_at: string;
};

async function getProducts(): Promise<ProductRow[]> {
  try {
    const supabase = createServiceClient();
    const { data, error } = await supabase
      .from("tour_products")
      .select("id, title, area, duration_days, price_base, status, created_at")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return (data ?? []) as ProductRow[];
  } catch {
    return [];
  }
}

const statusLabel: Record<string, { label: string; color: string }> = {
  draft: { label: "下書き", color: "bg-gray-100 text-gray-600" },
  published: { label: "公開中", color: "bg-green-100 text-green-700" },
  archived: { label: "非公開", color: "bg-red-100 text-red-600" },
};

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">旅行商品管理</h1>
          <p className="text-gray-500 text-sm mt-1">
            {products.length} 件の商品
          </p>
        </div>
        <Link
          href="/admin/products/new"
          className="inline-flex items-center gap-2 px-4 py-2 bg-amber-700 text-white font-medium rounded-lg hover:bg-amber-800 transition-colors"
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
          新規商品を追加
        </Link>
      </div>

      {products.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <p className="text-gray-400 mb-4">まだ旅行商品が登録されていません</p>
          <Link
            href="/admin/products/new"
            className="inline-flex items-center gap-2 px-4 py-2 bg-amber-700 text-white font-medium rounded-lg hover:bg-amber-800 transition-colors"
          >
            最初の商品を作成する
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-6 py-3 font-medium text-gray-600">
                  商品名
                </th>
                <th className="text-left px-6 py-3 font-medium text-gray-600">
                  エリア
                </th>
                <th className="text-left px-6 py-3 font-medium text-gray-600">
                  日数
                </th>
                <th className="text-left px-6 py-3 font-medium text-gray-600">
                  基本料金
                </th>
                <th className="text-left px-6 py-3 font-medium text-gray-600">
                  ステータス
                </th>
                <th className="text-left px-6 py-3 font-medium text-gray-600">
                  操作
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {products.map((p) => {
                const s = statusLabel[p.status] ?? statusLabel.draft;
                return (
                  <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-800">
                      {p.title}
                    </td>
                    <td className="px-6 py-4 text-gray-600">{p.area ?? "—"}</td>
                    <td className="px-6 py-4 text-gray-600">
                      {p.duration_days}日
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      ¥{p.price_base.toLocaleString()}〜
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${s.color}`}
                      >
                        {s.label}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <Link
                        href={`/admin/products/${p.id}`}
                        className="text-amber-700 hover:text-amber-800 font-medium"
                      >
                        編集
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
