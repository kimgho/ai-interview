import type { ChatMessageType } from "@/entities/message/types/ChatMessageProps"
import { createContext, useState, useEffect, useRef, type ReactNode } from "react"
import { postInterviews, getInterviewById } from "@/features/chat/service/interview"
import { useParams, useNavigate } from "react-router-dom"
import { useChatStream } from "@/features/chat/model/useChatStream"
import useAuthStore from "@/entities/auth/store/useAuthStore"
interface ChatContextType {
    messages: ChatMessageType[]
    isLoading: boolean
    sendMessage: (message: string) => void
    messagesEndRef: React.RefObject<HTMLDivElement | null>
    sessionId: number | null
    isSessionLoading: boolean
    createNewSession: () => Promise<number>
    loadSession: (id: number) => Promise<void>
    clearMessages: () => void
}

export const ChatContext = createContext<ChatContextType | undefined>(undefined)

const WELCOME_MESSAGE: Omit<ChatMessageType, "sessionId"> = {
    id: "welcome",
    message: "안녕하세요! 인터뷰를 시작하고싶으시면 시작을 전송해주세요",
    sender: "LLM",
    createdAt: new Date().toLocaleTimeString([], { hour: "numeric", minute: "numeric" })
};

export const ChatProvider = ({ children }: { children: ReactNode }) => {
    const [messages, setMessages] = useState<ChatMessageType[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isSessionLoading, setIsSessionLoading] = useState(false);
    const [sessionId, setSessionId] = useState<number | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const { id: routeSessionId } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [currentUserMessage, setCurrentUserMessage] = useState<string>("시작")
    const [currentLLMMessage, setCurrentLLMMessage] = useState<string>("")

    const token = useAuthStore.getState().accessToken;
    const { streamMessage, isConnected, error } = useChatStream({
        sessionId: Number.parseInt(routeSessionId ?? "") || 0,
        message: currentUserMessage,
        token: token
    })

    useEffect(() => {
        const handleSession = async () => {
            setIsSessionLoading(true);
            try {
                const sessionIdNumber = Number.parseInt(routeSessionId || "");
                if (!isNaN(sessionIdNumber)) {
                    await loadSession(sessionIdNumber);
                    return;
                }

                await createNewSession();
            } finally {
                setIsSessionLoading(false);
            }
        };

        handleSession();
    }, [routeSessionId, navigate]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isLoading]);

    useEffect(() => {
        if (currentLLMMessage && streamMessage) {
            setMessages(prev => {
                const updatedMessages = [...prev];
                const aiMessageIndex = updatedMessages.findIndex(msg => msg.id === currentLLMMessage);
                if (aiMessageIndex !== -1) {
                    updatedMessages[aiMessageIndex] = {
                        ...updatedMessages[aiMessageIndex],
                        message: streamMessage
                    };
                }

                return updatedMessages;
            })
        }
    }, [streamMessage, currentLLMMessage]);

    useEffect(() => {
        if (!isConnected && currentUserMessage && isLoading) {
            setIsLoading(false);
            setCurrentUserMessage("");
        }
    }, [isConnected, currentUserMessage, isLoading]);

    useEffect(() => {
        if (error && isLoading) {
            console.error("SSE 연결 오류:", error);
            setIsLoading(false);

            if (currentLLMMessage) {
                setMessages(prev => {
                    const updatedMessages = [...prev];
                    const aiMessageIndex = updatedMessages.findIndex(msg => msg.id === currentLLMMessage);

                    if (aiMessageIndex !== -1) {
                        updatedMessages[aiMessageIndex] = {
                            ...updatedMessages[aiMessageIndex],
                            message: streamMessage || "메시지 전송 중 오류가 발생했습니다. 다시 시도해 주세요."
                        };
                    }

                    return updatedMessages;
                });
            }

            setCurrentUserMessage("");
        }
    }, [currentLLMMessage, error, isLoading, streamMessage]);

    const loadSession = async (id: number) => {
        setIsSessionLoading(true);
        try {
            await getInterviewById(id);
            setSessionId(id);

            const welcomeWithMessageId: ChatMessageType = {
                ...WELCOME_MESSAGE,
                sessionId: id
            };
            setMessages([welcomeWithMessageId]);

            console.log("세션 로드됨:", id);
        } catch (error) {
            console.error("세션 로드 실패:", error);
            setMessages([{
                id: "error",
                message: "세션 로드에 실패했습니다. 다른 세션을 선택하거나 새 세션을 생성해 주세요.",
                sender: "LLM",
                createdAt: new Date().toLocaleTimeString([], { hour: "numeric", minute: "numeric" }),
                sessionId: id,
            }]);
            throw error;
        } finally {
            setIsSessionLoading(false);
        }
    };

    const createNewSession = async (): Promise<number> => {
        setIsSessionLoading(true);
        try {
            const session = await postInterviews();
            const newSessionId = session.id;

            setSessionId(newSessionId);
            console.log("새 인터뷰 ->", newSessionId);

            navigate(`/chat/${newSessionId}`);

            const welcomeWithMessageId: ChatMessageType = {
                ...WELCOME_MESSAGE,
                sessionId: newSessionId
            };
            setMessages([welcomeWithMessageId]);

            return newSessionId;
        } catch (error) {
            console.error("세션 생성 실패:", error);
            const newSessionIdOnError = sessionId ?? 0;
            setMessages([{
                id: "error",
                message: "세션 생성에 실패했습니다. 다시 시도해 주세요.",
                sender: "LLM",
                createdAt: new Date().toLocaleTimeString([], { hour: "numeric", minute: "numeric" }),
                sessionId: newSessionIdOnError
            }]);
            return -1;
        } finally {
            setIsSessionLoading(false);
        }
    };

    const clearMessages = () => {
        const welcomeWithMessageId: ChatMessageType = {
            ...WELCOME_MESSAGE,
            sessionId: sessionId ?? 0
        };
        setMessages([welcomeWithMessageId]);
    };

    const sendMessage = async (message: string) => {
        if (!message.trim() || isLoading || !sessionId || isSessionLoading) return;

        const userMessage: ChatMessageType = {
            id: Date.now().toString(),
            message,
            sender: "USER",
            createdAt: new Date().toLocaleTimeString([], { hour: "numeric", minute: "numeric" }),
            sessionId: sessionId,
        };
        setMessages((prev) => [...prev, userMessage]);

        setIsLoading(true);
        const aiMessageId = (Date.now() + 1).toString();
        const aiMessage: ChatMessageType = {
            id: aiMessageId,
            message: "",
            sender: "LLM",
            createdAt: new Date().toLocaleTimeString([], { hour: "numeric", minute: "numeric" }),
            sessionId: sessionId
        };
        setMessages((prev) => [...prev, aiMessage]);

        setCurrentLLMMessage(aiMessageId);

        setCurrentUserMessage(message);
    };

    const value = {
        messages,
        isLoading,
        sendMessage,
        messagesEndRef,
        sessionId,
        isSessionLoading,
        createNewSession,
        loadSession,
        clearMessages
    };

    return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};