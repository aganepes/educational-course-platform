import { NextResponse, type NextRequest } from "next/server";
import { verifyAccessToken, signAccessToken, REFRESH_SECRET } from "@/lib/jwt";

import { jwtVerify } from "jose";
import { routing } from "@/i18n/routing";
import { setAccessTokenCookie } from "@/lib/auth";

const PUBLIC_ROUTES = [
    "/",
    "/login",
    "/register",
    "/portfolio",
    "/courses",
    "/about",
    "/contact",
    "/api/auth/login",
    "/api/auth/register",
    "/api/auth/refresh",
    "/api/auth/logout"
];

const AUTH_ROUTES = ["/login", "/register"];

export async function withAuth(request: NextRequest) {
    const { pathname } = request.nextUrl;

    const accessToken = request.cookies.get("access_token")?.value;
    const refreshToken = request.cookies.get("refresh_token")?.value;

    let isAuthenticated = false;
    let newAccessTokenToSet: string | null = null;

    // Access Token-i barlaýarys
    let payload: { userId: string; sessionId: string } | null = null;
    if (accessToken) {
        payload = await verifyAccessToken(accessToken);
        if (payload) isAuthenticated = true;
    }

    // Access Token geçersiz, ýöne Refresh Token bar bolsa -> Auto-Refresh
    if (!isAuthenticated && refreshToken) {
        try {
            const token = await jwtVerify(refreshToken, REFRESH_SECRET, {
                algorithms: ["HS256"],
            });
            payload = token.payload as any;
            const { userId, sessionId } = payload!;
            newAccessTokenToSet = await signAccessToken({ userId, sessionId });
            isAuthenticated = true;
        } catch {
            isAuthenticated = false;
        }
    }

    const pathnameWithoutLocale =
        pathname.replace(new RegExp(`^/(tm|ru|en)`), "") || "/";

    const isAuthRoute = AUTH_ROUTES.some((route) =>
        pathnameWithoutLocale.startsWith(route)
    );
    const isPublicRoute = PUBLIC_ROUTES.some(
        (route) => pathnameWithoutLocale === route
    );
    const isProtectedRoute = !isPublicRoute;

    const locale = routing.defaultLocale;

    // Redirect Logikasy
    // Giren ulanyjy /login ýa-da /register girmek islese -> Baş sahypa ugratmak
    if (isAuthenticated && isAuthRoute) {
        return NextResponse.redirect(new URL(`/${locale}`, request.url));
    }

    // Girmedik ulanyjy Goragly sahypa girmek islese -> /login-e ugratmak
    if (!isAuthenticated && isProtectedRoute) {
        return NextResponse.redirect(new URL(`/${locale}/login`, request.url));
    }

    // Eger täze Access Token alynan bolsa, ony Header arkaly indiki middleware-e berýäris
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-user-id", payload!.userId);
    const response = NextResponse.next({
        request: {
            headers: requestHeaders,
        }
    });
    if (newAccessTokenToSet) {
        setAccessTokenCookie(response, newAccessTokenToSet)
    }

    return response;
}