import { LanguagesIcon } from "lucide-react";

import { ResponsiveModal } from "@/components/responsive-modal";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface LanguageSetModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const LanguageSetModal = ({
  open,
  onOpenChange,
}: LanguageSetModalProps) => {
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
          <DropdownMenuItem>English</DropdownMenuItem>
          <DropdownMenuItem>Russian</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </ResponsiveModal>
  );
};
