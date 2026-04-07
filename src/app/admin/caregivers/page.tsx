import Link from "next/link";
import { getCaregivers } from "@/lib/caregivers";
import DeleteCaregiverButton from "@/components/admin/DeleteCaregiverButton";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "介助者管理 | 管理画面" };

export default async function AdminCaregiversPage() {
  const caregivers = await getCaregivers();

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">介助者管理</h1>
          <p className="text-gray-500 text-sm mt-1">合計 {caregivers.length} 名</p>
        </div>
        <Link
          href="/admin/caregivers/new"
          className="px-4 py-2 bg-blue-600 text-white text-sm font-bold rounded-lg hover:bg-blue-700 transition-colors"
        >
          + 新規追加
        </Link>
      </div>

      {caregivers.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center text-gray-500 text-sm">
          介助者が登録されていません。「新規追加」から登録してください。
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-5 py-3 font-semibold text-gray-600">氏名</th>
                <th className="text-left px-5 py-3 font-semibold text-gray-600">性別</th>
                <th className="text-left px-5 py-3 font-semibold text-gray-600">年齢層</th>
                <th className="text-left px-5 py-3 font-semibold text-gray-600">エリア</th>
                <th className="text-left px-5 py-3 font-semibold text-gray-600">研修</th>
                <th className="text-left px-5 py-3 font-semibold text-gray-600">状態</th>
                <th className="px-5 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {caregivers.map((c, i) => (
                <tr key={c.id} className={i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}>
                  <td className="px-5 py-3 font-medium text-gray-900">{c.name}</td>
                  <td className="px-5 py-3 text-gray-600">{c.gender === "female" ? "女性" : "男性"}</td>
                  <td className="px-5 py-3 text-gray-600">{c.age_range}</td>
                  <td className="px-5 py-3 text-gray-600">{c.regions.slice(0, 2).join("・")}{c.regions.length > 2 ? "…" : ""}</td>
                  <td className="px-5 py-3">
                    {c.training_completed ? (
                      <span className="text-xs bg-teal-100 text-teal-700 px-2 py-0.5 rounded-full">修了</span>
                    ) : (
                      <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">未修了</span>
                    )}
                  </td>
                  <td className="px-5 py-3">
                    {c.available ? (
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">公開中</span>
                    ) : (
                      <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full">非公開</span>
                    )}
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3 justify-end">
                      <Link
                        href={`/admin/caregivers/${c.id}`}
                        className="text-blue-600 hover:underline text-xs font-medium"
                      >
                        編集
                      </Link>
                      <DeleteCaregiverButton id={c.id} name={c.name} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
