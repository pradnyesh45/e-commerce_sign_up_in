import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import {
  hashPassword,
  comparePassword,
  generateSessionToken,
} from "~/server/utils/auth";

export const userRouter = createTRPCRouter({
  register: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string().min(8),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const hashedPassword = await hashPassword(input.password); // Hash password before storing

      const user = await ctx.db.user.create({
        data: {
          ...input,
          password: hashedPassword,
        },
      });

      console.log(user);
      return {
        id: user.id,
        email: user.email,
      };
    }),

  login: publicProcedure
    .input(z.object({ email: z.string().email(), password: z.string() }))
    .mutation(async ({ ctx, input }) => {
      // Implement user login logic here (password verification, session creation etc.)
      const user = await ctx.db.user.findUnique({
        where: { email: input.email },
      });

      if (!user) {
        throw new Error("Invalid email or password"); // Specific error for email not found
      }

      // Verify password hash
      const isValidPassword = await comparePassword(
        input.password,
        user.password,
      );
      if (!isValidPassword) {
        throw new Error("Invalid email or password"); // Generic error for login failure
      }

      // Generate a secure session token
      const sessionToken = generateSessionToken(user.id);

      // Return user information and the session token
      return {
        id: user.id,
        email: user.email,
        sessionToken, // Include the generated token in the response
      };
    }),

  // Add other user related procedures like getById, update etc. with appropriate Zod schemas
});
