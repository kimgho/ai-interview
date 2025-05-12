import { Button } from "@/shared/ui/button"
import { Input } from "@/shared/ui/input"
import { Loader2, SendIcon } from "lucide-react"
import { useState } from "react"

interface ChatInputProps {
    onSendMessage: (message: string) => void;
    isLoading: boolean;
}

//채팅 입력창임
// feature/chat/ui
// entities/message 관련 로직을 가져다 사용
const ChatInput = ({ isLoading = false, onSendMessage }: ChatInputProps) => {
    const [message, setMessage] = useState("")

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (message.trim() && !isLoading) {
            onSendMessage(message);
            setMessage("");
        }
    }

    return (
        <form onSubmit={handleSubmit} className="flex w-full gap-2">
            <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="메시지를 입력하세요."
                className="flex-1"
            />
            <Button type="submit" size="icon" disabled={isLoading || !message.trim()}>
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <SendIcon className="h-4 w-4" />}
                <span className="sr-only">전송</span>
            </Button>
        </form>
    )
}

export default ChatInput
