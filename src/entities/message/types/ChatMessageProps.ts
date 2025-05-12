export type ChatMessageType = {
    id: string
    content: string
    sender: "AI" | "USER"
    timestamp: string
}