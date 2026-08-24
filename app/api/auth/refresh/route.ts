import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { REFRESH_TOKEN_NAME, ACCESS_TOKEN_NAME, removeAuthNextResponse } from "@/lib/auth";
import { REFRESH_SECRET, signAccessToken } from "@/lib/jwt";
import { jwtVerify } from "jose";
import { validateUserSession } from "@/lib/auth-check";


export async function POST() {
  try {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get(REFRESH_TOKEN_NAME)?.value;

    if (!refreshToken) {
      return NextResponse.json({ success: false }, { status: 401 });
    }
    // refresh token session barlagy
    const { payload } = await jwtVerify(refreshToken, REFRESH_SECRET);
    const { userId, sessionId } = payload as { userId: string; sessionId: string };
    const isUserSession = await validateUserSession(userId, sessionId);
    if (!isUserSession) {
      const response = NextResponse.json({ success: false }, { status: 401 });
      return removeAuthNextResponse(response);
    }
    // Täze Access Token döretmek
    const newAccessToken = await signAccessToken({ userId, sessionId });

    cookieStore.set(ACCESS_TOKEN_NAME, newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 15,
      path: "/",
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false }, { status: 401 });
  }
}