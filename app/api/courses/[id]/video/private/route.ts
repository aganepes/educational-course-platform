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

// GET: /api/courses/:ID/video/private
export async function GET(request: NextRequest, { params }: RouteParams) {}

// POST: /api/courses/:ID/video/private
export async function POST(request: NextRequest, { params }: RouteParams) {}

// DELETE: /api/courses/:ID/video/private
export async function DELETE(request: NextRequest, { params }: RouteParams) {}