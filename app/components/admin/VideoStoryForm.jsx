"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { CreateFormData } from "@/lib/CreateFormData";
import PostFuntion from "@/lib/PostFuntion";

export default function VideoStoryForm({ defaultValues }) {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      _id: null,
      title: "",
      video: null,
      status: "draft",
    },
  });

  //  Edit Mode Reset
  useEffect(() => {
    if (defaultValues) {
      reset({
        _id: defaultValues?._id || null,
        title: defaultValues?.title || "",
        status: defaultValues?.status || "draft",
        video:defaultValues?.videoUrl || null
      });
    }
  }, [defaultValues]);

  const [videoPreview, setVideoPreview] = useState(null);

  //  Watch Video
  const watchedVideo = watch("video");


      useEffect(() => {
      if ((!watchedVideo || watchedVideo.length === 0 || errors?.watchedVideo?.message) ) {   
        setVideoPreview(null);
        return;
      }

        if (typeof watchedVideo === "string") {
          setVideoPreview(watchedVideo);
          return;
        }

      const objectUrl = URL.createObjectURL(watchedVideo[0]);
      setVideoPreview(objectUrl);

      return () => URL.revokeObjectURL(objectUrl);
    }, [watchedVideo, errors?.watchedVideo?.message]);


  const mutation = PostFuntion(reset);

  const onSubmit = async (data) => {
    const formData = await CreateFormData(data);

    mutation.mutate({
      data: formData,
      query: {
        id: data?._id || null,
        url: "/admin/video_story",
        search: '',
        status:'all',
      },
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 bg-white p-6 rounded shadow"
    >
      <h2 className="text-2xl font-bold">
        {defaultValues ? "ভিডিও আপডেট করুন" : "নতুন ভিডিও যোগ করুন"}
      </h2>

      {/* Title */}
      <div>
        <label className="block font-semibold mb-1">ভিডিও শিরোনাম</label>
        <input
          type="text"
          className="w-full border p-2 rounded"
          {...register("title", { required: "শিরোনাম আবশ্যক" })}
        />
        {errors.title && (
          <p className="text-red-500 text-sm mt-1">
            {errors.title.message}
          </p>
        )}
      </div>

      {/* Video Upload */}
      <div>
        <label className="block font-semibold mb-1">
          ভিডিও আপলোড (MP4)
        </label>
        <input
          type="file"
          accept="video/*"
          {...register("video", {
            required: defaultValues ? false : "ভিডিও আবশ্যক",
          })}
        />

        {errors.video && (
          <p className="text-red-500 text-sm mt-1">
            {errors.video.message}
          </p>
        )}
      </div>

      {/* Preview */}
      {videoPreview && (
        <div>
          <label className="block font-semibold mb-1">
            ভিডিও প্রিভিউ
          </label>
          <video
            src={videoPreview}
            controls
            className="w-72 rounded"
          />
        </div>
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
        className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800"
      >
        {defaultValues ?(mutation.isPending ? "লোড হচ্ছে..." : "আপডেট করুন") : (mutation.isPending ? "লোড হচ্ছে..." : "যোগ করুন")}
      </button>
    </form>
  );
}