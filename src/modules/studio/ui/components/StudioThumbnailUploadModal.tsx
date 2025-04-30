import { trpc } from "@/trpc/client";

import { ResponsiveModal } from "@/components/responsive-modal";
import { UploadDropzone } from "@/lib/uploadthing";

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
  const utils = trpc.useUtils();

  const onUploadComplete = () => {
    utils.studio.getOne.invalidate({ id: videoId });
    onOpenChange(false);
  };

  return (
    <ResponsiveModal
      title="Upload a thumbnail"
      open={open}
      onOpenChange={onOpenChange}
    >
      <UploadDropzone
        endpoint="thumbnailUploader"
        input={{ videoId }}
        onClientUploadComplete={onUploadComplete}
      />
    </ResponsiveModal>
  );
};
