import { google } from "googleapis";
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

const CREDENTIALS_PATH =
  "C:/Users/singo/.config/google-calendar-mcp/credentials.json";
const TOKENS_PATH = join(process.cwd(), ".google-tokens.json");

function getOAuth2Client() {
  const credentials = JSON.parse(readFileSync(CREDENTIALS_PATH, "utf-8"));
  const { client_id, client_secret } = credentials.installed;

  const oauth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    "http://localhost:3001/callback",
  );

  const tokens = JSON.parse(readFileSync(TOKENS_PATH, "utf-8"));
  oauth2Client.setCredentials(tokens);

  // トークン自動更新時に保存
  oauth2Client.on("tokens", (newTokens) => {
    const current = JSON.parse(readFileSync(TOKENS_PATH, "utf-8"));
    const updated = { ...current, ...newTokens };
    writeFileSync(TOKENS_PATH, JSON.stringify(updated, null, 2));
  });

  return oauth2Client;
}

/**
 * 会議録をGoogle Docsに保存
 */
export async function saveMeetingToGoogleDocs(
  title: string,
  content: string,
): Promise<{ docId: string; url: string }> {
  const auth = getOAuth2Client();
  const docs = google.docs({ version: "v1", auth });
  const drive = google.drive({ version: "v3", auth });

  // 新規ドキュメント作成
  const doc = await docs.documents.create({
    requestBody: { title },
  });
  const docId = doc.data.documentId!;

  // コンテンツを挿入
  await docs.documents.batchUpdate({
    documentId: docId,
    requestBody: {
      requests: [
        {
          insertText: {
            location: { index: 1 },
            text: content,
          },
        },
      ],
    },
  });

  // FUKU-TABI会議録フォルダに移動（なければルートに保存）
  // フォルダ検索
  const folderSearch = await drive.files.list({
    q: "name='FUKU-TABI会議録' and mimeType='application/vnd.google-apps.folder' and trashed=false",
    fields: "files(id,name)",
  });

  if (folderSearch.data.files && folderSearch.data.files.length > 0) {
    const folderId = folderSearch.data.files[0].id!;
    await drive.files.update({
      fileId: docId,
      addParents: folderId,
      removeParents: "root",
      fields: "id,parents",
    });
  }

  const url = `https://docs.google.com/document/d/${docId}/edit`;
  return { docId, url };
}

/**
 * Gmailでメール送信
 */
export async function sendGmail(params: {
  to: string;
  subject: string;
  body: string;
}): Promise<void> {
  const auth = getOAuth2Client();
  const gmail = google.gmail({ version: "v1", auth });

  const message = [
    `To: ${params.to}`,
    `Subject: =?UTF-8?B?${Buffer.from(params.subject).toString("base64")}?=`,
    "MIME-Version: 1.0",
    "Content-Type: text/plain; charset=UTF-8",
    "Content-Transfer-Encoding: base64",
    "",
    Buffer.from(params.body).toString("base64"),
  ].join("\r\n");

  const encoded = Buffer.from(message)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");

  await gmail.users.messages.send({
    userId: "me",
    requestBody: { raw: encoded },
  });
}
