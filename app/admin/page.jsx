"use client";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";
import StatsCard from "@/components/admin/StatsCard";
import Link from "next/link";

export default function AdminDashboard() {
  // ড্যাশবোর্ডের স্ট্যাটস লোড
  const { data, isLoading } = useQuery({
    queryKey: ["adminStats"],
    queryFn: async () => {
      const res = await api.get("/admin/stats");
      console.log(res);
      
      return res.data;
    },
  });

  if (isLoading) return <p>লোড হচ্ছে...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-5">এডমিন ড্যাশবোর্ড</h1>

      {/* স্ট্যাটস কার্ড */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-8">
        <StatsCard title="মোট সংবাদ" value={data|| 0} />
        <StatsCard title="মোট বিভাগ" value={data?.totalCategories ||25} />
      </div>

      {/* দ্রুত লিঙ্ক */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white p-4 rounded shadow text-center hover:bg-gray-100 cursor-pointer">
          <Link href="/admin/news">সকল সংবাদ</Link>
        </div>
        <div className="bg-white p-4 rounded shadow text-center hover:bg-gray-100 cursor-pointer">
          <Link href="/admin/news/add">নতুন সংবাদ যোগ করুন</Link>
        </div>
      </div>
    </div>
  );
}
