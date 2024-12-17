"use client";
import { useEffect } from 'react'
import { themeChange } from 'theme-change'
import { themes } from '@/lib/shared/themes'

export default function ThemeSelect() {
    useEffect(() => {
        themeChange(false)
    }, [])

    /* old implementation
            <select data-choose-theme>
            {themes.map((theme) => {
                if (typeof theme === 'string') {
                    return <option key={theme} value={theme}>{theme}</option>
                }
                return Object.keys(theme).map((themeName) => {
                    return <option key={themeName} value={themeName}>{themeName}</option>
                })
            })}
        </select>
    */

    const themeList = themes.map((theme) => {
        if (typeof theme === 'string') {
            return theme
        }
        return Object.keys(theme)
    }).flat()

    // themes is an array of themes that could either be a string or a dict of themes who's keys are the theme names
    return (
        <div tabIndex={0} >
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
    )
}