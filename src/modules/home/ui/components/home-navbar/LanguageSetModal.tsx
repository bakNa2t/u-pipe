import { Check, LanguagesIcon } from "lucide-react";

import { ResponsiveModal } from "@/components/responsive-modal";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";

interface LanguageSetModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const LanguageSetModal = ({
  open,
  onOpenChange,
}: LanguageSetModalProps) => {
  const [locale, setLocale] = useState("");

  return (
    <ResponsiveModal
      title="Set language"
      open={open}
      onOpenChange={onOpenChange}
    >
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="row_fit" className="px-2 md:px-4">
            <LanguagesIcon />
            <span>Choose language</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem onClick={() => setLocale("en")}>
            English
            {locale === "en" && <Check className="h-4 w-4" />}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setLocale("ru")}>
            Russian
            {locale === "ru" && <Check className="h-4 w-4" />}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </ResponsiveModal>
  );
};
