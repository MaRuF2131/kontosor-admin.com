"use client";

import { CreateFormData } from "@/lib/CreateFormData";
import PostFuntion from "@/lib/PostFuntion";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function VideoForm({ defaultValues }) {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
     defaultValues:{
         status:"draft",
         youtubeUrl:'',
         category:"সাধারণ",
         title:"",
         thumbnail:""
     }
    }
  );

  useEffect(()=>{
    if(defaultValues){

      console.log("d",defaultValues);
      
       reset({
        _id:defaultValues?._id || null, 
         status:defaultValues?.status||"draft",
         youtubeUrl:defaultValues?.youtubeUrl||'',
         category:defaultValues?.category||"সাধারণ",
         title:defaultValues?.title||""
      })
    }
  },[defaultValues])

  const [thumbnailPreview, setThumbnailPreview] = useState(null);

  // 🔥 Watch YouTube URL
  const youtubeUrl = watch("youtubeUrl");

  // 🔥 Extract YouTube ID
  const getYoutubeId = (url) => {
    const regExp =
      /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([^&\n?#]+)/;
    const match = url?.match(regExp);
    return match ? match[1] : null;
  };

  // 🔥 Auto Thumbnail Generate
  useEffect(() => {
    if (!youtubeUrl) {setThumbnailPreview(null); return};

    const videoId = getYoutubeId(youtubeUrl);

    if (videoId) {
      const thumbUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
      setThumbnailPreview(thumbUrl);
    } else {
      setThumbnailPreview(null);
    }
  }, [youtubeUrl]);


    const mutation=PostFuntion(reset);

    const onSubmit = async(data) =>{
          const finalData = {
            ...data,
            thumbnail: thumbnailPreview,
          };
          const formData= await CreateFormData(finalData);
          mutation.mutate({data:formData,
                    query:{
                      id:data?._id || null,
                      url:"/admin/video",
                      search: '',
                      status:'all',
                      category:'all'
                      }
                  });
  }


  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 bg-white p-6 rounded shadow"
    >
      <h2 className="text-2xl font-bold">নতুন ভিডিও যোগ করুন</h2>

      {/* Title */}
      <div>
        <label className="block font-semibold mb-1">ভিডিও শিরোনাম</label>
        <input
          className="w-full border p-2 rounded"
          {...register("title", { required: "শিরোনাম আবশ্যক" })}
        />
        {errors.title && (
          <p className="text-red-500 text-sm mt-1">
            {errors.title.message}
          </p>
        )}
      </div>

      {/* Category */}
      <div>
        <label className="block font-semibold mb-1">ক্যাটাগরি</label>
        <select
          className="border p-2 rounded"
          {...register("category")}
        >
          <option value="সাধারণ">সাধারণ</option>
          <option value="রাজনীতি">রাজনীতি</option>
          <option value="খেলাধুলা">খেলাধুলা</option>
          <option value="বিনোদন">বিনোদন</option>
        </select>
      </div>

      {/* YouTube URL */}
      <div>
        <label className="block font-semibold mb-1">
          YouTube ভিডিও লিংক
        </label>
        <input
          type="url"
          className="w-full border p-2 rounded"
          placeholder="https://youtube.com/watch?v=xxxx"
          {...register("youtubeUrl", {
            required: "YouTube লিংক আবশ্যক",
            pattern: {
              value:
                /^(https?\:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$/,
              message: "সঠিক YouTube লিংক দিন",
            },
          })}
        />
        {errors.youtubeUrl && (
          <p className="text-red-500 text-sm mt-1">
            {errors.youtubeUrl.message}
          </p>
        )}
      </div>

      {/* Auto Thumbnail */}
      {thumbnailPreview && (
        <div>
          <label className="block font-semibold mb-1">
            স্বয়ংক্রিয় থাম্বনেইল
          </label>
          <img
            src={thumbnailPreview}
            className="w-60 h-36 object-cover rounded"
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