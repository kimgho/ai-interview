export type ChatMessageType = {
    id: string
    message: string
    sender: "LLM" | "USER"
    createdAt?: string;
    sessionId?: number;
}