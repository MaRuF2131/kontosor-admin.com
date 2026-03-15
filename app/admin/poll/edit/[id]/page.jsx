"use client"
import PollForm from "@/components/admin/PollForm";
import TableLoader from "@/components/loader/TableLoader";
import api from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

export default function EditPhotoStoryPage() {
  const params = useParams();
  const id = params.id;

  const { data, isLoading } = useQuery({
    queryKey: ["poll", id],
    queryFn: async () => {
      const res = await api.get(`/admin/news/getbyid/${id}?database=poll`);
      console.log("res",res);
      
      return res.data?.data || null;
    },
  });

  if (isLoading) return <TableLoader ms={"Poll"}></TableLoader>;
  return (
    <div className="">
      <PollForm defaultValues={data} />
    </div>
  );
}
