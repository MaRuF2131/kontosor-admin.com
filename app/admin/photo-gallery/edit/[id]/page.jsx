"use client"
import PhotoGalleryForm from "@/components/admin/PhotoGalleryForm";
import TableLoader from "@/components/loader/TableLoader";
import api from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

export default function EditPhotoStoryPage() {
  const params = useParams();
  const id = params.id;

  const { data, isLoading } = useQuery({
    queryKey: ["photo_gallery", id],
    queryFn: async () => {
      const res = await api.get(`/admin/news/getbyid/${id}?database=photo_gallery`);
      console.log("res",res);
      
      return res.data?.data || null;
    },
  });

  if (isLoading) return <TableLoader ms={"Photo Gallery"}></TableLoader>;
  return (
    <div className="">
      <PhotoGalleryForm defaultValues={data} />
    </div>
  );
}
