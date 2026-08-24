import { NextRequest, NextResponse } from "next/server";
import { db } from "@/database";
import { courses } from "@/database/schemas/courses";
import { purchases } from "@/database/schemas/purchases";
import { eq, and, gte } from "drizzle-orm";
import { z } from "zod";
import { purchaseVerifications } from "@/database/schemas/verifications";

const confirmBuySchema = z.object({
    userId: z.string().min(1, "User ID hökmany"),
    code: z.string().length(6, "Tassyklama kody 6 san bolmaly"),
});

export async function POST(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const courseId = params.id;
        const body = await request.json();

        const validation = confirmBuySchema.safeParse(body);
        if (!validation.success) {
            return NextResponse.json(
                { success: false, error: "Format nädogry", details: validation.error.format() },
                { status: 400 }
            );
        }

        const { userId, code } = validation.data;

        // 1. Kursyň bahasyny we bar olmagyny barlamak
        const course = await db.query.courses.findFirst({
            where: eq(courses.id, courseId),
        });

        if (!course) {
            return NextResponse.json(
                { success: false, error: "Kurs tapylmady" },
                { status: 404 }
            );
        }

        // 2. OTP Kody barlamak (möhleti geçmedik)
        const verification = await db.query.purchaseVerifications.findFirst({
            where: and(
                eq(purchaseVerifications.userId, userId),
                eq(purchaseVerifications.courseId, courseId),
                eq(purchaseVerifications.code, code),
                gte(purchaseVerifications.expiresAt, new Date())
            ),
        });

        if (!verification) {
            return NextResponse.json(
                { success: false, error: "Tassyklama kody nädogry ýa-da möhleti geçen" },
                { status: 400 }
            );
        }

        // 3. Satyn alnyşy Many-to-Many `purchases` tablisasyna goşmak
        const [newPurchase] = await db
            .insert(purchases)
            .values({
                userId,
                courseId,
                pricePaid: course.price,
                status: "active",
            })
            .returning();

        // 4. Ulanylan OTP kody pozmak
        await db
            .delete(purchaseVerifications)
            .where(eq(purchaseVerifications.id, verification.id));

        return NextResponse.json({
            success: true,
            message: "Kurs üstünlikli satyn alýndy",
            data: newPurchase,
        });
    } catch (error) {
        console.error("POST /api/courses/[id]/buy/confirm error:", error);
        return NextResponse.json(
            { success: false, error: "Satyn alyş tassyklananda säwlik çykdy" },
            { status: 500 }
        );
    }
}