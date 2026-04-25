import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const GALLERY_PATH = path.join(process.cwd(), "src", "data", "gallery.json");

export async function GET() {
  try {
    const raw = fs.readFileSync(GALLERY_PATH, "utf-8");
    return NextResponse.json(JSON.parse(raw));
  } catch {
    return NextResponse.json([]);
  }
}

export async function POST(req: Request) {
  try {
    const gallery = await req.json();
    fs.writeFileSync(GALLERY_PATH, JSON.stringify(gallery, null, 2), "utf-8");
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
