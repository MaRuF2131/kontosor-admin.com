"use client"
import MagazineForm from "@/components/admin/MagazineForm";
import TableLoader from "@/components/loader/TableLoader";
import api from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

export default function EditPhotoStoryPage() {
  const params = useParams();
  const id = params.id;

  const { data, isLoading } = useQuery({
    queryKey: ["magazines", id],
    queryFn: async () => {
      const res = await api.get(`/admin/news/getbyid/${id}?database=magazines`);
      console.log("res",res);
      
      return res.data?.data || null;
    },
  });

  if (isLoading) return <TableLoader ms={"Magazine"}></TableLoader>;
  return (
    <div className="">
      <MagazineForm defaultValues={data} />
    </div>
  );
}
