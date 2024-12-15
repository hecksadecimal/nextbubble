'use client';

export type MessageSchema = {
    id: number;
    content: string;
    user: {
        id: number;
        name: string;
        color: string;
    };
};

export default function Message({ message }: { message: MessageSchema }) {
    return (
        <tr key={message.id} className="even:bg-base-200">
            <td className="px-1 -mt-2 text-end align-top border-r-2 border-base-300 ">{message.user.id}</td>
            <td style={{color: message.user.color}} className="pl-1 bg-base-200">{message.content}</td>
        </tr>
    )
}

