import { GlobeIcon, MoreVerticalIcon, SunMoonIcon } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export const AdvancedMenuMenu = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <MoreVerticalIcon />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuItem>
          <SunMoonIcon className="size-4 mr-2" />
          Theme
        </DropdownMenuItem>

        <DropdownMenuItem>
          <GlobeIcon className="size-4 mr-2" />
          Language
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
