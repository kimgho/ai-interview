import ChatInput from "@/components/chat/ChatInput"
import ChatSidebar from "@/components/chat/ChatSidebar"
import ChatTextWrapper from "@/components/chat/ChatTextWrapper"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { useChat } from "@/hooks/useChat"

const ChatLayout = () => {
    const { messages, isLoading, sendMessage, messagesEndRef } = useChat()

    return (
        <SidebarProvider>
            <ChatSidebar />
            <SidebarInset className="flex flex-col h-screen">
                <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
                    <SidebarTrigger className="-ml-1" />
                    <h1 className="text-xl font-semibold">Chat</h1>
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
