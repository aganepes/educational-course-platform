import { NextRequest, NextResponse } from "next/server";
import { db } from "@/database";
import { courses } from "@/database/schemas/courses";
import { courseSchema } from "@/database/zod-schemas/courses";
import { count, desc } from "drizzle-orm";

const COURCE_LIMIT = 4;

// GET: /api/courses
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);

        const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
        const limit = COURCE_LIMIT;
        const offset = (page - 1) * limit;

        const [{ totalCount }] = await db
            .select({ totalCount: count() })
            .from(courses);

        const data = await db
            .select()
            .from(courses)
            .orderBy(desc(courses.createdAt))
            .limit(limit)
            .offset(offset);

        const totalPages = Math.ceil(totalCount / limit);

        return NextResponse.json({
            success: true,
            data,
            pagination: {
                page,
                limit,
                totalItems: totalCount,
                totalPages,
                hasNextPage: page < totalPages,
                hasPrevPage: page > 1,
            },
        });
    } catch (error) {
        console.error("GET /api/courses error:", error);
        return NextResponse.json(
            { success: false, message: "error-message.server-error" },
            { status: 500 }
        );
    }
}

// rugsady işlemeli
// POST: /api/courses
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const validation = courseSchema.safeParse(body);
        if (!validation.success) {
            return NextResponse.json(
                {
                    success: false,
                    message: validation.error.flatten(),
                },
                { status: 400 }
            );
        }

        const [newCourse] = await db
            .insert(courses)
            .values(validation.data)
            .returning();

        return NextResponse.json(
            {
                success: true,
                data: newCourse,
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("POST /api/courses error:", error);
        return NextResponse.json(
            { success: false, message: "error-message.server-error" },
            { status: 500 }
        );
    }
}