"use client";
import { useState } from "react";
import api from "@/lib/axios";

export default function UploadImage({ onUpload, defaultImage }) {
  const [preview, setPreview] = useState(defaultImage || "");

  const handleChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    const res = await api.post("/admin/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    setPreview(res.data.url);
    onUpload(res.data.url, res.data.public_id);
  };

  return (
    <div>
      <input type="file" onChange={handleChange} />
      {preview && <img src={preview} alt="preview" className="mt-2 w-32 h-32 object-cover" />}
    </div>
  );
}
