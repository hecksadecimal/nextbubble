import Link from "next/link";

import { api, HydrateClient } from "@/trpc/server";
import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/server/db";
import { MessageType } from "@prisma/client";
import { ChannelInput } from "@/app/_components/client/ChannelInput";
import Messages from "../Messages";
import Sidebar from "../Sidebar";
import { UserButton } from "@clerk/nextjs";
import ClientUserButton from "../ClientUserButton";

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
        where: {id: session.id},
        update: {id: session.id},
        create: {
            id: session.id,
            defaultCharacterId: systemDefaultCharacter.id
        }
    })
    
    var channel = await api.channel.get({channel: params.chat})

    if (!channel) {
        channel = await api.channel.create({channel: params.chat})
        await db.message.create({
            data: {
                content: `==> SYSTEM created channel '${params.chat}'`,
                channelId: channel.id
            }
        })
    }

    var channelAccount = await db.channelAccount.findFirst({
        where: {channelId: params.chat, accountId: session.id}
    })

    if (!channelAccount) {
        let latestChatAccount = await db.channelAccount.findFirst({
            where: {channelId: params.chat},
            orderBy: {identifier: "desc"},
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
    }

    var allChannelAccounts = await db.channelAccount.findMany({
        where: {channelId: params.chat},
        include: {
            character: true
        }
    })


    const messages = await api.message.getLastFifty({ channel: params.chat });

    return (
        <main className="flex flex-row w-full">
            <div className="grow">
                <div className="flex bg-base-100/50">
                    <div className="w-20 text-gray-500 h-screen flex flex-col items-center justify-between py-5">
                        <div className="">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                            </svg>
                        </div>
                        <div className="flex flex-col">
                        </div>
                        <div className="">
                            <ClientUserButton />
                        </div>   
                    </div>
                    <div className="w-80 bg-base-100/50 p-2 hidden md:block">
                        <div className="h-full overflow-y-auto">
                            <div className="text-xl font-extrabold p-3">{params.chat}</div>
                            <div className="text-lg font-semibol p-3">Active Users</div>
                            <Sidebar channelAccounts={allChannelAccounts}/>
                        </div>
                    </div>               
                    <div className="flex-grow  h-screen p-2 rounded-md">
                        <Messages messages={messages} channel={params.chat}/>
                    </div>
                </div>
            </div>
        </main>
    );
}