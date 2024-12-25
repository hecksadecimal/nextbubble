'use client';
import { useEffect, useState } from "react"
import { useStickToBottom } from 'use-stick-to-bottom';
import ChatForm from "@/app/_components/client/ChatForm"
import Message, { MessageSchema, MessageSendSchema } from "@/app/_components/client/Message"
import { Character, characters } from "@/lib/shared/homestuck";
import MessageList from "@/app/_components/client/MessageList"
import { DBBCode } from "@/app/_components/shared/DBBCode";
import CharacterSelect from "@/app/_components/client/CharacterSelect";
import ThemeSelect from "@/app/_components/client/ThemeSelect";
import Modal from "@/app/_components/client/bbcode/Modal";

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

  function themeChangeHandler(theme: string) {
    setChatTheme(theme)
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
    <div className="absolute h-dvh w-dvw overflow-hidden flex flex-col overflow-y-hidden overscroll-none gap-2 -m-2 p-2 bg-base-300">
      <div className="h-12 flex gap-2 flex-row-reverse rounded-box bg-base-100 md:hidden">
        <ThemeSelect themeChanged={themeChangeHandler}/>
        <Modal buttonText="Settings">
          <h3>Character</h3>
          <br />
          <CharacterSelect character={character} characterKey={characterKey} setCharacter={setCharacterHandler} />
        </Modal>
        <Modal buttonText="Users">
          {users} user{users ==1 ? "" : "s"}
        </Modal>
      </div>
      <div className="flex gap-2 overscroll-contain min-h-0 min-w-0 h-full w-full">
        <div ref={scrollRef} className="rounded-box text-pretty animate-border overscroll-contain min-h-0 min-w-0 h-full overflow-y-scroll w-full bg-base-100">
          <table className="w-full table-auto border-collapse border-spacing-0">
            <MessageList theme={chatTheme} ref={contentRef}>
              {messages.map((message) => (
                <Message key={message.id} id={message.id} color={message.user.color} counter={message.user.counter} theme={chatTheme} sentAt={new Date(message.sentAt)}>
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
        <div className="flex-col rounded-box w-72 h-full bg-base-100 hidden md:flex">
          <ThemeSelect themeChanged={themeChangeHandler} />
          <div>
            {users} user{users > 1 ? "s" : ""}
          </div>
          <div>
            <CharacterSelect character={character} characterKey={characterKey} setCharacter={setCharacterHandler} />
          </div>
        </div>
      </div>
      <div>
        <ChatForm character={character} sendHandler={handleSend} />
      </div>
    </div>
  )
}