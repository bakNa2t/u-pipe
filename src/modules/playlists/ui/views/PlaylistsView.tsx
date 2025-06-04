"use client";

import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";

export const PlaylistsView = () => {
  return (
    <div className="flex flex-col gap-y-6 max-w-[2400px] mx-auto mb-10 px-4 pt-2.5">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Playlists</h1>
          <p className="text-xs text-muted-foreground">
            Videos collections you have created
          </p>
        </div>

        <Button
          variant="outline"
          size="icon"
          className="rounded-full"
          onClick={() => {}}
        >
          <PlusIcon />
        </Button>
      </div>
    </div>
  );
};
