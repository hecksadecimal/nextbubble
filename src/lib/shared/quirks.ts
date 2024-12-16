"use strict";
import XRegExp from "xregexp";

export interface Quirk {
    case: "normal" | "lower" | "upper" | "title" | "inverted" | "alternating" | "alt-lines" | "proper" | "first-caps";
    replacements: [string, string][];
    prefix: string;
    suffix: string;
}

export function quirkText(text: string, quirk: Quirk): string {
    // Function to apply transformations to the text
    const applyTransformations = (text: string): string => {
        let transformedText = text;

        // Apply case transformation
        switch (quirk.case) {
            case "lower":
                transformedText = transformedText.toLowerCase();
                break;
            case "upper":
                transformedText = transformedText.toUpperCase();
                break;
            case "title":
                transformedText = transformedText.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
                break;
            case "inverted":
                transformedText = transformedText.split('').map(char => char === char.toLowerCase() ? char.toUpperCase() : char.toLowerCase()).join('');
                break;
            case "alternating":
                transformedText = transformedText.split('').map((char, index) => index % 2 === 0 ? char.toLowerCase() : char.toUpperCase()).join('');
                break;
            case "alt-lines":
                transformedText = transformedText.split('\n').map((line, index) => index % 2 === 0 ? line.toLowerCase() : line.toUpperCase()).join('\n');
                break;
        }

        // Apply replacements. could either be a regex string or a normal string
        // Regex strings will begin with a '/' and end with a '/'
        // Normal strings will be replaced without regex
        quirk.replacements.forEach(([search, replace]) => {
            if (search.startsWith('/') && search.endsWith('/')) {
                transformedText = transformedText.replace(new RegExp(search.slice(1, -1), 'g'), replace);
            } else {
                transformedText = transformedText.split(search).join(replace);
            }
        });

        return transformedText;
    }; 

    // Apply the transformation
    const result = applyTransformations(text);

    return result;
}

