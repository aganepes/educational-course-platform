import { NextRequest, NextResponse } from "next/server";
import { db } from "@/database";
import { courses } from "@/database/schemas/courses";
import { count, desc, gt } from "drizzle-orm";

// GET /api/courses/category-count
export async function GET(request: NextRequest) {
    try {
        const group = await db
            .select({
                count: count(),
                group: courses.group
            })
            .from(courses)
            .groupBy(courses.group)
            .having(({ count }) => gt(count, 1));

        const category = await db
            .select({
                count: count(),
                group: courses.group,
                category: courses.category
            })
            .from(courses)
            .groupBy(courses.category, courses.group)
            .having(({ count }) => gt(count, 1));

        return NextResponse.json({
            success: true,
            group,
            category
        });
    } catch (error) {
        console.error("GET /api/category-count error:", error);
        return NextResponse.json(
            { success: false, message: "error-message.server-error" },
            { status: 500 }
        );
    }
}