import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import { runFullMatching } from "@/lib/matching";
import type {
  TravelerApplication,
  SupporterRegistration,
} from "@/lib/matching";

export async function GET(req: NextRequest) {
  const supabase = createServiceClient();

  // 旅行者申込（pending のみ）
  const { data: travelers, error: tErr } = await supabase
    .from("traveler_applications")
    .select("*")
    .eq("status", "pending")
    .order("created_at", { ascending: false });

  if (tErr) {
    return NextResponse.json({ error: tErr.message }, { status: 500 });
  }

  // サポーター（active のみ）
  const { data: supporters, error: sErr } = await supabase
    .from("supporter_registrations")
    .select("*")
    .eq("status", "active");

  if (sErr) {
    return NextResponse.json({ error: sErr.message }, { status: 500 });
  }

  const results = runFullMatching(
    (travelers ?? []) as TravelerApplication[],
    (supporters ?? []) as SupporterRegistration[],
  );

  return NextResponse.json({
    results,
    summary: {
      totalTravelers: travelers?.length ?? 0,
      totalSupporters: supporters?.length ?? 0,
      matched: results.filter((r) => r.matches.some((m) => m.score > 0)).length,
    },
  });
}

// マッチ確定（status を matched に更新）
export async function POST(req: NextRequest) {
  const supabase = createServiceClient();
  const { travelerId, supporterId } = await req.json();

  if (!travelerId || !supporterId) {
    return NextResponse.json(
      { error: "travelerId と supporterId は必須" },
      { status: 400 },
    );
  }

  const { error: tErr } = await supabase
    .from("traveler_applications")
    .update({ status: "matched", updated_at: new Date().toISOString() })
    .eq("id", travelerId);

  if (tErr) {
    return NextResponse.json({ error: tErr.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
