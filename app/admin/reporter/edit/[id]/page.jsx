"use client"
import ReporterForm from "@/components/admin/ReporterForm";
import TableLoader from "@/components/loader/TableLoader";
import api from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

export default function EditPhotoStoryPage() {
  const params = useParams();
  const id = params.id;

  const { data, isLoading } = useQuery({
    queryKey: ["reporters", id],
    queryFn: async () => {
      const res = await api.get(`/admin/news/getbyid/${id}?database=reporters`);
      console.log("res",res);
      
      return res.data?.data || null;
    },
  });

  if (isLoading) return <TableLoader ms={"Magazine"}></TableLoader>;
  return (
    <div className="">
      <ReporterForm defaultValues={data} />
    </div>
  );
}
