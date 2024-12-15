import ChatForm from "@/app/_components/client/ChatForm"
import MessageList from "@/app/_components/client/MessageList"

export default async function Page({
  params,
}: {
  params: Promise<{ chatUrl: string }>
}) {
  const chatUrl = (await params).chatUrl

  const dummyData = []
  for (let i = 0; i <= 100; i++) {
    dummyData.push({
      id: i,
      content: `Message ${i} in ${chatUrl} chat room from User ${i} at ${new Date().toISOString()}`,
      user: {
        id: i,
        name: `User ${i}`,
        color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
      },
    })
  }

  return (
    <div className="h-screen grow grid overflow-y-hidden overscroll-none gap-2 grid-cols-12 grid-rows-12 -m-2 p-2 bg-base-300" data-theme="dark">
      <div className="rounded-box text-pretty overscroll-contain min-h-0 min-w-0 h-[calc(100vh-80px)] overflow-y-scroll col-span-10 bg-base-100">
        <table className="w-full h-full table-auto border-collapse border-spacing-0">
          <MessageList messages={dummyData} />
        </table>
      </div>
      <div className="fixed bottom-1 left-0 w-[calc(100vw)] px-1 py-0">
        <ChatForm />
      </div>
      <div className="rounded-box col-span-2 h-[calc(100vh-80px)] bg-base-200">
        Sidebar
      </div>
    </div>
  )
}