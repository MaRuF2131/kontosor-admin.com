"use client";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import Image from "next/image";
import PostFuntion from "@/lib/PostFuntion";
import { CreateFormData } from "@/lib/CreateFormData";

export default function NewsForm({ defaultValues }) {

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
      defaultValues:{
      _id:defaultValues?._id || null, 
      reporter: defaultValues?.reporter || "",
      title:defaultValues?.title || "",
      description: defaultValues?.description ||"",
      category: defaultValues?.category ||"",
      subcategory: defaultValues?.subcategory ||"",
      locationType:defaultValues?.locationType || "bangladesh",
      country: defaultValues?.country ||"",
      division: defaultValues?.division ||"",
      district:defaultValues?.district || "",
      upazila:defaultValues?.upazila || "",
      image:defaultValues?.imageUrl || null,
      imageBy:defaultValues?.imageBy || "",
      status:defaultValues?.status || "draft",
      breaking:defaultValues?.breaking==="true"  || false,
    },
  });


  useEffect(()=>{
    if(defaultValues){

      console.log("d",defaultValues);
      
       reset({
      _id:defaultValues?._id || null, 
      reporter: defaultValues?.reporter || "",
      title:defaultValues?.title || "",
      description: defaultValues?.description ||"",
      category: defaultValues?.category ||"",
      subcategory: defaultValues?.subcategory ||"",
      locationType:defaultValues?.locationType || "bangladesh",
      country: defaultValues?.country ||"",
      division: defaultValues?.division ||"",
      district:defaultValues?.district || "",
      upazila:defaultValues?.upazila || "",
      image:defaultValues?.imageUrl || null,
      imageBy:defaultValues?.imageBy || "",
      status:defaultValues?.status || "draft",
      breaking:defaultValues?.breaking==='true' || false,
      })
    }
  },[defaultValues])

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
  const [preview, setPreview] = useState(null);
  const imageFile = watch("image");
  const mutation=PostFuntion(reset);

    useEffect(() => {
      if ((!imageFile || imageFile.length === 0 || errors?.image?.message) ) {   
        setPreview(null);
        return;
      }

        if (typeof imageFile === "string") {
          setPreview(imageFile);
          return;
        }

      const objectUrl = URL.createObjectURL(imageFile[0]);
      setPreview(objectUrl);

      return () => URL.revokeObjectURL(objectUrl);
    }, [imageFile, errors?.image?.message]);

  // -------------------------
  // React Query Mutation
  // -------------------------

  const onSubmit = async(data) =>{
    const formData= await CreateFormData(data);
     mutation.mutate({data:formData,
               query:{
                id:data?._id || null,
                url:"/admin/news",
                breaking:'all',
                search: '',
                status:'all',
                locationType:'all',
                subcategory:'all',
                category:'all'
                }
             });
  }

  

  // -------------------------
  // ছবি প্রিভিউ
  // -------------------------

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
      <input type="file" accept="image/*"
         {...register("image")} 
       />

      {preview && (
        <Image
          src={preview}
          alt="preview"
          width={300}
          height={400}
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
        disabled={mutation.isPending}
        className=" cursor-pointer bg-black text-white px-4 py-2 rounded"
      >
        {defaultValues ?(mutation.isPending ? "লোড হচ্ছে..." : "সংবাদ আপডেট করুন") : (mutation.isPending ? "লোড হচ্ছে..." : "সংবাদ যোগ করুন")}
      </button>
    </form>
  );
}