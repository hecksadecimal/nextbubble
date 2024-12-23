'use client';
import { UIEvent, UIEventHandler, useEffect, useRef, useState } from "react"
import { faker } from "@faker-js/faker";
import { StickToBottom, useStickToBottom, useStickToBottomContext } from 'use-stick-to-bottom';
import ChatForm from "@/app/_components/client/ChatForm"
import Message, { MessageSchema } from "@/app/_components/shared/Message"
import { Character, characters } from "@/lib/shared/homestuck";
import MessageList from "@/app/_components/client/MessageList"
import { useParams } from "next/navigation";
import { DBBCode } from "@/app/_components/shared/DBBCode";

export default function Page({
  params,
}: {
  params: { chatUrl: string }
}) {
  const chatUrl = 'test'

  const [messages, setMessages] = useState<MessageSchema[]>([])
  const [chatTheme, setChatTheme] = useState('default')
  const [character, setCharacter] = useState<Character | undefined>(undefined)
  const { scrollRef, contentRef } = useStickToBottom();

  useEffect(() => {
    const eventSource = new EventSource(`/api/chat/${chatUrl}/stream`)
    setCharacter(characters['dave'])
    eventSource.addEventListener('message', (event) => {
      const data = JSON.parse(event.data) as MessageSchema
      setMessages((prev) => [
        ...prev,
        data
      ])
    })

    return () => {
      eventSource.close()
    }
  }, [])

  


  return (
    <div className="h-screen grow grid overflow-y-hidden overscroll-none gap-2 grid-cols-12 grid-rows-12 -m-2 p-2 bg-base-300">
      <div ref={scrollRef} className="rounded-box text-pretty overscroll-contain min-h-0 min-w-0 h-[calc(100vh-80px)] overflow-y-scroll col-span-10 bg-base-100">
        <table className="w-full table-auto border-collapse border-spacing-0">
          <MessageList theme={chatTheme} ref={contentRef}>
            {messages.map((message) => (
              <Message key={message.id} id={message.id} color={message.user.color} counter={message.user.counter}>
                {message.user.character.acronym &&
                  `${message.user.character.acronym}: `
                }
                <DBBCode quirk={message.user.character.quirk}>
                  {`${message.user.character.quirk.prefix} `}
                </DBBCode>
                <DBBCode quirk={message.user.character.quirk}>
                  {message.content}
                </DBBCode>
                <DBBCode quirk={message.user.character.quirk}>
                {` ${message.user.character.quirk.suffix}`}
                </DBBCode>
              </Message>
            ))}
          </MessageList>
        </table>
      </div>
      <div className="fixed bottom-1 left-0 w-[calc(100vw)] px-1 py-0">
        <ChatForm character={character} />
      </div>
      <div className="rounded-box col-span-2 h-[calc(100vh-80px)] bg-base-100">
        <div className="dropdown mb-72">
          <div tabIndex={0} role="button" className="btn m-1">
            Theme
            <svg
              width="12px"
              height="12px"
              className="inline-block h-2 w-2 fill-current opacity-60"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 2048 2048">
              <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
            </svg>
          </div>
          <ul tabIndex={0} className="dropdown-content bg-base-300 rounded-box z-[1] w-52 p-2 shadow-2xl">
            <li>
              <input
                type="radio"
                name="theme-dropdown"
                className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
                aria-label="Default"
                value="default" 
                onChange={(e) => {
                  if (e.target.checked) {
                    setChatTheme(e.target.value)
                  }
                }} />
            </li>
            <li>
              <input
                type="radio"
                name="theme-dropdown"
                className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
                aria-label="Retro"
                value="retro"
                onChange={(e) => {
                  if (e.target.checked) {
                    setChatTheme(e.target.value)
                  }
                }} />
            </li>
            <li>
              <input
                type="radio"
                name="theme-dropdown"
                className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
                aria-label="Cyberpunk"
                value="cyberpunk"
                onChange={(e) => {
                  if (e.target.checked) {
                    setChatTheme(e.target.value)
                  }
                }} />
            </li>
            <li>
              <input
                type="radio"
                name="theme-dropdown"
                className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
                aria-label="Valentine"
                value="valentine"
                onChange={(e) => {
                  if (e.target.checked) {
                    setChatTheme(e.target.value)
                  }
                }} />
            </li>
            <li>
              <input
                type="radio"
                name="theme-dropdown"
                className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
                aria-label="Aqua"
                value="aqua"
                onChange={(e) => {
                  if (e.target.checked) {
                    setChatTheme(e.target.value)
                  }
                }} />
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}