import { useState, useCallback } from "react";
import { getInterviews, postInterviews } from "@/features/chat/service/interview";
import { groupSessionsByDate } from "../utils/dateTransformer";

export const useChatSidebar = () => {
    const [activeSession, setActiveSession] = useState<number | null>(1);
    const [groupedHistory, setGroupedHistory] = useState<ReturnType<typeof groupSessionsByDate>>([]);
    const [isHistoryLoading, setIsHistoryLoading] = useState(false);
    const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({});

    const getInterviewHistory = useCallback(async () => {
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

            setExpandedGroups(prev => {
                const newExpandedState = { ...prev };
                grouped.forEach(group => {
                    if (newExpandedState[group.dateHeader] === undefined) {
                        newExpandedState[group.dateHeader] = false;
                    }
                });
                return newExpandedState;
            });
        } catch (error) {
            console.error("인터뷰 세션 가져오기 실패", error);
        } finally {
            setIsHistoryLoading(false);
        }
    }, []);

    const handleCreateNewSession = useCallback(async (navigate: (url: string) => void) => {
        try {
            const newSession = await postInterviews();
            navigate(`/chat/${newSession.id}`);
            await getInterviewHistory();
        } catch (error) {
            console.error("새 인터뷰 세션 생성 실패", error);
        }
    }, [getInterviewHistory]);

    const handleSelectInterview = useCallback((sessionId: number, navigate: (url: string) => void) => {
        setActiveSession(sessionId);
        navigate(`/chat/${sessionId}`);
    }, []);

    const toggleGroup = useCallback((dateHeader: string) => {
        setExpandedGroups(prev => ({
            ...prev,
            [dateHeader]: !prev[dateHeader]
        }));
    }, []);

    return {
        activeSession,
        groupedHistory,
        isHistoryLoading,
        expandedGroups,
        getInterviewHistory,
        handleCreateNewSession,
        handleSelectInterview,
        toggleGroup,
        setActiveSession,
    };
}