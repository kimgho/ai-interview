import { generateMockAIResponse } from "@/features/chat/__mock__/generateMockAIResponse" // 채팅 연결하면 죽이기
import type { ChatMessageType } from "@/entities/message/types/ChatMessageProps"
import { createContext, useState, useEffect, useRef, type ReactNode } from "react"

interface ChatContextType {
    messages: ChatMessageType[]
    isLoading: boolean
    sendMessage: (content: string) => void
    messagesEndRef: React.RefObject<HTMLDivElement | null>
}
//entities 폴더 이름 붙여쓰기
export const ChatContext = createContext<ChatContextType | undefined>(undefined)


export const ChatProvider = ({ children }: { children: ReactNode }) => {
    const [messages, setMessages] = useState<ChatMessageType[]>([
        {
            id: "1",
            content: "안녕하세요! 무엇을 도와드릴까요?",
            sender: "AI",
            timestamp: new Date().toLocaleTimeString([], { hour: "numeric", minute: "numeric" }),
        },
    ])

    const [isLoading, setIsLoading] = useState(false)

    const messagesEndRef = useRef<HTMLDivElement>(null)

    const sendMessage = async (content: string) => {
        if (!content.trim() || isLoading) return

        const userMessage: ChatMessageType = {
            id: Date.now().toString(),
            content,
            sender: "USER",
            timestamp: new Date().toLocaleTimeString([], { hour: "numeric", minute: "numeric" }),
        }
        setMessages((prev) => [...prev, userMessage])

        setIsLoading(true)
        try {
            const aiResponse = await generateMockAIResponse(content)
            const aiMessage: ChatMessageType = {
                id: (Date.now() + 1).toString(),
                content: aiResponse,
                sender: "AI",
                timestamp: new Date().toLocaleTimeString([], { hour: "numeric", minute: "numeric" }),
            }
            setMessages((prev) => [...prev, aiMessage])
        } catch (error) {
            console.error("AI 응답 생성 중 오류:", error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages, isLoading])

    const value = {
        messages,
        isLoading,
        sendMessage,
        messagesEndRef,
    }

    return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>
}
