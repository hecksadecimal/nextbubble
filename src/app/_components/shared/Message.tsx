import { Character } from "@/lib/shared/homestuck";

export type MessageSchema = {
    id: number;
    content: string;
    user: {
        id: number;
        name: string;
        color: string;
        character: Character;
    };
};

export default function Message({ children, id, color }: { children: React.ReactNode, id: number, color: string }) {
    return (
        <tr key={id} id={`message_` + id} className="even:bg-base-200 text-start align-top">
            <td className="px-1 -mt-2 text-end align-top border-r-2 border-base-200 text-nowrap">{id}</td>
            <td style={{color: "#" + color}} className="pl-1 bg-base-100 transition-all duration-1000">
                {children}
            </td>
        </tr>
    )
}

