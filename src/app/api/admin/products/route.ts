import { createServiceClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const supabase = createServiceClient();
    const { data, error } = await supabase
      .from("tour_products")
      .insert({
        title: body.title,
        description: body.description,
        area: body.area,
        duration_days: body.duration_days,
        price_base: body.price_base,
        price_supporter: body.price_supporter,
        max_participants: body.max_participants,
        status: body.status,
        barrier_free_info: body.barrier_free_info,
        itinerary: body.itinerary,
      })
      .select()
      .single();

    if (error)
      return NextResponse.json({ error: error.message }, { status: 400 });
    return NextResponse.json(data, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "サーバーエラーが発生しました" },
      { status: 500 },
    );
  }
}
