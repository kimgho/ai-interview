import { ChatMessageType } from "@/entities/message/types/chat-message-props"
import { ChatMessage } from "./ChatMessage"
import { ChatMessageLoading } from "./ChatMessageLoading"

interface ChatMessageWrapperProps {
    messages: ChatMessageType[]
    isLoading: boolean
}

const ChatMessageWrapper = ({ messages, isLoading }: ChatMessageWrapperProps) => {
    return (
        <div className="flex flex-col w-full p-4 space-y-4 overflow-y-auto">
            {messages.map((message) => (
                <ChatMessage
                    key={message.id}
                    message={message.message}
                    sender={message.sender}
                    createdAt={message.createdAt}
                />
            ))}
            {isLoading && <ChatMessageLoading />}
        </div>
    )
}
export default ChatMessageWrapper