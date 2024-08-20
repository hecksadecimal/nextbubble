import { z } from "zod";

import {
    createTRPCRouter,
    protectedProcedure,
    publicProcedure,
} from "@/server/api/trpc";

import webpush, { PushSubscription } from 'web-push'
import { env } from "@/env";

webpush.setVapidDetails(
    'mailto:mxrphelpdesk@gmail.com',
    env.NEXT_PUBLIC_VAPID_PUBLISHABLE_KEY,
    env.VAPID_PRIVATE_KEY
)

export const accountRouter = createTRPCRouter({
    addPushSubscription: protectedProcedure
        .input(z.object({
            subscription: z.object({
                endpoint: z.string(),
                keys: z.object({
                    auth: z.string(),
                    p256dh: z.string(),
                }),
            }),
            identifier: z.string()
        }))
        .mutation(async ({ ctx, input }) => {
            console.log(input.subscription);
            let account = await ctx.db.account.findFirstOrThrow({
                where: {
                    id: ctx.session.id,
                },
            });

            await ctx.db.pushSubscription.create({
                data: {
                    account: {
                        connect: {
                            id: account.id,
                        },
                    },
                    endpoint: input.subscription.endpoint,
                    auth: input.subscription.keys.auth,
                    p256dh: input.subscription.keys.p256dh,
                    identifier: input.identifier
                },
            });
        }),

    getPushSubscriptions: protectedProcedure
        .query(async ({ ctx }) => {
            let account = await ctx.db.account.findFirstOrThrow({
                where: {
                    id: ctx.session.id,
                },
            });

            return await ctx.db.pushSubscription.findMany({
                where: {
                    account: {
                        id: account.id,
                    },
                },
            });
        }),

    deletePushSubscription: protectedProcedure
        .input(z.object({
            id: z.string()
        }))
        .mutation(async ({ ctx, input }) => {
            await ctx.db.pushSubscription.delete({
                where: {
                    id: input.id,
                },
            });
        }),

    setPushAnnouncements: protectedProcedure
        .input(z.object({value: z.boolean()}))
        .mutation(async ({ ctx, input }) => {
            let account = await ctx.db.account.findFirstOrThrow({
                where: {
                    id: ctx.session.id,
                },
            });

            await ctx.db.account.update({
                where: {
                    id: account.id,
                },
                data: {
                    pushAnnouncements: input.value,
                },
            });
        }),


    testPushSubscription: protectedProcedure
        .mutation(async ({ ctx }) => {
            let account = await ctx.db.account.findFirstOrThrow({
                where: {
                    id: ctx.session.id,
                },
            });

            const subscriptions = await ctx.db.pushSubscription.findMany({
                where: {
                    accountId: account.id,
                },
            });

            for (const subscription of subscriptions) {
                const payload = JSON.stringify({
                    title: 'WebPush Notification!',
                    body: 'Hello World',
                    tag: 'test',
                })
                const subscriptionData: PushSubscription = {
                    endpoint: subscription.endpoint,
                    keys: {
                        auth: subscription.auth,
                        p256dh: subscription.p256dh,
                    },
                }
                webpush.sendNotification(subscriptionData, payload)
            }

        }),

    getCustomTheme: publicProcedure
        .query(async ({ ctx }) => {

            if (!ctx.session) {
                return {};
            }

            let account = await ctx.db.account.findFirstOrThrow({
                where: {
                    id: ctx.session.id
                }
            });

            return account.theme;
        }),

    updateCustomTheme: protectedProcedure
        .input(z.object({
            theme: z.string()
        }))
        .mutation(async ({ ctx, input }) => {
            let account = await ctx.db.account.findFirstOrThrow({
                where: {
                    id: ctx.session.id
                }
            });

            let prevTheme = account.theme;
            let newTheme = JSON.parse(input.theme)

            await ctx.db.account.update({
                where: {
                    id: ctx.session.id
                },
                data: {
                    theme: newTheme
                }
            })
        }),
});
