import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(request: NextRequest) {
  // Videonyň fiziki ýoly (public/videos/course.mp4 ýa-da serverdäki başga bir ýol)
  const videoPath = path.join(process.cwd(), "public/videos/course.mp4");

  if (!fs.existsSync(videoPath)) {
    return new NextResponse("Video tapylmady", { status: 404 });
  }

  const stat = fs.statSync(videoPath);
  const fileSize = stat.size;

  // Brauzerden gelen 'Range' header-i okaýarys
  const range = request.headers.get("range");

  if (!range) {
    // Eger Range bolmasa, tutuş faýly adaty ugradýarys
    const fileStream = fs.createReadStream(videoPath);
    return new NextResponse(fileStream as any, {
      headers: {
        "Content-Length": fileSize.toString(),
        "Content-Type": "video/mp4",
      },
    });
  }

  // Range parse etmek (mes: "bytes=1048576-")
  const CHUNK_SIZE = 1 * 1024 * 1024; // 1MB-lyk chunk-lar
  const parts = range.replace(/bytes=/, "").split("-");
  const start = parseInt(parts[0], 10);
  const end = parts[1]
    ? parseInt(parts[1], 10)
    : Math.min(start + CHUNK_SIZE, fileSize - 1);

  const contentLength = end - start + 1;

  // Node.js Stream döretmek
  const fileStream = fs.createReadStream(videoPath, { start, end });

  // Web ReadableStream-e öürmek (Next.js Edge/Node Response üçin)
  const stream = new ReadableStream({
    start(controller) {
      fileStream.on("data", (chunk) => controller.enqueue(chunk));
      fileStream.on("end", () => controller.close());
      fileStream.on("error", (err) => controller.error(err));
    },
    cancel() {
      fileStream.destroy();
    },
  });

  return new NextResponse(stream, {
    status: 206, // 206 Partial Content
    headers: {
      "Content-Range": `bytes ${start}-${end}/${fileSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": contentLength.toString(),
      "Content-Type": "video/mp4",
    },
  });
}