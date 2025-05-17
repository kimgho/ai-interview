import { ChatMessageType } from "../types/index"

export const WELCOME_MESSAGE: Omit<ChatMessageType, "sessionId"> = {
    id: "welcome",
    message: "안녕하세요! 인터뷰를 시작하기 위해 자기 소개 및 자신이 지원한 직렬, 경력을 말해주세요.",
    sender: "LLM",
    createdAt: new Date().toLocaleTimeString([], { hour: "numeric", minute: "numeric" })
};