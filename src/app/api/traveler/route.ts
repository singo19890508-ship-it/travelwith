import { NextRequest, NextResponse } from "next/server";
import { travelerSchema } from "@/lib/validations/travelerSchema";
import { createServiceClient } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // バリデーション
    const result = travelerSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        {
          message: "入力内容に誤りがあります",
          errors: result.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const data = result.data;

    // Supabaseに保存
    const supabase = createServiceClient();
    const { data: inserted, error } = await supabase
      .from("traveler_applications")
      .insert({
        name: data.name,
        name_kana: data.name_kana,
        email: data.email,
        phone: data.phone,
        birth_date: data.birth_date,
        gender: data.gender,
        disability_types: data.disability_types,
        mobility_level: data.mobility_level,
        required_supports: data.required_supports,
        medical_notes: data.medical_notes || null,
        destination: data.destination,
        travel_start_date: data.travel_start_date,
        travel_end_date: data.travel_end_date,
        travel_purpose: data.travel_purpose || null,
        accommodation_type: data.accommodation_type || null,
        budget_range: data.budget_range || null,
        supporter_gender_pref: data.supporter_gender_pref || null,
        supporter_age_pref: data.supporter_age_pref || null,
        message_to_supporter: data.message_to_supporter || null,
        status: "pending",
      })
      .select("id")
      .single();

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { message: "データの保存に失敗しました。しばらく経ってからお試しください。" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { id: inserted.id, message: "申込を受け付けました" },
      { status: 201 }
    );
  } catch (err) {
    console.error("Unexpected error:", err);
    return NextResponse.json(
      { message: "サーバーエラーが発生しました" },
      { status: 500 }
    );
  }
}
