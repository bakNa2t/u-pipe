import { useClerk } from "@clerk/nextjs";
import { toast } from "sonner";

import { trpc } from "@/trpc/client";

interface UseSubscriptionProps {
  userId: string;
  isSubscribed: boolean;
  fromVideoId: string;
}

export const useSubscription = ({
  userId,
  isSubscribed,
  fromVideoId,
}: UseSubscriptionProps) => {
  const clerk = useClerk();
  const utils = trpc.useUtils();

  const subscribe = trpc.subsriptions.create.useMutation({
    onSuccess: () => {
      toast.success("Subscribed successfully");

      if (fromVideoId) {
        utils.videos.getOne.invalidate({ id: fromVideoId });
      }
    },
    onError: (error) => {
      toast.error("Something went wrong");

      if (error.data?.code === "UNAUTHORIZED") {
        clerk.openSignIn();
      }
    },
  });

  const unsubscribe = trpc.subsriptions.remove.useMutation({
    onSuccess: () => {
      toast.success("Unsubscribed successfully");

      if (fromVideoId) {
        utils.videos.getOne.invalidate({ id: fromVideoId });
      }
    },
    onError: (error) => {
      toast.error("Something went wrong");

      if (error.data?.code === "UNAUTHORIZED") {
        clerk.openSignIn();
      }
    },
  });

  const isPending = subscribe.isPending || unsubscribe.isPending;

  const onClick = () => {
    if (isSubscribed) {
      unsubscribe.mutate({ userId });
    } else {
      subscribe.mutate({ userId });
    }
  };

  return {
    isPending,
    onClick,
  };
};
