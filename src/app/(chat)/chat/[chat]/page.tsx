import Link from "next/link";

import { api, HydrateClient } from "@/trpc/server";
import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/server/db";
import { MessageType } from "@prisma/client";
import { ChannelInput } from "@/app/_components/client/ChannelInput";
import Messages from "./Messages";
import Sidebar from "./Sidebar";
import { UserButton } from "@clerk/nextjs";
import ClientUserButton from "./ClientUserButton";
import ThemeSwitch from "@/app/_components/client/ThemeSwitch";
import { Quirk } from "@/lib/quirk";
import { ChannelSettings } from "@/app/_components/client/ChannelSettings";

export default async function Page({ params }: { params: { chat: string } }) {
    let session = await currentUser();
    session = session!;

    let systemDefaultCharacter = await db.character.findFirstOrThrow({
        where: {
            system: true,
            name: "Anonymous"
        }
    })

    const account = await db.account.upsert({
        where: { id: session.id },
        update: { id: session.id },
        create: {
            id: session.id,
            defaultCharacterId: systemDefaultCharacter.id
        }
    })

    var channel = await api.channel.get({ channel: params.chat })

    if (!channel) {
        channel = await api.channel.create({ channel: params.chat })
        await db.message.create({
            data: {
                content: `==> SYSTEM created channel '${params.chat}'`,
                channelId: channel.id
            }
        })
    }

    var channelAccount = await api.channelAccount.get({
        channel: params.chat
    })

    if (!channelAccount) {
        let latestChatAccount = await db.channelAccount.findFirst({
            where: { channelId: params.chat },
            orderBy: { identifier: "desc" },
            take: 1
        })

        let systemDefaultCharacter = await db.character.findFirstOrThrow({
            where: {
                system: true,
                name: "Anonymous"
            }
        })

        channelAccount = await db.channelAccount.create({
            data: {
                channelId: params.chat,
                accountId: session.id,
                characterId: account.defaultCharacterId ? account.defaultCharacterId : systemDefaultCharacter.id,
                identifier: latestChatAccount ? latestChatAccount.identifier + 1 : 0
            }
        })

        channelAccount = await api.channelAccount.get({
            channel: params.chat
        })
        channelAccount = channelAccount!;
    }

    const quirk: Quirk = {
        acronym: channelAccount.acronym ?? undefined,
        color: channelAccount.color ?? undefined,
        prefix: channelAccount.prefix ?? undefined,
        suffix: channelAccount.suffix ?? undefined,
        replacements: channelAccount.replacements as [[string, string]] ?? undefined
    }

    var allChannelAccounts = await db.channelAccount.findMany({
        where: { channelId: params.chat },
        include: {
            character: true
        }
    })


    const messages = await api.message.getLastFifty({ channel: params.chat });

    return (
        <main className="flex flex-row w-full max-w-screen max-h-screen overflow-x-hidden">
            <nav className="md:hidden bg-base-300 text-base-content fixed top-0 w-full">
                <ChannelSettings id="mobileChatSettings" label="⚙️" channel={params.chat} channelAccount={channelAccount} />
            </nav>
            <div className="grow">
                <div className="flex bg-base-300/50 bg-theme-transparent gap-2">
                    <div className="flex-grow text-base-content h-screen w-screen p-2 md:pr-80 rounded-box">
                        <Messages messages={messages} channel={params.chat} channelAccount={channelAccount} />
                    </div>
                    <div className="w-80 bg-base-300/50 text-base-content p-2 hidden md:block md:-ml-80">
                        <div className="h-full overflow-y-auto max-h-screen">
                            <ChannelSettings id="desktopChatSettings" label="Settings" channel={params.chat} channelAccount={channelAccount} />
                            <div className="text-xl font-extrabold p-3">{params.chat}</div>
                            <div className="text-lg font-semibol p-3">Active Users</div>
                            <Sidebar channelAccounts={allChannelAccounts} />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}