import { ChatMessageType } from "@/entities/message/types/chat-message-props";

export interface ChatContextType {
    messages: ChatMessageType[];
    isLoading: boolean;
    sendMessage: (message: string) => void;
    messagesEndRef: React.RefObject<HTMLDivElement | null>;
    sessionId: number | null;
    isSessionLoading: boolean;
    createNewSession: () => Promise<number>;
    loadSession: (id: number) => Promise<void>;
    clearMessages: () => void;
    isConnected: boolean;
    error: Event | null;
}