import fs from "fs";
import path from "path";

interface MoveFilesParams {
    image: string;// Mysal: "poster_name_userId.jpg" (ýa-da gysga ady)
    videoURL: string;    // Mysal: "video_name_userId.mp4"
    courseId: string;
}

interface MoveFilesResult {
    newImagePath: string;
    newVideoPath: string;
    imageFileName: string;
    videoFileName: string;
}

export function moveCourseFilesToProtected({
    image,
    videoURL,
    courseId,
}: MoveFilesParams): MoveFilesResult {
    // Wagtlaýyn (Upload) we Täze (Protected) bukjalaň ýollary
    const uploadDir = path.join(process.cwd(), "storage", "upload");
    const targetVideoDir = path.join(process.cwd(), "storage", "protected", courseId);
    const targetImageDir = path.join(process.cwd(), "public/images/courses");
    // Eger gurnaljak protected_videos/courseId bukjasy ýok bolsa döretmek
    if (!fs.existsSync(targetVideoDir)) {
        fs.mkdirSync(targetVideoDir, { recursive: true });
    }
    // Eger gurnaljak public/images/courses bukjasy ýok bolsa döretmek
    if (!fs.existsSync(targetImageDir)) {
        fs.mkdirSync(targetImageDir, { recursive: true });
    }

    // Faýl giňeltmelerini (extension: .mp4, .png, .jpg...) alyp galmak
    const imageExt = path.extname(image) || ".jpg";
    const videoExt = path.extname(videoURL) || ".mp4";

    // Täze faýl atlaryny kesgitlemek
    const newImageFileName = `poster_${courseId}${imageExt}`;
    const newVideoFileName = `video_${courseId}${videoExt}`;

    // Faýllaryň serwerdäki doly ýollary
    const sourceImagePath = path.join(uploadDir, path.basename(image));
    const sourceVideoPath = path.join(uploadDir, path.basename(videoURL));

    const targetImagePath = path.join(targetImageDir, newImageFileName);
    const targetVideoPath = path.join(targetVideoDir, newVideoFileName);

    // Faýllary täze ýere geçirmek (Move)
    if (fs.existsSync(sourceImagePath)) {
        fs.renameSync(sourceImagePath, targetImagePath);
    } else {
        console.warn(`[File Warning] image not found: ${sourceImagePath}`);
    }

    if (fs.existsSync(sourceVideoPath)) {
        fs.renameSync(sourceVideoPath, targetVideoPath);
    } else {
        console.warn(`[File Warning] video not found: ${sourceVideoPath}`);
    }

    return {
        newImagePath: targetImagePath,
        newVideoPath: targetVideoPath,
        imageFileName: newImageFileName,
        videoFileName: newVideoFileName,
    };
}