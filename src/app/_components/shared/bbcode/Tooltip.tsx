export default function ToolTip({ children, tooltip }: { children: React.ReactNode, tooltip: string }) {
    return (
        <span className="tooltip" data-tip={tooltip.slice(1, tooltip.length-1).replaceAll("_", " ")}>
            <span>{children}</span>
        </span>
    )
}