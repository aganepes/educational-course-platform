import { NextRequest, NextResponse } from "next/server";
import { db } from "@/database";
import { instructors } from "@/database/schemas/instructors";
import { eq } from "drizzle-orm";
import { instructorData } from "@/data/instructors";
import { updateInstructorSchema } from "@/database/zod-schemas/instructor";

interface RouteParams {
  params: Promise<{ id: string }>;
}

// GET: Instructor by ID (Fallback to static data)
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;

    // 1. Database-den gözlemek
    const dbInstructor = await db
      .select()
      .from(instructors)
      .where(eq(instructors.id, id))
      .limit(1);

    if (dbInstructor.length > 0) {
      return NextResponse.json({ source: "db", data: dbInstructor[0] });
    }

    // 2. Fallback: Static file-dan gözlemek
    const staticInstructor = instructorData[id as keyof typeof instructorData];

    if (staticInstructor) {
      return NextResponse.json({
        source: "static_file",
        data: { id, ...staticInstructor },
      });
    }

    return NextResponse.json({ error: "Mugallym tapylmady" }, { status: 404 });
  } catch (error) {
    console.error("GET Instructor Error:", error);
    return NextResponse.json({ error: "Serverde säwlik döredi" }, { status: 500 });
  }
}

// PUT: Update Instructor
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const body = await request.json();

    const validation = updateInstructorSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: "Format nædogry", details: validation.error.format() },
        { status: 400 }
      );
    }

    const updated = await db
      .update(instructors)
      .set(validation.data)
      .where(eq(instructors.id, id))
      .returning();

    if (updated.length === 0) {
      return NextResponse.json({ error: "Täzeler ýaly mugallym tapylmady" }, { status: 404 });
    }

    return NextResponse.json({ message: "Mugallym täzelendi", data: updated[0] });
  } catch (error) {
    console.error("PUT Instructor Error:", error);
    return NextResponse.json({ error: "Täzelenende säwlik çykdy" }, { status: 500 });
  }
}

// DELETE: Delete Instructor
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;

    const deleted = await db
      .delete(instructors)
      .where(eq(instructors.id, id))
      .returning();

    if (deleted.length === 0) {
      return NextResponse.json({ error: "Pozar ýaly mugallym tapylmady" }, { status: 404 });
    }

    return NextResponse.json({ message: "Mugallym pozuldy", id });
  } catch (error) {
    console.error("DELETE Instructor Error:", error);
    return NextResponse.json({ error: "Pozulanda säwlik çykdy" }, { status: 500 });
  }
}