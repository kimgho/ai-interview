import { SidebarMenuButton, SidebarMenuItem } from "@/shared/ui/sidebar";
import { useState } from "react";
import ChatPopover from "./ChatPopover";

interface ChatHistoryItemProps {
    title: string;
    timestamp: string;
    isActive?: boolean;
    onClick?: () => void;
    endedAt: string | null;
}

const ChatHistoryItem = ({ title, timestamp, isActive = false, onClick, endedAt }: ChatHistoryItemProps) => {
    const [isHovered, setIsHovered] = useState(false);
    const isEnded = endedAt !== null;
    return (
        <SidebarMenuItem>
            <div
                className="w-full relative"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <SidebarMenuButton
                    onClick={onClick}
                    isActive={isActive}
                    className="flex flex-col items-start gap-0.5 h-auto py-3 pr-6 w-full cursor-pointer"
                >
                    <div className="flex-1 min-w-0 w-full">
                        <div className={`font-medium text-sm whitespace-nowrap overflow-hidden text-ellipsis pr-4 ${isEnded ? "text-gray-500 line-through" : ""}`}>
                            {title}
                        </div>
                        <div className="text-xs text-muted-foreground mt-0.5">{timestamp}</div>
                    </div>
                </SidebarMenuButton>

                <ChatPopover isVisible={isHovered} />
            </div>
        </SidebarMenuItem>
    );
};

export default ChatHistoryItem;