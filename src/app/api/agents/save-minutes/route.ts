import { NextRequest, NextResponse } from "next/server";
import { appendMeetingMinutes } from "@/lib/google-docs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { topic, participants, messages, keyDecisions } = body;

    if (!topic || !messages?.length) {
      return NextResponse.json(
        { error: "topic と messages は必須" },
        { status: 400 },
      );
    }

    await appendMeetingMinutes({
      topic,
      participants: participants || [],
      messages,
      keyDecisions: keyDecisions || [],
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Save minutes error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "保存に失敗しました" },
      { status: 500 },
    );
  }
}
