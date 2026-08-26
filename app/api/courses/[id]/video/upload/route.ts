import { NextRequest, NextResponse } from "next/server";
import { pipeline } from "stream/promises";
import { Readable } from "stream";
import fsSync, { createWriteStream } from "fs";
import path from "path";
import { db } from "@/database";
import { users } from "@/database/schemas/users";
import { eq } from "drizzle-orm";

export async function POST(request: NextRequest) {
  try {
    // Auth & Admin Barlagy
    const userId = request.headers.get("x-user-id");
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const dbUsers = await db
      .select()
      .from(users)
      .where(eq(users.id, userId));

    if (!dbUsers.length || dbUsers[0].role !== "admin") {
      return new NextResponse("Forbidden", { status: 403 });
    }

    // FormData-dan faýllary almak
    const formData = await request.formData();
    const imageFile = formData.get("image") as File | null;
    const videoFile = formData.get("video") as File | null;

    if (!imageFile || !videoFile) {
      return NextResponse.json(
        { success: false, message: "Surat we wideo faýly saýlanmaly!" },
        { status: 400 }
      );
    }

    // Wagtlaýyn saklanjak bukjany döretmek (/storage/upload/)
    const uploadDir = path.join(process.cwd(), "storage", "upload");
    if (!fsSync.existsSync(uploadDir)) {
      fsSync.mkdirSync(uploadDir, { recursive: true });
    }

    // 4. Faýl atlaryny taýýarlamak
    const imageParsed = path.parse(imageFile.name);
    const videoParsed = path.parse(videoFile.name);

    const imageFileName = `poster_${imageParsed.name}_${userId}${imageParsed.ext}`;
    const videoFileName = `video_${videoParsed.name}_${userId}${videoParsed.ext}`;

    const imageFilePath = path.join(uploadDir, imageFileName);
    const videoFilePath = path.join(uploadDir, videoFileName);

    // STREAMING
    
    // Surat faýlyny Stream bilen ýazmak
    const imageReadable = Readable.fromWeb(imageFile.stream() as any);
    const imageWriteStream = createWriteStream(imageFilePath);
    await pipeline(imageReadable, imageWriteStream);

    // Wideo faýlyny Stream bilen ýazmak (Uly gigabaytlyk faýllarda memory crash berilmez)
    const videoReadable = Readable.fromWeb(videoFile.stream() as any);
    const videoWriteStream = createWriteStream(videoFilePath);
    await pipeline(videoReadable, videoWriteStream);

    return NextResponse.json({
      success: true,
      message: "Faýllar stream arkaly wagtlaýyn üstünlikli ýüklendi.",
      data: {
        image: imageFileName,
        videoURL: videoFileName,
      },
    });
  } catch (error: any) {
    console.error("[Upload API Streaming Error]:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Serwer ýalňyşlygy çykdy" },
      { status: 500 }
    );
  }
}

/* 
    import { NextRequest, NextResponse } from "next/server";
    import fs from "fs/promises";
    import fsSync from "fs";
    import path from "path";
    import { db } from "@/database";
    import { users } from "@/database/schemas/users";
    import { eq } from "drizzle-orm";


export async function POST(request: NextRequest) {
    try {
        // Middleware-den gelen Ulanyjy ID-sini almak
        const userId = request.headers.get('x-user-id')!;
        const dbUsers = await db.select().from(users).where(eq(users.id, userId));
        if (!dbUsers.length || dbUsers[0].role != 'admin') {
            return new NextResponse("Forbidden", { status: 403 });
        }

        // FormData obýektini okamaly
        const formData = await request.formData();
        const imageFile = formData.get("image") as File | null;
        const videoFile = formData.get("video") as File | null;

        if (!imageFile || !videoFile) {
            return NextResponse.json(
                { success: false, message: "Surat we wideo faýly saýlanmaly!" },
                { status: 400 }
            );
        }

        // Wagtlaýyn saklanjak bukjanyň fiziki ýoly (/storage/upload/)
        const uploadDir = path.join(process.cwd(), "storage", "upload");
        if (!fsSync.existsSync(uploadDir)) {
            fsSync.mkdirSync(uploadDir, { recursive: true });
        }

        // Faýllaryň ilkinji (original) adyny we giňeltmesini (extension) almak
        const imageParsed = path.parse(imageFile.name);
        const videoParsed = path.parse(videoFile.name);

        // Faýllary soraýan formatyňyzda atlandyrmak:
        // poster_name_userId.xxx  we  video_name_userId.xxx
        const imageFileName = `poster_${imageParsed.name}_${userId}${imageParsed.ext}`;
        const videoFileName = `video_${videoParsed.name}_${userId}${videoParsed.ext}`;

        const imageFilePath = path.join(uploadDir, imageFileName);
        const videoFilePath = path.join(uploadDir, videoFileName);

        // Faýllary Buffer görnüşinde disk-e ýazmak
        const imageBuffer = Buffer.from(await imageFile.arrayBuffer());
        const videoBuffer = Buffer.from(await videoFile.arrayBuffer());

        await fs.writeFile(imageFilePath, imageBuffer);
        await fs.writeFile(videoFilePath, videoBuffer);


        return NextResponse.json({
            success: true,
            message: "Faýllar wagtlaýyn üstünlikli ýüklendi.",
            data: {
                image: imageFileName,
                videoURL: videoFileName,
            },
        });
    } catch (error: any) {
        console.error("[Upload API Error]:", error);
        return NextResponse.json(
            { success: false, message: error.message || "Serwer ýalňyşlyk çykdy" },
            { status: 500 }
        );
    }
} 
    
*/