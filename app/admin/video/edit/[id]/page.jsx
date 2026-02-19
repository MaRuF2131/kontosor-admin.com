import EditVideoForm from "@/components/admin/EditVideoForm";

export default function EditVideoPage({ params }) {
  return (
    <div className="">
      <EditVideoForm videoId={params.id} />
    </div>
  );
}
