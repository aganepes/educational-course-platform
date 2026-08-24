import { NextResponse } from "next/server";
import { removeAuthCookies } from "@/lib/auth";

export async function POST() {
    await removeAuthCookies();

    return NextResponse.json(
        { success: true, message: "success-message.logout" },
        { status: 200 }
    );
}