"use client";
import { ChannelAccount } from "@prisma/client";
import { useState } from "react";

import { api } from "@/trpc/react";
import ThemeSwitch from "./ThemeSwitch";
import { Divider } from "../Divider";

export function ChannelSettings({ id, label, channel, channelAccount }: { id: string, label: string, channel: string, channelAccount: ChannelAccount }) {

    let [name, setName] = useState(channelAccount.name ?? "")
    let [acronym, setAcronym] = useState(channelAccount.acronym ?? "")
    let [color, setColor] = useState(channelAccount.color ?? "")
    let [prefix, setPrefix] = useState(channelAccount.prefix ?? "")
    let [suffix, setSuffix] = useState(channelAccount.suffix ?? "")
    let [replacements, setReplacements] = useState(JSON.stringify(channelAccount.replacements) ?? "[[]]")

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
        document.getElementById(`${id}Modal`)?.showModal()
    }

    return (
        <>
            <button className="btn" onClick={onclick}>{label}</button>
            <dialog id={`${id}Modal`} className="modal">
                <div className="modal-box bg-base-200 flex flex-col gap-4">
                    <div role="tablist" className="tabs tabs-lifted">
                        <input type="radio" name={`${id}ModalTabs`} role="tab" className="tab checked:bg-none focus:ring-0 focus:ring-offset-0" aria-label="Settings" defaultChecked />
                        <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box rounded-tl-none p-6">
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
                                        suffix,
                                        replacements: JSON.parse(replacements) as string[][]
                                    });
                                }}
                            >
                                <div>
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
                                </div>
                                <Divider title="Quirks" />
                                <div>
                                    <label className="input input-bordered rounded-box flex items-center gap-2 bg-base-300">
                                        <input type="text" name="prefix" className="grow border-0 border-transparent focus:border-transparent focus:ring-0" placeholder="" onChange={e => setPrefix(e.target.value)} value={prefix} />
                                        Prefix
                                    </label>
                                    <label className="input input-bordered rounded-box flex items-center gap-2 bg-base-300">
                                        <input type="text" name="suffix" className="grow border-0 border-transparent focus:border-transparent focus:ring-0" placeholder="" onChange={e => setSuffix(e.target.value)} value={suffix} />
                                        Suffix
                                    </label>
                                    <label className="input input-bordered rounded-box flex items-center gap-2 bg-base-300">
                                        <input type="text" name="replacements" className="grow border-0 border-transparent focus:border-transparent focus:ring-0" placeholder="" onChange={e => setReplacements(e.target.value)} value={replacements} />
                                        Replacements
                                    </label>
                                    <button type="submit" className="btn btn-primary">Save</button>
                                </div>

                            </form>
                        </div>

                        <input
                            type="radio"
                            name={`${id}ModalTabs`}
                            role="tab"
                            className="tab checked:bg-none focus:ring-0 focus:ring-offset-0"
                            aria-label="Visuals" />
                        <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box rounded-tl-none p-6">
                            <ThemeSwitch className="bg-base-300 text-base-content rounded-box max-h-32 h-32 min-h-32 top-px w-full input-bordered overflow-y-auto border" />
                        </div>
                    </div>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </>
    )
}