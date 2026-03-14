"use client";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { credentialsLogin } from "@/lib/auth";

export default function AdminLogin() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const mutation = useMutation({
    mutationFn: async (data) => {
      const res = await credentialsLogin(data);
      return res;
    },

  onSuccess: (res) => {
    if (res?.error) {
      toast.error(res.error);
      return;
    }

    toast.success("সফলভাবে লগইন হয়েছে");
    router.push("/admin");
  },

  onError: (error) => {
    console.error(error);
    toast.error(error.message || "কিছু সমস্যা হয়েছে");
  },
});

  const onSubmit = (data) => mutation.mutate(data);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form 
        onSubmit={handleSubmit(onSubmit)} 
        className="bg-white p-8 rounded shadow w-96 space-y-4"
      >
        <h1 className="text-xl font-bold">এডমিন লগইন</h1>

        {/* ইমেইল */}
        <div>
          <input
            type="email"
            {...register("email", { required: "ইমেইল অবশ্যই দিতে হবে" })}
            placeholder="ইমেইল"
            className="w-full p-2 border rounded"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

                {/* নাম */}
        <div>
          <input
            type="text"
            {...register("name", { required: "নাম অবশ্যই দিতে হবে" })}
            placeholder="নাম"
            className="w-full p-2 border rounded"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

        {/* পাসওয়ার্ড */}
        <div>
          <input
            type="password"
            {...register("password", { required: "পাসওয়ার্ড অবশ্যই দিতে হবে" })}
            placeholder="পাসওয়ার্ড"
            className="w-full p-2 border rounded"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        {/* সাবমিট */}
        <button 
          type="submit" 
          className="w-full bg-black text-white py-2 rounded"
        >
          লগইন
        </button>
      </form>
    </div>
  );
}