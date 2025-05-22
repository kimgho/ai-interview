import { useEffect, useState, useRef } from "react";
import { flushSync } from "react-dom";

interface ChatStreamRequestBody {
    sessionId: number;
    message: string;
    token: string | null;
}

interface StreamData {
    event: "heartbeat" | "progress" | "complete";
    data: string;
}

interface UseChatStreamResult {
    streamMessage: StreamData | null;
    isConnected: boolean;
    error: Event | null;
}

export const useChatStream = ({ sessionId, message, token }: ChatStreamRequestBody): UseChatStreamResult => {
    const [streamMessage, setStreamMessage] = useState<StreamData | null>(null);
    const [isConnected, setIsConnected] = useState<boolean>(false);
    const [error, setError] = useState<Event | null>(null);
    const eventSourceRef = useRef<EventSource | null>(null);

    const baseURL = import.meta.env.VITE_BASE_URL;

    useEffect(() => {
        if (!sessionId || !token || !message) {
            if (eventSourceRef.current && eventSourceRef.current.readyState !== EventSource.CLOSED) {
                eventSourceRef.current.close();
                console.log("유효하지 않은 세션ID 또는 토큰 또는 메시지입니다. SSE 연결을 종료합니다.");
            }
            setIsConnected(false);
            setStreamMessage(null);
            setError(null);
            return;
        }

        if (eventSourceRef.current && eventSourceRef.current.readyState !== EventSource.CLOSED) {
            console.log("SSE Close");
            eventSourceRef.current.close();
        }

        setStreamMessage(null);
        setError(null);

        const url = `${baseURL}/interviews/${sessionId}/messages/stream?message=${encodeURIComponent(message)}&token=${encodeURIComponent(token)}`;

        const eventSource = new EventSource(url, { withCredentials: true });

        eventSourceRef.current = eventSource;

        eventSource.onopen = () => {
            console.log("SSE OPEN");
            setIsConnected(true);
            setError(null);
        };

        eventSource.onmessage = (event) => {
            try {
                const parsedData = JSON.parse(event.data);

                if (parsedData.event && (parsedData.event === 'progress' || parsedData.event === 'complete' || parsedData.event === 'heartbeat')) {
                    const newMessage: StreamData = { event: parsedData.event, data: parsedData.data };

                    if (parsedData.event === 'complete') {
                        flushSync(() => {
                            setStreamMessage(newMessage);
                        })

                        eventSource.close();
                        setIsConnected(false);
                        eventSourceRef.current = null;
                    } else {
                        setStreamMessage(newMessage);
                    }
                } else {
                    console.warn("onmessage: Unexpected data format or missing event field in data:", parsedData);
                }

            } catch (e) {
                console.error("onmessage: Failed to parse data as JSON:", event.data, e);
                setError(e as Event);
            }
        };

        eventSource.onerror = (event) => {
            console.error("SSE ERROR", event);
            setIsConnected(false);
            setError(event);

            if (eventSourceRef.current && eventSourceRef.current.readyState === EventSource.CLOSED) {
                console.log("SSE connection closed due to fatal error or server action.");
                eventSourceRef.current = null;
            } else {
                console.log("SSE connection error. Browser might attempt to reconnect.");
            }
        };

        return () => {
            console.log("SSE cleanup: Closing connection.");
            if (eventSourceRef.current && eventSourceRef.current.readyState !== EventSource.CLOSED) {
                eventSourceRef.current.close();
                console.log("SSE Close");
            }
            setIsConnected(false);
            setStreamMessage(null);
            setError(null);
            eventSourceRef.current = null;
        };
    }, [sessionId, message, token, baseURL]);

    return { streamMessage, isConnected, error };
};