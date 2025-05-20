import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
} from "@/shared/ui/sidebar"
import ChatHistoryItem from "./ChatHistoryItem"
import { useEffect } from "react"
import { Button } from "@/shared/ui/button"
import { ChevronDown, ChevronRight, PlusCircle } from 'lucide-react'
import { formatTime } from "../utils/dateTransformer"
import { useNavigate } from "react-router"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/shared/ui/collapsible"
import { useChatSidebar } from "../model/useChatSidebar"

const ChatSidebar = () => {
    const navigate = useNavigate();
    const {
        activeSession,
        groupedHistory,
        isHistoryLoading,
        expandedGroups,
        getInterviewHistory,
        handleCreateNewSession,
        handleSelectInterview,
        toggleGroup,
    } = useChatSidebar();

    useEffect(() => {
        getInterviewHistory();
    }, [getInterviewHistory]);

    return (
        <Sidebar>
            <SidebarContent>
                <SidebarHeader className="p-2">
                    <Button
                        variant="outline"
                        className="w-full justify-start gap-2 cursor-pointer"
                        onClick={() => handleCreateNewSession(navigate)}
                    >
                        <PlusCircle size={16} />
                        <span>새 인터뷰 세션</span>
                    </Button>
                </SidebarHeader>
                <SidebarGroup>
                    <SidebarGroupLabel className="justify-center font-bold text-2xl my-3">지난 인터뷰</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {isHistoryLoading && (
                                <div className="p-4 text-center text-gray-500">로딩 중...</div>
                            )}
                            {!isHistoryLoading && groupedHistory.length === 0 && (
                                <div className="p-4 text-center text-gray-500">지난 인터뷰가 없습니다.</div>
                            )}
                            {!isHistoryLoading && groupedHistory.length > 0 && (
                                groupedHistory.map((group) => (
                                    <Collapsible
                                        key={group.dateHeader}
                                        open={expandedGroups[group.dateHeader]}
                                        className="mb-2"
                                    >
                                        <CollapsibleTrigger
                                            onClick={() => toggleGroup(group.dateHeader)}
                                            className="flex items-center w-full px-3 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 rounded-md cursor-pointer"
                                        >
                                            {expandedGroups[group.dateHeader] ?
                                                <ChevronDown className="h-4 w-4 mr-1" /> :
                                                <ChevronRight className="h-4 w-4 mr-1" />
                                            }
                                            <span>{group.dateHeader}</span>
                                            <span className="ml-auto text-xs text-gray-400">
                                                {group.sessions.length}개
                                            </span>
                                        </CollapsibleTrigger>
                                        <CollapsibleContent>
                                            {group.sessions.map((interview) => (
                                                <ChatHistoryItem
                                                    key={interview.id}
                                                    title={interview.displayTitle}
                                                    timestamp={formatTime(interview.startedAt)}
                                                    isActive={activeSession === interview.id}
                                                    onClick={() => handleSelectInterview(interview.id, navigate)}
                                                    endedAt={interview.endedAt}
                                                />
                                            ))}
                                        </CollapsibleContent>
                                    </Collapsible>
                                ))
                            )}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
};

export default ChatSidebar;