import { useTheme } from "next-themes";
import { Check, Moon, Sun } from "lucide-react";

import { ResponsiveModal } from "@/components/responsive-modal";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTranslations } from "next-intl";

interface ThemeModeSetModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ThemeModeSetModal = ({
  open,
  onOpenChange,
}: ThemeModeSetModalProps) => {
  const { theme, setTheme } = useTheme();
  const t = useTranslations("Navbar");

  return (
    <ResponsiveModal
      title={t("themeModalTitle")}
      open={open}
      onOpenChange={onOpenChange}
    >
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="row" className="md:px-4">
            {theme === "light" ? (
              <Sun className="size-4" />
            ) : (
              <Moon className="size-4" />
            )}
            <span>
              {theme === "light" ? `${t("themeLight")}` : `${t("themeDark")}`}
            </span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem onClick={() => setTheme("light")}>
            {t("themeLight")}
            {theme === "light" && <Check className="h-4 w-4" />}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("dark")}>
            {t("themeDark")}
            {theme === "dark" && <Check className="h-4 w-4" />}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("system")}>
            {t("themeSystem")}
            {theme === "system" && <Check className="h-4 w-4" />}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </ResponsiveModal>
  );
};
