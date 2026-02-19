"use client";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";
import Link from "next/link";

export default function AllNews() {
  const { data } = useQuery({
    queryKey: ["news"],
    queryFn: async () => {
      const res = await api.get("/admin/news");
      return res.data;
    },
  });

  return (
    <div>
      <h1 className="text-xl font-bold mb-5">All News</h1>
      <div className="bg-white p-4 rounded shadow">
        {data?.map((item) => (
          <div
            key={item._id}
            className="flex justify-between border-b py-2"
          >
            <span>{item.title}</span>
            <Link href={`/admin/news/edit/${item._id}`}>
              Edit
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
