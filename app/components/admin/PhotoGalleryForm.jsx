"use client";

import PostFuntion from "@/lib/PostFuntion";
import { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";

export const galleryCategory=[
"ঢালিউড",
"বলিউড",
"টালিউড",
"হলিউড",
"অন্যান্য"
]

export default function PhotoStoryForm({ defaultValues }) {
  const {
    register,
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      _id:defaultValues?._id || null,
      title:defaultValues?.title,
      category:defaultValues?.category,
      status: defaultValues?.status || "draft",
      images: [],
      captions:[]
    },
  });


  useEffect(() => {
  if (defaultValues?.images?.length) {
    reset({
      _id: defaultValues?._id,
      title:defaultValues?.title,
      category:defaultValues?.category,
      status: defaultValues?.status || "draft",
      images: defaultValues.images.map((img) => ({
        preview: img.imageUrl,   // old image url
        secure:img.imagePublicId,
        caption: img.caption,
      }))
    });
  }
}, [defaultValues]);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "images",
  });

  // 📸 Image Upload Handler
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);

    files.forEach((file) => {
      append({
        file,
        preview: URL.createObjectURL(file),
        caption: "",
      });
    });
  };

  const mutation=PostFuntion(reset);

  // 🚀 Submit
  const onSubmit = (data) => {
    const formData = new FormData();
    console.log("data",data);
    
     formData.append("status", data.status);
     formData.append("title",data.title);
     formData.append("category",data.category)

     let existingImages = [];

      data.images.forEach((img) => {

        //  Existing Image
        if (img.secure) {
          existingImages.push({
            imageUrl: img.preview,
            imagePublicId: img.secure,
            caption: img.caption,
          });
        }

        //  New Image
        if (img.file) {
          formData.append("images", img.file);
          formData.append("captions", img.caption);
        }

      });

    //  Existing images array stringify করে পাঠাও
     formData.append("existingImages", JSON.stringify(existingImages));

    console.log("Submit Data:", data);

     mutation.mutate({data:formData,
               query:{
                id:data?._id || null,
                url:"/admin/photo_gallery",
                search:"",
                status:'all',
                }
             }); 

  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 bg-white p-6 rounded shadow"
    >
      <h2 className="text-2xl font-bold">
        {defaultValues
          ? "ফটোগ্যালারি আপডেট করুন"
          : "নতুন ফটোগ্যালারি যোগ করুন"}
      </h2>

      {/* শিরোনাম */}
      <input
        {...register("title", { required: "শিরোনাম দিন" })}
        placeholder="সংবাদের শিরোনাম"
        className="w-full border p-2 rounded"
      />
      {errors.title && (
        <p className="text-red-500 text-sm">{errors.title.message}</p>
      )}

      {/* বিভাগ */}
      <select {...register("category")} className="w-full border p-2 rounded">
        <option value="">বিভাগ নির্বাচন করুন</option>
        {galleryCategory.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      {/* Image Upload */}
      <div>
        <label className="block font-semibold mb-1">
          ছবি আপলোড করুন
        </label>
        <input
          type="file"
          multiple
          accept="image/*"
          required={fields.length <= 0}
          onChange={handleImageUpload}
        />
      </div>


      {/* Preview Section */}
      {fields.length > 0 && (
        <div className="grid grid-cols-2 gap-4">
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="border p-2 rounded bg-gray-50"
            >
              <img
                src={field.preview}
                className="w-full h-40 object-cover rounded"
              />

              <input
                type="text"
                required
                placeholder="ছবির ক্যাপশন লিখুন"
                className="w-full mt-2 border p-1 rounded"
                {...register(`images.${index}.caption`)}
              />

              <button
                type="button"
                onClick={() => remove(index)}
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
        className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800"
      >
        {defaultValues ?(mutation.isPending ? "লোড হচ্ছে..." : "আপডেট করুন") : (mutation.isPending ? "লোড হচ্ছে..." : "যোগ করুন")}
      </button>
    </form>
  );
}