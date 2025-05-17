import type { ChatMessageType } from "@/entities/message/types/chat-message-props";
import type { NavigateFunction } from "react-router-dom";
import type { InterviewMessageResponseBody } from "@/features/chat/service/interview";

export interface ChatUtilsParams {
    setMessages: React.Dispatch<React.SetStateAction<ChatMessageType[]>>;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
    setIsSessionLoading: React.Dispatch<React.SetStateAction<boolean>>;
    setSessionId: React.Dispatch<React.SetStateAction<number | null>>;
    setCurrentUserMessage: React.Dispatch<React.SetStateAction<string>>;
    setCurrentLLMMessageId: React.Dispatch<React.SetStateAction<string | null>>;
    navigate: NavigateFunction;
    sessionId: number | null;
    routeSessionId: string | undefined;
    messages: ChatMessageType[];
}

export type { InterviewMessageResponseBody };