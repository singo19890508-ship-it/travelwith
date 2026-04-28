/**
 * FUKU-TABI 画像生成スクリプト
 * Gemini Imagen 3 API を使って10枚のサイト用画像を生成します
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR = path.join(__dirname, "../public/images/generated");

// .env.local からAPIキーを読み込む
const envPath = path.join(__dirname, "../.env.local");
const envContent = fs.readFileSync(envPath, "utf-8");
const apiKeyMatch = envContent.match(/GEMINI_API_KEY=(.+)/);
if (!apiKeyMatch) {
  console.error("❌ GEMINI_API_KEY が .env.local に見つかりません");
  process.exit(1);
}
const API_KEY = apiKeyMatch[1].trim();

// 出力ディレクトリ作成
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// FUKU-TABI 用プロンプト10本
const prompts = [
  {
    filename: "01-hero-sakurajima.jpg",
    prompt:
      "An elderly Japanese woman in a wheelchair smiling joyfully, looking at the magnificent view of Sakurajima volcano across Kinko Bay in Kagoshima Japan, a caring caregiver kneeling beside her at the same eye level, golden hour warm light, lush green coastal path, heartfelt and hopeful atmosphere, photorealistic",
  },
  {
    filename: "02-onsen-support.jpg",
    prompt:
      "A professional caregiver in light blue uniform gently assisting an elderly Japanese man at a traditional wooden outdoor onsen hot spring bath in Kagoshima Japan, misty steam rising, calm and dignified moment, natural wooden interior, soft diffused morning light through bamboo, photorealistic warm tones",
  },
  {
    filename: "03-sakurajima-walk.jpg",
    prompt:
      "A young Japanese woman using forearm crutches walking confidently alongside a friendly caregiver on a scenic volcanic black sand path near Sakurajima in Kagoshima Japan, both smiling and laughing, backpacks, casual travel clothes, wide open landscape, bright blue sky with the iconic volcanic peak in background, photorealistic",
  },
  {
    filename: "04-welfare-taxi.jpg",
    prompt:
      "A wheelchair user being gently assisted into a white accessible welfare van taxi by a uniformed driver with a warm smile, in front of a traditional Japanese ryokan entrance in Kagoshima with cherry blossom trees, morning soft light, safe and reassuring atmosphere, photorealistic",
  },
  {
    filename: "05-family-trip.jpg",
    prompt:
      "Three generations of a happy Japanese family on a sightseeing trip together — elderly grandfather in a wheelchair, middle-aged daughter, and a young grandchild — at Sengan-en garden in Kagoshima with Sakurajima volcano visible across the bay, all smiling and connected, vibrant green garden, photorealistic",
  },
  {
    filename: "06-caregiver-portrait.jpg",
    prompt:
      "A warm professional portrait of a Japanese female caregiver in her early 30s wearing teal-colored uniform, gentle confident smile, standing outdoors in Kagoshima city with soft bokeh background of Japanese streetscape, natural window light, approachable and trustworthy expression, photorealistic",
  },
  {
    filename: "07-ibusuki-sand-bath.jpg",
    prompt:
      "An elderly Japanese couple half-buried in natural volcanic sand at the famous Ibusuki sand bath spa in Kagoshima Japan, relaxed and smiling, beautiful view of the sea in the background, a caring attendant nearby, calm afternoon light, traditional striped beach towels, photorealistic",
  },
  {
    filename: "08-travel-planning.jpg",
    prompt:
      "A caring caregiver and a middle-aged Japanese woman with a walking cane sitting together at a wooden café table, warmly looking at a travel map of Kagoshima together, cozy interior with green plants and natural light, cups of matcha green tea, collaborative and trusting atmosphere, photorealistic",
  },
  {
    filename: "09-kagoshima-scenery.jpg",
    prompt:
      "Breathtaking panoramic view of Kagoshima city waterfront with Sakurajima volcano reflected in the calm waters of Kinko Bay, golden sunset light painting the sky in warm orange and pink tones, a caregiver pushing a wheelchair user along the scenic promenade in the foreground, photorealistic",
  },
  {
    filename: "10-joyful-moment.jpg",
    prompt:
      "A deeply touching close-up photograph of an elderly Japanese woman's hands clasped with a young caregiver's hands on a train window ledge, blurred lush green Japanese countryside of Kagoshima passing outside, warm golden afternoon light streaming in, emotional and tender moment of human connection, photorealistic",
  },
];

async function generateImage(prompt, filename, index) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image:generateContent?key=${API_KEY}`;

  const body = {
    contents: [{ parts: [{ text: prompt }] }],
    generationConfig: { responseModalities: ["TEXT", "IMAGE"] },
  };

  console.log(`\n[${index + 1}/10] 生成中: ${filename}`);
  console.log(`  プロンプト: ${prompt.substring(0, 60)}...`);

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`API エラー ${res.status}: ${err}`);
  }

  const data = await res.json();

  // 画像パートを探す
  const parts = data.candidates?.[0]?.content?.parts ?? [];
  const imagePart = parts.find((p) => p.inlineData?.mimeType?.startsWith("image/"));

  if (!imagePart) {
    throw new Error("画像データが返ってきませんでした: " + JSON.stringify(data).substring(0, 200));
  }

  const ext = imagePart.inlineData.mimeType.split("/")[1] || "jpg";
  const actualFilename = filename.replace(/\.[^.]+$/, `.${ext}`);
  const outputPath = path.join(OUTPUT_DIR, actualFilename);
  fs.writeFileSync(outputPath, Buffer.from(imagePart.inlineData.data, "base64"));
  console.log(`  ✅ 保存: public/images/generated/${actualFilename}`);

  return outputPath;
}

async function main() {
  console.log("🎨 FUKU-TABI 画像生成スクリプト開始");
  console.log(`📁 出力先: ${OUTPUT_DIR}`);
  console.log(`🔑 APIキー: ${API_KEY.substring(0, 8)}...`);

  const results = [];
  const errors = [];

  for (let i = 0; i < prompts.length; i++) {
    const { filename, prompt } = prompts[i];
    try {
      const outputPath = await generateImage(prompt, filename, i);
      results.push({ filename, outputPath, success: true });
      // レート制限対策: 1秒待機
      if (i < prompts.length - 1) await new Promise((r) => setTimeout(r, 1000));
    } catch (err) {
      console.error(`  ❌ エラー: ${err.message}`);
      errors.push({ filename, error: err.message });
    }
  }

  console.log("\n=============================");
  console.log(`✅ 成功: ${results.length}/10 枚`);
  if (errors.length > 0) {
    console.log(`❌ 失敗: ${errors.length} 枚`);
    errors.forEach((e) => console.log(`  - ${e.filename}: ${e.error}`));
  }
  console.log("\n生成された画像:");
  results.forEach((r) => console.log(`  /images/generated/${r.filename}`));
  console.log(
    "\n管理画面 → コンテンツ編集 → ギャラリーのURLに貼り付けてください。"
  );
}

main().catch((err) => {
  console.error("致命的エラー:", err);
  process.exit(1);
});
