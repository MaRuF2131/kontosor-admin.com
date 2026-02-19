
"use client";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../lib/axios";
import toast from "react-hot-toast";
import CategoryDropdown from "./CategoryDropdown";
import UploadImage from "./UploadImage";

export default function NewsForm({ defaultValues }) {
  const queryClient = useQueryClient();
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm({
    defaultValues: defaultValues || {
      title: "",
      content: "",
      category: "",
      thumbnail: { url: "", public_id: "" },
      status: "draft",
      breaking: false,
      featured: false,
    }
  });

  const mutation = useMutation({
    mutationFn: async (data) => {
      if (defaultValues?._id) {
        return api.put(`/admin/news/${defaultValues._id}`, data);
      }
      return api.post("/admin/news", data);
    },
    onSuccess: () => {
      toast.success("Saved successfully");
      queryClient.invalidateQueries(["news"]);
    },
    onError: () => {
      toast.error("Something went wrong");
    }
  });

  const onSubmit = (data) => mutation.mutate(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 bg-white p-6 rounded shadow">
      {/* Title */}
      <div>
        <input
          {...register("title", { required: "Title required" })}
          placeholder="Title"
          className="w-full border p-2 rounded"
        />
        {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
      </div>

      {/* Content */}
      <div>
        <textarea
          {...register("content", { required: true })}
          placeholder="Content"
          className="w-full border p-2 rounded h-32"
        />
      </div>

      {/* Category Dropdown */}
      <div>
        <CategoryDropdown
          value={watch("category")}
          onChange={(val) => setValue("category", val)}
        />
      </div>

      {/* Thumbnail Upload */}
      <div>
        <UploadImage
          defaultImage={watch("thumbnail")?.url}
          onUpload={(url, public_id) =>
            setValue("thumbnail", { url, public_id })
          }
        />
      </div>

      {/* Status & Toggles */}
      <div className="flex items-center space-x-4">
        <select
          {...register("status")}
          className="border p-2 rounded"
        >
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>

        <label className="flex items-center space-x-2">
          <input type="checkbox" {...register("breaking")} />
          <span>Breaking</span>
        </label>

        <label className="flex items-center space-x-2">
          <input type="checkbox" {...register("featured")} />
          <span>Featured</span>
        </label>
      </div>

      <button type="submit" className="bg-black text-white px-4 py-2 rounded">
        {defaultValues ? "Update News" : "Add News"}
      </button>
    </form>
  );
}