import { z } from "zod";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import { useUser, useClerk } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { UserAvatar } from "@/components/user-avatar";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { trpc } from "@/trpc/client";
import { commentFormtSchema } from "@/db/schema";

interface CommentFormProps {
  videoId: string;
  parentId?: string;
  onSuccess?: () => void;
  onCancel?: () => void;
  variant?: "comment" | "reply";
}

export const CommentForm = ({
  videoId,
  parentId,
  onSuccess,
  onCancel,
  variant = "comment",
}: CommentFormProps) => {
  const { user } = useUser();
  const clerk = useClerk();
  const utils = trpc.useUtils();
  const t = useTranslations("Comments");

  const create = trpc.comments.create.useMutation({
    onSuccess: () => {
      utils.comments.getMany.invalidate({ videoId });
      utils.comments.getMany.invalidate({ videoId, parentId });
      form.reset();

      toast.success("Comment added");
      onSuccess?.();
    },
    onError: (error) => {
      toast.error("Something went wrong");

      if (error.data?.code === "UNAUTHORIZED") {
        clerk.openSignIn();
      }
    },
  });

  const form = useForm<z.infer<typeof commentFormtSchema>>({
    resolver: zodResolver(commentFormtSchema),
    defaultValues: {
      parentId: parentId,
      videoId: videoId,
      value: "",
    },
  });

  const handleSubmit = (values: z.infer<typeof commentFormtSchema>) => {
    create.mutate(values);
  };

  const handleCancel = () => {
    form.reset();
    onCancel?.();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex gap-4 gruop"
      >
        <UserAvatar
          size="lg"
          imageUrl={user?.imageUrl ?? "/default-avatar.svg"}
          name={user?.username || t("user")}
        />

        <div className="flex-1">
          <FormField
            name="value"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder={
                      variant === "reply"
                        ? t("formReplyPlaceholder")
                        : t("formCommentPlaceholder")
                    }
                    className="resize-none bg-transparent overflow-hidden min-h-0"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end gap-2 mt-2">
            {onCancel && (
              <Button variant="ghost" type="button" onClick={handleCancel}>
                {t("cancelBtn")}
              </Button>
            )}

            <Button type="submit" size="sm" disabled={create.isPending}>
              {variant === "reply" ? t("replyBtn") : t("commentBtn")}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};
