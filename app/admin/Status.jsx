"use client";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";
import StatsCard from "@/components/admin/StatsCard";

export default function AdminDashboard() {
  // ড্যাশবোর্ডের স্ট্যাটস লোড
  const { data, isLoading } = useQuery({
    queryKey: ["adminStats"],
    queryFn: async () => {
      const res = await api.get("/admin/stats");
      return res.data;
    },
  });

  if (isLoading) return <p>লোড হচ্ছে...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-5">এডমিন ড্যাশবোর্ড</h1>

      {/* স্ট্যাটস কার্ড */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-8">
        <StatsCard title="মোট সংবাদ" value={data?.totalNews || 0} />
        <StatsCard title="মোট ভিউ" value={data?.totalViews || 0} />
        <StatsCard title="মোট বিভাগ" value={data?.totalCategories || 0} />
        <StatsCard title="মোট ব্যবহারকারী" value={data?.totalUsers || 0} />
      </div>

      {/* দ্রুত লিঙ্ক */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white p-4 rounded shadow text-center hover:bg-gray-100 cursor-pointer">
          <a href="/admin/news">সকল সংবাদ</a>
        </div>
        <div className="bg-white p-4 rounded shadow text-center hover:bg-gray-100 cursor-pointer">
          <a href="/admin/news/add">নতুন সংবাদ যোগ করুন</a>
        </div>
        <div className="bg-white p-4 rounded shadow text-center hover:bg-gray-100 cursor-pointer">
          <a href="/admin/categories">বিভাগসমূহ</a>
        </div>
      </div>
    </div>
  );
}
