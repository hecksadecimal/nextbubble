'use client';
import { useEffect, useState } from "react"
import { useStickToBottom } from 'use-stick-to-bottom';
import ChatForm from "@/app/_components/client/ChatForm"
import Message, { MessageSchema, MessageSendSchema } from "@/app/_components/shared/Message"
import { Character, characters } from "@/lib/shared/homestuck";
import MessageList from "@/app/_components/client/MessageList"
import { DBBCode } from "@/app/_components/shared/DBBCode";
import CharacterSelect from "@/app/_components/client/CharacterSelect";

export default function Page() {
  const chatUrl = 'test'

  const [messages, setMessages] = useState<MessageSchema[]>([])
  const [chatTheme, setChatTheme] = useState('default')
  const [character, setCharacter] = useState<Character | undefined>(undefined)
  const [characterKey, setCharacterKey] = useState('')
  const { scrollRef, contentRef } = useStickToBottom();
  const [users, setUsers] = useState(0)

  useEffect(() => {
    const eventSource = new EventSource(`/api/chat/${chatUrl}/stream`)
    const characterKeys = Object.keys(characters)
    //set random character
    const key = characterKeys[Math.floor(Math.random() * characterKeys.length)]
    setCharacter(characters[key])
    setCharacterKey(key)
    eventSource.addEventListener('message', (event) => {
      const data = JSON.parse(event.data) as MessageSchema
      addToMessages(data)
    })

    eventSource.addEventListener('session-count', (event) => {
      setUsers(parseInt(event.data))
    })

    return () => {
      eventSource.close()
    }
  }, [])

  function addToMessages(data: MessageSchema) {
    setMessages((prev) => {
      // If over 100 messages, remove the first message until there are 100 messages
      while (prev.length >= 100) {
        prev.shift()
      }
      return [
        ...prev,
        data
      ]
    })
  }

  function handleSend(message: MessageSendSchema) {
    // post request to /api/chat/test/stream
    fetch(`/api/chat/${chatUrl}/stream`, {
      method: 'POST',
      body: JSON.stringify(message),
    })
  }

  function setCharacterHandler(character: string) {
    setCharacter(characters[character])
    setCharacterKey(character)
  }

  // Pulsing glow bottom border effect at bottom of chat when new messages are received and the user is not scrolled to the bottom
  // Glow colour is the colour of the message text
  useEffect(() => {
    if (scrollRef.current) {
      if (scrollRef.current.scrollTop + scrollRef.current.clientHeight < scrollRef.current.scrollHeight - 50) {
        scrollRef.current.style.borderBottom = `4px solid #${messages[messages.length - 1].user.color}`
      } else {
        scrollRef.current.style.borderBottom = 'none'
      }
    }
  }, [messages])


  return (
    <div className="h-screen grow grid overflow-y-hidden overscroll-none gap-2 grid-cols-12 grid-rows-12 -m-2 p-2 bg-base-300">
      <div ref={scrollRef} className="rounded-box text-pretty animate-border overscroll-contain min-h-0 min-w-0 h-[calc(100vh-80px)] overflow-y-scroll col-span-10 bg-base-100">
        <table className="w-full table-auto border-collapse border-spacing-0">
          <MessageList theme={chatTheme} ref={contentRef}>
            {messages.map((message) => (
              <Message key={message.id} id={message.id} color={message.user.color} counter={message.user.counter} sentAt={new Date(message.sentAt)}>
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
        <ChatForm character={character} sendHandler={handleSend} />
      </div>
      <div className="flex flex-col rounded-box col-span-2 h-[calc(100vh-80px)] bg-base-100">
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
        <div>
          {users} user{users > 1 ? "s" : ""}
        </div>
        <div>
          <CharacterSelect character={character} characterKey={characterKey} setCharacter={setCharacterHandler} />
        </div>
      </div>
    </div>
  )
}