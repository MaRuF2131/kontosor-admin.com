"use client"
import AudioForm from "@/components/admin/AudioForm";
import TableLoader from "@/components/loader/TableLoader";
import api from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

export default function EditVideoPage() {
  const params = useParams();
  const id = params.id;

  const { data, isLoading } = useQuery({
    queryKey: ["audio", id],
    queryFn: async () => {
      const res = await api.get(`/admin/news/getbyid/${id}?database=audio`);
      return res.data?.data || null;
    },
  });

  if (isLoading) return <TableLoader ms={"Audio"}></TableLoader>;
  return (
    <div className="">
      <AudioForm defaultValues={data} />
    </div>
  );
}
