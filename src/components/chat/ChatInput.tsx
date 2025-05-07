import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SendIcon } from "lucide-react"
import { useState } from "react"

const ChatInput = () => {
    const [message, setMessage] = useState("")

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (message.trim()) {
            alert(`메시지: ${message}`)
            setMessage("")
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
            <Button type="submit" size="icon">
                <SendIcon className="h-4 w-4" />
                <span className="sr-only">전송</span>
            </Button>
        </form>
    )
}

export default ChatInput
