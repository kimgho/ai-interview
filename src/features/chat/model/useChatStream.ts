import { useEffect, useState } from "react";

interface ChatStreamRequestBody {
    sessionId: number;
    message: string;
    token: string | null;
}

interface UseChatStreamResult {
    streamMessage: string;
    isConnected: boolean;
    error: Event | null;
}
export const useChatStream = ({ sessionId, message = "시작", token }: ChatStreamRequestBody): UseChatStreamResult => {
    const [streamMessage, setStreamMessage] = useState<string>("");
    const [isConnected, setIsConnected] = useState<boolean>(false)
    const [error, setError] = useState<Event | null>(null);
    const baseURL = import.meta.env.VITE_BASE_URL;

    useEffect(() => {
        if (!sessionId || !token) {
            console.warn("유효하지 않은 세션 ID 또는 토큰입니다");
            setIsConnected(false);
            setStreamMessage("");
            return;
        }
        if (!message) {
            console.warn("메세지가 없습니다");
            setIsConnected(false);
            setStreamMessage("");
            return;
        }

        setStreamMessage("");
        const url = `${baseURL}/interviews/${sessionId}/messages/stream?message=${encodeURIComponent(message)}&token=${token}`;

        const eventSource = new EventSource(url);

        eventSource.onopen = () => {
            console.log("SSE connection OPEN");
            setIsConnected(true);
            setError(null);
        };

        eventSource.onmessage = (event) => {
            console.log(event);
            setStreamMessage(prev => prev + event.data);
        }
        eventSource.onerror = (event) => {
            console.error("SSE ERROR", event);
            setIsConnected(false);
            setError(event);
            eventSource.close();
            console.log("SSE CLOSE");
        }
        return () => {
            eventSource.close();
            setIsConnected(false);
            console.log("SSE CLOSE");
        }
    }, [sessionId, message, token, baseURL]);
    return { streamMessage, isConnected, error };
}