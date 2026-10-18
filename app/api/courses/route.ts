import { NextRequest, NextResponse } from "next/server";
import { db } from "@/database";
import { courses } from "@/database/schemas/courses";
import { courseSchema } from "@/database/zod-schemas/courses";
import { count, desc, eq, getTableColumns, lte, sql, and } from "drizzle-orm";
import { moveCourseFilesToProtected } from "@/lib/courses/move-course-files";
import { processUploadedVideo } from "@/lib/courses/convert-to-hls";
import { users } from "@/database/schemas/users";

const limit = process.env?.COURSE_LIMIT
  ? parseInt(process.env?.COURSE_LIMIT)
  : 4;

// GET: /api/courses
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));

    const group = searchParams.get("group");
    const category = searchParams.get("category");

    const conditions = [eq(courses.isHslReady, true)];

    if (group === "construction" || group === "programming") {
      conditions.push(eq(courses.group, group));
    }

    if (category) {
      conditions.push(eq(courses.category, category));
    }

    const offset = (page - 1) * limit;

    const [{ totalCount }] = await db
      .select({ totalCount: count() })
      .from(courses);

    const sq = db
      .select({
        id: courses.id,
        title: courses.title,
        instructorId: courses.instructorId,
        durationHours: courses.durationHours,
        price: courses.price,
        subcategory: courses.subcategory,
        category: courses.category,
        group: courses.group,
        image: courses.image,
        videoURL: courses.videoURL,
        rating: courses.rating,
        lessons: courses.lessons,
        rowNum: sql<number>`row_number() over (
                    partition by ${courses.group} 
                    order by ${courses.createdAt} desc
                )`
          .mapWith(Number)
          .as("row_num"),
      })
      .from(courses)
      .where(and(...conditions))
      .as("sq");

    const data = await db
      .select()
      .from(sq)
      .where(lte(sq.rowNum, limit))
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
      { status: 500 },
    );
  }
}

// rugsady user role = admin
// POST: /api/courses
export async function POST(request: NextRequest) {
  try {
    const userId = request.headers.get("x-user-id")!;
    const dbUsers = await db.select().from(users).where(eq(users.id, userId));
    if (!dbUsers.length || dbUsers[0].role != "admin") {
      return new NextResponse("Forbidden", { status: 403 });
    }

    const body = await request.json();

    const validation = courseSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          message: validation.error.flatten(),
        },
        { status: 400 },
      );
    }
    let [newCourse] = await db
      .insert(courses)
      .values(validation.data)
      .returning();

    const { image, videoURL, id } = newCourse;
    // Faýllary /storage/upload-dan /storage/protected_videos/courseId/-e geçirmek
    const { newVideoPath, imageFileName } = moveCourseFilesToProtected({
      image,
      videoURL,
      courseId: id,
    });

    // Bazadaky kursyň faýl ýollaryny täze atlary bilen update etmek
    [newCourse] = await db
      .update(courses)
      .set({
        image: `/images/courses/${imageFileName}`,
        videoURL: `/api/courses/${newCourse.id}/video/private`,
      })
      .where(eq(courses.id, id))
      .returning();

    processUploadedVideo(newCourse.id, newVideoPath);

    return NextResponse.json(
      {
        success: true,
        data: newCourse,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("POST /api/courses error:", error);
    return NextResponse.json(
      { success: false, message: "error-message.server-error" },
      { status: 500 },
    );
  }
}
