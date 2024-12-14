import ChatForm from "@/app/_components/client/ChatForm"

export default async function Page({
    params,
  }: {
    params: Promise<{ chatUrl: string }>
  }) {
    const chatUrl = (await params).chatUrl
    return (
        <div className="withSidebar modPowers pwbPowers">
            <div id="conversation" className="bottom-20 right-56">
            </div>
            <div id="userList" className="sidebar bottom-20 block">
                <h1 id="chatName">{chatUrl}</h1>
                <div id="menu"></div>
                <p id="topic"></p>
                <h1 className="states">Online</h1>
                <ul id="online"></ul>
                <h1 className="states">Idle</h1>
                <ul id="idle"></ul>
            </div>
            <div id="settings" className="sidebar bottom-20">
            </div>
            <ChatForm />
        </div>
    )
  }