import { NextRequest, NextResponse } from "next/server";
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

const BRIEF_PATH = join(process.cwd(), "src/data/project_brief.md");

export async function GET() {
  try {
    const content = readFileSync(BRIEF_PATH, "utf-8");
    return NextResponse.json({ content });
  } catch {
    return NextResponse.json({ content: "" });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { content } = await req.json();
    if (typeof content !== "string") {
      return NextResponse.json(
        { error: "content は文字列で指定してください" },
        { status: 400 },
      );
    }
    writeFileSync(BRIEF_PATH, content, "utf-8");
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Knowledge save error:", error);
    return NextResponse.json({ error: "保存に失敗しました" }, { status: 500 });
  }
}
