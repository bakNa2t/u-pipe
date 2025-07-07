import { useState } from "react";
import { useAuth, useClerk } from "@clerk/nextjs";
import { useTranslations } from "next-intl";
import {
  ListPlusIcon,
  MoreVerticalIcon,
  ShareIcon,
  Trash2Icon,
} from "lucide-react";
import { toast } from "sonner";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { PlaylistAddModal } from "@/modules/playlists/ui/components/PlaylistAddModal";

import { APP_URL } from "@/constants";

interface VideoMenuProps {
  videoId: string;
  variant?: "ghost" | "secondary";
  onRemove?: () => void;
}

export const VideoMenu = ({
  videoId,
  variant = "ghost",
  onRemove,
}: VideoMenuProps) => {
  const [isOpenPlaylistAddModal, setIsOpenPlaylistAddModal] = useState(false);
  const { isSignedIn } = useAuth();
  const clerkUser = useClerk();
  const t = useTranslations("Components");
  const tToast = useTranslations("Toasts");

  const onShare = () => {
    const fullUrl = `${APP_URL}/videos/${videoId}`;

    navigator.clipboard.writeText(fullUrl);
    toast.success(tToast("linkCopiedToClipboard"));
  };

  return (
    <>
      <PlaylistAddModal
        videoId={videoId}
        open={isOpenPlaylistAddModal}
        onOpenChange={setIsOpenPlaylistAddModal}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={variant} size="icon" className="rounded-full">
            <MoreVerticalIcon />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" onClick={(e) => e.stopPropagation()}>
          <DropdownMenuItem onClick={onShare}>
            <ShareIcon className="size-4 mr-2" />
            {t("moreMenuShare")}
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={(e) => {
              if (!isSignedIn) {
                e.preventDefault();
                return clerkUser.openSignIn();
              } else {
                setIsOpenPlaylistAddModal(true);
              }
            }}
          >
            <ListPlusIcon className="size-4 mr-2" />
            {t("moreMenuAddToPlaylist")}
          </DropdownMenuItem>

          {onRemove && (
            <DropdownMenuItem onClick={onRemove}>
              <Trash2Icon className="size-4 mr-2" />
              {t("moreMenuRemove")}
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
