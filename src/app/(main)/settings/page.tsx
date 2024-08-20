import Link from "next/link";

import { currentUser, auth } from "@clerk/nextjs/server";
import { db } from "@/server/db";
import ThemeSwitch from "@/app/_components/client/ThemeSwitch";
import Notifications from "@/app/_components/client/Notifications";
import { Divider } from "@/app/_components/Divider";
import NotificationSettings from "@/app/_components/client/NotificationSettings";

export default async function Settings() {

    if (!auth().userId) {
        auth().redirectToSignIn({ returnBackUrl: "/settings" });
    }

    const session = await currentUser();
    const account = await db.account.findFirstOrThrow({
        where: {
            id: session?.id,
        },
    });

    return (
        <main className="flex flex-col grow p-8">
            <div role="tablist" className="tabs tabs-lifted">
                <input type="radio" name="settings_tabs" role="tab" defaultChecked className="tab bg-base-200 checked:bg-none focus:ring-0 focus:ring-offset-0" aria-label="Tab 1" />
                <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box rounded-tl-none p-6">
                    <Notifications />
                    <Divider title="Global Push Settings" />
                    <NotificationSettings account={account} />
                </div>

                <input
                    type="radio"
                    name="settings_tabs"
                    role="tab"
                    className="tab bg-base-200 checked:bg-none focus:ring-0 focus:ring-offset-0"
                    aria-label="Tab 2"/>
                <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box rounded-tl-none p-6">
                    <ThemeSwitch className="bg-base-300 text-base-content rounded-box max-h-32 h-32 min-h-32 top-px w-full input-bordered overflow-y-auto border" />
                </div>

                <input type="radio" name="settings_tabs" role="tab" className="tab bg-base-200 checked:bg-none focus:ring-0 focus:ring-offset-0" aria-label="Tab 3" />
                <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box rounded-tl-none p-6">
                    Tab content 3
                </div>
            </div>
        </main>
    );
}
