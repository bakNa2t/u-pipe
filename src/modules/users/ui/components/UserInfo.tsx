import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const userInfoVariants = cva("flex items-center gap-1", {
  variants: {
    size: {
      default: "[&_p]:text-sm [&_svg]:size-4",
      sm: "[&_p]:text-xs [&_svg]:size-3.5",
      lg: "[&_p]:text-base [&_svg]:size-5 [&_p]:font-medium [&_p]:text-black",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

interface UserInfoProps extends VariantProps<typeof userInfoVariants> {
  name: string;
  className?: string;
}

export const UserInfo = ({ name, className, size }: UserInfoProps) => {
  return (
    <div className={cn(userInfoVariants({ size, className }))}>
      <Tooltip>
        <TooltipTrigger asChild>
          <p className="text-gray-500 dark:text-gray-200 hover:text-gray-800 dark:hover:text-gray-400 line-clamp-1">
            {name}
          </p>
        </TooltipTrigger>

        <TooltipContent
          align="center"
          className="bg-black/70 dark:bg-gray-400/70"
        >
          <p>{name}</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
};
