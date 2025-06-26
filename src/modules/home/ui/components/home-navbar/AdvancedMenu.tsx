"use client";

import { useState } from "react";
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";
import { GlobeIcon, MoonIcon, MoreVerticalIcon, SunIcon } from "lucide-react";

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
  const { theme } = useTheme();
  const t = useTranslations("Navbar");

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
            {theme === "light" ? (
              <SunIcon className="size-4 mr-2" />
            ) : (
              <MoonIcon className="size-4 mr-2" />
            )}
            {t("theme")}
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => setIsOpenLangModal(true)}>
            <GlobeIcon className="size-4 mr-2" />
            {t("language")}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
