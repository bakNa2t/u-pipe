import { useUser } from "@clerk/nextjs";

import { UserAvatar } from "@/components/user-avatar";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface CommentFormProps {
  videoId: string;
  onSuccess?: () => void;
}

export const CommentForm = ({ videoId, onSuccess }: CommentFormProps) => {
  const { user } = useUser();

  return (
    <form className="flex gap-4 gruop">
      <UserAvatar
        size="lg"
        imageUrl={user?.imageUrl ?? "/default-avatar.svg"}
        name={user?.username || "User"}
      />

      <div className="flex-1">
        <Textarea
          placeholder="Add a comment..."
          className="resize-none bg-transparent overflow-hidden min-h-0"
        />

        <div className="flex justify-end gap-2 mt-2">
          <Button type="submit" size="sm">
            Comment
          </Button>
        </div>
      </div>
    </form>
  );
};
