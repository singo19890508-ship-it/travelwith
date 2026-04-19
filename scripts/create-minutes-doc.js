/**
 * FUKU-TABI会議録マスタードキュメントを作成
 * 実行: node scripts/create-minutes-doc.js
 */

const { google } = require("googleapis");
const { readFileSync, writeFileSync } = require("fs");
const path = require("path");

const CREDENTIALS_PATH =
  "C:/Users/singo/.config/google-calendar-mcp/credentials.json";
const TOKENS_PATH = path.join(__dirname, "..", ".google-tokens.json");
const ENV_PATH = path.join(__dirname, "..", ".env.local");

const credentials = JSON.parse(readFileSync(CREDENTIALS_PATH, "utf-8"));
const { client_id, client_secret } = credentials.installed;

const oauth2Client = new google.auth.OAuth2(
  client_id,
  client_secret,
  "http://localhost:3001/callback",
);

const tokens = JSON.parse(readFileSync(TOKENS_PATH, "utf-8"));
oauth2Client.setCredentials(tokens);

async function main() {
  const docs = google.docs({ version: "v1", auth: oauth2Client });
  const drive = google.drive({ version: "v3", auth: oauth2Client });

  console.log("📄 FUKU-TABI会議録ドキュメントを作成中...");

  // ドキュメント作成
  const doc = await docs.documents.create({
    requestBody: {
      title: "📋 FUKU-TABI AI社員室 会議録",
    },
  });

  const docId = doc.data.documentId;
  const docUrl = `https://docs.google.com/document/d/${docId}/edit`;

  // ヘッダーテキストを追加
  const now = new Date().toLocaleString("ja-JP", { timeZone: "Asia/Tokyo" });
  await docs.documents.batchUpdate({
    documentId: docId,
    requestBody: {
      requests: [
        {
          insertText: {
            location: { index: 1 },
            text: `FUKU-TABI AI社員室 会議録\n作成日：${now}\n\nこのドキュメントには、AI社員室での会議・タスク議論が自動的に記録されます。\n${"─".repeat(40)}\n\n`,
          },
        },
      ],
    },
  });

  console.log("✅ 作成完了！");
  console.log("📄 Doc ID:", docId);
  console.log("🔗 URL:", docUrl);

  // FUKU-TABI会議録フォルダがあれば移動
  const folderSearch = await drive.files.list({
    q: "name='FUKU-TABI会議録' and mimeType='application/vnd.google-apps.folder' and trashed=false",
    fields: "files(id,name)",
  });

  if (folderSearch.data.files && folderSearch.data.files.length > 0) {
    const folderId = folderSearch.data.files[0].id;
    await drive.files.update({
      fileId: docId,
      addParents: folderId,
      removeParents: "root",
    });
    console.log("📁 FUKU-TABI会議録フォルダに移動しました");
  }

  // .env.local に GOOGLE_DOCS_MINUTES_ID を追記
  let envContent = readFileSync(ENV_PATH, "utf-8");
  if (envContent.includes("GOOGLE_DOCS_MINUTES_ID")) {
    envContent = envContent.replace(
      /GOOGLE_DOCS_MINUTES_ID=.*/,
      `GOOGLE_DOCS_MINUTES_ID=${docId}`,
    );
  } else {
    envContent += `\n# Google Docs会議録\nGOOGLE_DOCS_MINUTES_ID=${docId}\n`;
  }
  writeFileSync(ENV_PATH, envContent);
  console.log("✅ .env.local に GOOGLE_DOCS_MINUTES_ID を設定しました");
}

main().catch(console.error);
