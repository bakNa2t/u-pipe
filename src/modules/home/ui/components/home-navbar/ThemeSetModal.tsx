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
          <SelectItem value="light">Light</SelectItem>
          <SelectItem value="dark">Dark</SelectItem>
          <SelectItem value="system">System</SelectItem>
        </SelectContent>
      </Select>
    </ResponsiveModal>
  );
};
