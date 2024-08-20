import { z } from "zod";

import {
    createTRPCRouter,
    protectedProcedure,
    publicProcedure,
    adminProcedure
} from "@/server/api/trpc";

import webpush, { PushSubscription } from 'web-push'
import { env } from "@/env";
import { AccountType } from "@prisma/client";

webpush.setVapidDetails(
    'mailto:mxrphelpdesk@gmail.com',
    env.NEXT_PUBLIC_VAPID_PUBLISHABLE_KEY,
    env.VAPID_PRIVATE_KEY
)

export const announcementRouter = createTRPCRouter({
    createAnnouncement: adminProcedure
        .input(z.object({
            title: z.string(),
            content: z.string(),
        }))
        .mutation(async ({ ctx, input }) => {
            let subscriptions = await ctx.db.pushSubscription.findMany({
                where: {
                    account: {
                        pushAnnouncements: true
                    },
                },
            });

            const newAnnouncement = await ctx.db.announcement.create({
                data: {
                    title: input.title,
                    content: input.content,
                    account: {
                        connect: {
                            id: ctx.session.id,
                        },
                    },
                },
            });

            for (let subscription of subscriptions) {
                const payload = JSON.stringify({
                    title: input.title,
                    message: input.content,
                    tag: 'announcement',
                    url: `/announcement/${newAnnouncement.id}`
                });

                const subscriptionData: PushSubscription = {
                    endpoint: subscription.endpoint,
                    keys: {
                        auth: subscription.auth,
                        p256dh: subscription.p256dh,
                    },
                }

                await webpush.sendNotification(subscriptionData, payload)
            }
        }),

    getAnnouncements: publicProcedure
        .input(z.object({
            page: z.number().optional(),
            perPage: z.number().optional(),
        }))
        .query(async ({ ctx, input }) => {
            const page = input.page ?? 1;
            const perPage = input.perPage ?? 10;

            return await ctx.db.announcement.findMany({
                take: perPage,
                skip: (page - 1) * perPage,
                orderBy: {
                    createdAt: 'desc',
                },
            });
        }
    ),

    getLatestAnnouncement: publicProcedure
        .query(async ({ ctx }) => {
            return await ctx.db.announcement.findFirst({
                orderBy: {
                    createdAt: 'desc',
                },
            });
        }),
});
