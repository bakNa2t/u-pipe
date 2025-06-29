"use client";

import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { Loader2Icon, PlusIcon } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { ResponsiveModal } from "@/components/responsive-modal";
import { StudioUploader } from "./StudioUploader";

import { trpc } from "@/trpc/client";

export const StudioUploadModal = () => {
  const router = useRouter();
  const t = useTranslations("Navbar");
  const tToast = useTranslations("Toast");
  const utils = trpc.useUtils();

  const create = trpc.videos.create.useMutation({
    onSuccess: () => {
      toast.success(tToast("videoUpload"));
      utils.studio.getMany.invalidate();
    },
    onError: () => {
      toast.error(tToast("somethingWrong"));
    },
  });

  const onSuccess = () => {
    if (!create.data?.video.id) return;

    create.reset();
    router.push(`/studio/videos/${create.data.video.id}`);
  };

  return (
    <>
      <ResponsiveModal
        title={t("studioUpload")}
        open={!!create.data?.url}
        onOpenChange={() => create.reset()}
      >
        {create.data?.url ? (
          <StudioUploader endpoint={create.data.url} onSuccess={onSuccess} />
        ) : (
          <Loader2Icon />
        )}
      </ResponsiveModal>

      <Button
        variant="secondary"
        onClick={() => create.mutate()}
        disabled={create.isPending}
      >
        {create.isPending ? <Loader2Icon /> : <PlusIcon />}
        {t("studioCreate")}
      </Button>
    </>
  );
};
