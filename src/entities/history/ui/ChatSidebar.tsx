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
import { useEffect, useState } from "react"
import { Button } from "@/shared/ui/button"
import { ChevronDown, ChevronRight, PlusCircle } from 'lucide-react'
import { getInterviews, postInterviews } from "@/features/chat/service/interview"
import { formatTime, groupSessionsByDate } from "../utils/dateTransformer"
import { useNavigate } from "react-router"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/shared/ui/collapsible"

const ChatSidebar = () => {
    const [activeSession, setActiveSession] = useState<number | null>(1)
    const [groupedHistory, setGroupedHistory] = useState<ReturnType<typeof groupSessionsByDate>>([]);
    const [isHistoryLoading, setIsHistoryLoading] = useState(false);
    const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({});
    const navigate = useNavigate();

    const getInterviewHistory = async () => {
        setIsHistoryLoading(true);
        try {
            const interviews = await getInterviews();

            const sortedInterviews = [...interviews].sort((a, b) => {
                const dateA = new Date(a.startedAt.replace(' ', 'T'));
                const dateB = new Date(b.startedAt.replace(' ', 'T'));
                return dateB.getTime() - dateA.getTime();
            });

            const grouped = groupSessionsByDate(sortedInterviews);
            setGroupedHistory(grouped);

            const newExpandedState = { ...expandedGroups };
            grouped.forEach(group => {
                if (newExpandedState[group.dateHeader] === undefined) {
                    newExpandedState[group.dateHeader] = true;
                }
            });
            setExpandedGroups(newExpandedState);
        } catch (error) {
            console.error("인터뷰 세션 가져오기 실패", error);
        } finally {
            setIsHistoryLoading(false);
        }
    };

    useEffect(() => {
        getInterviewHistory();
    }, []);

    const handleCreateNewSession = async () => {
        try {
            const newSession = await postInterviews();
            navigate(`/chat/${newSession.id}`);
            await getInterviewHistory();
        } catch (error) {
            console.error("새 인터뷰 세션 생성 실패", error);
        }
    }

    const handleSelectInterview = (sessionId: number) => {
        setActiveSession(sessionId);
        navigate(`/chat/${sessionId}`);
    };

    const toggleGroup = (dateHeader: string) => {
        setExpandedGroups(prev => ({
            ...prev,
            [dateHeader]: !prev[dateHeader]
        }));
    };

    return (
        <Sidebar>
            <SidebarContent>
                <SidebarHeader className="p-2">
                    <Button variant="outline" className="w-full justify-start gap-2 cursor-pointer" onClick={handleCreateNewSession}>
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
                                                    onClick={() => handleSelectInterview(interview.id)}
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