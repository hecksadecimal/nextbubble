export default function Bubble({ children, right }: { children: React.ReactNode, right?: boolean }) {
    const direction = right ? "chat-end" : "chat-start";
    return (
        <div className={`chat ${direction}`}>
            <div className="chat-bubble chat-bubble-base-300">
                {children}
            </div>
        </div>
    )
}