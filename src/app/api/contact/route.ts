import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createServiceClient } from "@/lib/supabase/server";
import { sendContactNotification } from "@/lib/email";

const contactSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  inquiry_type: z.enum(["use", "join", "other"]),
  travel_plan: z.string().optional(),
  support_needs: z.string().optional(),
  message: z.string().min(10).max(2000),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = contactSchema.parse(body);

    const supabase = createServiceClient();
    const { error } = await supabase.from("contact_inquiries").insert({
      name: data.name,
      email: data.email,
      phone: data.phone || null,
      inquiry_type: data.inquiry_type,
      travel_plan: data.travel_plan || null,
      support_needs: data.support_needs || null,
      message: data.message,
    });

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { message: "データの保存に失敗しました。もう一度お試しください。" },
        { status: 500 },
      );
    }

    // メール通知（失敗してもユーザーへのレスポンスは成功にする）
    sendContactNotification(data).catch(console.error);

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { message: "入力内容に誤りがあります。", errors: err.errors },
        { status: 400 },
      );
    }
    console.error("Unexpected error:", err);
    return NextResponse.json(
      { message: "サーバーエラーが発生しました。" },
      { status: 500 },
    );
  }
}
