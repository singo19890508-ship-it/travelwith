import { TravelerApplication } from "@/types/traveler";
import { APPLICATION_STATUS_LABELS, GENDER_LABELS } from "@/types/common";

interface TravelerTableProps {
  travelers: TravelerApplication[];
}

const statusColors: Record<string, string> = {
  pending: "bg-gray-100 text-gray-700",
  reviewing: "bg-blue-100 text-blue-700",
  matched: "bg-green-100 text-green-700",
  completed: "bg-purple-100 text-purple-700",
  cancelled: "bg-red-100 text-red-700",
};

export default function TravelerTable({ travelers }: TravelerTableProps) {
  if (travelers.length === 0) {
    return (
      <div className="text-center py-12 text-gray-400">
        申込データがありません
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
            <th className="text-left px-4 py-3 font-semibold text-gray-600">旅行先</th>
            <th className="text-left px-4 py-3 font-semibold text-gray-600">旅行日程</th>
            <th className="text-left px-4 py-3 font-semibold text-gray-600">ステータス</th>
            <th className="text-left px-4 py-3 font-semibold text-gray-600">受付日</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {travelers.map((t) => (
            <tr key={t.id} className="hover:bg-gray-50 transition-colors">
              <td className="px-4 py-3">
                <div className="font-medium text-gray-800">{t.name}</div>
                <div className="text-xs text-gray-400">{t.name_kana}</div>
              </td>
              <td className="px-4 py-3 text-gray-600">
                {GENDER_LABELS[t.gender] || t.gender}
              </td>
              <td className="px-4 py-3 text-gray-700">{t.destination}</td>
              <td className="px-4 py-3 text-gray-600 whitespace-nowrap">
                {t.travel_start_date} 〜 {t.travel_end_date}
                <span className="text-xs text-gray-400 ml-1">（{t.travel_nights}泊）</span>
              </td>
              <td className="px-4 py-3">
                <span
                  className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${statusColors[t.status] || "bg-gray-100 text-gray-700"}`}
                >
                  {APPLICATION_STATUS_LABELS[t.status] || t.status}
                </span>
              </td>
              <td className="px-4 py-3 text-gray-500 whitespace-nowrap">
                {new Date(t.created_at).toLocaleDateString("ja-JP")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
