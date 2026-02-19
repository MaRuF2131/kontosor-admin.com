"use client";

import { useState } from "react";

export default function VideoStoryForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [status, setStatus] = useState("draft");

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
      description,
      youtubeUrl,
      videoUrl,
      thumbnail,
      status,
    });

    alert("ভিডিও স্টোরি সফলভাবে সংরক্ষণ হয়েছে!");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded shadow">

      <h2 className="text-2xl font-bold">নতুন ভিডিও স্টোরি যোগ করুন</h2>

      <div>
        <label className="block font-semibold mb-1">শিরোনাম</label>
        <input
          type="text"
          className="w-full border p-2 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block font-semibold mb-1">সংক্ষিপ্ত বিবরণ</label>
        <textarea
          className="w-full border p-2 rounded"
          rows="3"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

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

      <div>
        <label className="block font-semibold mb-1">
          থাম্বনেইল আপলোড
        </label>
        <input type="file" accept="image/*" onChange={handleThumbnail} />
        {thumbnailPreview && (
          <img
            src={thumbnailPreview}
            alt="thumb"
            className="mt-2 w-40 h-28 object-cover rounded"
          />
        )}
      </div>

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
