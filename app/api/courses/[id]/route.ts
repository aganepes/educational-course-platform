import { NextRequest, NextResponse } from "next/server";
import { db } from "@/database";
import { courses } from "@/database/schemas/courses";
import { eq } from "drizzle-orm";
import { updateCourseSchema } from "@/database/zod-schemas/courses";

interface RouteParams {
    params: Promise<{ id: string }>;
}

// GET: /api/courses/:ID
export async function GET(request: NextRequest, { params }: RouteParams) {
    try {
        const { id } = await params;

        const dbCourse = await db.select().from(courses).where(eq(courses.id, id)).limit(1);
        if (!dbCourse.length) {
            return NextResponse.json({ success: false, message: "error-message.data-not-found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: dbCourse[0] }, { status: 200 });
    } catch (error) {
        console.error("GET /api/courses/:id error:", error);
        return NextResponse.json({ success: false, message: "error-message.server-error" }, { status: 500 });
    }
}

// update etmeklige rugsadyny işle
// PUT: /api/courses/:ID
export async function PUT(request: NextRequest, { params }: RouteParams) {
    try {
        const { id } = await params;
        const body = await request.json();

        const validation = updateCourseSchema.safeParse(body);

        if (!validation.success) {
            return NextResponse.json(
                { success: false, message: validation.error.flatten() },
                { status: 400 }
            );
        }

        const updatedData = validation.data;

        // DB-de täzelemek
        const updatedCourse = await db
            .update(courses)
            .set(updatedData)
            .where(eq(courses.id, id))
            .returning();

        if (updatedCourse.length === 0) {
            return NextResponse.json({ success: false, message: "error-message.data-not-found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: updatedCourse[0] });
    } catch (error) {
        console.error("PUT /api/courses/:id error:", error);
        return NextResponse.json({ success: false, message: "error-message.server-error" }, { status: 500 });
    }
}

// update etmeklige rugsadyny işle
// DELETE: /api/courses/:ID
export async function DELETE(request: NextRequest, { params }: RouteParams) {
    try {
        const { id } = await params;

        const deletedCourse = await db
            .delete(courses)
            .where(eq(courses.id, id))
            .returning();

        if (deletedCourse.length === 0) {
            return NextResponse.json({ success: false, message: "error-message.data-not-found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, id });
    } catch (error) {
        console.error("DELETE /api/courses/:id error:", error);
        return NextResponse.json({ success: false, message: "error-message.server-error" }, { status: 500 });
    }
}