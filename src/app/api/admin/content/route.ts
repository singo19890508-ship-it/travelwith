import { NextRequest, NextResponse } from "next/server";
import { readFileSync, writeFileSync } from "fs";
import path from "path";

const MESSAGES_PATH = path.join(process.cwd(), "messages", "ja.json");

function deepMerge(
  target: Record<string, unknown>,
  source: Record<string, unknown>,
): Record<string, unknown> {
  const result = { ...target };
  for (const key of Object.keys(source)) {
    const sv = source[key];
    const tv = target[key];
    if (
      typeof sv === "object" &&
      sv !== null &&
      !Array.isArray(sv) &&
      typeof tv === "object" &&
      tv !== null
    ) {
      result[key] = deepMerge(
        tv as Record<string, unknown>,
        sv as Record<string, unknown>,
      );
    } else {
      result[key] = sv;
    }
  }
  return result;
}

export async function GET() {
  try {
    const raw = readFileSync(MESSAGES_PATH, "utf-8");
    return NextResponse.json(JSON.parse(raw));
  } catch {
    return NextResponse.json(
      { error: "コンテンツの読み込みに失敗しました" },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const updates = await req.json();
    const current = JSON.parse(readFileSync(MESSAGES_PATH, "utf-8"));
    const merged = deepMerge(current, updates);
    writeFileSync(MESSAGES_PATH, JSON.stringify(merged, null, 2), "utf-8");
    return NextResponse.json({ success: true });
  } catch (err) {
    // Vercel (read-only filesystem) など書き込み不可の場合
    const msg = err instanceof Error ? err.message : String(err);
    const isReadOnly =
      msg.includes("EROFS") ||
      msg.includes("read-only") ||
      msg.includes("EACCES");
    return NextResponse.json(
      {
        error: isReadOnly
          ? "本番環境（Vercel）ではファイルに書き込めません。ローカルで編集後、git pushしてください。"
          : "保存に失敗しました: " + msg,
      },
      { status: 500 },
    );
  }
}
