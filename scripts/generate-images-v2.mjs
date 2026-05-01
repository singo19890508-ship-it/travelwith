/**
 * FUKU-TABI 画像生成スクリプト v2
 * ツアーメイン画像5枚 + 介助者プロフィール写真6枚 + 追加シーン5枚 = 計16枚
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BASE_DIR = path.join(__dirname, "../public/images");

const TOUR_DIR = path.join(BASE_DIR, "tours-ai");
const CAREGIVER_DIR = path.join(BASE_DIR, "caregivers");
const SCENE_DIR = path.join(BASE_DIR, "generated");

for (const dir of [TOUR_DIR, CAREGIVER_DIR, SCENE_DIR]) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

const envPath = path.join(__dirname, "../.env.local");
const envContent = fs.readFileSync(envPath, "utf-8");
const apiKeyMatch = envContent.match(/GEMINI_API_KEY=(.+)/);
if (!apiKeyMatch) {
  console.error("❌ GEMINI_API_KEY が .env.local に見つかりません");
  process.exit(1);
}
const API_KEY = apiKeyMatch[1].trim();

const prompts = [
  // ── ツアーメイン画像 ──
  {
    dir: TOUR_DIR,
    filename: "tour-sakurajima-onsen.jpg",
    prompt:
      "A heartwarming travel scene in Kagoshima Japan — an elderly Japanese couple at a traditional ryokan overlooking the majestic Sakurajima volcano across Kinko Bay at sunset, warm golden light, lush Japanese garden with stone lanterns, a caring caregiver in light blue uniform standing respectfully nearby, serene and joyful atmosphere, photorealistic, wide landscape shot",
  },
  {
    dir: TOUR_DIR,
    filename: "tour-ibusuki.jpg",
    prompt:
      "A joyful scene at Ibusuki sand bath spa in Kagoshima Japan — a smiling elderly Japanese woman lying in the famous natural volcanic black sand, covered with a striped cotton yukata, attendant gently tending, beautiful ocean view of Kinko Bay in background, sunny day with gentle sea breeze, Japanese coastal landscape, photorealistic",
  },
  {
    dir: TOUR_DIR,
    filename: "tour-kagoshima-city.jpg",
    prompt:
      "A scenic sightseeing shot at Sengan-en garden in Kagoshima Japan — a wheelchair user and a caregiver at the elegant traditional Japanese garden gate with the iconic Sakurajima volcano visible across the bay, beautiful lush greenery, stone path, Satsuma domain era architecture, bright natural daylight, photorealistic",
  },
  {
    dir: TOUR_DIR,
    filename: "tour-kirishima.jpg",
    prompt:
      "A serene spiritual travel scene at Kirishima Jingu shrine in Kagoshima Japan — an elderly Japanese man with walking cane and a supportive caregiver admiring the majestic vermilion shrine gate surrounded by ancient cedar trees and mountain mist, soft morning light filtering through the trees, peaceful and sacred atmosphere, photorealistic",
  },
  {
    dir: TOUR_DIR,
    filename: "tour-yakushima.jpg",
    prompt:
      "A breathtaking nature scene on Yakushima island Japan — a Japanese family of three including a father in a wheelchair, his adult daughter, and a caregiver guide standing at the edge of a moss-covered ancient forest path with giant Yakusugi cedar trees towering above, emerald green forest, soft filtered sunlight through canopy, magical and awe-inspiring atmosphere, photorealistic",
  },

  // ── 介助者プロフィール写真 ──
  {
    dir: CAREGIVER_DIR,
    filename: "caregiver-tanaka-hanako.jpg",
    prompt:
      "A professional headshot portrait of a warm and caring Japanese woman in her early 30s, wearing a teal-colored caregiver uniform, gentle confident smile, short shoulder-length dark hair, clean white background with soft bokeh, natural studio lighting, approachable and trustworthy expression, photorealistic",
  },
  {
    dir: CAREGIVER_DIR,
    filename: "caregiver-yamamoto-kenji.jpg",
    prompt:
      "A professional headshot portrait of a reliable and energetic Japanese man in his mid 40s, wearing a light gray caregiver polo shirt, friendly warm smile, clean white background with soft bokeh, natural studio lighting, strong and dependable expression, short black hair, photorealistic",
  },
  {
    dir: CAREGIVER_DIR,
    filename: "caregiver-nakamura-yuki.jpg",
    prompt:
      "A professional headshot portrait of a bright and caring Japanese woman in her late 20s, wearing a white nursing uniform with a small caregiver badge, cheerful warm smile, clean white background with soft bokeh, natural studio lighting, young professional and trustworthy expression, long black hair tied back neatly, photorealistic",
  },
  {
    dir: CAREGIVER_DIR,
    filename: "caregiver-sato-hiroshi.jpg",
    prompt:
      "A professional headshot portrait of a wise and experienced Japanese man in his early 50s, wearing a dark navy caregiver uniform, warm professional smile with kind eyes, salt-and-pepper short hair, clean white background with soft bokeh, natural studio lighting, deeply trustworthy and experienced expression, photorealistic",
  },
  {
    dir: CAREGIVER_DIR,
    filename: "caregiver-kawano-miho.jpg",
    prompt:
      "A professional headshot portrait of a graceful and expressive Japanese woman in her early 30s, wearing a coral-pink caregiver uniform, warm communicative smile, clean white background with soft bokeh, natural studio lighting, empathetic and open expression, medium-length dark hair, photorealistic",
  },
  {
    dir: CAREGIVER_DIR,
    filename: "caregiver-ishida-tomoko.jpg",
    prompt:
      "A professional headshot portrait of a vibrant and warm Japanese woman in her early 40s, wearing a light green caregiver uniform, bright welcoming smile with slight tan suggesting outdoor work, clean white background with soft bokeh, natural studio lighting, energetic and dependable expression, shoulder-length wavy dark hair, photorealistic",
  },

  // ── 追加シーン画像 ──
  {
    dir: SCENE_DIR,
    filename: "11-ferry-boarding.jpg",
    prompt:
      "A supportive and hopeful travel scene at a Japanese ferry terminal — a caregiver in uniform carefully assisting a wheelchair user boarding a ferry boat headed toward a beautiful island, other travelers stepping aside kindly, blue ocean water, sunny day with white clouds, gentle sea breeze, Kagoshima ferry port atmosphere, photorealistic",
  },
  {
    dir: SCENE_DIR,
    filename: "12-meal-support.jpg",
    prompt:
      "A warm and dignified meal assistance scene — a caring Japanese caregiver gently helping an elderly Japanese woman enjoy a beautiful traditional kaiseki meal at a tatami ryokan room, lacquerware bowls with colorful seasonal Japanese dishes arranged elegantly, natural light from shoji screen window, warm and respectful atmosphere, photorealistic",
  },
  {
    dir: SCENE_DIR,
    filename: "13-arrival-joy.jpg",
    prompt:
      "A deeply emotional and joyful arrival scene — an elderly Japanese man in a wheelchair raising his arms in triumph and delight upon arriving at a scenic viewpoint overlooking Kagoshima bay with Sakurajima volcano in full view, his daughter hugging him from behind, caregiver smiling proudly, tears of happiness, golden sunset light, photorealistic",
  },
  {
    dir: SCENE_DIR,
    filename: "14-accessible-hotel.jpg",
    prompt:
      "A beautifully adapted accessible Japanese hotel room interior — wide doorways, roll-in shower with grab bars, low Japanese-style bed with firm mattress, elegant traditional shoji screen windows with view of Japanese garden, folded yukata on bed, thoughtful and luxurious barrier-free design, warm ambient lighting, no people, photorealistic",
  },
  {
    dir: SCENE_DIR,
    filename: "15-night-scenery.jpg",
    prompt:
      "A magical evening travel scene in Kagoshima Japan — a caregiver and a wheelchair user silhouetted against the glittering lights of Kagoshima city waterfront at dusk, Sakurajima volcano looming in the distance across the dark bay with its caldera faintly glowing, city reflections on calm water, warm and contemplative atmosphere, photorealistic",
  },
];

async function generateImage(prompt, filename, dir, index, total) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image:generateContent?key=${API_KEY}`;
  const body = {
    contents: [{ parts: [{ text: prompt }] }],
    generationConfig: { responseModalities: ["TEXT", "IMAGE"] },
  };

  const category = dir.includes("tours-ai")
    ? "🏝️ ツアー"
    : dir.includes("caregivers")
    ? "👤 介助者"
    : "🌄 シーン";

  console.log(`\n[${index + 1}/${total}] ${category} 生成中: ${filename}`);
  console.log(`  → ${prompt.substring(0, 70)}...`);

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`API エラー ${res.status}: ${err.substring(0, 200)}`);
  }

  const data = await res.json();
  const parts = data.candidates?.[0]?.content?.parts ?? [];
  const imagePart = parts.find((p) => p.inlineData?.mimeType?.startsWith("image/"));

  if (!imagePart) {
    throw new Error("画像データなし: " + JSON.stringify(data).substring(0, 200));
  }

  const ext = imagePart.inlineData.mimeType.split("/")[1] || "png";
  const actualFilename = filename.replace(/\.[^.]+$/, `.${ext}`);
  const outputPath = path.join(dir, actualFilename);
  fs.writeFileSync(outputPath, Buffer.from(imagePart.inlineData.data, "base64"));

  const relPath = outputPath.replace(path.join(__dirname, "../public"), "");
  console.log(`  ✅ 保存: ${relPath.replace(/\\/g, "/")}`);
  return { filename: actualFilename, dir };
}

async function main() {
  console.log("🎨 FUKU-TABI 画像生成 v2 開始");
  console.log(`🔑 APIキー: ${API_KEY.substring(0, 12)}...`);
  console.log(`📸 生成予定: ${prompts.length}枚`);
  console.log("  - ツアーメイン画像:  5枚");
  console.log("  - 介助者プロフィール: 6枚");
  console.log("  - 追加シーン:        5枚\n");

  const results = [];
  const errors = [];

  for (let i = 0; i < prompts.length; i++) {
    const { filename, prompt, dir } = prompts[i];
    try {
      const saved = await generateImage(prompt, filename, dir, i, prompts.length);
      results.push(saved);
      if (i < prompts.length - 1) await new Promise((r) => setTimeout(r, 1500));
    } catch (err) {
      console.error(`  ❌ エラー: ${err.message}`);
      errors.push({ filename, error: err.message });
    }
  }

  console.log("\n=============================");
  console.log(`✅ 成功: ${results.length}/${prompts.length} 枚`);
  if (errors.length > 0) {
    console.log(`❌ 失敗: ${errors.length} 枚`);
    errors.forEach((e) => console.log(`  - ${e.filename}: ${e.error}`));
  }
  console.log("\n次のステップ:");
  console.log("  1. tours.json の imageUrl を更新");
  console.log("  2. caregivers.ts の photo を更新");
  console.log("  3. npm run build で確認");
}

main().catch((err) => {
  console.error("致命的エラー:", err);
  process.exit(1);
});
