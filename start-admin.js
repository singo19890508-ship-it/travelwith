const { execSync, spawn } = require("child_process");
const path = require("path");
const os = require("os");

const projectPath = path.join(
  os.homedir(),
  "OneDrive",
  "デスクトップ",
  "AIエージェント組織",
  "02_Travel",
  "Dev",
  "旅行者マッチングサイト"
);

console.log("===================================");
console.log("  FUKU-TABI 管理画面を起動します");
console.log("===================================\n");
console.log("フォルダ:", projectPath, "\n");

try {
  console.log("[1/2] ビルド中... (1〜2分かかります)\n");
  execSync("npm run build", { cwd: projectPath, stdio: "inherit" });
} catch {
  console.error("\n[エラー] ビルドに失敗しました。");
  process.stdin.resume();
  process.stdin.once("data", () => process.exit(1));
  return;
}

console.log("\n[2/2] サーバー起動中...\n");
console.log("  URL      : http://localhost:3000/admin/login");
console.log("  パスワード: daifuku2026\n");
console.log("  ※ この画面は閉じないでください\n");

setTimeout(() => {
  const open =
    process.platform === "win32" ? "start" : "open";
  execSync(`${open} http://localhost:3000/admin/login`, { shell: true });
}, 2000);

const server = spawn("npm", ["start"], {
  cwd: projectPath,
  stdio: "inherit",
  shell: true,
});

server.on("close", (code) => {
  console.log(`\nサーバーが停止しました (code: ${code})`);
});
