"use client";

import React, { useState } from "react";
import axios from "axios";
import { Upload, Video, Image as ImageIcon, CheckCircle, AlertCircle } from "lucide-react";

export default function VideoUploadForm() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState<number>(0);
  const [statusMessage, setStatusMessage] = useState<string>("");
  const [error, setError] = useState<string>("");

  // Maximum wideo göwrümi: 2GB (baýtda)
  const MAX_VIDEO_SIZE = 2 * 1024 * 1024 * 1024;

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > MAX_VIDEO_SIZE) {
        setError("Wideo faýlyň göwrümi 2GB-dan geçmeli däl!");
        setVideoFile(null);
        return;
      }
      setError("");
      setVideoFile(file);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!imageFile || !videoFile) {
      setError("Haýyş, hem poster suratyny hem-de wideo faýly saýlaň!");
      return;
    }

    setUploading(true);
    setProgress(0);
    setError("");
    setStatusMessage("Faýllar serwere Stream edilýär...");

    try {
      const formData = new FormData();
      formData.append("image", imageFile);
      formData.append("video", videoFile);

      // Axios arkaly progress barlagy bilen ugratmak
      const response = await axios.post("/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          // Auth header middleware üçin (şahsy tokenyňyz bar bolsa barlaşdyryň)
          // "x-user-id": userId 
        },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setProgress(percentCompleted);
          }
        },
      });

      if (response.data.success) {
        setStatusMessage("✅ Faýllar üstünlikli ýüklendi!");
        // Formany arassalamak
        setImageFile(null);
        setVideoFile(null);
      }
    } catch (err: any) {
      console.error(err);
      setError(
        err.response?.data?.message || "Faýly ýüklemekde ýalňyşlyk ýüze çykdy."
      );
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
      <h2 className="text-xl font-bold mb-4 text-gray-800 flex items-center gap-2">
        <Upload className="w-5 h-5 text-blue-600" /> Wideo we Poster Ýüklemek
      </h2>

      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg flex items-center gap-2 text-sm">
          <AlertCircle className="w-4 h-4 shrink-0" />
          {error}
        </div>
      )}

      {statusMessage && !error && (
        <div className="mb-4 p-3 bg-green-50 text-green-700 rounded-lg flex items-center gap-2 text-sm">
          <CheckCircle className="w-4 h-4 shrink-0" />
          {statusMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Poster Seçimi */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
            <ImageIcon className="w-4 h-4" /> Poster Suraty (JPG, PNG, WEBP)
          </label>
          <input
            type="file"
            accept="image/*"
            disabled={uploading}
            onChange={handleImageChange}
            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
          />
        </div>

        {/* Wideo Seçimi */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
            <Video className="w-4 h-4" /> Wideo Faýly (MP4, MKV, MOV)
          </label>
          <input
            type="file"
            accept="video/*"
            disabled={uploading}
            onChange={handleVideoChange}
            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
          />
        </div>

        {/* Progress Bar (Diňe ýüklenýän wagty görkezilýär) */}
        {uploading && (
          <div className="space-y-1">
            <div className="flex justify-between text-xs font-semibold text-gray-600">
              <span>Ýüklenilýär...</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
              <div
                className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Submit Düwmesi */}
        <button
          type="submit"
          disabled={uploading}
          className={`w-full py-2.5 px-4 rounded-xl text-white font-medium transition ${
            uploading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 shadow-md"
          }`}
        >
          {uploading ? `Ýüklenýär (${progress}%)` : "Faýllary Ýükle"}
        </button>
      </form>
    </div>
  );
}


/* 
// upload   BEGIN

const formData = new FormData();
formData.append("image", imageFileInput.files[0]); // Poster file
formData.append("video", videoFileInput.files[0]); // MP4 file

const res = await fetch("/api/upload", {
  method: "POST",
  body: formData, // Content-Type-y el bilen GOŞMAŇ, fetch awtomatiki 'multipart/form-data' edýär
});

const result = await res.json();
console.log(result.data); 
// { image: "poster_myphoto_user123.jpg", videoURL: "video_mycourse_user123.mp4" }

// upload   END

*/