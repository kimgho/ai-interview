import ChatLayout from "@/widget/chat/ChatLayout"
import { ChatProvider } from "@/entities/message/contexts/ChatContext"

const ChattingPage = () => {
    return (
        <ChatProvider>
            <ChatLayout />
        </ChatProvider>
    )
}

export default ChattingPage
