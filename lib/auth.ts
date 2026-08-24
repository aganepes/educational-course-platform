import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { getAuthTokenFromRefresh, signAccessToken, signRefreshToken } from "./jwt";
import type { User } from "@/database/zod-schemas/users";

// Production gurşawynda __Host- öň goşulmasyny ulanmak
const IS_PROD = process.env.NODE_ENV === "production";

export const ACCESS_TOKEN_NAME = IS_PROD
  ? "__Host-access_token"
  : "access_token";

export const REFRESH_TOKEN_NAME = IS_PROD
  ? "__Secure-refresh_token"
  : "refresh_token";

export async function setAuthCookies(accessToken: string, refreshToken: string) {
  const cookieStore = await cookies();

  // Access Token (Gysga möhletli: 15 minut)
  cookieStore.set(ACCESS_TOKEN_NAME, accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 15,
    path: "/",
  });

  // Refresh Token (Uzak möhletli: 14 gün)
  cookieStore.set(REFRESH_TOKEN_NAME, refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 14,
    path: "/",
  });
}

export async function setAuthCookiesOfResponse(response: NextResponse, user: User) {
  const cookieStore = response.cookies;
  const accessToken = await signAccessToken({userId:user.id,sessionId:user.activeSessionId!});
  const refreshToken  = await signRefreshToken({userId:user.id,sessionId:user.activeSessionId!});
  
  // Access Token (Gysga möhletli: 15 minut)
  cookieStore.set(ACCESS_TOKEN_NAME, accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 15,
    path: "/",
  });

  // Refresh Token (Uzak möhletli: 14 gün)
  cookieStore.set(REFRESH_TOKEN_NAME, refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 14,
    path: "/",
  });

  return response
}


// Diňe Access Token-i täzelemek üçin (Refresh Flow wagtynda)
export async function setAccessTokenCookie(response: NextResponse, accessToken: string) {
  response.cookies.set(ACCESS_TOKEN_NAME, accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 15,
    path: "/",
  });
}

export async function removeAuthCookies() {
  const cookieStore = await cookies();
  cookieStore.delete(ACCESS_TOKEN_NAME);
  cookieStore.delete(REFRESH_TOKEN_NAME);
}

export function removeAuthNextResponse(response:NextResponse) {
  response.cookies.delete(ACCESS_TOKEN_NAME);
  response.cookies.delete(REFRESH_TOKEN_NAME);
  return response;
}


export async function getAuthToken() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refresh_token")?.value;

  if (!refreshToken) return null;

  return getAuthTokenFromRefresh(refreshToken);
}