import { ChatMessageType } from "@/entities/message/types/ChatMessageProps"
import { ChatMessage } from "./ChatMessage"
import { ChatMessageLoading } from "./ChatMessageLoading"

interface ChatMessageWrapperProps {
    messages: ChatMessageType[]
    isLoading: boolean
}

// entities/message/ui
const ChatMessageWrapper = ({ messages, isLoading }: ChatMessageWrapperProps) => {
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
            {isLoading && <ChatMessageLoading />}
        </div>
    )
}
export default ChatMessageWrapper