import { db } from "@/db";
import { videos } from "@/db/schema";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";

export const studioRouter = createTRPCRouter({
  getMany: baseProcedure.query(async () => {
    const data = await db.select().from(videos);

    return data;
  }),
});
