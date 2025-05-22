import { ChatMessageType } from "@/entities/message/types/chat-message-props"
import { ChatMessage } from "./ChatMessage"
import { ChatMessageLoading } from "./ChatMessageLoading"
import { useEffect, useRef } from "react"

interface ChatMessageWrapperProps {
    messages: ChatMessageType[]
    isLoading: boolean
}

const ChatMessageWrapper = ({ messages, isLoading }: ChatMessageWrapperProps) => {
    const messageEndRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (messageEndRef.current && containerRef.current) {
            const container = containerRef.current;
            const isAtBottom = container.scrollHeight - container.scrollTop <= container.clientHeight + 100;

            if (isAtBottom) {
                messageEndRef.current.scrollIntoView({
                    behavior: "smooth",
                    block: "end"
                });
            }
        }
    }, [messages.length]);

    return (
        <div
            ref={containerRef}
            className="flex-1 flex flex-col w-full p-4 space-y-4 overflow-y-auto"
        >
            {messages.map((message, index) => (
                <ChatMessage
                    key={`${message.createdAt}-${index}`}
                    message={message.message}
                    sender={message.sender}
                    createdAt={message.createdAt}
                />
            ))}
            {isLoading && <ChatMessageLoading />}
            <div ref={messageEndRef} />
        </div>
    )
}

export default ChatMessageWrapper