'use client';
import { UIEvent, UIEventHandler, useEffect, useRef, useState } from "react"
import { faker } from "@faker-js/faker";
import ChatForm from "@/app/_components/client/ChatForm"
import Message, { MessageSchema } from "@/app/_components/shared/Message"
import { characters } from "@/lib/shared/homestuck";
import MessageList from "@/app/_components/client/MessageList"
import { useParams } from "next/navigation";
import { DBBCode } from "@/app/_components/shared/DBBCode";

export default function Page({
  params,
}: {
  params: { chatUrl: string }
}) {
  const { chatUrl } = useParams()

  const [messages, setMessages] = useState<MessageSchema[]>([])
  const messagesRef = useRef<HTMLTableElement>(null)
  const [messageCounter, setMessageCounter] = useState(1)
  const [chatTheme, setChatTheme] = useState('default')

  // Interval, add one message every second
  /* useEffect(() => {
    const interval = setInterval(() => {
      // If over 100 messages, remove the first message
      setMessageCounter((prev) => prev + 1)
      if (messages.length > 50) {
        clearInterval(interval)
      }
      setMessages((prev) => [
        ...prev,
        {
          id: messageCounter,
          content: `Message ${messageCounter} in ${chatUrl} chat room from User ${messageCounter} at ${new Date().toISOString()}`,
          user: {
            id: messageCounter,
            name: `User ${messageCounter}`,
            color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
          },
        },
      ])
    }, 1000)
    return () => clearInterval(interval)
  })
  */
  
  function bbcodeTestString() {
    let bbcodeTestString = ""
    bbcodeTestString += "[b]Bold[/b]\n"
    bbcodeTestString += "[i]Italic[/i]\n"
    bbcodeTestString += "[u]Underline[/u]\n"
    bbcodeTestString += "[s]Strikethrough[/s]\n"
    bbcodeTestString += "[sub]Subscript[/sub]\n"
    bbcodeTestString += "[sup]Superscript[/sup]\n"
    bbcodeTestString += "[url=https://www.example.com]Link[/url]\n"
    bbcodeTestString += "[email]test@example.com[/email]\n"
    bbcodeTestString += "[pad]Padded[/pad]\n"
    bbcodeTestString += "[spoiler]Snape kills dumbledore[/spoiler]\n"
    bbcodeTestString += "[font=Arial]Font[/font]\n"
    bbcodeTestString += "[color=#ff0000]Red[/color]\n"
    bbcodeTestString += "[color=green]Green[/color]\n"
    bbcodeTestString += "[color=rgb(0,0,255)]Blue[/color]\n"
    const gradient = "red,orange,yellow,green,blue,indigo,violet,rgba(0,0,0,0)"
    const gradientLorem = faker.lorem.paragraphs(1)
    bbcodeTestString += `[gradient=${gradient}]${gradientLorem}[/gradient]\n`
    bbcodeTestString += `[gradient=${gradient}][spoiler]${gradientLorem}[/spoiler][/gradient]\n`
    bbcodeTestString += `[spoiler][gradient=${gradient}]${gradientLorem}[/gradient][/spoiler]\n`
    bbcodeTestString += "[bone]Bone[/bone]\n"
    bbcodeTestString += "[b][i][u][s]All[/s][/u][/i][/b]\n"
    bbcodeTestString += "[div]Divider with title[/div]\n"
    bbcodeTestString += "[tooltip='hello_world!']Tooltip[/tooltip]\n"
    bbcodeTestString += `[div][gradient=${gradient}]Rainbow Divider[/gradient][/div]\n`
    bbcodeTestString += `[modal buttonText=Rules][div]RULES[/div][br][gradient=${gradient}]Be Kind[/gradient][/modal]\n`
    // 5 minutes from now
    //bbcodeTestString += `[countdown=${new Date(Date.now() + 5 * 60000).toISOString()}]\n`
    bbcodeTestString += "[bubble]Bubble[/bubble]\n"
    bbcodeTestString += "[bubble_r]Bubble Right[/bubble_r]\n"
    return bbcodeTestString
  }
  

  useEffect(() => {
    const messages: MessageSchema[] = []
    let counter = 1
    for (const [key, value] of Object.entries(characters)) {
      const lorem = faker.lorem.paragraphs(5)
      messages.push({
        id: counter,
        content: `${lorem}\n${bbcodeTestString()}`.replaceAll('\n\n', '[br] [br]').replaceAll('\n', '[br]'),
        user: {
          id: counter,
          name: value.name,
          color: value.color,
          character: value,
        }
      })
      counter++
    }
    setMessages(messages)
  }, [])

  // Scroll to bottom only if the user is already at the bottom
  // To accomplish this, we will set a scroll state to true when the user has scrolled to the bottom
  // and set it to false when the user scrolls up
  // We will then check this state before scrolling to the bottom
  const [scroll, setScroll] = useState(true)
  const [hasAutoScrolled, setHasAutoScrolled] = useState(false)

  useEffect(() => {
    if (scroll) {
      (messagesRef.current?.lastChild as HTMLElement)?.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
      })
      setHasAutoScrolled(true)
    }
  }, [messages, scroll])

  // Check if the user has scrolled to the bottom
  const handleScroll = (evt: UIEvent<HTMLTableElement>) => {
    // Ignores the event if this scroll was caused by the auto scroll
    if (hasAutoScrolled) {
      setHasAutoScrolled(false)
      return
    }
    const target = evt.target as HTMLTableElement
    const bottom = target.scrollHeight - target.scrollTop === target.clientHeight
    setScroll(bottom)
  }


  return (
    <div className="h-screen grow grid overflow-y-hidden overscroll-none gap-2 grid-cols-12 grid-rows-12 -m-2 p-2 bg-base-300">
      <div onScroll={handleScroll} className="rounded-box text-pretty overscroll-contain min-h-0 min-w-0 h-[calc(100vh-80px)] overflow-y-scroll col-span-10 bg-base-100">
        <table ref={messagesRef} className="w-full table-auto border-collapse border-spacing-0">
          <MessageList theme={chatTheme}>
            {messages.map((message) => (
              <Message key={message.id} id={message.id} color={message.user.color}>
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
        <ChatForm />
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