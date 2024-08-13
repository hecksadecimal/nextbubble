import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

export const channelAccountRouter = createTRPCRouter({
  get: protectedProcedure
    .input(z.object({ channel: z.string().max(32) }))
    .query(async ({ ctx, input }) => {
      let channelAccount = ctx.db.channelAccount.findFirst({
        where: {
          channelId: input.channel,
          accountId: ctx.session.id
        }
      });
      return channelAccount;
    }),

  updateCharacter: protectedProcedure
    .input(z.object({ 
      channelId: z.string().min(1),
      name: z.string(),
      acronym: z.string(),
      color: z.string(),
      prefix: z.string(),
      suffix: z.string(),
    }))
    .mutation(async (opts) => {
      const { channelId } = opts.input

      const channelAccount = await opts.ctx.db.channelAccount.findFirstOrThrow({
        where: {
          accountId: opts.ctx.session.id,
          channelId
        }
      })

      await opts.ctx.db.channelAccount.update({
        where: {
          channelId_accountId: {
            channelId,
            accountId: opts.ctx.session.id
          }
        },
        data: {
          name: opts.input.name,
          acronym: opts.input.acronym,
          color: opts.input.color,
          prefix: opts.input.prefix,
          suffix: opts.input.suffix
        }
      })
    }),
});
