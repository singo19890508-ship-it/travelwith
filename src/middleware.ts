import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "@/i18n/routing";

const intlMiddleware = createMiddleware(routing);

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

    return NextResponse.next();
  }

  // それ以外はnext-intlのロケールミドルウェアを適用
  return intlMiddleware(request);
}

export const config = {
  matcher: [
    // next-intl対象（APIルート・静的ファイル・adminを除く）
    "/((?!api|_next|_vercel|admin|.*\\..*).*)",
    "/admin/:path*",
  ],
};
