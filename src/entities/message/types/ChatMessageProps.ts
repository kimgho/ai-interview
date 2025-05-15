export type ChatMessageType = {
    id: string
    content: string
    sender: "LLM" | "USER"
    timestamp: string
}