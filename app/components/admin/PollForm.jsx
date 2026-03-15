"use client";

import { CreateFormData } from "@/lib/CreateFormData";
import PostFuntion from "@/lib/PostFuntion";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

export default function PollForm({ defaultValues }) {

  const {
    register,
    handleSubmit,
    watch,
    reset
  } = useForm({
    defaultValues:{
      _id:defaultValues?._id || null,
      question:defaultValues?.question || "",
      status:defaultValues?.status || "draft",
      image:null
    }
  });

  const [preview,setPreview]=useState(defaultValues?.imageUrl || null)

  const image = watch("image")

  useEffect(()=>{
    if(image?.length){
      setPreview(URL.createObjectURL(image[0]))
    }
  },[image])

  const mutation=PostFuntion(reset)

  const onSubmit = async(data)=>{

    const formData = await CreateFormData(data)

    mutation.mutate({
      data:formData,
      query:{
        id:data?._id || null,
        url:"/admin/poll",
        search:"",
        status:"all"
      }
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded shadow space-y-6">

      <h2 className="text-2xl font-bold">
        {defaultValues?"জরিপ আপডেট করুন":"নতুন জরিপ তৈরি করুন"}
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
          <img src={preview} className="mt-2 w-40 rounded"/>
        )}
      </div>

      {/* Question */}
      <div>
        <label className="block font-semibold mb-1">
          প্রশ্ন
        </label>

        <input
          className="w-full border p-2 rounded"
          {...register("question",{required:true})}
        />
      </div>

      {/* Options (Fixed) */}
      <div className="space-y-2">

        <label className="font-semibold">উত্তর অপশন</label>

        <div className="flex gap-6">

          <label>
            <input type="radio" disabled /> হ্যাঁ
          </label>

          <label>
            <input type="radio" disabled /> না
          </label>

          <label>
            <input type="radio" disabled /> মতামত নেই
          </label>

        </div>

      </div>

      {/* Status */}
      <div>
        <label className="block font-semibold mb-1">স্ট্যাটাস</label>

        <select {...register("status")} className="border p-2 rounded">

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