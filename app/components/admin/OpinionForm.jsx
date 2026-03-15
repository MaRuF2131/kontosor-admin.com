"use client";

import PostFuntion from "@/lib/PostFuntion";
import { CreateFormData } from "@/lib/CreateFormData";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function OpinionForm({ defaultValues }) {

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues:{
      _id:defaultValues?._id || null,
      status:defaultValues?.status || "draft",
      name:defaultValues?.name || "",
      occupation:defaultValues?.occupation || "",
      title:defaultValues?.title || "",
      description:defaultValues?.description || "",
      image:null
    }
  });

  const [preview,setPreview]=useState(defaultValues?.image || null)

  const image = watch("image")

  useEffect(()=>{
    if(image?.length>0){
      setPreview(URL.createObjectURL(image[0]))
    }
  },[image])

  useEffect(()=>{
    if(defaultValues){
      reset(defaultValues)
    }
  },[defaultValues])

  const mutation=PostFuntion(reset);

  const onSubmit=async(data)=>{

    const formData=await CreateFormData(data)

    mutation.mutate({
      data:formData,
      query:{
        id:data?._id || null,
        url:"/admin/opinion",
        search:"",
        status:"all"
      }
    })
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 bg-white p-6 rounded shadow"
    >

      <h2 className="text-2xl font-bold">
        {defaultValues ? "মতামত আপডেট করুন" : "নতুন মতামত যোগ করুন"}
      </h2>

      {/* Image */}
      <div>
        <label className="block font-semibold mb-1">ছবি</label>

        <input
          type="file"
          accept="image/*"
          {...register("image")}
        />

        {preview && (
          <img
            src={preview}
            className="mt-2 w-32 h-32 object-cover rounded"
          />
        )}
      </div>

      {/* Name */}
      <div>
        <label className="block font-semibold mb-1">নাম</label>

        <input
          className="w-full border p-2 rounded"
          {...register("name",{required:"নাম আবশ্যক"})}
        />

        {errors.name && (
          <p className="text-red-500 text-sm">
            {errors.name.message}
          </p>
        )}
      </div>

      {/* Occupation */}
      <div>
        <label className="block font-semibold mb-1">পদবি</label>

        <input
          className="w-full border p-2 rounded"
          {...register("occupation",{required:"পদবি আবশ্যক"})}
        />
      </div>

      {/* Title */}
      <div>
        <label className="block font-semibold mb-1">
          শিরোনাম
        </label>

        <input
          className="w-full border p-2 rounded"
          {...register("title",{required:"শিরোনাম আবশ্যক"})}
        />
      </div>

      {/* Description */}
      <div>
        <label className="block font-semibold mb-1">
          বর্ণনা
        </label>

        <textarea
          rows={4}
          className="w-full border p-2 rounded"
          {...register("description",{required:"বর্ণনা আবশ্যক"})}
        />
      </div>

      {/* Status */}
      <div>
        <label className="block font-semibold mb-1">
          স্ট্যাটাস
        </label>

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
          ? mutation.isPending ? "লোড হচ্ছে..." : "আপডেট করুন"
          : mutation.isPending ? "লোড হচ্ছে..." : "যোগ করুন"}
      </button>

    </form>
  )
}