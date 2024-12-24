"use client";
import { useRef, useState } from "react";

export default function Countdown({ date }: { date: string }) {
    console.log(date)
    const [days, setDays] = useState(0);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);

    let intDate = 0
    try {
        intDate = parseInt(date)
    } catch {
        intDate = 0
    }
    const countdownDate = new Date(intDate * 1000).getTime();
    console.log(countdownDate)

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = countdownDate - now;

        setDays(Math.floor(distance / (1000 * 60 * 60 * 24)));
        setHours(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
        setMinutes(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)));
        setSeconds(Math.floor((distance % (1000 * 60)) / 1000));
    }

    setInterval(updateCountdown, 1000);

    return (
        <div className="grid auto-cols-max grid-flow-col gap-5 text-center">
            <div className="flex flex-col">
                <span className="countdown font-mono text-5xl">
                <span style={{'--value': days} as React.CSSProperties}></span>
                </span>
                days
            </div>
            <div className="flex flex-col">
                <span className="countdown font-mono text-5xl">
                <span style={{'--value': hours} as React.CSSProperties}></span>
                </span>
                hours
            </div>
            <div className="flex flex-col">
                <span className="countdown font-mono text-5xl">
                <span style={{'--value': minutes} as React.CSSProperties}></span>
                </span>
                min
            </div>
            <div className="flex flex-col">
                <span className="countdown font-mono text-5xl">
                <span style={{'--value': seconds} as React.CSSProperties}></span>
                </span>
                sec
            </div>
        </div>
    );
}