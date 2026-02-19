import EditPhotoStoryForm from "@/components/admin/EditPhotoStoryForm";

export default function EditPhotoStoryPage({ params }) {
  const { id } = params;

  return (
    <div className="">
      <EditPhotoStoryForm storyId={id} />
    </div>
  );
}
