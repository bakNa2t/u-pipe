import { UserCircleIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

export const AuthButton = () => {
  return (
    <Button
      variant="outline"
      className="px-4 py-2 text-sm font-medium text-violet-500 hover:text-violet-700/80 border-violet-900/60 rounded-full shadow-none [&_svg]:size-6"
    >
      <UserCircleIcon />
      Sign In
    </Button>
  );
};
