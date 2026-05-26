import { NextRequest, NextResponse } from "next/server";
import { supporterSchema } from "@/lib/validations/supporterSchema";
import { createServiceClient } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // バリデーション
    const result = supporterSchema.safeParse(body);
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

    // agreed_to_terms が true でなければ拒否（スキーマで保証済みだが念のため）
    if (!data.agreed_to_terms) {
      return NextResponse.json(
        { message: "利用規約への同意が必要です" },
        { status: 400 }
      );
    }

    // Supabaseに保存
    const supabase = createServiceClient();
    const { data: inserted, error } = await supabase
      .from("supporter_registrations")
      .insert({
        name: data.name,
        name_kana: data.name_kana,
        email: data.email,
        phone: data.phone,
        birth_date: data.birth_date,
        gender: data.gender,
        prefecture: data.prefecture,
        occupation: data.occupation || null,
        qualifications: data.qualifications,
        experience_years: data.experience_years,
        experience_details: data.experience_details || null,
        available_supports: data.available_supports,
        available_traveler_gender: data.available_traveler_gender,
        available_regions: data.available_regions,
        available_period_from: data.available_period_from || null,
        available_period_to: data.available_period_to || null,
        available_duration: data.available_duration,
        motivation: data.motivation,
        self_introduction: data.self_introduction || null,
        emergency_contact: data.emergency_contact || null,
        agreed_to_terms: true,
        agreed_at: new Date().toISOString(),
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
      { id: inserted.id, message: "登録を受け付けました" },
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
