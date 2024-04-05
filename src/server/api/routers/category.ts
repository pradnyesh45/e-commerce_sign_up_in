import { UserCategory } from "@prisma/client";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const categoryRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    // Implement pagination logic here (offset, limit)
    // Here's a placeholder returning all categories
    return await ctx.db.category.findMany();
  }),

//   create: publicProcedure
//     .input(z.object({ name: z.string().min(1) }))
//     .mutation(async ({ ctx, input }) => {
//       // Simulate a slow DB call
//       await new Promise((resolve) => setTimeout(resolve, 1000));

//       const category = await ctx.db.category.create({
//         data: input,
//       });

//       return category;
//     }),

  // Add other category related procedures like getById, update etc. with appropriate Zod schemas
});