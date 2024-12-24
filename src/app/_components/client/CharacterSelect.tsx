import logout from "@/app/_actions/logout";
import { Character } from "@/lib/shared/homestuck";
import { characters } from "@/lib/shared/homestuck";

export default function CharacterSelect({ character, characterKey, setCharacter }: { character?: Character, characterKey?: string, setCharacter: (character: string) => void }) {
    const keys = Object.keys(characters);
    return (
        <select className="select select-bordered select-xs w-full max-w-xs" value={characterKey} onChange={(e) => setCharacter(e.target.value)}>
            {keys.map((key, value) => (
                <option disabled={key == characterKey} key={key} value={key}>{characters[key].name}</option>
            ))}
        </select>
    )
}