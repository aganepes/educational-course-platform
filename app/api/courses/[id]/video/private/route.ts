import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { db } from "@/database";
import { courses } from "@/database/schemas/courses";
import { eq, and } from "drizzle-orm";
import type { RouteVideoParams } from "../../route";
import { purchases } from "@/database/schemas/purchases";

export async function GET(
  request: NextRequest,
  { params }: RouteVideoParams
) {
  try {
    const { id } = await params;
    const userId = request.headers.get("x-user-id")!;

    const dbPurchase = await db.select().from(purchases).where(and(eq(purchases.courseId, id), eq(purchases.userId, userId), purchases.status, purchases.pricePaid));
    // don't to buy
    if (!dbPurchase.length) {
      return new NextResponse("Forbidden", { status: 403 });;
    }
    const dbCourse = await db.select().from(courses).where(and(eq(courses.isHslReady, true), eq(courses.id, id)));
    // hsl not ready
    if (!dbCourse.length) {
      return new NextResponse("Forbidden", { status: 403 });;
    }

    // Serwerdäki HLS Playlist (.m3u8) faýlynyň fiziki ýoly
    const m3u8Path = path.join(
      process.cwd(),
      "storage",
      "protected_videos",
      id,
      "output.m3u8"
    );

    if (!fs.existsSync(m3u8Path)) {
      return new NextResponse("Video not found", { status: 404 });
    }

    // .m3u8 faýlyny okap ugratmak
    const m3u8Content = fs.readFileSync(m3u8Path, "utf-8");

    return new NextResponse(m3u8Content, {
      status: 200,
      headers: {
        "Content-Type": "application/x-mpegURL",
        "Cache-Control": "no-store, no-cache, must-revalidate, private",
        "Pragma": "no-cache",
      },
    });
  } catch (error) {
    console.error("[Private Video Stream Error]:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}