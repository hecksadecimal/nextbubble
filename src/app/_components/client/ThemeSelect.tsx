"use client";
import { useEffect } from 'react'
import { themeChange } from 'theme-change'
import { themes } from '@/lib/shared/themes'

export default function ThemeSelect({themeChanged}: {themeChanged?: (theme: string) => void}) {
    useEffect(() => {
        themeChange(false)
        if (themeChanged) {
            if (window.localStorage) {
                themeChanged(window.localStorage.getItem('theme') ?? "default")
            } 
        }
    }, [])

    const themeList = themes.map((theme) => {
        if (typeof theme === 'string') {
            return theme
        }
        return Object.keys(theme)
    }).flat()

    // themes is an array of themes that could either be a string or a dict of themes who's keys are the theme names
    return (
        <div title="Change Theme" className="dropdown dropdown-end [@supports(color:oklch(0%_0_0))]:block">
            <div tabIndex={0} role="button" className="btn btn-ghost" >
                <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="h-5 w-5 stroke-current md:hidden"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"></path></svg>
                <span className="hidden font-normal md:inline">Theme</span>
                <svg width="12px" height="12px" className="hidden h-2 w-2 fill-current opacity-60 sm:inline-block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048"><path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path></svg>
            </div>
            <div tabIndex={0} >
                <div className="dropdown-content bg-base-200 text-base-content rounded-box top-px h-[28.6rem] max-h-[calc(100vh-10rem)] w-56 overflow-y-auto border border-white/5 shadow-2xl outline outline-1 outline-black/5 mt-16">
                    <div className="grid grid-cols-1 gap-3 p-3">
                        {themeList.map((value) => {
                            return (
                                <button key={value} className="outline-base-content text-start outline-offset-4" data-act-class="[&amp;_svg]:visible" data-set-theme={value}>
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
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}