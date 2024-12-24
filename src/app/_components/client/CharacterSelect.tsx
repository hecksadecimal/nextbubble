import logout from "@/app/_actions/logout";
import { Character } from "@/lib/shared/homestuck";
import { characters } from "@/lib/shared/homestuck";

export default function CharacterSelect({ character, characterKey, setCharacter }: { character?: Character, characterKey?: string, setCharacter: (character: string) => void }) {
    const keys = Object.keys(characters);
    return (
        <select className="input input-sm" value={characterKey} onChange={(e) => setCharacter(e.target.value)}>
            {keys.map((key, value) => (
                <option key={key} value={key}>{characters[key].name}</option>
            ))}
        </select>
    )
}