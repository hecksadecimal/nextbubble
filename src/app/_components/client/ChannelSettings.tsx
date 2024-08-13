"use client";
import { ChannelAccount } from "@prisma/client";
import { useState } from "react";

import { api } from "@/trpc/react";
import ThemeSwitch from "./ThemeSwitch";
import { Divider } from "../Divider";

export function ChannelSettings({ channel, channelAccount }: { channel: string, channelAccount: ChannelAccount }) {

    let [name, setName] = useState(channelAccount.name ?? "")
    let [acronym, setAcronym] = useState(channelAccount.acronym ?? "")
    let [color, setColor] = useState(channelAccount.color ?? "")
    let [prefix, setPrefix] = useState(channelAccount.prefix ?? "")
    let [suffix, setSuffix] = useState(channelAccount.suffix ?? "")

    const utils = api.useUtils();

    const mutateChannelAccount = api.channelAccount.updateCharacter.useMutation({
        onSuccess: async () => {
          await utils.channelAccount.get.invalidate({
            channel
          });
        },
    });

    function onclick() {
        // @ts-expect-error
        document.getElementById('chatSettingsModal')?.showModal()
    }

    return (
        <>
            <button className="btn" onClick={onclick}>Settings</button>
            <dialog id="chatSettingsModal" className="modal">
                <div className="modal-box bg-base-200 flex flex-col gap-4">
                    <h3 className="font-bold text-lg">Settings</h3>
                    <ThemeSwitch />
                    <Divider title="Basic" />
                    <form className="flex flex-col gap-4"
                        onSubmit={(e) => {
                            e.preventDefault();
                            mutateChannelAccount.mutate({
                                channelId: channel, 
                                name,
                                acronym,
                                color,
                                prefix,
                                suffix
                            });
                        }}
                    >
                        <label className="input input-bordered rounded-box flex items-center gap-2 bg-base-300">
                            <input type="text" name="name" className="grow border-0 border-transparent focus:border-transparent focus:ring-0" placeholder="Anonymous" onChange={e => setName(e.target.value)} value={name} />
                            Name
                        </label>
                        <label className="input input-bordered rounded-box flex items-center gap-2 bg-base-300">
                            <input type="text" name="acronym" className="grow border-0 border-transparent focus:border-transparent focus:ring-0" placeholder="??" onChange={e => setAcronym(e.target.value)} value={acronym} />
                            Acronym
                        </label>
                        <label className="input input-bordered rounded-box flex items-center gap-2 pl-0 bg-base-300">
                            <input type="color" name="color" className="grow cursor-pointer h-full -pt-2 -pb-2 border-transparent overflow-clip rounded-bl-box rounded-tl-box outline-none border-none ring-0 disabled:opacity-50 disabled:pointer-events-none" onChange={e => setColor(e.target.value)} value={color} title="Choose your color" />
                            Color
                        </label>
                        <Divider title="Quirks" />
                        <label className="input input-bordered rounded-box flex items-center gap-2 bg-base-300">
                            <input type="text" name="prefix" className="grow border-0 border-transparent focus:border-transparent focus:ring-0" placeholder="" onChange={e => setPrefix(e.target.value)} value={prefix} />
                            Prefix
                        </label>
                        <label className="input input-bordered rounded-box flex items-center gap-2 bg-base-300">
                            <input type="text" name="suffix" className="grow border-0 border-transparent focus:border-transparent focus:ring-0" placeholder="" onChange={e => setSuffix(e.target.value)} value={suffix} />
                            Suffix
                        </label>
                        <button type="submit" className="btn btn-primary">Save</button>
                    </form>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </>
    )
}