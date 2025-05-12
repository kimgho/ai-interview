import { cn } from "@/shared/lib/utils"

type SenderType = "AI" | "USER"

interface ChatMessageProps {
    content: string
    sender: SenderType
    timestamp?: string
    isLoading?: boolean
}
// entities/message/ui
export function ChatMessage({ content, sender, timestamp }: ChatMessageProps) {
    const isAI = sender === "AI"

    return (
        <div className={cn("flex w-full mb-4", isAI ? "justify-start" : "justify-end")}>
            <div className={cn("flex flex-col max-w-[85%]", isAI ? "items-start" : "items-end", "max-w-[85%] sm:max-w-[75%] md:max-w-[65%] lg:max-w-[55%]")}>
                <div
                    className={cn(
                        "px-4 py-2.5 rounded-2xl",
                        isAI ? "bg-muted text-foreground rounded-tl-none" : "bg-primary text-primary-foreground rounded-tr-none",
                    )}
                >
                    <p className="whitespace-pre-wrap break-words">{content}</p>
                </div>
                {timestamp && <span className="text-xs text-muted-foreground mt-1 px-1">{timestamp}</span>}
            </div>
        </div>
    )
}
