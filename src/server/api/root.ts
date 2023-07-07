import { createTRPCRouter } from "~/server/api/trpc";
import { exampleRouter } from "~/server/api/routers/example";
import {dashboardData} from './routers/dashboard'
import {forgetPassword} from './routers/forgetPassword'
import { adminRouter } from "./routers/admin";
import {coachRoot}from './routers/coachRoot'

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  dashboardInfo:dashboardData,
  forgetPassword :forgetPassword,
  adminRouter:adminRouter,
  coachRouter:coachRoot
});

// export type definition of API
export type AppRouter = typeof appRouter;
