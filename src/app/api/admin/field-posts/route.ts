import { NextRequest, NextResponse } from "next/server";
import { createPost } from "@/lib/field-posts";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = await createPost(body);
    if (!result) return NextResponse.json({ error: "Failed" }, { status: 500 });
    return NextResponse.json(result, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
