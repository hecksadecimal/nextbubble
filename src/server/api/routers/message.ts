import { z } from "zod";
import { MessageType, Message } from "@prisma/client";
import { currentlyTyping, ee } from './channel';
import { sse, tracked } from '@trpc/server';

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { streamToAsyncIterable } from "@/lib/stream-to-async-iterator";

export const messageRouter = createTRPCRouter({
  getLatest: protectedProcedure
    .input(z.object({ since: z.string().datetime(), channel: z.string().min(1) }))
    .query(async ({ ctx, input }) => {
      return ctx.db.message.findMany({
        where: {
          channelId: input.channel,
          createdAt: { gte: new Date() }
        }
      })
    }),
  getLastFifty: protectedProcedure
    .input(z.object({ channel: z.string().min(1) }))
    .query(async ({ ctx, input }) => {
      return ctx.db.message.findMany({
        where: {
          channelId: input.channel
        },
        orderBy: { createdAt: "asc" },
        take: 50
      })
    }),
  add: protectedProcedure
    .input(
      z.object({
        id: z.string().optional(),
        channelId: z.string().min(1),
        text: z.string().trim().min(1),
      }),
    )
    .mutation(async ({ctx, input}) => {
      const { channelId } = input;

      const message = await ctx.db.message
        .create({
          data: {
            content: input.text,
            accountId: ctx.session.id,
            type: MessageType.USER,
            channelId
          }
        })

      const channelTyping = currentlyTyping[channelId];
      if (channelTyping) {
        delete channelTyping[ctx.session.id];
        ee.emit('isTypingUpdate', channelId, channelTyping);
      }

      const defMessage = message!;
      ee.emit('add', channelId, defMessage);

      return message;
    }),

  infinite: publicProcedure
    .input(
      z.object({
        channelId: z.string().min(1),
        cursor: z.date().nullish(),
        take: z.number().min(1).max(50).nullish(),
      }),
    )
    .query(async ({ctx, input}) => {
      const take = input.take ?? 20;
      const cursor = input.cursor;

      const page = await ctx.db.message.findMany({
        orderBy: {
          createdAt: "desc"
        },
        where: {
          channelId: input.channelId
        },
        cursor: cursor ? { createdAt: cursor } : undefined,
        take: take + 1
      });

      const items = page.reverse();
      let nextCursor: typeof cursor | null = null;
      if (items.length > take) {
        const prev = items.shift();
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        nextCursor = prev!.createdAt;
      }
      return {
        items,
        nextCursor,
      };
    }),

  onAdd: publicProcedure
    .input(
      z.object({
        channelId: z.string().min(1),
        // lastEventId is the last event id that the client has received
        // On the first call, it will be whatever was passed in the initial setup
        // If the client reconnects, it will be the last event id that the client received
        lastEventId: z.string().nullish(),
      }),
    )
    .subscription(async function* ({ctx, input}) {
      let lastMessageCursor: Date | null = null;

      const eventId = input.lastEventId;
      if (eventId) {
        const itemById = await ctx.db.message.findFirst({
          where: {
            id: eventId
          }
        });
        lastMessageCursor = itemById?.createdAt ?? null;
      }

      let unsubscribe = () => {
        //
      };

      // We use a readable stream here to prevent the client from missing events
      // created between the fetching & yield'ing of `newItemsSinceCursor` and the
      // subscription to the ee
      const stream = new ReadableStream<Message>({
        async start(controller) {
          const onAdd = (channelId: string, data: Message) => {
            if (channelId === input.channelId) {
              controller.enqueue(data);
            }
          };
          ee.on('add', onAdd);
          unsubscribe = () => {
            ee.off('add', onAdd);
          };

          const newItemsSinceCursor = await ctx.db.message.findMany({
            where: {
              channelId: input.channelId,
              createdAt: {
                gt: lastMessageCursor ? lastMessageCursor : undefined
              }
            },
            orderBy: {
              createdAt: "asc"
            }
          });

          for (const item of newItemsSinceCursor) {
            controller.enqueue(item);
          }
        },
        cancel() {
          unsubscribe();
        },
      });

      for await (const message of streamToAsyncIterable(stream)) {
        // tracking the post id ensures the client can reconnect at any time and get the latest events this id
        yield tracked(message.id, message);
      }
    }),
});
