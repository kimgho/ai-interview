import ChatInput from "@/components/chat/ChatInput"
import ChatSidebar from "@/components/chat/ChatSidebar"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"

const ChattingPage = () => {
    return (
        <SidebarProvider>
            <ChatSidebar />
            <SidebarInset className="flex flex-col">
                <SidebarTrigger className="-ml-1" />
                <div className="flex-1 overflow-auto p-4">
                    <div className="min-h-[calc(100vh-8rem)]"></div>
                </div>
                <div className="border-t p-4">
                    <ChatInput />
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}

export default ChattingPage
