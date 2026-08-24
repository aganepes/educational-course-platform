import { NextRequest, NextResponse } from "next/server";
import { db } from "@/database";
import { courses } from "@/database/schemas/courses";
import { purchases } from "@/database/schemas/purchases";
import { sendBuyVerificationOTP } from "@/lib/services/notification";
import { eq, and } from "drizzle-orm";
import { z } from "zod";
import { purchaseVerifications } from "@/database/schemas/verifications";

const buyRequestSchema = z.object({
    userId: z.string().min(1, "User ID hökmany"),
    email: z.string().email("Email nädogry").optional(),
    phone: z.string().min(8, "Telefon belgisi nädogry").optional(),
}).refine((data) => data.email || data.phone, {
    message: "Email ýa-da telefon belgisinden azyndan biri berilmeli",
});

interface RouteParams {
    params: Promise<{ videoId: string }>;
}

// POST: /api/courses/:ID/buy
export async function POST(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const courseId = params.id;
        const body = await request.json();

        const validation = buyRequestSchema.safeParse(body);
        if (!validation.success) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Format nädogry",
                    details: validation.error.format(),
                },
                { status: 400 }
            );
        }

        const { userId, email, phone } = validation.data;

        // 1. Kursyň bardygyny barlamak
        const course = await database.query.courses.findFirst({
            where: eq(courses.id, courseId),
        });

        if (!course) {
            return NextResponse.json(
                { success: false, error: "Kurs tapylmady" },
                { status: 404 }
            );
        }

        // 2. Eýýäm satyn alnandygyny barlamak
        const existingPurchase = await database.query.purchases.findFirst({
            where: and(
                eq(purchases.userId, userId),
                eq(purchases.courseId, courseId)
            ),
        });

        if (existingPurchase) {
            return NextResponse.json(
                { success: false, error: "Bu kurs eýýäm satyn alnan" },
                { status: 400 }
            );
        }

        // 3. 6 sanly OTP Kody generasiýa etmek (Mysal üçin: 482910)
        const code = Math.floor(100000 + Math.random() * 900000).toString();
        const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minut wagt

        // 4. Bazada saklamak
        await database.insert(purchaseVerifications).values({
            userId,
            courseId,
            code,
            expiresAt,
        });

        // 5. SMS we Email ugratmak
        const courseTitle =
            typeof course.title === "object" && course.title !== null
                ? (course.title as Record<string, string>).tm || "Kurs"
                : "Kurs";

        await sendBuyVerificationOTP({
            email,
            phone,
            code,
            courseTitle,
        });

        return NextResponse.json({
            success: true,
            message: "Tassyklama kody SMS we Email arkaly ugradyldy",
        });
    } catch (error) {
        console.error("POST /api/courses/[id]/buy error:", error);
        return NextResponse.json(
            { success: false, error: "Satyn alyş haýyşynda säwlik çykdy" },
            { status: 500 }
        );
    }
}