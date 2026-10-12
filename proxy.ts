import {type NextRequest, NextResponse } from "next/server";
import { withAuth } from "./middlewares/with-auth";
import { withIntl } from "./middlewares/with-intl";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  // 1. Statik faýllary we API-lary sypdyrmak
  if (
    pathname.startsWith("/_next") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }
  
  // Ilki Auth Middleware işleýär
  const authResponse = await withAuth(request);

  // Eger Auth Middleware Redirect gaýtarsa
  if (authResponse.headers.get("location")) {
    return authResponse;
  }

  // Dil (next-intl) Middleware işleýär
  const intlResponse = withIntl(request);

  // Eger Auth-da täze header goýlan bolsa, ony i18n response-yna hem goşýarys
  authResponse.cookies.getAll().forEach((cookie) => {
    intlResponse.cookies.set(cookie.name, cookie.value);
  });
  const userId = authResponse.headers.get('x-user-id');
  if (userId) {
    intlResponse.headers.set('x-user-id', userId)
  }
  return intlResponse;
}

export const config = {
  matcher: ["/", "/(tm|ru|en)/:path*", "/((?!api|_next|_vercel|.*\\..*).*)"],
};