export default function ToolTip({ children, tooltip }: { children: React.ReactNode, tooltip: string }) {
    return (
        <span className="tooltip" data-tip={tooltip ? tooltip.replaceAll("_", " ") : ""}>
            <span>{children}</span>
        </span>
    )
}