"use client";

import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import api from "../../lib/axios";
import toast from "react-hot-toast";

export default function NewsForm({ defaultValues }) {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues || {
      reporter: "",
      title: "",
      description: "",
      category: "",
      subcategory: "",
      locationType: "bangladesh",
      country: "",
      division: "",
      district: "",
      upazila: "",
      image: null,
      imageBy: "",
      status: "draft",
      breaking: false,
    },
  });

  // -------------------------
  // ডাইনামিক ডাটা (ডেমো)
  // -------------------------

  const categories = {
    রাজনীতি: ["জাতীয়", "আন্তর্জাতিক"],
    খেলাধুলা: ["ক্রিকেট", "ফুটবল"],
    বিনোদন: ["চলচ্চিত্র", "টিভি"],
  };

  const divisions = {
    ঢাকা: ["গাজীপুর", "নারায়ণগঞ্জ"],
    চট্টগ্রাম: ["কুমিল্লা", "ফেনী"],
  };

  const districts = {
    গাজীপুর: ["কালীগঞ্জ", "টঙ্গী"],
    নারায়ণগঞ্জ: ["সোনারগাঁও", "রূপগঞ্জ"],
  };

  const locationType = watch("locationType");
  const selectedDivision = watch("division");
  const selectedDistrict = watch("district");

  // -------------------------
  // React Query Mutation
  // -------------------------

  const mutation = useMutation({
    mutationFn: async (data) => {
      if (defaultValues?._id) {
        return api.put(`/admin/news/${defaultValues._id}`, data);
      }
      return api.post("/admin/news", data);
    },
    onSuccess: () => {
      toast.success("সংবাদ সফলভাবে সংরক্ষণ হয়েছে");
      queryClient.invalidateQueries(["news"]);
    },
    onError: () => {
      toast.error("কিছু সমস্যা হয়েছে");
    },
  });

  const onSubmit = (data) => mutation.mutate(data);

  // -------------------------
  // ছবি প্রিভিউ
  // -------------------------

  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setValue("image", file);
    setPreview(URL.createObjectURL(file));
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 bg-white p-6 rounded shadow"
    >
      <h2 className="text-xl font-bold">সংবাদ ফর্ম</h2>

      {/* প্রতিবেদক */}
      <input
        {...register("reporter", { required: "প্রতিবেদকের নাম দিন" })}
        placeholder="প্রতিবেদকের নাম"
        className="w-full border p-2 rounded"
      />
      {errors.reporter && (
        <p className="text-red-500 text-sm">{errors.reporter.message}</p>
      )}

      {/* শিরোনাম */}
      <input
        {...register("title", { required: "শিরোনাম দিন" })}
        placeholder="সংবাদের শিরোনাম"
        className="w-full border p-2 rounded"
      />
      {errors.title && (
        <p className="text-red-500 text-sm">{errors.title.message}</p>
      )}

      {/* বিবরণ */}
      <textarea
        {...register("description", { required: "বিবরণ দিন" })}
        placeholder="সংবাদের বিস্তারিত বিবরণ"
        className="w-full border p-2 rounded h-32"
      />

      {/* বিভাগ */}
      <select {...register("category")} className="w-full border p-2 rounded">
        <option value="">বিভাগ নির্বাচন করুন</option>
        {Object.keys(categories).map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      {/* উপবিভাগ */}
      {watch("category") && (
        <select {...register("subcategory")} className="w-full border p-2 rounded">
          <option value="">উপবিভাগ নির্বাচন করুন</option>
          {categories[watch("category")]?.map((sub) => (
            <option key={sub} value={sub}>
              {sub}
            </option>
          ))}
        </select>
      )}

      {/* বিশ্ব / বাংলাদেশ */}
      <select {...register("locationType")} className="w-full border p-2 rounded">
        <option value="bangladesh">বাংলাদেশ</option>
        <option value="world">বিশ্ব</option>
      </select>

      {/* বিশ্ব অপশন */}
      {locationType === "world" && (
        <input
          {...register("country")}
          placeholder="দেশের নাম লিখুন"
          className="w-full border p-2 rounded"
        />
      )}

      {/* বাংলাদেশ অপশন */}
      {locationType === "bangladesh" && (
        <>
          <select {...register("division")} className="w-full border p-2 rounded">
            <option value="">বিভাগ নির্বাচন করুন</option>
            {Object.keys(divisions).map((div) => (
              <option key={div} value={div}>
                {div}
              </option>
            ))}
          </select>

          {selectedDivision && (
            <select {...register("district")} className="w-full border p-2 rounded">
              <option value="">জেলা নির্বাচন করুন</option>
              {divisions[selectedDivision]?.map((dist) => (
                <option key={dist} value={dist}>
                  {dist}
                </option>
              ))}
            </select>
          )}

          {selectedDistrict && (
            <select {...register("upazila")} className="w-full border p-2 rounded">
              <option value="">উপজেলা নির্বাচন করুন</option>
              {districts[selectedDistrict]?.map((upa) => (
                <option key={upa} value={upa}>
                  {upa}
                </option>
              ))}
            </select>
          )}
        </>
      )}

      {/* ছবি */}
      <input type="file" accept="image/*" onChange={handleImageChange} />

      {preview && (
        <img
          src={preview}
          alt="preview"
          className="w-40 h-28 object-cover rounded"
        />
      )}

      {/* ছবির কৃতিত্ব */}
      <input
        {...register("imageBy")}
        placeholder="ছবির কৃতিত্ব (ফটো: )"
        className="w-full border p-2 rounded"
      />

      {/* স্ট্যাটাস */}
      <select {...register("status")} className="w-full border p-2 rounded">
        <option value="draft">ড্রাফট</option>
        <option value="published">প্রকাশিত</option>
      </select>

      {/* ব্রেকিং */}
      <label className="flex items-center space-x-2">
        <input type="checkbox" {...register("breaking")} />
        <span>ব্রেকিং সংবাদ</span>
      </label>

      <button
        type="submit"
        className="bg-black text-white px-4 py-2 rounded"
      >
        {defaultValues ? "সংবাদ আপডেট করুন" : "সংবাদ যোগ করুন"}
      </button>
    </form>
  );
}