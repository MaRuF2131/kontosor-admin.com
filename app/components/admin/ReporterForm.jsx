"use client";

import { CreateFormData } from "@/lib/CreateFormData";
import PostFuntion from "@/lib/PostFuntion";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function ReporterForm({ defaultValues }) {

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      reportArea: "",
      address: "",
      profileImage: "",
      cv: "",
      status: "draft",
    },
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [cvPreview, setCvPreview] = useState(null);

  const mutation = PostFuntion(reset);

  const imageFile = watch("profileImage");
  const cvFile = watch("cv");

  // Image preview
  useEffect(() => {
    if (!imageFile || imageFile.length === 0) {
      setImagePreview(null);
      return;
    }

      if (typeof imageFile === "string") {
          setImagePreview(imageFile);
          return;
        }

        const url = URL.createObjectURL(imageFile[0]);
        setImagePreview(url);

    return () => URL.revokeObjectURL(url);
  }, [imageFile]);

  // CV preview (file name)
  useEffect(() => {
    if (!cvFile || cvFile.length === 0) {
      setCvPreview(null);
      return;
    }

    setCvPreview(cvFile[0].name);
  }, [cvFile]);

  // Reset default values (for edit)
  useEffect(() => {
    console.log(defaultValues);
    
    if (defaultValues) {
      reset({
        _id: defaultValues?._id || null,
        name: defaultValues?.name || "",
        reportArea: defaultValues?.reportArea || "",
        address: defaultValues?.address || "",
        status: defaultValues?.status || "draft",
      });

      if (defaultValues.profileImage) {
        setImagePreview(defaultValues.profileImage);
      }

      if (defaultValues.cv) {
        setCvPreview(defaultValues.cv);
      }
    }
  }, [defaultValues]);

  const onSubmit = async (data) => {
    const formData = await CreateFormData(data);

    mutation.mutate({
      data: formData,
      query: {
        id: data?._id || null,
        url: "/admin/reporter",
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
      <h2 className="text-2xl font-bold">নতুন সাংবাদিক যোগ করুন</h2>

      {/* Name */}
      <div>
        <label className="block font-semibold mb-1">সাংবাদিকের নাম</label>
        <input
          className="w-full border p-2 rounded"
          {...register("name", { required: "নাম আবশ্যক" })}
        />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}
      </div>

      {/* Report Area */}
      <div>
        <label className="block font-semibold mb-1">রিপোর্ট এলাকা</label>
        <input
          className="w-full border p-2 rounded"
          {...register("reportArea", { required: "রিপোর্ট এলাকা আবশ্যক" })}
        />
        {errors.reportArea && (
          <p className="text-red-500 text-sm">{errors.reportArea.message}</p>
        )}
      </div>

      {/* Address */}
      <div>
        <label className="block font-semibold mb-1">ঠিকানা</label>
        <textarea
          className="w-full border p-2 rounded"
          {...register("address")}
        />
      </div>

      {/* Profile Image */}
      <div>
        <label className="block font-semibold mb-1">প্রোফাইল ছবি</label>
        <input
          type="file"
          accept="image/*"
          {...register("profileImage")}
        />

        {imagePreview && (
          <img
            src={imagePreview}
            className="w-32 h-32 object-cover rounded mt-2"
          />
        )}
      </div>

      {/* CV Upload */}
      <div>
        <label className="block font-semibold mb-1">CV (PDF)</label>
        <input
          type="file"
          accept="application/pdf"
          {...register("cv")}
        />

        {cvPreview && (
          <p className="mt-2 text-gray-700">ফাইল: {cvPreview}</p>
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

      {/* Submit */}
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