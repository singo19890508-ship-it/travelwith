import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const TOURS_PATH = path.join(process.cwd(), "src", "data", "tours.json");

export async function GET() {
  try {
    const raw = fs.readFileSync(TOURS_PATH, "utf-8");
    return NextResponse.json(JSON.parse(raw));
  } catch {
    return NextResponse.json([]);
  }
}

export async function POST(req: Request) {
  try {
    const tours = await req.json();
    fs.writeFileSync(TOURS_PATH, JSON.stringify(tours, null, 2), "utf-8");
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
