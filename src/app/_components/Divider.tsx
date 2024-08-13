export const Divider = ({title}: {title: string}) => {
    return (
        <div className="relative flex py-5 items-center">
            <div className="flex-grow border-t border-base-content"></div>
            <span className="flex-shrink mx-4 text-base-content">{title}</span>
            <div className="flex-grow border-t border-base-content"></div>
        </div>
    )
}