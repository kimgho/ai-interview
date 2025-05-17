import { postInterviews } from "@/features/chat/service/interview";
import { ChatUtilsParams, ChatMessageType } from "../types/index"
import useAuthStore from "@/entities/auth/store/useAuthStore";

export const createNewSession = async (params: ChatUtilsParams): Promise<number> => {
    const { setMessages, setIsSessionLoading, setSessionId, setCurrentLLMMessageId, navigate, sessionId } = params;
    const token = useAuthStore.getState().accessToken;

    setIsSessionLoading(true);
    setMessages([]);
    setSessionId(null);
    setCurrentLLMMessageId(null);

    if (!token) {
        setIsSessionLoading(false);
        const errorMsg: ChatMessageType = {
            id: "auth-error-create",
            message: "사용자 인증 정보가 없어 세션을 생성할 수 없습니다. 로그인 후 다시 시도해주세요.",
            sender: "LLM",
            createdAt: new Date().toLocaleTimeString([], { hour: "numeric", minute: "numeric" }),
            sessionId: 0,
        };
        setMessages([errorMsg]);
        navigate('/login');
        throw new Error("Authentication token missing.");
    }

    try {
        const session = await postInterviews();
        const newSessionId = session.id;

        setSessionId(newSessionId);
        navigate(`/chat/${newSessionId}`);

        return newSessionId;
    } catch (error) {
        console.error("세션 생성 실패:", error);
        const newSessionIdOnError = sessionId ?? 0;
        const errorMsg: ChatMessageType = {
            id: "create-error",
            message: "세션 생성에 실패했습니다. 다시 시도해 주세요.",
            sender: "LLM",
            createdAt: new Date().toLocaleTimeString([], { hour: "numeric", minute: "numeric" }),
            sessionId: newSessionIdOnError
        };
        setMessages([errorMsg]);
        setSessionId(null);
        navigate('/chat');

        throw error;
    } finally {
        setIsSessionLoading(false);
    }
};