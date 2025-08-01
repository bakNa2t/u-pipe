import { trpc } from "@/trpc/client";
import { useTranslations } from "next-intl";

import { ResponsiveModal } from "@/components/responsive-modal";
import { UploadDropzone } from "@/lib/uploadthing";

interface UserBannerUploadModal {
  userId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const UserBannerUploadModal = ({
  userId,
  open,
  onOpenChange,
}: UserBannerUploadModal) => {
  const utils = trpc.useUtils();
  const t = useTranslations("Components");

  const onUploadComplete = () => {
    utils.users.getOne.invalidate({ id: userId });
    onOpenChange(false);
  };

  return (
    <ResponsiveModal
      title={t("userUploadBanner")}
      open={open}
      onOpenChange={onOpenChange}
    >
      <UploadDropzone
        endpoint="bannerUploader"
        onClientUploadComplete={onUploadComplete}
      />
    </ResponsiveModal>
  );
};
