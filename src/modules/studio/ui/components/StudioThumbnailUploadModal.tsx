import { ResponsiveModal } from "@/components/responsive-modal";

interface StudioThumbnailUploadModal {
  videoId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const StudioThumbnailUploadModal = ({
  videoId,
  open,
  onOpenChange,
}: StudioThumbnailUploadModal) => {
  return (
    <ResponsiveModal
      title="Upload a thumbnail"
      open={open}
      onOpenChange={onOpenChange}
    >
      <p>It&apos;s thumbnail ID: {videoId ? videoId : "NO ID FOUND"}</p>
    </ResponsiveModal>
  );
};
