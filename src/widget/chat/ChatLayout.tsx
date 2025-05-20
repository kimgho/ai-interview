import ChatInput from "@/features/chat/ui/ChatInput"
import ChatSidebar from "@/entities/history/ui/ChatSidebar"
import ChatTextWrapper from "@/entities/message/ui/ChatMessageWrapper"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/shared/ui/sidebar"
import { useChat } from "@/entities/message/hooks/useChat"
import ChatTerminateButton from "@/features/chat/ui/ChatTerminateButton"
import { useInterviewStore } from "@/entities/message/store/useInterviewStore"


const ChatLayout = () => {
    const { messages, isLoading, sendMessage, messagesEndRef } = useChat()
    const isInterviewEnded = useInterviewStore(state => state.isInterviewEnded());

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
                <div className="flex gap-2 border-t p-4">
                    <ChatInput onSendMessage={sendMessage} isLoading={isLoading} isInterviewEnded={isInterviewEnded} />
                    <ChatTerminateButton />
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}

export default ChatLayout
