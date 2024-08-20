"use client";

import { env } from "@/env";
import { api } from "@/trpc/react";
import { Account } from "@prisma/client";
import React from "react";
import { ChangeEvent, useState } from "react";


const NotificationSettings = ({ account }: { account: Account }) => {
    const [isMounted, setIsMounted] = useState(false);
    const [pushAnnouncements, setPushAnnouncements] = useState(account.pushAnnouncements);
    const [isPushCheckboxDisabled, setIsPushCheckboxDisabled] = useState(false);
    const inputRef = React.useRef<HTMLInputElement>(null);

    const utils = api.useUtils();

    const setPushMutation = api.account.setPushAnnouncements.useMutation({
        onSuccess: async () => {
            setPushAnnouncements(!pushAnnouncements);
            setIsPushCheckboxDisabled(false);
        },
        onMutate: async () => {
            setIsPushCheckboxDisabled(true);
        }
    });

    function handleTogglePush(e: ChangeEvent<HTMLInputElement>) {
        setPushMutation.mutate({ value: e.target.checked });
    }





    return (
        <div className="form-control">
            <label className="label cursor-pointer">
                <span className="label-text">Site Announcements?</span>
                <input type="checkbox"
                    ref={inputRef}
                    className="checkbox"
                    id="pushAnnouncements"
                    name="pushAnnouncements"
                    onChange={handleTogglePush}
                    disabled={isPushCheckboxDisabled}
                    checked={pushAnnouncements} />

            </label>
        </div>
    )
}

export default NotificationSettings;