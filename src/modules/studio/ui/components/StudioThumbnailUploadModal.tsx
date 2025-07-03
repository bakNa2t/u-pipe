import { trpc } from "@/trpc/client";
import { useTranslations } from "next-intl";

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
  const t = useTranslations("Components");

  const onUploadComplete = () => {
    utils.studio.getMany.invalidate();
    utils.studio.getOne.invalidate({ id: videoId });
    onOpenChange(false);
  };

  return (
    <ResponsiveModal
      title={t("studioUploadThumbnail")}
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
