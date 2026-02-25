"use client"
import VideoStoryForm from "@/components/admin/VideoStoryForm";
import TableLoader from "@/components/loader/TableLoader";
import api from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

export default function EditPhotoStoryPage() {
  const params = useParams();
  const id = params.id;

  const { data, isLoading } = useQuery({
    queryKey: ["video_story", id],
    queryFn: async () => {
      const res = await api.get(`/admin/news/getbyid/${id}?database=video_story`);
      console.log("res",res);
      
      return res.data?.data || null;
    },
  });

  if (isLoading) return <TableLoader ms={"Video Story"}></TableLoader>;
  return (
    <div className="">
      <VideoStoryForm defaultValues={data} />
    </div>
  );
}
