/**
 * Google Drive + Docs + Gmail OAuth認証セットアップ
 * 実行: node scripts/google-auth-setup.js
 * → ブラウザでGoogleアカウントにログイン・許可
 * → トークンが .google-tokens.json に保存される
 */

const { google } = require("googleapis");
const http = require("http");
const url = require("url");
const fs = require("fs");
const path = require("path");

const CREDENTIALS_PATH =
  "C:/Users/singo/.config/google-calendar-mcp/credentials.json";
const TOKENS_PATH = path.join(__dirname, "..", ".google-tokens.json");

const SCOPES = [
  "https://www.googleapis.com/auth/drive.file",
  "https://www.googleapis.com/auth/documents",
  "https://www.googleapis.com/auth/gmail.compose",
  "https://www.googleapis.com/auth/gmail.send",
];

const credentials = JSON.parse(fs.readFileSync(CREDENTIALS_PATH, "utf-8"));
const { client_id, client_secret } = credentials.installed;

const oauth2Client = new google.auth.OAuth2(
  client_id,
  client_secret,
  "http://localhost:3001/callback",
);

const authUrl = oauth2Client.generateAuthUrl({
  access_type: "offline",
  scope: SCOPES,
  prompt: "consent",
});

console.log("\n🔐 Google認証セットアップ");
console.log("=".repeat(50));
console.log(
  "\nブラウザで以下のURLを開いてGoogleアカウントを許可してください:\n",
);
console.log(authUrl);
console.log("\n（自動的にブラウザが開きます...）\n");

// ブラウザを開く
const { exec } = require("child_process");
exec(`start "" "${authUrl}"`);

// コールバックサーバーを起動
const server = http.createServer(async (req, res) => {
  if (!req.url.startsWith("/callback")) return;

  const qs = url.parse(req.url, true).query;
  const code = qs.code;

  if (!code) {
    res.end("エラー: 認証コードが見つかりません");
    return;
  }

  try {
    const { tokens } = await oauth2Client.getToken(code);
    fs.writeFileSync(TOKENS_PATH, JSON.stringify(tokens, null, 2));

    res.end(`
      <html><body style="font-family:sans-serif;padding:40px;text-align:center">
        <h2>✅ 認証完了！</h2>
        <p>トークンを保存しました。このタブを閉じてください。</p>
      </body></html>
    `);

    console.log("✅ 認証完了！トークンを保存しました:", TOKENS_PATH);
    console.log("\nこのウィンドウを閉じても大丈夫です。");
    server.close();
    process.exit(0);
  } catch (err) {
    res.end("エラー: " + err.message);
    console.error("エラー:", err);
  }
});

server.listen(3001, () => {
  console.log("認証待機中... (ポート3001)");
});
