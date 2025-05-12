import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";
import { MoreHorizontal, Edit, Trash } from "lucide-react";
import ChatPopoverButton from "./ChatPopoverButton";

interface ChatPopoverProps {
    isVisible: boolean;
    onTriggerClick?: (e: React.MouseEvent) => void;
    onEdit?: () => void;
    onDelete?: () => void;
}
//사이드바 종속
// feature/chat/ui?
// history를 entities로 빼면 /entities/history/ui
const ChatPopover = ({ isVisible, onTriggerClick, onDelete, onEdit }: ChatPopoverProps) => {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <button
                    className={`absolute right-2 top-1/2 -translate-y-1/2 ${isVisible ? "opacity-100" : "opacity-0"
                        } transition-opacity p-1 rounded-md hover:bg-accent hover:cursor-pointer`}
                    onClick={(e) => {
                        e.stopPropagation();
                        if (onTriggerClick) onTriggerClick(e);
                    }}
                >
                    <MoreHorizontal size={16} />
                </button>
            </PopoverTrigger>
            <PopoverContent className="w-40 p-2" align="start" sideOffset={5}>
                <ChatPopoverButton
                    label="수정하기"
                    icon={<Edit size={16} />}
                    onClick={onEdit}
                />
                <ChatPopoverButton
                    label="삭제하기"
                    icon={<Trash size={16} />}
                    variant="danger"
                    onClick={onDelete}
                />
            </PopoverContent>
        </Popover>
    );
};

export default ChatPopover;