import { NextResponse } from "next/server";
import { exec } from "child_process";
import path from "path";
import { promisify } from "util";

const execAsync = promisify(exec);
const ROOT = path.join(process.cwd());

export async function POST() {
  try {
    const now = new Date().toLocaleString("ja-JP", {
      timeZone: "Asia/Tokyo",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });

    const commands = [
      `git -C "${ROOT}" add src/data/tours.json src/data/gallery.json messages/ja.json`,
      `git -C "${ROOT}" diff --cached --quiet || git -C "${ROOT}" commit -m "content: 管理画面から更新 ${now}"`,
      `git -C "${ROOT}" push`,
    ];

    const results: string[] = [];
    for (const cmd of commands) {
      try {
        const { stdout, stderr } = await execAsync(cmd, { timeout: 30000 });
        results.push(stdout || stderr || "(ok)");
      } catch (e: unknown) {
        // "nothing to commit" は正常
        const msg = e instanceof Error ? e.message : String(e);
        if (
          msg.includes("nothing to commit") ||
          msg.includes("up-to-date") ||
          msg.includes("Everything up-to-date")
        ) {
          results.push("変更なし（スキップ）");
        } else {
          throw new Error(msg);
        }
      }
    }

    return NextResponse.json({ ok: true, log: results.join("\n") });
  } catch (e) {
    return NextResponse.json({ ok: false, error: String(e) }, { status: 500 });
  }
}
