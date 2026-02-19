"use client";

import { useEffect, useState } from "react";

export default function EditVideoStoryForm({ storyId }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [status, setStatus] = useState("draft");

  // Demo Existing Data Load
  useEffect(() => {
    const existingData = {
      title: "নদীর তীরে একদিন",
      description: "একটি সুন্দর ভিডিও স্টোরি",
      youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      videoUrl: "",
      thumbnail: "https://via.placeholder.com/300",
      status: "published",
    };

    setTitle(existingData.title);
    setDescription(existingData.description);
    setYoutubeUrl(existingData.youtubeUrl);
    setVideoUrl(existingData.videoUrl);
    setThumbnailPreview(existingData.thumbnail);
    setStatus(existingData.status);
  }, [storyId]);

  // Replace Thumbnail
  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setThumbnailFile(file);
    setThumbnailPreview(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Updated Video Story:", {
      storyId,
      title,
      description,
      youtubeUrl,
      videoUrl,
      thumbnailFile,
      status,
    });

    alert("ভিডিও স্টোরি সফলভাবে আপডেট হয়েছে!");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded shadow">

      <h2 className="text-2xl font-bold">ভিডিও স্টোরি সম্পাদনা করুন</h2>

      {/* Title */}
      <div>
        <label className="block font-semibold mb-1">শিরোনাম</label>
        <input
          type="text"
          className="w-full border p-2 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      {/* Description */}
      <div>
        <label className="block font-semibold mb-1">সংক্ষিপ্ত বিবরণ</label>
        <textarea
          className="w-full border p-2 rounded"
          rows="3"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      {/* YouTube URL */}
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

      {/* Direct Video URL */}
      <div>
        <label className="block font-semibold mb-1">
          সরাসরি ভিডিও URL (MP4)
        </label>
        <input
          type="url"
          className="w-full border p-2 rounded"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
        />
      </div>

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
