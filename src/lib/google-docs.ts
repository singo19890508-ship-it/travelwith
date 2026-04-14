// Google Docs API — 会議録の追記

const GOOGLE_DOCS_SCOPES = "https://www.googleapis.com/auth/documents";

interface MeetingMinutes {
  topic: string;
  participants: string[];
  messages: { agentName: string; role: string; content: string }[];
  keyDecisions: string[];
  timestamp: string;
}

async function getAccessToken(): Promise<string> {
  const credentials = JSON.parse(process.env.GOOGLE_DOCS_CREDENTIALS || "{}");

  const now = Math.floor(Date.now() / 1000);
  const payload = {
    iss: credentials.client_email,
    scope: GOOGLE_DOCS_SCOPES,
    aud: "https://oauth2.googleapis.com/token",
    iat: now,
    exp: now + 3600,
  };

  // JWTを署名してアクセストークンを取得
  const header = Buffer.from(
    JSON.stringify({ alg: "RS256", typ: "JWT" }),
  ).toString("base64url");
  const body = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const unsigned = `${header}.${body}`;

  const { createSign } = await import("crypto");
  const sign = createSign("RSA-SHA256");
  sign.update(unsigned);
  const signature = sign.sign(credentials.private_key, "base64url");
  const jwt = `${unsigned}.${signature}`;

  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt,
    }),
  });

  const data = await res.json();
  if (!data.access_token) {
    throw new Error(`Token取得失敗: ${JSON.stringify(data)}`);
  }
  return data.access_token;
}

export async function appendMeetingMinutes(
  minutes: MeetingMinutes,
): Promise<void> {
  const docId = process.env.GOOGLE_DOCS_MINUTES_ID;
  if (!docId) throw new Error("GOOGLE_DOCS_MINUTES_IDが設定されていません");

  const accessToken = await getAccessToken();

  // 会議録のテキストを作成
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

  // ドキュメントの末尾に追記
  // まずドキュメントの現在の長さを取得
  const getRes = await fetch(
    `https://docs.googleapis.com/v1/documents/${docId}`,
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    },
  );
  const doc = await getRes.json();
  const endIndex = doc.body?.content?.slice(-1)[0]?.endIndex ?? 1;

  // テキストを挿入
  const updateRes = await fetch(
    `https://docs.googleapis.com/v1/documents/${docId}:batchUpdate`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        requests: [
          {
            insertText: {
              location: { index: endIndex - 1 },
              text,
            },
          },
        ],
      }),
    },
  );

  if (!updateRes.ok) {
    const err = await updateRes.json();
    throw new Error(`Docs書き込みエラー: ${JSON.stringify(err)}`);
  }
}
