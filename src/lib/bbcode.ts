import bbcode from "ya-bbcode";
 
export const parser = new bbcode();

export const colorBlacklist = [
    "white",
    "black",
    "#000",
    "#000000",
    "#fff",
    "#ffffff"
]

parser.clearTags();

parser.registerTag('url', {
    type: 'replace',
    open: (attr) => {
		return `<a href="${attr || '#'}" target="_blank">`;
	},
	close: '</a>'
})

parser.registerTag('email', {
    type: 'replace',
    open: (attr) => {
		return `<a href="mailto:${attr || '#'}" target="_blank">`;
	},
	close: '</a>'
})

parser.registerTag('color', {
    type: 'replace',
    open: (attr) => {
        if (colorBlacklist.includes(attr) || attr == "") {
            return `<span class="[overflow-wrap:anywhere] w-full max-w-full">`
        } else {
            return `<span class="[overflow-wrap:anywhere] w-full max-w-full inline-block" style="color: ${(attr || "#000000").startsWith("--") ? `var(--fallback-${attr.replace("--", "")},oklch(var(${attr})/var(--tw-text-opacity)))` : (attr || "#000000")};">`
        }
        
    },
    close: () => '</span>',
});

parser.registerTag('pad', {
    type: 'content',
    replace: (attr, content) => `<span class="padded">${content}</span>`,
})

parser.registerTag('rainbow', {
    type: 'content',
    replace: (attr, content) => `<span class="rainbow">${content}</span>`,
})

parser.registerTag('spoiler', {
    type: 'content',
    replace: (attr, content) => `<span class="spoil"><span class="spoiler transition-opacity duration-200 delay-100 hover:delay-500 opacity-0 hover:opacity-100">${content}</span></span>`,
})

parser.registerTag('b', {
    type: 'content',
    replace: (attr, content) => `<b>${content}</b>`,
})

parser.registerTag('i', {
    type: 'content',
    replace: (attr, content) => `<i>${content}</i>`,
})

parser.registerTag('u', {
    type: 'content',
    replace: (attr, content) => `<u>${content}</u>`,
})

parser.registerTag('s', {
    type: 'content',
    replace: (attr, content) => `<s>${content}</s>`,
})

parser.registerTag('sub', {
    type: 'content',
    replace: (attr, content) => `<sub>${content}</sub>`,
})

parser.registerTag('sup', {
    type: 'content',
    replace: (attr, content) => `<sup>${content}</sup>`,
})
