import { createServiceClient } from "@/lib/supabase/server";

interface Registration {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  message: string | null;
  created_at: string;
}

export default async function TrainingRegistrationsPage() {
  const supabase = createServiceClient();
  const { data } = await supabase
    .from("training_registrations")
    .select("*")
    .order("created_at", { ascending: false });

  const registrations = (data as Registration[]) ?? [];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">講座 仮登録一覧</h1>
        <span className="text-sm text-gray-500">{registrations.length} 件</span>
      </div>

      {registrations.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center text-gray-400">
          まだ登録がありません
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-5 py-3 font-semibold text-gray-600">
                  名前
                </th>
                <th className="text-left px-5 py-3 font-semibold text-gray-600">
                  メール
                </th>
                <th className="text-left px-5 py-3 font-semibold text-gray-600">
                  電話
                </th>
                <th className="text-left px-5 py-3 font-semibold text-gray-600">
                  一言
                </th>
                <th className="text-left px-5 py-3 font-semibold text-gray-600">
                  登録日
                </th>
              </tr>
            </thead>
            <tbody>
              {registrations.map((r, i) => (
                <tr
                  key={r.id}
                  className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  <td className="px-5 py-3 font-medium text-gray-900">
                    {r.name}
                  </td>
                  <td className="px-5 py-3 text-gray-600">{r.email}</td>
                  <td className="px-5 py-3 text-gray-500">{r.phone ?? "—"}</td>
                  <td className="px-5 py-3 text-gray-500 max-w-xs truncate">
                    {r.message ?? "—"}
                  </td>
                  <td className="px-5 py-3 text-gray-400 whitespace-nowrap">
                    {new Date(r.created_at).toLocaleDateString("ja-JP")}
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
