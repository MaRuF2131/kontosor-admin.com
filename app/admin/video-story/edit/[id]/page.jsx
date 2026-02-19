import EditVideoStoryForm from "@/components/admin/EditVideoStoryForm";

export default function EditVideoStoryPage({ params }) {
  const { id } = params;

  return (
    <div className="">
      <EditVideoStoryForm storyId={id} />
    </div>
  );
}
