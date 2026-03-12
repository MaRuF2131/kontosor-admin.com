"use client";

import { CreateFormData } from "@/lib/CreateFormData";
import PostFuntion from "@/lib/PostFuntion";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function MagazineForm({ defaultValues }) {

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      pdf: "",
      coverImage: "",
      status: "draft",
    },
  });

  const [pdfPreview, setPdfPreview] = useState(null);
  const [coverPreview, setCoverPreview] = useState(null);

  const mutation = PostFuntion(reset);

  const pdfFile = watch("pdf");
  const coverFile = watch("coverImage");

  // PDF filename preview
  useEffect(() => {
    if (!pdfFile || pdfFile.length === 0) {
      setPdfPreview(null);
      return;
    }
    setPdfPreview(pdfFile[0].name);
  }, [pdfFile]);

  // Cover image preview
  useEffect(() => {
    if (!coverFile || coverFile.length === 0) {
      setCoverPreview(null);
      return;
    }

    const url = URL.createObjectURL(coverFile[0]);
    setCoverPreview(url);

    return () => URL.revokeObjectURL(url);
  }, [coverFile]);

  // Reset default values
  useEffect(() => {
    if (defaultValues) {
      reset({
        _id: defaultValues?._id || null,
        title: defaultValues?.title || "",
        status: defaultValues?.status || "draft",
      });
      if (defaultValues.coverImage) setCoverPreview(defaultValues.coverImage);
      if (defaultValues.pdfName) setPdfPreview(defaultValues.pdfName);
    }
  }, [defaultValues]);

  const onSubmit = async (data) => {
    const formData = await CreateFormData(data);
    mutation.mutate({
      data: formData,
      query: {
        id: data?._id || null,
        url: "/admin/magazine",
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
      <h2 className="text-2xl font-bold">নতুন ম্যাগাজিন যোগ করুন</h2>

      {/* Title */}
      <div>
        <label className="block font-semibold mb-1">ম্যাগাজিন শিরোনাম</label>
        <input
          className="w-full border p-2 rounded"
          {...register("title", { required: "শিরোনাম আবশ্যক" })}
        />
        {errors.title && (
          <p className="text-red-500 text-sm">{errors.title.message}</p>
        )}
      </div>

      {/* PDF Upload */}
      <div>
        <label className="block font-semibold mb-1">PDF ফাইল</label>
        <input
          type="file"
          accept="application/pdf"
          {...register("pdf", { required: "PDF আপলোড করুন" })}
        />
        {pdfPreview && (
          <p className="mt-2 text-gray-700">ফাইল: {pdfPreview}</p>
        )}
      </div>

      {/* Cover Image Upload */}
      <div>
        <label className="block font-semibold mb-1">কভার ছবি (Optional)</label>
        <input
          type="file"
          accept="image/*"
          {...register("coverImage")}
        />
        {coverPreview && (
          <img
            src={coverPreview}
            className="w-40 h-56 object-cover rounded mt-2"
          />
        )}
      </div>

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

      {/* Submit Button */}
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