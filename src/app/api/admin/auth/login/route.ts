import { NextRequest, NextResponse } from "next/server";
import { createHash } from "crypto";

function generateSessionToken(password: string, secret: string): string {
  return createHash("sha256")
    .update(password + secret)
    .digest("hex");
}

export async function POST(req: NextRequest) {
  const { password } = await req.json();

  const adminPassword = process.env.ADMIN_PASSWORD;
  const adminSecret = process.env.ADMIN_SECRET;

  if (!adminPassword || !adminSecret) {
    return NextResponse.json({ error: "サーバー設定エラー" }, { status: 500 });
  }

  if (password !== adminPassword) {
    return NextResponse.json(
      { error: "パスワードが違います" },
      { status: 401 },
    );
  }

  const token = generateSessionToken(adminPassword, adminSecret);

  const response = NextResponse.json({ success: true });
  response.cookies.set("admin_session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7日間
    path: "/",
  });

  return response;
}
