import { cn } from "@/shared/lib/utils"

type SenderType = "LLM" | "USER"

interface ChatMessageProps {
    message: string
    sender: SenderType
    createdAt?: string
    isLoading?: boolean
}

export function ChatMessage({ message, sender, createdAt }: ChatMessageProps) {
    const isLLM = sender === "LLM"

    return (
        <div className={cn("flex w-full mb-4", isLLM ? "justify-start" : "justify-end")}>
            <div className={cn("flex flex-col max-w-[85%]", isLLM ? "items-start" : "items-end", "max-w-[85%] sm:max-w-[75%] md:max-w-[65%] lg:max-w-[55%]")}>
                <div
                    className={cn(
                        "px-4 py-2.5 rounded-2xl",
                        isLLM ? "bg-muted text-foreground rounded-tl-none" : "bg-primary text-primary-foreground rounded-tr-none",
                    )}
                >
                    <p className="whitespace-pre-wrap break-words">{message}</p>
                </div>
                {createdAt && <span className="text-xs text-muted-foreground mt-1 px-1">{createdAt}</span>}
            </div>
        </div>
    )
}
