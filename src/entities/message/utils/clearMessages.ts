import { ChatUtilsParams, ChatMessageType } from "../types/index"
import { WELCOME_MESSAGE } from "@/entities/message/constants/welcome";

export const clearMessages = (params: ChatUtilsParams) => {
    const { setMessages, sessionId, setCurrentLLMMessageId, setIsLoading, setCurrentUserMessage } = params;

    const welcomeWithMessageId: ChatMessageType = {
        ...WELCOME_MESSAGE,
        sessionId: sessionId ?? 0
    };
    setMessages([welcomeWithMessageId]);
    setCurrentLLMMessageId(null);
    setIsLoading(false);
    setCurrentUserMessage("");
};