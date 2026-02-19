"use client";

import { useState } from "react";

export default function VideoForm() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("সাধারণ");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [status, setStatus] = useState("draft");

  const handleVideoUpload = (e) => {
    setVideoFile(e.target.files[0]);
  };

  const handleThumbnail = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setThumbnail(file);
    setThumbnailPreview(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log({
      title,
      category,
      youtubeUrl,
      videoFile,
      thumbnail,
      status,
    });

    alert("ভিডিও সফলভাবে সংরক্ষণ হয়েছে!");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded shadow">

      <h2 className="text-2xl font-bold">নতুন ভিডিও যোগ করুন</h2>

      {/* Title */}
      <div>
        <label className="block font-semibold mb-1">ভিডিও শিরোনাম</label>
        <input
          type="text"
          className="w-full border p-2 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      {/* Category */}
      <div>
        <label className="block font-semibold mb-1">ক্যাটাগরি</label>
        <select
          className="border p-2 rounded"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option>সাধারণ</option>
          <option>রাজনীতি</option>
          <option>খেলাধুলা</option>
          <option>বিনোদন</option>
        </select>
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

      {/* Direct Upload */}
      <div>
        <label className="block font-semibold mb-1">
          সরাসরি ভিডিও আপলোড (MP4)
        </label>
        <input type="file" accept="video/mp4" onChange={handleVideoUpload} />
      </div>

      {/* Thumbnail */}
      <div>
        <label className="block font-semibold mb-1">
          থাম্বনেইল আপলোড
        </label>
        <input type="file" accept="image/*" onChange={handleThumbnail} />

        {thumbnailPreview && (
          <img
            src={thumbnailPreview}
            className="mt-2 w-40 h-28 object-cover rounded"
          />
        )}
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
        সংরক্ষণ করুন
      </button>
    </form>
  );
}
