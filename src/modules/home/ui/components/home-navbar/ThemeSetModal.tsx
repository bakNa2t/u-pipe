import { MonitorCogIcon, MoonIcon, SunIcon } from "lucide-react";
import { ResponsiveModal } from "@/components/responsive-modal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface UserBannerUploadModal {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ThemeModeSetModal = ({
  open,
  onOpenChange,
}: UserBannerUploadModal) => {
  return (
    <ResponsiveModal
      title="Set app theme"
      open={open}
      onOpenChange={onOpenChange}
    >
      <Select defaultValue="system">
        <SelectTrigger>
          <SelectValue placeholder="Select a theme" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="light">
            <SunIcon className="size-4 mr-2" />
            Light
          </SelectItem>
          <SelectItem value="dark">
            <MoonIcon className="size-4 mr-2" />
            Dark
          </SelectItem>
          <SelectItem value="system">
            <MonitorCogIcon className="size-4 mr-2" />
            System
          </SelectItem>
        </SelectContent>
      </Select>
    </ResponsiveModal>
  );
};
