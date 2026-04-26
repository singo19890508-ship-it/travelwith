#!/usr/bin/env node
/**
 * i18n キー整合チェックスクリプト
 * ja.json をマスターとして、全言語ファイルに同じキーが存在するか確認する
 * 不足キーは自動補完（ja.json の値を仮置き）するオプションあり
 *
 * 使い方:
 *   node scripts/check-i18n-keys.js         # チェックのみ
 *   node scripts/check-i18n-keys.js --fix   # 不足キーを自動補完
 */

const fs = require("fs");
const path = require("path");

const messagesDir = path.join(process.cwd(), "messages");
const MASTER_LOCALE = "ja";
const TARGET_LOCALES = ["en", "ko", "zh", "hi", "es"];
const FIX_MODE = process.argv.includes("--fix");

// オブジェクトから全キーパスを取得（例: "hero.strength1"）
function getAllKeyPaths(obj, prefix = "") {
  const keys = [];
  for (const [key, value] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (typeof value === "object" && value !== null && !Array.isArray(value)) {
      keys.push(...getAllKeyPaths(value, fullKey));
    } else {
      keys.push(fullKey);
    }
  }
  return keys;
}

// キーパスで値を取得
function getByPath(obj, keyPath) {
  return keyPath.split(".").reduce((acc, key) => acc?.[key], obj);
}

// キーパスで値をセット
function setByPath(obj, keyPath, value) {
  const keys = keyPath.split(".");
  let current = obj;
  for (let i = 0; i < keys.length - 1; i++) {
    if (!(keys[i] in current)) current[keys[i]] = {};
    current = current[keys[i]];
  }
  current[keys[keys.length - 1]] = value;
}

// メイン処理
const masterPath = path.join(messagesDir, `${MASTER_LOCALE}.json`);
const master = JSON.parse(fs.readFileSync(masterPath, "utf-8"));
const masterKeys = getAllKeyPaths(master);

let hasError = false;
let totalMissing = 0;

for (const locale of TARGET_LOCALES) {
  const filePath = path.join(messagesDir, `${locale}.json`);
  let data = {};
  try {
    data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  } catch {
    console.error(`❌ ${locale}.json が読み込めません`);
    hasError = true;
    continue;
  }

  const existingKeys = new Set(getAllKeyPaths(data));
  const missingKeys = masterKeys.filter((k) => !existingKeys.has(k));

  if (missingKeys.length === 0) {
    console.log(`✅ ${locale}.json — 全 ${masterKeys.length} キー OK`);
  } else {
    console.log(`\n⚠️  ${locale}.json — ${missingKeys.length} キー不足:`);
    missingKeys.forEach((k) => {
      const jaValue = getByPath(master, k);
      console.log(`   missing: ${k}`);
      console.log(`     ja値: ${JSON.stringify(jaValue)}`);
    });
    totalMissing += missingKeys.length;
    hasError = true;

    if (FIX_MODE) {
      missingKeys.forEach((k) => {
        const jaValue = getByPath(master, k);
        // ja値をそのまま仮置き（[JA] プレフィックスで未翻訳とわかる）
        const placeholder =
          typeof jaValue === "string" ? `[JA] ${jaValue}` : jaValue;
        setByPath(data, k, placeholder);
      });
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + "\n", "utf-8");
      console.log(
        `   → ${locale}.json に ${missingKeys.length} キーを仮補完しました`,
      );
    }
  }
}

console.log(
  `\n合計: ${masterKeys.length} キー / ${TARGET_LOCALES.length} 言語`,
);

if (hasError && !FIX_MODE) {
  console.log(`\n不足キー合計: ${totalMissing} 件`);
  console.log(`自動補完するには: node scripts/check-i18n-keys.js --fix`);
  process.exit(1);
} else if (FIX_MODE && totalMissing > 0) {
  console.log(
    `\n✅ ${totalMissing} キーを [JA] プレフィックス付きで補完しました`,
  );
  console.log(`   後で正しい翻訳に置き換えてください`);
} else if (!hasError) {
  console.log(`\n✅ 全言語ファイルのキーが揃っています`);
}
