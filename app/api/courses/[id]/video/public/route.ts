import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { PassThrough } from "stream";
import ffmpeg from "fluent-ffmpeg";
import ffmpegInstaller from "@ffmpeg-installer/ffmpeg";

ffmpeg.setFfmpegPath(ffmpegInstaller.path);

interface RouteParams {
  params: Promise<{ videoId: string }>;
}

// GET: /api/courses/:ID/video/public
export async function GET(request: NextRequest, { params }: RouteParams) {
  const { videoId } = await params;

  // 1. AUTH CHECK: Session / Cookie barlagy
  const token = request.cookies.get("session_token")?.value;

  if (!token) {
    return NextResponse.json(
      { error: "Ruhsat berilmedi. Ilki login boluň." },
      { status: 401 }
    );
  }

  // 2. DATABASE CHECK (Mysal üçin)
  // Baza-dan şu videoId üçin video faýlyň adyny we mugt görkezilmeli sekuntyny (publicDuration) alyň.
  // Mysal üçin: DB-den publicDurationSeconds = 360 (6 minut) ýa-da 600 (10 minut) diýip geldi.
  const videoFileName = `${videoId}.mp4`;
  const publicDurationSeconds = 360; // DB-den alynýan dynamic wagt (sekundda)

  const videoPath = path.join(process.cwd(), "public/videos", videoFileName);

  if (!fs.existsSync(videoPath)) {
    return NextResponse.json({ error: "Video tapylmady" }, { status: 404 });
  }

  // 3. FLUENT-FFMPEG STREAMA SAZLAMAK
  // Node.js PassThrough stream döredýäris (FFmpeg-iň çykyşyny almak üçin)
  const passThroughStream = new PassThrough();

  const command = ffmpeg(videoPath)
    .setStartTime(0)
    .setDuration(publicDurationSeconds) // Baza-dan gelen dynamic wagt
    .format("mp4")
    .outputOptions([
      "-movflags frag_keyframe+empty_moov+default_base_moof",
      "-preset ultrafast", // CPU ýüküni azaltmak we çalt stream etmek üçin
    ])
    .on("error", (err) => {
      console.error("FFmpeg säwlik çykardy:", err.message);
      passThroughStream.destroy(err);
    });

  // Stream-i PassThrough pibine ugratmak
  command.pipe(passThroughStream, { end: true });

  // 4. Node.js Stream-i Web ReadableStream-e öürmek (Next.js Response üçin)
  const webStream = new ReadableStream({
    start(controller) {
      passThroughStream.on("data", (chunk: Buffer) => {
        controller.enqueue(chunk);
      });

      passThroughStream.on("end", () => {
        controller.close();
      });

      passThroughStream.on("error", (err) => {
        controller.error(err);
      });
    },
    cancel() {
      // Player ýapylsa ýa-da ulanyjy sahypadan çyksa FFmpeg-i saklamak
      command.kill("SIGKILL");
      passThroughStream.destroy();
    },
  });

  return new NextResponse(webStream, {
    status: 200,
    headers: {
      "Content-Type": "video/mp4",
      "Cache-Control": "no-store, no-cache, must-revalidate",
    },
  });
}