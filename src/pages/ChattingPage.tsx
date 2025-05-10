import ChatLayout from "@/components/chat/ChatLayout"
import { ChatProvider } from "@/contexts/ChatContext"

const ChattingPage = () => {
    return (
        <ChatProvider>
            <ChatLayout />
        </ChatProvider>
    )
}

export default ChattingPage
