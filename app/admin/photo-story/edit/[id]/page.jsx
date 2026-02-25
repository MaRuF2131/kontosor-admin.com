"use client"
import PhotoStoryForm from "@/components/admin/PhotoStoryForm";
import TableLoader from "@/components/loader/TableLoader";
import api from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

export default function EditPhotoStoryPage() {
  const params = useParams();
  const id = params.id;

  const { data, isLoading } = useQuery({
    queryKey: ["photo_story", id],
    queryFn: async () => {
      const res = await api.get(`/admin/news/getbyid/${id}?database=photo_story`);
      console.log("res",res);
      
      return res.data?.data || null;
    },
  });

  if (isLoading) return <TableLoader ms={"Photo Story"}></TableLoader>;
  return (
    <div className="">
      <PhotoStoryForm defaultValues={data} />
    </div>
  );
}
