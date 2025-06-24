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

interface ThemeModeSetModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ThemeModeSetModal = ({
  open,
  onOpenChange,
}: ThemeModeSetModalProps) => {
  const { theme, setTheme } = useTheme();

  return (
    <ResponsiveModal
      title="Set app theme"
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
            <span>{theme === "light" ? "Light" : "Dark"}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem onClick={() => setTheme("light")}>
            Light
            {theme === "light" && <Check className="h-4 w-4" />}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("dark")}>
            Dark
            {theme === "dark" && <Check className="h-4 w-4" />}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("system")}>
            System
            {theme === "system" && <Check className="h-4 w-4" />}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </ResponsiveModal>
  );
};
