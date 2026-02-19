"use client";

import { useState } from "react";

export default function PhotoStoryForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [status, setStatus] = useState("draft");

  // Image Upload Handler
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);

    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      caption: "",
    }));

    setImages((prev) => [...prev, ...newImages]);
  };

  // Caption Change
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

  // Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("status", status);

    images.forEach((img, index) => {
      formData.append("images", img.file);
      formData.append(`caption_${index}`, img.caption);
    });

    console.log("Submit Data:", { title, description, images, status });

    alert("ফটো স্টোরি সফলভাবে সংরক্ষণ হয়েছে!");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded shadow">

      <h2 className="text-2xl font-bold">নতুন ফটো স্টোরি যোগ করুন</h2>

      {/* Title */}
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
        <label className="block font-semibold mb-1">ছবি আপলোড করুন</label>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageUpload}
        />
      </div>

      {/* Preview Section */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 gap-4">
          {images.map((img, index) => (
            <div key={index} className="border p-2 rounded bg-gray-50">
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
      )}

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
        সংরক্ষণ করুন
      </button>
    </form>
  );
}
