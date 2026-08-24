import { NextResponse } from "next/server";
import { getAuthToken, removeAuthNextResponse } from "@/lib/auth";
import { db } from "@/database";
import { users } from "@/database/schemas/users";
import { eq } from "drizzle-orm";


export async function GET() {
    const token = await getAuthToken();

    if (!token) {
        return NextResponse.json(
            { success: false, user: null },
            { status: 401 }
        );
    }

    const { userId, sessionId } = token;
    const user = await db.query.users.findFirst({
        where: eq(users.id, userId),
    });


    if (!user || user.activeSessionId !== sessionId) {
        const response = NextResponse.json(
            { success: false, user: null },
            { status: 401 }
        );
        return removeAuthNextResponse(response);
    }

    return NextResponse.json({
        success: true,
        user: { id: user.id, username: user.username, email: user.email, phone: user.phone },
    });
}