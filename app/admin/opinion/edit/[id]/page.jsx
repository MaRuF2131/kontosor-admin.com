"use client"
import OpinionForm from "@/components/admin/OpinionForm";
import TableLoader from "@/components/loader/TableLoader";
import api from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

export default function EditPhotoStoryPage() {
  const params = useParams();
  const id = params.id;

  const { data, isLoading } = useQuery({
    queryKey: ["opinion", id],
    queryFn: async () => {
      const res = await api.get(`/admin/news/getbyid/${id}?database=opinion`);
      console.log("res",res);
      
      return res.data?.data || null;
    },
  });

  if (isLoading) return <TableLoader ms={"Opinion"}></TableLoader>;
  return (
    <div className="">
      <OpinionForm defaultValues={data} />
    </div>
  );
}
