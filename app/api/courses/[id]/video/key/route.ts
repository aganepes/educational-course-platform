import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import type { RouteVideoParams } from "../../route";
import { db } from "@/database";
import { purchases } from "@/database/schemas/purchases";
import { and, eq, gt } from "drizzle-orm";
import { courses } from "@/database/schemas//courses";

export async function GET(request: NextRequest, { params }: RouteVideoParams) {
  const { id } = await params;
  const userId = request.headers.get("x-user-id")!;
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
        eq(purchases.userId, "100"), // userId
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
  // hsl not ready
  if (!dbCourse.length) {
    return new NextResponse("Forbidden", { status: 403 });
  }

  const keyPath = path.join(
    process.cwd(),
    "storage",
    "protected_videos",
    "video-1", //id,
    "enc.key",
  );
  // not found enc.key file
  if (!fs.existsSync(keyPath)) {
    return new NextResponse("Key not found", { status: 404 });
  }

  // all ok.
  const keyBuffer = fs.readFileSync(keyPath);

  return new NextResponse(keyBuffer, {
    status: 200,
    headers: {
      "Content-Type": "application/octet-stream",
      "Cache-Control": "no-store, no-cache, must-revalidate, private",
    },
  });
}
