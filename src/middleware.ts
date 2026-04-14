import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // /admin/login は認証不要
  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  // /admin/* は認証が必要
  if (pathname.startsWith("/admin")) {
    const session = request.cookies.get("admin_session");

    if (!session?.value) {
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }

    // セッションの簡易検証（値が存在すれば通過）
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
