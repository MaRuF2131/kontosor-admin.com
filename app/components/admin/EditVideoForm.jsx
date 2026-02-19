"use client";

import { useEffect, useState } from "react";

export default function EditVideoForm({ videoId }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoType, setVideoType] = useState("youtube");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [status, setStatus] = useState("draft");

  // Demo Existing Data Load
  useEffect(() => {
    const existingData = {
      title: "আমার প্রথম ভিডিও",
      description: "এই ভিডিওটি একটি ডেমো ভিডিও",
      videoType: "youtube",
      youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      thumbnail: "https://via.placeholder.com/300",
      status: "published",
    };

    setTitle(existingData.title);
    setDescription(existingData.description);
    setVideoType(existingData.videoType);
    setYoutubeUrl(existingData.youtubeUrl);
    setThumbnailPreview(existingData.thumbnail);
    setStatus(existingData.status);
  }, [videoId]);

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setThumbnailFile(file);
    setThumbnailPreview(URL.createObjectURL(file));
  };

  const handleVideoFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setVideoFile(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Updated Video:", {
      videoId,
      title,
      description,
      videoType,
      youtubeUrl,
      videoFile,
      thumbnailFile,
      status,
    });

    alert("ভিডিও সফলভাবে আপডেট হয়েছে!");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-white p-6 rounded shadow"
    >
      <h2 className="text-2xl font-bold">ভিডিও সম্পাদনা করুন</h2>

      {/* Title */}
      <div>
        <label className="block font-semibold mb-1">ভিডিও শিরোনাম</label>
        <input
          type="text"
          className="w-full border p-2 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      {/* Description */}
      <div>
        <label className="block font-semibold mb-1">ভিডিও বিবরণ</label>
        <textarea
          className="w-full border p-2 rounded"
          rows="3"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      {/* Video Type */}
      <div>
        <label className="block font-semibold mb-1">ভিডিও ধরন</label>
        <select
          className="border p-2 rounded"
          value={videoType}
          onChange={(e) => setVideoType(e.target.value)}
        >
          <option value="youtube">YouTube লিংক</option>
          <option value="upload">ভিডিও আপলোড (MP4)</option>
        </select>
      </div>

      {/* YouTube URL */}
      {videoType === "youtube" && (
        <div>
          <label className="block font-semibold mb-1">
            YouTube ভিডিও লিংক
          </label>
          <input
            type="url"
            className="w-full border p-2 rounded"
            value={youtubeUrl}
            onChange={(e) => setYoutubeUrl(e.target.value)}
          />
        </div>
      )}

      {/* Upload Video */}
      {videoType === "upload" && (
        <div>
          <label className="block font-semibold mb-1">
            নতুন ভিডিও আপলোড করুন
          </label>
          <input type="file" accept="video/mp4" onChange={handleVideoFileChange} />
        </div>
      )}

      {/* Thumbnail */}
      <div>
        <label className="block font-semibold mb-1">
          থাম্বনেইল পরিবর্তন করুন
        </label>

        {thumbnailPreview && (
          <img
            src={thumbnailPreview}
            alt="thumb"
            className="w-48 h-32 object-cover rounded mb-2"
          />
        )}

        <input
          type="file"
          accept="image/*"
          onChange={handleThumbnailChange}
        />
      </div>

      {/* Status */}
      <div>
        <label className="block font-semibold mb-1">স্ট্যাটাস</label>
        <select
          className="border p-2 rounded"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="draft">ড্রাফট</option>
          <option value="published">প্রকাশিত</option>
        </select>
      </div>

      <button
        type="submit"
        className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800"
      >
        আপডেট করুন
      </button>
    </form>
  );
}
