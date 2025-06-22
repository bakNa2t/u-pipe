import { ResponsiveModal } from "@/components/responsive-modal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
      <Select defaultValue="system">
        <SelectTrigger>
          <SelectValue placeholder="Select a language" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="light">English</SelectItem>
          <SelectItem value="dark">Russian</SelectItem>
        </SelectContent>
      </Select>
    </ResponsiveModal>
  );
};
