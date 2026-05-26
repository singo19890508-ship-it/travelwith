import { SupporterRegistration } from "@/types/supporter";
import { SUPPORTER_STATUS_LABELS, GENDER_LABELS, QUALIFICATION_LABELS } from "@/types/common";
import type { Qualification } from "@/types/common";

interface SupporterTableProps {
  supporters: SupporterRegistration[];
}

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-700",
  active: "bg-green-100 text-green-700",
  inactive: "bg-gray-100 text-gray-700",
  rejected: "bg-red-100 text-red-700",
};

export default function SupporterTable({ supporters }: SupporterTableProps) {
  if (supporters.length === 0) {
    return (
      <div className="text-center py-12 text-gray-400">
        登録データがありません
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="text-left px-4 py-3 font-semibold text-gray-600">氏名</th>
            <th className="text-left px-4 py-3 font-semibold text-gray-600">性別</th>
            <th className="text-left px-4 py-3 font-semibold text-gray-600">居住地</th>
            <th className="text-left px-4 py-3 font-semibold text-gray-600">資格</th>
            <th className="text-left px-4 py-3 font-semibold text-gray-600">経験年数</th>
            <th className="text-left px-4 py-3 font-semibold text-gray-600">ステータス</th>
            <th className="text-left px-4 py-3 font-semibold text-gray-600">登録日</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {supporters.map((s) => (
            <tr key={s.id} className="hover:bg-gray-50 transition-colors">
              <td className="px-4 py-3">
                <div className="font-medium text-gray-800">{s.name}</div>
                <div className="text-xs text-gray-400">{s.name_kana}</div>
              </td>
              <td className="px-4 py-3 text-gray-600">
                {GENDER_LABELS[s.gender] || s.gender}
              </td>
              <td className="px-4 py-3 text-gray-700">{s.prefecture}</td>
              <td className="px-4 py-3 text-gray-600">
                <div className="flex flex-wrap gap-1">
                  {(s.qualifications || []).slice(0, 2).map((q) => (
                    <span key={q} className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded">
                      {QUALIFICATION_LABELS[q as Qualification] || q}
                    </span>
                  ))}
                  {(s.qualifications || []).length > 2 && (
                    <span className="text-xs text-gray-400">他{(s.qualifications || []).length - 2}件</span>
                  )}
                </div>
              </td>
              <td className="px-4 py-3 text-gray-600">{s.experience_years}年</td>
              <td className="px-4 py-3">
                <span
                  className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${statusColors[s.status] || "bg-gray-100 text-gray-700"}`}
                >
                  {SUPPORTER_STATUS_LABELS[s.status] || s.status}
                </span>
              </td>
              <td className="px-4 py-3 text-gray-500 whitespace-nowrap">
                {new Date(s.created_at).toLocaleDateString("ja-JP")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
