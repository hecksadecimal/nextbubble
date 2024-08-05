import { z } from "zod";
import EventEmitter, { on } from 'node:events';
import { sse } from '@trpc/server';

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { Message } from "@prisma/client";

export type WhoIsTyping = Record<string, { lastTyped: Date }>;

interface ChannelEvents {
  add: (channelId: string, data: Message) => void;
  isTypingUpdate: (channelId: string, who: WhoIsTyping) => void;
}

declare interface ChannelEventEmitter {
  on<TEv extends keyof ChannelEvents>(event: TEv, listener: ChannelEvents[TEv]): this;
  off<TEv extends keyof ChannelEvents>(event: TEv, listener: ChannelEvents[TEv]): this;
  once<TEv extends keyof ChannelEvents>(event: TEv, listener: ChannelEvents[TEv]): this;
  emit<TEv extends keyof ChannelEvents>(
    event: TEv,
    ...args: Parameters<ChannelEvents[TEv]>
  ): boolean;
}

class ChannelEventEmitter extends EventEmitter {
  public toIterable<TEv extends keyof ChannelEvents>(
    event: TEv,
  ): AsyncIterable<Parameters<ChannelEvents[TEv]>> {
    //@ts-expect-error
    return on(this, event);
  }
}

export const ee = new ChannelEventEmitter();

// who is currently typing for each channel, key is `name`
export const currentlyTyping: Record<string, WhoIsTyping> = Object.create(null);

// every 1s, clear old "isTyping"
setInterval(() => {
  const updatedChannels = new Set<string>();
  const now = Date.now();
  for (const [channelId, typers] of Object.entries(currentlyTyping)) {
    for (const [key, value] of Object.entries(typers ?? {})) {
      if (now - value.lastTyped.getTime() > 3e3) {
        delete typers[key];
        updatedChannels.add(channelId);
      }
    }
  }
  updatedChannels.forEach((channelId) => {
    ee.emit('isTypingUpdate', channelId, currentlyTyping[channelId] ?? {});
  });
}, 3e3).unref();

export const channelRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({ channel: z.string().max(32) }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.channel.create({
        data: {
          id: input.channel ? input.channel : undefined,
          createdById: ctx.session.id,
        },
      });
    }),
   get: protectedProcedure
    .input(z.object({ channel: z.string().max(32)}))
    .query(async ({ ctx, input }) => {
        let channel = ctx.db.channel.findFirst({
            where: {
                id: input.channel
            }
        });
        return channel;
    }),
    isTyping: protectedProcedure
    .input(z.object({ channelId: z.string().min(1), typing: z.boolean() }))
    .mutation(async (opts) => {
      const name = opts.ctx.session.user;
      const { channelId } = opts.input;

      if (!currentlyTyping[channelId]) {
        currentlyTyping[channelId] = {};
      }

      if (!opts.input.typing) {
        delete currentlyTyping[channelId][name];
      } else {
        currentlyTyping[channelId][name] = {
          lastTyped: new Date(),
        };
      }
      ee.emit('isTypingUpdate', channelId, currentlyTyping[channelId]);
    }),

  whoIsTyping: publicProcedure
    .input(
      z.object({
        channelId: z.string().min(1),
      }),
    )
    .subscription(async function* (opts) {
      const { channelId } = opts.input;

      let lastIsTyping = '';

      /**
       * yield who is typing if it has changed
       * won't yield if it's the same as last time
       */
      function* maybeYield(who: WhoIsTyping) {
        const idx = Object.keys(who).toSorted().toString();
        if (idx === lastIsTyping) {
          return;
        }
        yield Object.keys(who);

        lastIsTyping = idx;
      }

      // emit who is currently typing
      yield* maybeYield(currentlyTyping[channelId] ?? {});

      for await (const [channelId, who] of ee.toIterable('isTypingUpdate')) {
        if (channelId === opts.input.channelId) {
          yield* maybeYield(who);
        }
      }
    }),
});
