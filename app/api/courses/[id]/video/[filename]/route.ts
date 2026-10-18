import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { db } from "@/database";
import { purchases } from "@/database/schemas/purchases";
import { and, eq, gt } from "drizzle-orm";
import { courses } from "@/database/schemas/courses";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; filename: string }> },
) {
  try {
    const { id, filename } = await params;
    const userId = request.headers.get("x-user-id");

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // 1. Satyn alyş barlagy
    const dbPurchase = await db
      .select()
      .from(purchases)
      .where(
        and(
          eq(purchases.courseId, id),
          eq(purchases.userId, "100"), //userId
          eq(purchases.status, "active"),
          gt(purchases.pricePaid, 0),
        ),
      );

    if (!dbPurchase.length) {
      return new NextResponse("Forbidden", { status: 403 });
    }

    // 2. Kurs barlagy
    const dbCourse = await db
      .select()
      .from(courses)
      .where(and(eq(courses.isHslReady, true), eq(courses.id, id)));

    if (!dbCourse.length) {
      return new NextResponse("Forbidden", { status: 403 });
    }

    // 3. Segment faýlynyň fiziki ýoly
    const segmentPath = path.join(
      process.cwd(),
      "storage",
      "protected_videos",
      "video-1", // id
      filename,
    );

    if (!fs.existsSync(segmentPath)) {
      return new NextResponse("Segment file not found", { status: 404 });
    }

    // 4. `.ts` faýly okyyp ugratmak
    const fileBuffer = fs.readFileSync(segmentPath);

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        "Content-Type": "video/mp2t",
        "Cache-Control": "private, max-age=86400",
      },
    });
  } catch (error) {
    console.error("[Video Segment Error]:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
