import fs from "fs";
import path from "path";
import crypto from "crypto";
import ffmpeg from "fluent-ffmpeg";
import { db } from "@/database";
import { courses } from "@/database/schemas/courses";
import { eq } from "drizzle-orm";

interface ConvertOptions {
  inputMp4Path: string; // MP4 faýlyň serwerdäki ýoly /storage/video/courseID 
  outputDir: string; // HLS faýllaryň ýazyljak bukjasy (/storage/protected_videos/courseID)
  keyUrlPath: string; // Player-iň açary sorajak API adresi (/api/courses/courseID/video/key)
  segmentDuration?: number; // Segment uzynlygy (sekuntda), default: 5s
}

export async function convertMp4ToEncryptedHls({
  inputMp4Path,
  outputDir,
  keyUrlPath,
  segmentDuration = 5,
}: ConvertOptions): Promise<void> {
  return new Promise((resolve, reject) => {
    try {
      // Çykyş bukjasy ýok bolsa döretmek
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }

      // 16-Byte AES-128 Gizlin Açaryny (enc.key) döretmek
      const keyPath = path.join(outputDir, "enc.key");
      const keyBuffer = crypto.randomBytes(16);
      fs.writeFileSync(keyPath, keyBuffer);

      // FFmpeg üçin Key Info faýlyny (enc.keyinfo) döretmek
      // Line 1: Browser/Player üçin Key API URL
      // Line 2: FFmpeg üçin Açar faýlynyň ýerleşýän fiziki ýoly
      const keyInfoPath = path.join(outputDir, "enc.keyinfo");
      const keyInfoContent = `${keyUrlPath}\n${keyPath}`;
      fs.writeFileSync(keyInfoPath, keyInfoContent);

      const playlistPath = path.join(outputDir, "output.m3u8");

      console.log(`[HLS Worker] converter to starting: ${inputMp4Path}`);

      ffmpeg(inputMp4Path)
        .outputOptions([
          `-hls_time ${segmentDuration}`,
          `-hls_key_info_file ${keyInfoPath}`,
          "-hls_playlist_type vod",
          `-hls_segment_filename ${path.join(outputDir, "segment_%04d.ts")}`,
        ])
        .output(playlistPath)
        .on("progress", (progress) => {
          if (progress.percent) {
            console.log(`[HLS Worker] working: ${Math.floor(progress.percent)}%`);
          }
        })
        .on("end", () => {
          if (fs.existsSync(keyInfoPath)) {
            fs.unlinkSync(keyInfoPath);
          }
          console.log(`[HLS Worker] It was successful! Path: ${playlistPath}`);
          resolve();
        })
        .on("error", (err) => {
          console.error("[HLS Worker] FFmpeg error:", err);
          if (fs.existsSync(keyInfoPath)) fs.unlinkSync(keyInfoPath);
          reject(err);
        })
        .run();
    } catch (err) {
      reject(err);
    }
  });
}

export async function processUploadedVideo(courseId: string, mp4FilePath: string, segmentDuration: number = 5) {
  const outputDir = path.join(process.cwd(), "/storage/protected_videos", courseId);
  const keyUrlPath = `/api/courses/${courseId}/video/key`;
  
  try {
    await convertMp4ToEncryptedHls({
      inputMp4Path: mp4FilePath,
      outputDir: outputDir,
      keyUrlPath: keyUrlPath,
      segmentDuration,
    });
    
    await db.update(courses).set({ isHslReady: true }).where(eq(courses.id, courseId));

    console.log(`${courseId} video READY.`);

  } catch (error) {
    console.error("Convert failed:", error);
  }
}
/* 
// test 
const pathVideo = path.join(process.cwd(),'/storage/videos/video_1.mp4');
console.log(pathVideo)
processUploadedVideo('aganepes01',pathVideo) */