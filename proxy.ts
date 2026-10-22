import { NextRequest, NextResponse } from "next/server";
import { withAuth } from "./middlewares/with-auth";
import { withIntl } from "./middlewares/with-intl";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  // 1. Statik faýllary we API-lary sypdyrmak
  if (
    pathname.startsWith("/_next") ||
    (pathname.includes(".") && !pathname.startsWith("/api"))
  ) {
    return NextResponse.next();
  }

  // Ilki Auth Middleware işleýär
  const authResponse = await withAuth(request);
  // Eger Auth Middleware Redirect gaýtarsa
  if (authResponse.headers.get("location")) {
    return authResponse;
  }
  // Auth-dan çykan userId-ni alýarys
  const userId = authResponse.headers.get("x-user-id");
  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  if (pathname.startsWith("/api")) {
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-user-id", userId);

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }
  // Täzelenen request-i next-intl (ýa-da indiki middleware) üçin ulanýarys
  const modifiedRequest = new NextRequest(request);
  // Dil (next-intl) Middleware işleýär
  const intlResponse = withIntl(modifiedRequest);
  intlResponse.headers.set("x-user-id", userId);
  // Eger Auth-da täze header goýlan bolsa, ony i18n response-yna hem goşýarys
  authResponse.headers.forEach((value, key) => {
    if (key !== "x-user-id") {
      intlResponse.headers.set(key, value);
    }
  });

  return intlResponse;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
/*
    "/",
    "/(tm|ru|en)/:path*",
    "/api/:path*",
        "/api/courses/:courseId/video/:segmentId",
*/
