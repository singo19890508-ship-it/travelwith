import { createServiceClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const supabase = createServiceClient();
    const { data, error } = await supabase
      .from("tour_products")
      .update({
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
      .eq("id", id)
      .select()
      .single();

    if (error)
      return NextResponse.json({ error: error.message }, { status: 400 });
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: "サーバーエラーが発生しました" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const supabase = createServiceClient();
    const { error } = await supabase
      .from("tour_products")
      .delete()
      .eq("id", id);
    if (error)
      return NextResponse.json({ error: error.message }, { status: 400 });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "サーバーエラーが発生しました" },
      { status: 500 },
    );
  }
}
