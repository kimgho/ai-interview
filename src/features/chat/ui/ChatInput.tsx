import { Button } from "@/shared/ui/button"
import { Input } from "@/shared/ui/input"
import { Loader2, SendIcon } from "lucide-react"
import { useState } from "react"

interface ChatInputProps {
    onSendMessage: (message: string) => void;
    isLoading: boolean;
    isInterviewEnded: boolean
}


const ChatInput = ({ isLoading = false, onSendMessage, isInterviewEnded }: ChatInputProps) => {
    const [message, setMessage] = useState("")
    const isDisable = isInterviewEnded || isLoading || !message.trim();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (isInterviewEnded || isLoading || !message.trim()) return;
        onSendMessage(message);
        setMessage("");
    }

    return (
        <form onSubmit={handleSubmit} className="flex w-full gap-2">
            <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={isInterviewEnded ? "종료된 인터뷰는 진행이 불가능합니다." : "답변을 입력해주세요"}
                disabled={isDisable}
                className="flex-1"
            />
            <Button type="submit" size="icon" disabled={isDisable}>
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <SendIcon className="h-4 w-4" />}
                <span className="sr-only">전송</span>
            </Button>
        </form>
    )
}

export default ChatInput
