"use client";

import { CreateFormData } from "@/lib/CreateFormData";
import PostFuntion from "@/lib/PostFuntion";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function AudioForm({ defaultValues }) {

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      audio: "",
      thumbnail: "",
      status: "draft",
    },
  });

  useEffect(() => {
    if (defaultValues) {
      reset({
        _id: defaultValues?._id || null,
        title: defaultValues?.title || "",
        audio:defaultValues?.audioUrl ||"",
        thumbnail:defaultValues?.thumbnail ||"",
        status: defaultValues?.status || "draft",
      });
    }
  }, [defaultValues]);

  const mutation = PostFuntion(reset);

  const audioFile = watch("audio");
  const thumbFile = watch("thumbnail");

  const [audioPreview, setAudioPreview] = useState(null);
  const [thumbPreview, setThumbPreview] = useState(null);

  // Audio preview
  useEffect(() => {
    if (!audioFile || audioFile.length === 0) {
      setAudioPreview(null);
      return;
    }
    if(typeof audioFile==="string"){
      setAudioPreview(audioFile);
      return
    }
    const url = URL.createObjectURL(audioFile[0]);
    setAudioPreview(url);

    return () => URL.revokeObjectURL(url);
  }, [audioFile]);

  // Thumbnail preview
  useEffect(() => {
    if (!thumbFile || thumbFile.length === 0) {
      setThumbPreview(null);
      return;
    }
    if(typeof thumbFile==="string"){
      setThumbPreview(thumbFile)
      return
    };
    const url = URL.createObjectURL(thumbFile[0]);
    setThumbPreview(url);

    return () => URL.revokeObjectURL(url);
  }, [thumbFile]);

  const onSubmit = async (data) => {
    const formData = await CreateFormData(data);

    mutation.mutate({
      data: formData,
      query: {
        id: data?._id || null,
        url: "/admin/audio",
        search: "",
        status: "all",
      },
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 bg-white p-6 rounded shadow"
    >
      <h2 className="text-2xl font-bold">নতুন অডিও যোগ করুন</h2>

      {/* Title */}
      <div>
        <label className="block font-semibold mb-1">অডিও শিরোনাম</label>
        <input
          className="w-full border p-2 rounded"
          {...register("title", { required: "শিরোনাম আবশ্যক" })}
        />
        {errors.title && (
          <p className="text-red-500 text-sm">{errors.title.message}</p>
        )}
      </div>

      {/* Audio Upload */}
      <div>
        <label className="block font-semibold mb-1">অডিও ফাইল</label>
        <input
          type="file"
          accept="audio/*"
          {...register("audio")}
        />
      </div>

      {audioPreview && (
        <audio controls className="mt-2">
          <source src={audioPreview} />
        </audio>
      )}

      {/* Thumbnail Upload */}
      <div>
        <label className="block font-semibold mb-1">থাম্বনেইল</label>
        <input
          type="file"
          accept="image/*"
          {...register("thumbnail")}
        />
      </div>

      {thumbPreview && (
        <img
          src={thumbPreview}
          className="w-40 h-28 object-cover rounded"
        />
      )}

      {/* Status */}
      <div>
        <label className="block font-semibold mb-1">স্ট্যাটাস</label>
        <select
          className="border p-2 rounded"
          {...register("status")}
        >
          <option value="draft">ড্রাফট</option>
          <option value="published">প্রকাশিত</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={mutation.isPending}
        className="bg-black text-white px-6 py-2 rounded"
      >
        {defaultValues
          ? mutation.isPending
            ? "লোড হচ্ছে..."
            : "আপডেট করুন"
          : mutation.isPending
          ? "লোড হচ্ছে..."
          : "যোগ করুন"}
      </button>
    </form>
  );
}