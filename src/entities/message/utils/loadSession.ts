import { getInterviewById } from "@/features/chat/service/interview";
import { ChatUtilsParams, ChatMessageType, InterviewMessageResponseBody } from "../types/index"
import useAuthStore from "@/entities/auth/store/useAuthStore";
import { WELCOME_MESSAGE } from "@/entities/message/constants/welcome";

export const loadSession = async (id: number, params: ChatUtilsParams) => {
    const { setMessages, setIsSessionLoading, setSessionId, setCurrentLLMMessageId, navigate } = params;

    const token = useAuthStore.getState().accessToken;

    setIsSessionLoading(true);
    setMessages([]);
    setSessionId(null);
    setCurrentLLMMessageId(null);

    if (!token) {
        setIsSessionLoading(false);
        const errorMsg: ChatMessageType = {
            id: "auth-error-load",
            message: "사용자 인증 정보가 없어 세션을 로드할 수 없습니다. 로그인 후 다시 시도해주세요.",
            sender: "LLM",
            createdAt: new Date().toLocaleTimeString([], { hour: "numeric", minute: "numeric" }),
            sessionId: id,
        };
        setMessages([errorMsg]);
        navigate('/login');
        throw new Error("Authentication token missing.");
    }

    try {
        const responseData: InterviewMessageResponseBody[] = await getInterviewById(id);

        setSessionId(id);
        if (responseData.length === 0) {
            const welcomeMessageWithId: ChatMessageType = {
                ...WELCOME_MESSAGE,
                sessionId: id
            }
            setMessages([welcomeMessageWithId]);
        } else {
            const loadedMessages: ChatMessageType[] = responseData.map((msg: InterviewMessageResponseBody) => {
                const messageTime = new Date(msg.createdAt);
                const formattedTime = messageTime.toLocaleTimeString([], { hour: "numeric", minute: "numeric" });

                return {
                    id: msg.id.toString(),
                    message: msg.message,
                    sender: msg.sender,
                    createdAt: formattedTime,
                    sessionId: msg.sessionId,
                };
            });

            setMessages(loadedMessages);
        }
    } catch (error) {
        console.error(`세션 로드 실패 (ID: ${id}):`, error);
        const errorMsg: ChatMessageType = {
            id: "load-error",
            message: `세션 ID: ${id} 로드에 실패했습니다. 다른 세션을 선택하거나 새 세션을 생성해 주세요.`,
            sender: "LLM",
            createdAt: new Date().toLocaleTimeString([], { hour: "numeric", minute: "numeric" }),
            sessionId: id,
        };
        setMessages([errorMsg]);
        setSessionId(null);
        navigate('/chat');

        throw error;
    } finally {
        setIsSessionLoading(false);
    }
};