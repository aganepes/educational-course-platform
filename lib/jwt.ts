import { SignJWT, jwtVerify } from "jose";

export const ACCESS_SECRET = new TextEncoder().encode(
  process.env.JWT_ACCESS_SECRET || "default_access_secret_123"
);
export const REFRESH_SECRET = new TextEncoder().encode(
  process.env.JWT_REFRESH_SECRET || "default_refresh_secret_123"
);

// Access Token (15 minutlyk)
export async function signAccessToken(payload: { userId: string; sessionId: string }) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("15m")
    .sign(ACCESS_SECRET);
}

// Refresh Token (14 günlik)
export async function signRefreshToken(payload: { userId: string; sessionId: string }) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("14d")
    .sign(REFRESH_SECRET);
}

// Token-i Barlaýjy
export async function verifyAccessToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, ACCESS_SECRET, {
      algorithms: ["HS256"]
    });
    return payload as { userId: string; sessionId: string };
  } catch {
    return null;
  }
}


export async function getAuthTokenFromRefresh(refreshToken: string) {
  try {
    // Refresh Token-i barlaýarys
    const { payload } = await jwtVerify(refreshToken, REFRESH_SECRET, {
      algorithms: ["HS256"],
    });

    // Payloaddan userId we sessionId-ni çykarýarys
    return {
      userId: payload.userId as string,
      sessionId: payload.sessionId as string,
    };
  } catch {
    return null;
  }
}