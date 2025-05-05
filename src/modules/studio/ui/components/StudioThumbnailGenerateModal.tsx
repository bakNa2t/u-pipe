import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { trpc } from "@/trpc/client";
import { toast } from "sonner";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ResponsiveModal } from "@/components/responsive-modal";

interface StudioThumbnailGenerateModal {
  videoId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const formSchema = z.object({
  prompt: z.string().min(10),
});

export const StudioThumbnailGenerateModal = ({
  videoId,
  open,
  onOpenChange,
}: StudioThumbnailGenerateModal) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const generateThumbnail = trpc.videos.generateThumbnail.useMutation({
    onSuccess: () => {
      toast.success("Background job started", {
        description: "This may take a few minutes",
      });
    },
    onError: () => {
      toast.error("Failed to generate thumbnail");
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    generateThumbnail.mutate({
      prompt: values.prompt,
      id: videoId,
    });
    onOpenChange(false);
  };

  return (
    <ResponsiveModal
      title="Generate a thumbnail"
      open={open}
      onOpenChange={onOpenChange}
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <FormField
            control={form.control}
            name="prompt"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Prompt</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    className="resize-none"
                    cols={30}
                    rows={5}
                    placeholder="Enter a prompt to generate a thumbnail"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end">
            <Button type="submit">Generate</Button>
          </div>
        </form>
      </Form>
    </ResponsiveModal>
  );
};
