"use client";

import { useState } from "react";
import { GlobeIcon, MoreVerticalIcon, SunMoonIcon } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ThemeModeSetModal } from "./ThemeSetModal";
import { LanguageSetModal } from "./LanguageSetModal";

export const AdvancedMenu = () => {
  const [isOpenThemeModal, setIsOpenThemeModal] = useState(false);
  const [isOpenLangModal, setIsOpenLangModal] = useState(false);
  return (
    <>
      <ThemeModeSetModal
        open={isOpenThemeModal}
        onOpenChange={setIsOpenThemeModal}
      />

      <LanguageSetModal
        open={isOpenLangModal}
        onOpenChange={setIsOpenLangModal}
      />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="rounded-full">
            <MoreVerticalIcon />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setIsOpenThemeModal(true)}>
            <SunMoonIcon className="size-4 mr-2" />
            Theme
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => setIsOpenLangModal(true)}>
            <GlobeIcon className="size-4 mr-2" />
            Language
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
