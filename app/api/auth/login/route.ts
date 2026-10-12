import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { eq } from "drizzle-orm";
import { db } from "@/database";
import { users } from "@/database/schemas/users";
import { signAccessToken, signRefreshToken } from "@/lib/jwt";
import { setAuthCookies } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const { identifier, password } = await request.json();
    
    if (!identifier || !password) {
      return NextResponse.json(
        { success: false, message: "error-message.data-error" },
        { status: 401 }
      );
    }

    const user = await db.query.users.findFirst({
      where: (u, { or, eq }) =>
        or(
          eq(u.username, identifier),
          eq(u.email, identifier),
          eq(u.phone, identifier)
        ),
    });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "error-message.user-not-found" },
        { status: 401 }
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { success: false, message: "error-message.password-error" },
        { status: 401 }
      );
    }

    // Single Session ID döretmek
    const sessionId = crypto.randomUUID();

    // Bazada sessiýany täzelemek (öňki giren enjamy çykarýar)
    await db
      .update(users)
      .set({ activeSessionId: sessionId })
      .where(eq(users.id, user.id));

    // JWT Token-leri öndürmek
    const accessToken = await signAccessToken({ userId: user.id, sessionId });
    const refreshToken = await signRefreshToken({ userId: user.id, sessionId });

    // Cookie-lere ýazmak
    await setAuthCookies(accessToken, refreshToken);

    return NextResponse.json({ success: true, message: "success-message.success-login" });
  } catch (error) {
    console.log('POST: /api/auth/login error:',error);
    return NextResponse.json(
      { success: false, message: "error-message.server-error" },
      { status: 500 }
    );
  }
}