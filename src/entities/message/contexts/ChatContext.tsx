import { createContext, useState, useEffect, useRef, type ReactNode } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useChatStream } from "@/features/chat/model/useChatStream"
import useAuthStore from "@/entities/auth/store/useAuthStore"
import { ChatContextType, ChatMessageType, ChatUtilsParams } from "../types/index"
import { clearMessages, createNewSession, loadSession } from "../utils/index"

export const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider = ({ children }: { children: ReactNode }) => {
    const [messages, setMessages] = useState<ChatMessageType[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isSessionLoading, setIsSessionLoading] = useState(false);
    const [sessionId, setSessionId] = useState<number | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const { id: routeSessionId } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [currentUserMessage, setCurrentUserMessage] = useState<string>("");
    const [currentLLMMessageId, setCurrentLLMMessageId] = useState<string | null>(null);

    const token = useAuthStore.getState().accessToken;

    const { streamMessage, isConnected, error } = useChatStream({
        sessionId: sessionId ?? 0,
        message: currentUserMessage,
        token: token
    });

    const chatUtilsParams: ChatUtilsParams = {
        setMessages,
        setIsLoading,
        setIsSessionLoading,
        setSessionId,
        setCurrentUserMessage,
        setCurrentLLMMessageId,
        navigate,
        sessionId,
        routeSessionId,
        messages
    };

    useEffect(() => {
        const handleSession = async () => {
            setIsSessionLoading(true);
            if (!token) {
                setIsSessionLoading(false);
                const errorMsg: ChatMessageType = {
                    id: "auth-error-effect",
                    message: "사용자 인증 정보가 없어 세션을 로드하거나 생성할 수 없습니다. 로그인 후 다시 시도해주세요.",
                    sender: "LLM",
                    createdAt: new Date().toLocaleTimeString([], { hour: "numeric", minute: "numeric" }),
                    sessionId: 0
                };
                setMessages([errorMsg]);
                setSessionId(null);
                navigate('/login');
                return;
            }

            try {
                const sessionIdNumber = Number.parseInt(routeSessionId || "");
                if (!isNaN(sessionIdNumber) && sessionIdNumber > 0) {
                    await loadSession(sessionIdNumber, chatUtilsParams);
                } else {
                    await createNewSession(chatUtilsParams);
                }
            } catch (e) {
                console.error("세션 처리 중 오류 발생:", e);
                const errorMsg: ChatMessageType = {
                    id: "session-error-effect",
                    message: "세션 로드 또는 생성에 실패했습니다. 다시 시도해주세요.",
                    sender: "LLM",
                    createdAt: new Date().toLocaleTimeString([], { hour: "numeric", minute: "numeric" }),
                    sessionId: 0
                };
                setMessages([errorMsg]);
                setSessionId(null);
            } finally {
                setIsSessionLoading(false);
            }
        };

        if (token !== null) {
            handleSession();
        }

    }, [routeSessionId, navigate, token]);


    useEffect(() => {
        if (!isLoading) {
            messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages, isLoading]);


    useEffect(() => {
        if (streamMessage) {
            if (streamMessage.event === 'progress') {
                setMessages(prev => {
                    const updatedMessages = [...prev];
                    const aiMessageIndex = updatedMessages.findIndex(msg => msg.id === currentLLMMessageId);

                    if (aiMessageIndex !== -1) {
                        const content = typeof streamMessage.data === 'string' ? streamMessage.data : '';
                        updatedMessages[aiMessageIndex] = {
                            ...updatedMessages[aiMessageIndex],
                            message: (updatedMessages[aiMessageIndex].message || '') + content
                        };
                    } else {
                        console.warn("🤖 Progress update: Could not find AI message with ID", currentLLMMessageId);
                    }
                    return updatedMessages;
                });

            } else if (streamMessage.event === 'complete') {
                setMessages(prev => {
                    const updatedMessages = [...prev];
                    const aiMessageIndex = updatedMessages.findIndex(msg => msg.id === currentLLMMessageId);
                    if (aiMessageIndex !== -1 && streamMessage.data !== 'end') {
                        const content = typeof streamMessage.data === 'string' ? streamMessage.data : '';
                        updatedMessages[aiMessageIndex] = {
                            ...updatedMessages[aiMessageIndex],
                            message: (updatedMessages[aiMessageIndex].message || '') + content
                        };
                    } else if (aiMessageIndex === -1) {
                        console.warn("🤖 Complete update: Could not find AI message with ID", currentLLMMessageId);
                    }
                    setIsLoading(false);
                    setCurrentUserMessage("");
                    setCurrentLLMMessageId(null);

                    return updatedMessages;
                });
            }
        }
    }, [streamMessage, currentLLMMessageId]);


    useEffect(() => {
        if (error && isLoading) {
            console.error("SSE 연결 또는 스트림 처리 오류:", error);
            setIsLoading(false);
            setMessages(prev => {
                const updatedMessages = [...prev];
                const aiMessageIndex = updatedMessages.findIndex(msg => msg.id === currentLLMMessageId);

                if (aiMessageIndex !== -1) {
                    if (!updatedMessages[aiMessageIndex].message || !updatedMessages[aiMessageIndex].message.includes("메시지 전송 중 오류가 발생")) {
                        updatedMessages[aiMessageIndex] = {
                            ...updatedMessages[aiMessageIndex],
                            message: (updatedMessages[aiMessageIndex].message || '') + "\n메시지 전송 중 오류가 발생했습니다. 다시 시도해 주세요."
                        };
                    }
                } else {
                    console.warn("오류 발생 시 AI 메시지를 찾을 수 없습니다.", currentLLMMessageId);
                }
                setCurrentUserMessage("");
                setCurrentLLMMessageId(null);
                return updatedMessages;
            });
        }
    }, [error, isLoading, currentLLMMessageId, sessionId]);

    const contextLoadSession = async (id: number) => {
        await loadSession(id, chatUtilsParams);
    };

    const contextCreateNewSession = async (): Promise<number> => {
        return await createNewSession(chatUtilsParams);
    };

    const contextClearMessages = () => {
        clearMessages(chatUtilsParams);
    };

    const contextSendMessage = async (message: string) => {
        if (!message.trim() || isLoading || !sessionId || isSessionLoading) {
            console.log("메시지 전송 불가:", { message: message.trim(), isLoading, sessionId, isSessionLoading });
            return;
        }

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
        setCurrentLLMMessageId(aiMessageId);

        const aiMessage: ChatMessageType = {
            id: aiMessageId,
            message: "",
            sender: "LLM",
            createdAt: new Date().toLocaleTimeString([], { hour: "numeric", minute: "numeric" }),
            sessionId: sessionId
        };
        setMessages((prev) => [...prev, aiMessage]);

        setCurrentUserMessage(message);
    };


    const value: ChatContextType = {
        messages,
        isLoading,
        sendMessage: contextSendMessage,
        messagesEndRef,
        sessionId,
        isSessionLoading,
        createNewSession: contextCreateNewSession,
        loadSession: contextLoadSession,
        clearMessages: contextClearMessages,
        isConnected,
        error,
    };

    return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

