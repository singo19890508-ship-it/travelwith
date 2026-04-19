// Google Docs API — 会議録の追記（OAuth2方式）

import { google } from "googleapis";
import { readFileSync, writeFileSync } from "fs";

interface MeetingMinutes {
  topic: string;
  participants: string[];
  messages: { agentName: string; role: string; content: string }[];
  keyDecisions: string[];
  timestamp: string;
}

function getOAuth2Client() {
  const credPath = process.env.GOOGLE_CREDENTIALS_PATH;
  const tokenPath = process.env.GOOGLE_TOKENS_PATH;

  if (!credPath || !tokenPath) {
    throw new Error(
      "GOOGLE_CREDENTIALS_PATH / GOOGLE_TOKENS_PATH が設定されていません",
    );
  }

  const credentials = JSON.parse(readFileSync(credPath, "utf-8"));
  const { client_id, client_secret } = credentials.installed;

  const oauth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    "http://localhost:3001/callback",
  );

  const tokens = JSON.parse(readFileSync(tokenPath, "utf-8"));
  oauth2Client.setCredentials(tokens);

  // トークン更新時に自動保存
  oauth2Client.on("tokens", (newTokens) => {
    const current = JSON.parse(readFileSync(tokenPath, "utf-8"));
    writeFileSync(
      tokenPath,
      JSON.stringify({ ...current, ...newTokens }, null, 2),
    );
  });

  return oauth2Client;
}

export async function appendMeetingMinutes(
  minutes: MeetingMinutes,
): Promise<void> {
  const docId = process.env.GOOGLE_DOCS_MINUTES_ID;
  if (!docId) throw new Error("GOOGLE_DOCS_MINUTES_IDが設定されていません");

  const auth = getOAuth2Client();
  const docs = google.docs({ version: "v1", auth });

  // 会議録テキスト作成
  const date = new Date(minutes.timestamp).toLocaleString("ja-JP", {
    timeZone: "Asia/Tokyo",
  });

  const lines: string[] = [
    `\n${"═".repeat(50)}`,
    `📅 ${date}`,
    `🎯 議題：${minutes.topic}`,
    `👥 参加：${minutes.participants.join("・")}`,
    `${"═".repeat(50)}\n`,
  ];

  for (const msg of minutes.messages) {
    lines.push(`【${msg.agentName} / ${msg.role}】`);
    lines.push(msg.content);
    lines.push("");
  }

  if (minutes.keyDecisions.length > 0) {
    lines.push("【決定事項】");
    for (const d of minutes.keyDecisions) {
      lines.push(`・${d}`);
    }
    lines.push("");
  }

  const text = lines.join("\n");

  // ドキュメント末尾に追記
  const docRes = await docs.documents.get({ documentId: docId });
  const content = docRes.data.body?.content ?? [];
  const endIndex = content[content.length - 1]?.endIndex ?? 1;

  await docs.documents.batchUpdate({
    documentId: docId,
    requestBody: {
      requests: [
        {
          insertText: {
            location: { index: endIndex - 1 },
            text,
          },
        },
      ],
    },
  });
}

export function getMeetingDocUrl(): string {
  const docId = process.env.GOOGLE_DOCS_MINUTES_ID;
  if (!docId) return "";
  return `https://docs.google.com/document/d/${docId}/edit`;
}
