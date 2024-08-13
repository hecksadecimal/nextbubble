"use client";

import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'

const ThemeSwitch = () => {
    const [mounted, setMounted] = useState(false)
    const { theme, setTheme } = useTheme()

    const themeList = [
        "msparp",
        "msdark",
        "light",
        "dark",
        "cupcake",
        "bumblebee",
        "emerald",
        "corporate",
        "synthwave",
        "retro",
        "cyberpunk",
        "valentine",
        "halloween",
        "garden",
        "forest",
        "aqua",
        "lofi",
        "pastel",
        "fantasy",
        "wireframe",
        "black",
        "luxury",
        "dracula",
        "cmyk",
        "autumn",
        "business",
        "acid",
        "lemonade",
        "night",
        "coffee",
        "winter",
        "dim",
        "nord",
        "sunset",
    ]

    // useEffect only runs on the client, so now we can safely show the UI
    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return null
    }

    return (
        <div title="Theme" className="dropdown dropdown-end hidden [@supports(color:oklch(0%_0_0))]:block ">
            <div tabIndex={0} role="button" className="btn btn-ghost p-0 w-full">
                <span className="bg-base-100 rounded-btn text-base-content block w-full cursor-pointer font-sans">
                    <span className="grid grid-cols-5 grid-rows-3">
                        <span className="col-span-5 row-span-3 row-start-1 flex items-center gap-2 px-4 py-3">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="invisible h-3 w-3 shrink-0">
                                <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"></path>
                            </svg>
                            <span className="flex-grow text-sm">Theme <svg width="12px" height="12px" className="hidden h-2 w-2 fill-current opacity-60 sm:inline-block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048">
                                <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
                            </svg> </span> <span className="flex h-full shrink-0 flex-wrap gap-1"><span className="bg-primary rounded-badge w-2"></span> <span className="bg-secondary rounded-badge w-2"></span> <span className="bg-accent rounded-badge w-2"></span> <span className="bg-neutral rounded-badge w-2"></span></span>
                        </span>
                    </span>
                </span>
            </div>
            <div tabIndex={0} className="dropdown-content bg-base-200 text-base-content rounded-box max-h-80 top-px h-[28.6rem] max-h-[calc(100vh-10rem)] w-56 overflow-y-auto border border-white/5 shadow-2xl outline outline-1 outline-black/5 mt-16">
                <div className="grid grid-cols-1 gap-3 p-3">
                    {themeList.map((value) => {
                        return <button key={value} className="outline-base-content text-start outline-offset-4" data-act-className="[&amp;_svg]:visible" data-set-theme={value} onClick={() => setTheme(value)}>
                            <span className="bg-base-100 rounded-btn text-base-content block w-full cursor-pointer font-sans" data-theme={value}>
                                <span className="grid grid-cols-5 grid-rows-3">
                                    <span className="col-span-5 row-span-3 row-start-1 flex items-center gap-2 px-4 py-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="invisible h-3 w-3 shrink-0">
                                            <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"></path>
                                        </svg>
                                        <span className="flex-grow text-sm">{value}</span> <span className="flex h-full shrink-0 flex-wrap gap-1"><span className="bg-primary rounded-badge w-2"></span> <span className="bg-secondary rounded-badge w-2"></span> <span className="bg-accent rounded-badge w-2"></span> <span className="bg-neutral rounded-badge w-2"></span></span>
                                    </span>
                                </span>
                            </span>
                        </button>
                    })}
                </div>
            </div>
        </div>
    )
}

export default ThemeSwitch