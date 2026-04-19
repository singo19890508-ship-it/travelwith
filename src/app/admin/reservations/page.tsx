import { createServiceClient } from "@/lib/supabase/server";

type ReservationRow = {
  id: string;
  traveler_name: string;
  traveler_email: string;
  traveler_phone: string | null;
  travel_date: string;
  participants: number;
  supporters_needed: number;
  special_needs: string | null;
  status: string;
  notes: string | null;
  created_at: string;
  tour_products: { title: string } | null;
};

async function getReservations(): Promise<ReservationRow[]> {
  try {
    const supabase = createServiceClient();
    const { data, error } = await supabase
      .from("reservations")
      .select(
        "id, traveler_name, traveler_email, traveler_phone, travel_date, participants, supporters_needed, special_needs, status, notes, created_at, tour_products(title)",
      )
      .order("created_at", { ascending: false });
    if (error) throw error;
    return (data ?? []) as ReservationRow[];
  } catch {
    return [];
  }
}

const statusLabel: Record<string, { label: string; color: string }> = {
  inquiry: { label: "相談中", color: "bg-yellow-100 text-yellow-700" },
  confirmed: { label: "確定", color: "bg-green-100 text-green-700" },
  cancelled: { label: "キャンセル", color: "bg-red-100 text-red-600" },
  completed: { label: "完了", color: "bg-gray-100 text-gray-600" },
};

export default async function ReservationsPage() {
  const reservations = await getReservations();

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">
          予約・問い合わせ管理
        </h1>
        <p className="text-gray-500 text-sm mt-1">{reservations.length} 件</p>
      </div>

      {reservations.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <p className="text-gray-400">まだ予約・問い合わせがありません</p>
        </div>
      ) : (
        <div className="space-y-4">
          {reservations.map((r) => {
            const s = statusLabel[r.status] ?? statusLabel.inquiry;
            const product = r.tour_products as { title: string } | null;
            return (
              <div
                key={r.id}
                className="bg-white rounded-xl border border-gray-200 p-6"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <span
                        className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${s.color}`}
                      >
                        {s.label}
                      </span>
                      {product && (
                        <span className="text-xs text-gray-500 truncate">
                          {product.title}
                        </span>
                      )}
                    </div>
                    <p className="font-bold text-gray-800 text-lg">
                      {r.traveler_name}
                    </p>
                    <div className="mt-2 grid grid-cols-2 md:grid-cols-4 gap-3 text-sm text-gray-600">
                      <div>
                        <span className="text-gray-400 text-xs block">
                          旅行希望日
                        </span>
                        {r.travel_date}
                      </div>
                      <div>
                        <span className="text-gray-400 text-xs block">
                          参加人数
                        </span>
                        {r.participants}名
                      </div>
                      <div>
                        <span className="text-gray-400 text-xs block">
                          サポーター希望
                        </span>
                        {r.supporters_needed}名
                      </div>
                      <div>
                        <span className="text-gray-400 text-xs block">
                          申込日
                        </span>
                        {new Date(r.created_at).toLocaleDateString("ja-JP")}
                      </div>
                    </div>
                    {r.traveler_email && (
                      <p className="mt-2 text-sm text-gray-500">
                        📧 {r.traveler_email}
                        {r.traveler_phone && (
                          <span className="ml-4">📞 {r.traveler_phone}</span>
                        )}
                      </p>
                    )}
                    {r.special_needs && (
                      <div className="mt-3 bg-amber-50 rounded-lg px-3 py-2 text-sm text-gray-700">
                        <span className="text-amber-700 font-medium text-xs block mb-0.5">
                          特記事項
                        </span>
                        {r.special_needs}
                      </div>
                    )}
                    {r.notes && (
                      <div className="mt-2 bg-gray-50 rounded-lg px-3 py-2 text-sm text-gray-600">
                        <span className="text-gray-500 font-medium text-xs block mb-0.5">
                          スタッフメモ
                        </span>
                        {r.notes}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
