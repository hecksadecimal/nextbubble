'use client';
import chroma from "chroma-js"
import { RefObject, useRef } from 'react';

// Connects to data-controller="colouradjust"

declare global {
    interface HTMLElement {
        originalcolor: string;
        computeColours: () => void;
        resetColours: (el: HTMLElement) => void;
        saveColours: () => void;
    }
}

function delay(duration: number) {
    return new Promise((resolve) => {
        setTimeout(resolve, duration);
    });
}

function cssColorToRGBA(val: string) {
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = 1;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) {
        throw new Error("Could not get canvas context");
    }
    ctx.fillStyle = val;
    ctx.fillRect(0, 0, 1, 1);
    return ctx.getImageData(0, 0, 1, 1).data;
}

function getInheritedTextColor(el: HTMLElement) {
    var defaultStyle = getDefaultTextColor()
    var color = window.getComputedStyle(el).color
    if (color != defaultStyle) return color
    if (!el.parentElement) return defaultStyle
    return getInheritedTextColor(el.parentElement)
}

function getInheritedBackgroundColor(el: HTMLElement) {
    var defaultStyle = getDefaultBackground()
    var backgroundColor = window.getComputedStyle(el).backgroundColor
    if (backgroundColor != defaultStyle) return backgroundColor
    if (!el.parentElement) return defaultStyle
    return getInheritedBackgroundColor(el.parentElement)
}


function getDefaultTextColor() {
    var div = document.createElement("div")
    document.head.appendChild(div)
    var bg = window.getComputedStyle(div).color
    document.head.removeChild(div)
    return bg
}

function getDefaultBackground() {
    var div = document.createElement("div")
    document.head.appendChild(div)
    var bg = window.getComputedStyle(div).backgroundColor
    document.head.removeChild(div)
    return bg
}

export function resetAllColours(el: HTMLElement) {
    let elems = el.querySelectorAll("*")
    for (let el of elems) {
        resetColours(el as HTMLElement)
    }
}

export function resetColours(el: HTMLElement) {
    if (el.originalcolor) {
        if (el.style.color === el.originalcolor) {
            return
        }
        el.style.color = el.originalcolor
    } else {
        el.style.color = ""
    }
}

export function recompute(el: HTMLElement) {
    el.computeColours()
}

export function resetAndRecompute(el: HTMLElement, delay: number) {
    resetAllColours(el)
    window.setTimeout(() => {
        el.computeColours()
    }, delay)
}

export function setup(element: HTMLElement, slider?: HTMLInputElement) {
    var target = element

    let options = {
        childList: false,
        attributes: true,
        characterData: false,
        subtree: false,
        attributeFilter: ['data-theme'],
        attributeOldValue: false,
        characterDataOldValue: false
    };

    let observer = new MutationObserver(callback);
    let contrastSlider = slider

    element.saveColours = () => saveColours(element)
    element.computeColours = () => computeColours(element)

    if (contrastSlider) {
        console.log("colouradjust: Attaching to slider")
        contrastSlider.addEventListener("change", () => {
            console.log("triggering refresh")
            target.computeColours()
        })
    }

    function callback(mutations: MutationRecord[]) {
        window.setTimeout(() => {
            target.computeColours()
        }, 250)
    }

    window.setTimeout(() => {
        target.saveColours()
        target.computeColours()
    }, 250)

    observer.observe(document.documentElement, options);
}

function saveColours(el: HTMLElement) {
    let elems = el.querySelectorAll("*")
    for (let el of elems) {
        const elem = el as HTMLElement
        if (elem.style.color) {
            if (!elem.originalcolor) {
                elem.originalcolor = elem.style.color
            }
        }
    }
}

function computeColours(el: HTMLElement) {
    var minContrast = 1.5
    if (window.localStorage) {
        var val = window.localStorage.getItem("minimum_contrast")
        var floatVal = minContrast
        if (val != null) {
            floatVal = parseFloat(val)
            minContrast = floatVal
        }
    }
    //this.resetColours()
    let elems = el.querySelectorAll("*")

    let bgColor = cssColorToRGBA(getInheritedBackgroundColor(el))
    let bgCh = chroma.rgb(bgColor[0], bgColor[1], bgColor[2], bgColor[3])

    for (let el of elems) {
        let elRef = el as HTMLElement
        if (el.classList.contains("spoiler")) {
            continue
        }
        Promise.resolve()
            .then(() => resetColours(elRef))
            .then(() => delay(500))
            .then(() => {
                let color = cssColorToRGBA(getInheritedTextColor(elRef))
                let ch = chroma.rgb(color[0], color[1], color[2], color[3])
                let storageKey = `${bgCh.hex()}_${ch.hex()}_${minContrast}`

                if (window.localStorage) {
                    let val = window.localStorage.getItem(storageKey)
                    if (window.localStorage.getItem(storageKey) !== null) {
                        elRef.style.color = chroma(floatVal).hex()
                        return
                    }
                }

                let contrast = chroma.contrast(ch, bgCh)
                if (contrast < minContrast) {
                    let palette = chroma.scale(['black', ch.darken(3), ch, ch.brighten(3), 'white']).gamma(0.5).colors(100)
                    palette = palette.filter((v) => {
                        let cv = chroma(v)
                        return chroma.contrast(cv, bgCh) >= minContrast
                    }).sort((a, b) => {
                        let ca = chroma(a)
                        let cb = chroma(b)
                        let diff = chroma.deltaE(ca, ch) - chroma.deltaE(cb, ch)
                        return diff
                    })

                    if (palette.length) {
                        const palletItem = palette.shift()
                        if (palletItem) {
                            let newColour = chroma(palletItem).hex()
                            elRef.style.color = newColour
                            if (window.localStorage) {
                                window.localStorage.setItem(storageKey, newColour)
                            }
                        }
                    } else {
                        console.log("WARN: Colour correction failure")
                    }
                }
            });
    }
}

