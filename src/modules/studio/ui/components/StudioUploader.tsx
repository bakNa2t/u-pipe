import { useTranslations } from "next-intl";
import { UploadIcon } from "lucide-react";

import MuxUploader, {
  MuxUploaderDrop,
  MuxUploaderFileSelect,
  MuxUploaderProgress,
  MuxUploaderStatus,
} from "@mux/mux-uploader-react";

import { Button } from "@/components/ui/button";

interface StudioUploaderProps {
  endpoint?: string | null;
  onSuccess: () => void;
}

const UPLOADER_ID = "video-uploader";

export const StudioUploader = ({
  endpoint,
  onSuccess,
}: StudioUploaderProps) => {
  const t = useTranslations("Studio");

  return (
    <div>
      <MuxUploader
        id={UPLOADER_ID}
        endpoint={endpoint}
        onSuccess={onSuccess}
        className="hidden group/uploader"
      />

      <MuxUploaderDrop muxUploader={UPLOADER_ID} className="group/drop">
        <div slot="heading" className="flex flex-col items-center gap-6">
          <div className="flex items-center justify-center gap-2 w-32 h-32 rounded-full bg-muted">
            <UploadIcon className="size-10 text-muted-foreground group/drop-[&[active]]:animate-bounce transition-all duration-300" />
          </div>

          <div className="flex flex-col gap-2 text-center">
            <p className="text-sm">{t("modalUploadContent")}</p>
            <p className="text-xs text-muted-foreground">
              {t("modalUploadDesc")}
            </p>
          </div>

          <MuxUploaderFileSelect muxUploader={UPLOADER_ID}>
            <Button type="button" className="rounded-full">
              {t("modalSelectFiles")}
            </Button>
          </MuxUploaderFileSelect>
        </div>

        <span slot="separator" className="hidden" />

        <MuxUploaderStatus muxUploader={UPLOADER_ID} className="text-sm" />
        <MuxUploaderProgress
          muxUploader={UPLOADER_ID}
          type="percentage"
          className="text-sm"
        />
        <MuxUploaderProgress muxUploader={UPLOADER_ID} type="bar" />
      </MuxUploaderDrop>
    </div>
  );
};
