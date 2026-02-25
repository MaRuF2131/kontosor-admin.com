"use client"
import VideoForm from "@/components/admin/VideoForm";
import TableLoader from "@/components/loader/TableLoader";
import api from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

export default function EditVideoPage() {
  const params = useParams();
  const id = params.id;

  const { data, isLoading } = useQuery({
    queryKey: ["video", id],
    queryFn: async () => {
      const res = await api.get(`/admin/news/getbyid/${id}?database=video`);
      return res.data?.data || null;
    },
  });

  if (isLoading) return <TableLoader ms={"video"}></TableLoader>;
  return (
    <div className="">
      <VideoForm defaultValues={data} />
    </div>
  );
}
