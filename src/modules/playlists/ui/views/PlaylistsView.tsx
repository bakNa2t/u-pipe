"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { PlusIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { PlaylistsSection } from "../sections/PlaylistsSection";
import { PlaylistCreateModal } from "../components/PlaylistCreateModal";

export const PlaylistsView = () => {
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const t = useTranslations("Home");

  return (
    <div className="flex flex-col gap-y-6 max-w-[2400px] mx-auto mb-10 px-4 pt-2.5">
      <PlaylistCreateModal
        open={createModalOpen}
        onOpenChange={setCreateModalOpen}
      />

      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">{t("playlists")}</h1>
          <p className="text-xs text-muted-foreground">{t("playlistsDesc")}</p>
        </div>

        <Button
          variant="outline"
          size="icon"
          className="rounded-full"
          onClick={() => setCreateModalOpen(true)}
        >
          <PlusIcon />
        </Button>
      </div>

      <PlaylistsSection />
    </div>
  );
};
