import ChatInput from "@/features/chat/ui/ChatInput"
import ChatSidebar from "@/entities/message/ui/ChatSidebar"
import ChatTextWrapper from "@/entities/message/ui/ChatMessageWrapper"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/shared/ui/sidebar"
import { useChat } from "@/entities/message/hooks/useChat"


const ChatLayout = () => {
    const { messages, isLoading, sendMessage, messagesEndRef } = useChat()

    return (
        <SidebarProvider>
            <ChatSidebar />
            <SidebarInset className="flex flex-col h-screen">
                <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
                    <SidebarTrigger className="-ml-1" />
                    <h1 className="text-xl font-semibold">Interview Session</h1>
                </header>
                <div className="flex-1 overflow-auto">
                    <ChatTextWrapper messages={messages} isLoading={isLoading} />
                    <div ref={messagesEndRef} />
                </div>
                <div className="border-t p-4">
                    <ChatInput onSendMessage={sendMessage} isLoading={isLoading} />
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}

export default ChatLayout
