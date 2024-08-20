"use client";

import { env } from "@/env";
import { api } from "@/trpc/react";
import { useEffect, useState } from "react";

import sha1 from "simple-sha1";


const Notifications = () => {
    const addSubscriptionMutation = api.account.addPushSubscription.useMutation({
        onSuccess: async () => {
            await utils.account.getSubscriptions.invalidate();
        },
    });
    const deleteSubscriptionMutation = api.account.deletePushSubscription.useMutation({
        onSuccess: async () => {
            await utils.account.getSubscriptions.invalidate();
        },
    });
    const testSubscriptionMutation = api.account.testPushSubscription.useMutation();

    const utils = api.useUtils();
    const [cookies, setCookies] = useState<any>();
    const [identifier, setIdentifier] = useState("");
    const subscriptions = api.account.getSubscriptions.useQuery().data;


    const notificationsSupported = () =>
        'Notification' in window &&
        'serviceWorker' in navigator &&
        'PushManager' in window

    const saveSubscription = async (subscription: PushSubscription) => {
        console.log(subscription.expirationTime)
        const subJson = subscription.toJSON()
        const sub = {
            endpoint: subJson.endpoint ?? "",
            keys: {
                auth: subJson.keys?.auth ?? "",
                p256dh: subJson.keys?.p256dh ?? "",
            },
        }
        addSubscriptionMutation.mutate({ subscription: sub, identifier: cookies['__clerk_db_jwt'] })
    }

    const testSubscription = async () => {
        testSubscriptionMutation.mutate();
    }

    const unregisterServiceWorkers = async () => {
        const registrations = await navigator.serviceWorker.getRegistrations()
        await Promise.all(registrations.map((r) => r.unregister()))
    }

    const subscribe = async () => {
        await unregisterServiceWorkers()

        const swRegistration = await registerServiceWorker()
        await window?.Notification.requestPermission()

        try {
            const options = {
                applicationServerKey: env.NEXT_PUBLIC_VAPID_PUBLISHABLE_KEY,
                userVisibleOnly: true,
            }
            const subscription = await swRegistration.pushManager.subscribe(options)

            await saveSubscription(subscription)

            console.log({ subscription })
        } catch (err) {
            console.error('Error', err)
        }
    }

    const unsubscribe = async (id: string) => {
        deleteSubscriptionMutation.mutate({ id })
    }

    const registerServiceWorker = async () => {
        return navigator.serviceWorker.register('/service.js')
    }

    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        let cookies = Object.fromEntries(document.cookie.split('; ').map(c => c.split('=')))
        setCookies(cookies)
        setIdentifier(sha1.sync(cookies['__clerk_db_jwt']))
    }, []);

    if (!isMounted) {
        return null;
    }

    if (!notificationsSupported()) {
        return <h3>Please install the PWA first!</h3>
    }

    return (
        <>
            <h3>WebPush PWA</h3>
            <button className="btn btn-primary" onClick={subscribe}>Enable Push Notifications</button>
            <button className="btn btn-primary" onClick={testSubscription}>Test Push Notifications</button>
            <hr />
            {subscriptions?.map((sub) => {
                const id = sha1.sync(sub.identifier)
                return (
                    <div key={id} className="flex justify-between items-center p-2 bg-base-200 rounded-box">
                        <span>{id}{identifier == id ? <b> *THIS BROWSER*</b> : ""}</span>
                        <button onClick={() => {unsubscribe(sub.id)}} className="btn btn-ghost">Delete</button>
                    </div>
                );

            })}
        </>
    )
}

export default Notifications;