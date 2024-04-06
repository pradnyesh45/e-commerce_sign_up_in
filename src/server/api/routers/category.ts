import { UserCategory } from "@prisma/client";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const categoryRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    // Implement pagination logic here (offset, limit)
    // Here's a placeholder returning all categories
    return await ctx.db.category.findMany();
  }),

  create: publicProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      // Simulate a slow DB call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const category = await ctx.db.category.create({
        data: input,
      });

      return category;
    }),

  // Add other category related procedures
  fetchCategories: publicProcedure.query(async ({ ctx }) => {
    // Implement logic to fetch categories relevant to the user (e.g., all or based on user preferences)
    // Here's a placeholder returning all categories
    const categories = await ctx.db.category.findMany();
    return categories;
  }),

  fetchSelectedCategories: publicProcedure
    .input(
      z.object({ userId: z.string().optional(), token: z.string().optional() }),
    ) // Optional user ID for user-specific selections
    .query(async ({ ctx, input }) => {
      const userId = input.userId || input.token; // Use user ID from session if available
      if (!userId) {
        throw new Error("Missing user ID to fetch selected categories");
      }

      // Implement logic to fetch user's selected categories based on userId
      // Here's a placeholder assuming a UserCategory model
      const selectedCategories = await ctx.db.userCategory.findMany({
        where: { userId: parseInt(userId) },
      });

      // Return an array of category IDs for the selected categories
      return selectedCategories.map((category) => category.categoryId);
    }),

  setSelectedCategories: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        categoryIds: z.array(z.string()),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const userId = parseInt(input.userId);
      const categoryIds = input.categoryIds.map((id) => parseInt(id)); // Convert string IDs to numbers

      // Implement logic to update user's selected categories based on userId and categoryIds
      // Here's a placeholder assuming a UserCategory model
      await ctx.db.userCategory.deleteMany({
        where: {
          userId: userId, // userId is Int
        },
      }); // Delete existing selections

      const newSelections = categoryIds.map((categoryId) => ({
        userId,
        categoryId,
      }));
      await ctx.db.userCategory.createMany({
        data: newSelections,
        skipDuplicates: true, // Avoid creating duplicates
      });

      return { message: "Selected categories updated successfully" };
    }),

  // ... other category related procedures like getById, update etc. with appropriate Zod schemas
});

// import { UserCategory } from "@prisma/client";
// import { z } from "zod";

// import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

// export const categoryRouter = createTRPCRouter({
//   getAll: publicProcedure.query(async ({ ctx }) => {
//     // Implement pagination logic here (offset, limit)
//     // Here's a placeholder returning all categories
//     return await ctx.db.category.findMany();
//   }),

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

//   // Add other category related procedures like getById, update etc. with appropriate Zod schemas
// });
