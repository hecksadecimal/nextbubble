import { messageRouter } from "@/server/api/routers/message";
import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";
import { channelRouter } from "./routers/channel";
import { channelAccountRouter } from "./routers/channelAccount";
import { accountRouter } from "./routers/account";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  channel: channelRouter,
  message: messageRouter,
  channelAccount: channelAccountRouter,
  account: accountRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
