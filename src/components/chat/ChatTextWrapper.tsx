import { ChatMessageType } from "@/types/ChatMessageProps"
import { ChatMessage } from "./ChatMessage"
import { ChatLoading } from "./ChatLoading"

interface ChatTextWrapperProps {
    messages: ChatMessageType[]
    isLoading: boolean
}


const ChatTextWrapper = ({ messages, isLoading }: ChatTextWrapperProps) => {
    return (
        <div className="flex flex-col w-full p-4 space-y-4 overflow-y-auto">
            {messages.map((message) => (
                <ChatMessage
                    key={message.id}
                    content={message.content}
                    sender={message.sender}
                    timestamp={message.timestamp}
                />
            ))}
            {isLoading && <ChatLoading />}
        </div>
    )
}
export default ChatTextWrapper