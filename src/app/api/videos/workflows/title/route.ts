import { serve } from "@upstash/workflow/nextjs";

import { db } from "@/db";
import { and, eq } from "drizzle-orm";
import { videos } from "@/db/schema";

interface InputType {
  userId: string;
  videoId: string;
}

export const { POST } = serve(async (context) => {
  const input = context.requestPayload as InputType;
  const { userId, videoId } = input;

  const video = context.run("get-video", async () => {
    const [existingVideo] = await db
      .select()
      .from(videos)
      .where(and(eq(videos.id, videoId), eq(videos.userId, userId)));

    if (!existingVideo) {
      throw new Error();
    }

    return existingVideo;
  });

  console.log(video);

  await context.run("initial-step", () => {
    console.log("initial step ran");
  });

  await context.run("second-step", () => {
    console.log("second step ran");
  });
});
