"use client";

import { useEffect, useState } from "react";

export default function EditPhotoStoryForm({ storyId }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [status, setStatus] = useState("draft");

  // Demo Load Data (পরে API হবে)
  useEffect(() => {
    // Fake existing data
    const existingData = {
      title: "বর্ষার দিনে শহরের দৃশ্য",
      description: "বর্ষার সময় তোলা কিছু সুন্দর ছবি",
      status: "published",
      images: [
        {
          id: 1,
          preview: "https://via.placeholder.com/300",
          caption: "প্রথম ছবি",
        },
        {
          id: 2,
          preview: "https://via.placeholder.com/300",
          caption: "দ্বিতীয় ছবি",
        },
      ],
    };

    setTitle(existingData.title);
    setDescription(existingData.description);
    setStatus(existingData.status);
    setImages(existingData.images);
  }, [storyId]);

  // Caption Update
  const handleCaptionChange = (index, value) => {
    const updated = [...images];
    updated[index].caption = value;
    setImages(updated);
  };

  // Remove Image
  const removeImage = (index) => {
    const updated = [...images];
    updated.splice(index, 1);
    setImages(updated);
  };

  // Add New Images
  const handleNewImageUpload = (e) => {
    const files = Array.from(e.target.files);

    const newImages = files.map((file) => ({
      id: Date.now() + Math.random(),
      file,
      preview: URL.createObjectURL(file),
      caption: "",
    }));

    setImages((prev) => [...prev, ...newImages]);
  };

  // Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Updated Data:", {
      storyId,
      title,
      description,
      images,
      status,
    });

    alert("ফটো স্টোরি সফলভাবে আপডেট হয়েছে!");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold">ফটো স্টোরি সম্পাদনা করুন</h2>

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

      {/* Image Upload */}
      <div>
        <label className="block font-semibold mb-1">নতুন ছবি যোগ করুন</label>
        <input type="file" multiple accept="image/*" onChange={handleNewImageUpload} />
      </div>

      {/* Image List */}
      <div className="grid grid-cols-2 gap-4">
        {images.map((img, index) => (
          <div key={img.id || index} className="border p-2 rounded bg-gray-50">
            <img
              src={img.preview}
              alt="preview"
              className="w-full h-40 object-cover rounded"
            />

            <input
              type="text"
              placeholder="ছবির ক্যাপশন লিখুন"
              className="w-full mt-2 border p-1 rounded"
              value={img.caption}
              onChange={(e) =>
                handleCaptionChange(index, e.target.value)
              }
            />

            <button
              type="button"
              onClick={() => removeImage(index)}
              className="mt-2 text-red-600 text-sm"
            >
              মুছে ফেলুন
            </button>
          </div>
        ))}
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

      {/* Submit */}
      <button
        type="submit"
        className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800"
      >
        আপডেট করুন
      </button>
    </form>
  );
}
