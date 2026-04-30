import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { getProducts, getProductsByCategory, getProductById, getCategories, createInquiry } from "./db";
import { z } from "zod";

export const appRouter = router({
  // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  products: router({
    list: publicProcedure.query(async () => {
      return getProducts();
    }),

    byCategory: publicProcedure
      .input(z.object({ categoryId: z.number() }))
      .query(async ({ input }) => {
        return getProductsByCategory(input.categoryId);
      }),

    byId: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        return getProductById(input.id);
      }),

    create: protectedProcedure
      .input(z.object({
        nameAr: z.string().min(1),
        nameTr: z.string().min(1),
        descriptionAr: z.string().optional(),
        descriptionTr: z.string().optional(),
        price: z.number().positive(),
        discountPercentage: z.number().min(0).max(100).default(0),
        categoryId: z.number(),
        imageUrl: z.string(),
      }))
      .mutation(async ({ ctx, input }) => {
        if (ctx.user?.role !== 'admin') throw new Error('Unauthorized');
        // TODO: Implement create product
        return { success: true };
      }),
  }),

  categories: router({
    list: publicProcedure.query(async () => {
      return getCategories();
    }),

    create: protectedProcedure
      .input(z.object({
        nameAr: z.string().min(1),
        nameTr: z.string().min(1),
        descriptionAr: z.string().optional(),
        descriptionTr: z.string().optional(),
        imageUrl: z.string().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        if (ctx.user?.role !== 'admin') throw new Error('Unauthorized');
        // TODO: Implement create category
        return { success: true };
      }),
  }),

  inquiries: router({
    create: publicProcedure
      .input(z.object({
        productId: z.number().optional(),
        name: z.string().min(1),
        email: z.string().email().optional(),
        phone: z.string().optional(),
        message: z.string().optional(),
        language: z.enum(['ar', 'tr']).default('ar'),
      }))
      .mutation(async ({ input }) => {
        await createInquiry(input);
        // TODO: Send notification to owner
        return { success: true };
      }),
  }),
});

export type AppRouter = typeof appRouter;
