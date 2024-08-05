import React from 'react'

const Sidebar = ({channelAccounts}: {channelAccounts: any}) => {
    
    return (
        <div className="p-1 w-[300px]">
            {channelAccounts.map((channelAccount: { identifier: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; character: { name: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined } }) => {
                return <div>
                    {channelAccount.identifier} - {channelAccount.character.name}
                </div>
            })}
        </div>
    )
}

export default Sidebar