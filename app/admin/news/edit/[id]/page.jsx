"use client";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";
import NewsForm from "@/components/admin/NewsForm";
import TableLoader from "@/components/loader/TableLoader";

export default function EditNews() {
  const params = useParams();
  const id = params.id;

  const { data, isLoading } = useQuery({
    queryKey: ["news", id],
    queryFn: async () => {
      const res = await api.get(`/admin/news/getbyid/${id}?database=news`);
      return res.data?.data || null;
    },
  });

  if (isLoading) return <TableLoader ms={"news"}></TableLoader>;

  return (
    <div>
      <NewsForm defaultValues={data} />
    </div>
  );
}
