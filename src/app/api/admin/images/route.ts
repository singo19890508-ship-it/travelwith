import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const GENERATED_DIR = path.join(process.cwd(), "public", "images", "generated");

export async function GET() {
  try {
    if (!fs.existsSync(GENERATED_DIR)) {
      return NextResponse.json([]);
    }
    const files = fs
      .readdirSync(GENERATED_DIR)
      .filter((f) => /\.(png|jpg|jpeg|webp|gif)$/i.test(f))
      .sort();

    const images = files.map((filename) => {
      const stat = fs.statSync(path.join(GENERATED_DIR, filename));
      return {
        filename,
        url: `/images/generated/${filename}`,
        size: stat.size,
        createdAt: stat.birthtime.toISOString(),
      };
    });

    return NextResponse.json(images);
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
