/**
 * 朝のブリーフィング Gmail自動送信スクリプト
 * 実行: node scripts/morning-briefing-email.js
 * タスクスケジューラで毎朝5:00に自動実行可能
 */

const { google } = require("googleapis");
const Anthropic = require("@anthropic-ai/sdk");
const { readFileSync, writeFileSync } = require("fs");
const path = require("path");

// ─── 設定 ─────────────────────────────────────────────

const CALENDAR_CREDENTIALS_PATH =
  "C:/Users/singo/.config/google-calendar-mcp/credentials.json";
const CALENDAR_TOKENS_PATH =
  "C:/Users/singo/.config/google-calendar-mcp/tokens.json";

const GMAIL_CREDENTIALS_PATH =
  "C:/Users/singo/.config/google-calendar-mcp/credentials.json";
const GMAIL_TOKENS_PATH = path.join(__dirname, "..", ".google-tokens.json");

const MEMORY_PATH =
  "C:/Users/singo/.claude/projects/C--Users-singo-OneDrive--------AI--------/memory/MEMORY.md";

const TO_EMAIL = "daifuku@corekara-support.com";
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY || readEnvKey();

function readEnvKey() {
  try {
    const env = readFileSync(path.join(__dirname, "..", ".env.local"), "utf-8");
    const match = env.match(/ANTHROPIC_API_KEY="?([^"\n]+)"?/);
    return match ? match[1] : "";
  } catch {
    return "";
  }
}

// ─── OAuth クライアント ────────────────────────────────

function makeOAuth2(credPath, tokenPath) {
  const creds = JSON.parse(readFileSync(credPath, "utf-8"));
  const { client_id, client_secret } = creds.installed;
  const auth = new google.auth.OAuth2(
    client_id,
    client_secret,
    "http://localhost:3001/callback",
  );
  const tokens = JSON.parse(readFileSync(tokenPath, "utf-8"));
  auth.setCredentials(tokens);
  auth.on("tokens", (t) => {
    const cur = JSON.parse(readFileSync(tokenPath, "utf-8"));
    writeFileSync(tokenPath, JSON.stringify({ ...cur, ...t }, null, 2));
  });
  return auth;
}

// ─── カレンダー取得 ────────────────────────────────────

async function getTodayEvents() {
  try {
    const auth = makeOAuth2(CALENDAR_CREDENTIALS_PATH, CALENDAR_TOKENS_PATH);
    const calendar = google.calendar({ version: "v3", auth });

    const now = new Date();
    const start = new Date(now);
    start.setHours(0, 0, 0, 0);
    const end = new Date(now);
    end.setHours(23, 59, 59, 999);

    const res = await calendar.events.list({
      calendarId: "primary",
      timeMin: start.toISOString(),
      timeMax: end.toISOString(),
      singleEvents: true,
      orderBy: "startTime",
    });

    const events = res.data.items || [];
    if (events.length === 0) return "今日の予定はありません";

    return events
      .map((e) => {
        const start = e.start?.dateTime
          ? new Date(e.start.dateTime).toLocaleTimeString("ja-JP", {
              hour: "2-digit",
              minute: "2-digit",
              timeZone: "Asia/Tokyo",
            })
          : "終日";
        return `・${start} ${e.summary}`;
      })
      .join("\n");
  } catch (e) {
    return `カレンダー取得エラー: ${e.message}`;
  }
}

// ─── MEMORY.md 読み込み ────────────────────────────────

function readMemory() {
  try {
    const content = readFileSync(MEMORY_PATH, "utf-8");
    // 最初の200行だけ使用
    return content.split("\n").slice(0, 100).join("\n");
  } catch {
    return "記憶ファイル読み込み不可";
  }
}

// ─── ブリーフィング生成 ────────────────────────────────

async function generateBriefing(events, memory) {
  const client = new Anthropic({ apiKey: ANTHROPIC_API_KEY });
  const today = new Date().toLocaleDateString("ja-JP", {
    timeZone: "Asia/Tokyo",
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  });

  const prompt = `あなたはAI参謀「琥珀」です。福田真悟会長への朝のブリーフィングを生成してください。

今日の日付: ${today}

【今日の予定】
${events}

【プロジェクト現状（MEMORY.md抜粋）】
${memory}

---
以下のフォーマットで出力してください：

# 🌅 おはようございます、福田会長。琥珀です。

**【今日の日付】** ${today}

## 📅 今日の予定
（上記の予定を整理して記載）

## 🎯 今日の最優先タスク（1つだけ）
（MEMORY.mdの現在地から、今日やるべき最重要タスクを1つ）

## ⚡ 今週の焦点
（現在のフェーズで今週動かすべきことを2〜3行）

## 💬 琥珀からひとこと
（冷静で率直なアドバイスを1〜2文）

---
*琥珀 | AI参謀 | 自動生成*

制約：
- 簡潔に
- 余計な前置きなし
- ブリーフィングのみ出力`;

  const res = await client.messages.create({
    model: "claude-haiku-4-5",
    max_tokens: 600,
    messages: [{ role: "user", content: prompt }],
  });

  return res.content[0].type === "text" ? res.content[0].text : "";
}

// ─── Gmail送信 ────────────────────────────────────────

async function sendBriefingEmail(briefingText) {
  const auth = makeOAuth2(GMAIL_CREDENTIALS_PATH, GMAIL_TOKENS_PATH);
  const gmail = google.gmail({ version: "v1", auth });

  const today = new Date().toLocaleDateString("ja-JP", {
    timeZone: "Asia/Tokyo",
    month: "long",
    day: "numeric",
    weekday: "short",
  });
  const subject = `🌅 朝のブリーフィング ${today}`;

  // HTMLメール
  const htmlBody = briefingText
    .replace(/\n/g, "<br>")
    .replace(/# (.+)/g, "<h2>$1</h2>")
    .replace(/## (.+)/g, "<h3>$1</h3>")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/^・(.+)/gm, "<li>$1</li>");

  const htmlContent = `
    <html><body style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
      ${htmlBody}
    </body></html>
  `;

  const boundary = "boundary_" + Date.now();
  const messageParts = [
    `To: ${TO_EMAIL}`,
    `Subject: =?UTF-8?B?${Buffer.from(subject).toString("base64")}?=`,
    "MIME-Version: 1.0",
    `Content-Type: multipart/alternative; boundary="${boundary}"`,
    "",
    `--${boundary}`,
    "Content-Type: text/plain; charset=UTF-8",
    "Content-Transfer-Encoding: base64",
    "",
    Buffer.from(briefingText).toString("base64"),
    "",
    `--${boundary}`,
    "Content-Type: text/html; charset=UTF-8",
    "Content-Transfer-Encoding: base64",
    "",
    Buffer.from(htmlContent).toString("base64"),
    "",
    `--${boundary}--`,
  ].join("\r\n");

  const encoded = Buffer.from(messageParts)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");

  await gmail.users.messages.send({
    userId: "me",
    requestBody: { raw: encoded },
  });
}

// ─── メイン ───────────────────────────────────────────

async function main() {
  console.log("🌅 朝のブリーフィング生成開始...");

  const [events, memory] = await Promise.all([getTodayEvents(), readMemory()]);

  console.log("📅 カレンダー取得完了");
  console.log("🧠 MEMORY.md読み込み完了");

  const briefing = await generateBriefing(events, memory);
  console.log("✍️ ブリーフィング生成完了");

  await sendBriefingEmail(briefing);
  console.log(`✅ Gmailで送信完了 → ${TO_EMAIL}`);
  console.log("\n" + "─".repeat(40));
  console.log(briefing);
}

main().catch((e) => {
  console.error("❌ エラー:", e.message);
  process.exit(1);
});
