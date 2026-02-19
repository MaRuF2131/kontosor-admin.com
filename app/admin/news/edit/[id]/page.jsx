"use client";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";
import NewsForm from "@/components/admin/NewsForm";

export default function EditNews() {
  const params = useParams();
  const id = params.id;

  const { data, isLoading } = useQuery({
    queryKey: ["news", id],
    queryFn: async () => {
      const res = await api.get(`/admin/news/${id}`);
      return res.data;
    },
  });

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <h1 className="text-xl font-bold mb-5">Edit News</h1>
      <NewsForm defaultValues={data} />
    </div>
  );
}
