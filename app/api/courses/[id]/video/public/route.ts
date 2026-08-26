import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { PassThrough, Readable } from "stream";
import ffmpeg from "fluent-ffmpeg";
// import ffmpegInstaller from "@ffmpeg-installer/ffmpeg";
import type { RouteVideoParams } from "../../route";
import { courses } from "@/database/schemas/courses";
import { eq } from "drizzle-orm";
import { db } from "@/database";

// ffmpeg.setFfmpegPath(ffmpegInstaller.path);

export async function GET(request: NextRequest, { params }: RouteVideoParams) {
  try {
    const { id } = await params;

    const dbCourse = await db.select().from(courses).where(eq(courses.id, id));
    if (!dbCourse.length) {
      return NextResponse.json({ success: false, message: "error-message.data-not-found" }, { status: 404 });
    }

    const videoFileName = dbCourse[0].videoURL;
    const publicDurationSeconds = dbCourse[0]?.publicDurationSeconds ?? 360;
    const startTime = dbCourse[0].startTime;

    const videoPath = path.join(process.cwd(), "storage/videos/", videoFileName);

    if (!fs.existsSync(videoPath)) {
      return NextResponse.json({ success: false, message: "error-message.data-not-found" }, { status: 404 });
    }

    const passThroughStream = new PassThrough();

    const command = ffmpeg(videoPath)
      .setStartTime(startTime)
      .setDuration(publicDurationSeconds)
      .format("mp4")
      .videoCodec("libx264") 
      .audioCodec("aac")
      .outputOptions([
        "-movflags frag_keyframe+empty_moov+default_base_moof",
        "-preset ultrafast",
        "-tune zerolatency",
      ])
      .on("error", (err) => {
        if (!err.message.includes("Output stream closed")) {
          console.error("FFmpeg error:", err.message);
        }
        passThroughStream.destroy(err);
      });

    command.pipe(passThroughStream, { end: true });

    
    const webStream = Readable.toWeb(passThroughStream);

    // Brauzer ulanýan baglanyşygy kesse (Cancel etse) FFmpeg prosesini saklamak
    request.signal.addEventListener("abort", () => {
      command.kill("SIGKILL");
      passThroughStream.destroy();
    });

    return new NextResponse(webStream as ReadableStream, {
      status: 200,
      headers: {
        "Content-Type": "video/mp4",
        "Cache-Control": "no-store, no-cache, must-revalidate"
      },
    });

  } catch (error) {
    console.error("GET /api/courses/:ID/video/public error:", error);
    return NextResponse.json({ success: false, message: "error-message.server-error" }, { status: 500 });
  }
}