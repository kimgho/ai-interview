import { InterviewsResponseBody } from "@/features/chat/service/interview";

interface GroupedSession {
    dateHeader: string;
    sessions: (InterviewsResponseBody & { displayTitle: string })[];
}

export const createDate = (str: string): Date | null => {
    try {
        const isoLikeString = str.replace(' ', 'T');
        const date = new Date(isoLikeString);
        return isNaN(date.getTime()) ? null : date;
    } catch {
        return null;
    }
};

export const getDateHeader = (dateString: string): string => {
    const date = createDate(dateString);
    if (!date) return "알 수 없는 날짜";

    const formatToKoreanDate = (date: Date): string => {
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const yesterday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
        const itemDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());

        if (itemDate.getTime() === today.getTime()) return "오늘";
        if (itemDate.getTime() === yesterday.getTime()) return "어제";

        const dateOptions: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('ko-KR', dateOptions);
    };

    return formatToKoreanDate(date);
};

export const formatTime = (dateString: string): string => {
    const date = createDate(dateString);
    if (!date) return "";

    const timeOptions: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit', hour12: false };
    return date.toLocaleTimeString([], timeOptions);
};

export const groupSessionsByDate = (sessions: InterviewsResponseBody[]): GroupedSession[] => {
    const sessionsByDateHeader = sessions.reduce<Record<string, InterviewsResponseBody[]>>(
        (acc, session) => {
            const header = getDateHeader(session.startedAt);
            return {
                ...acc,
                [header]: [...(acc[header] || []), session]
            };
        },
        {}
    );

    return Object.entries(sessionsByDateHeader)
        .map(([dateHeader, dateSessions]) => ({
            dateHeader,
            sessions: dateSessions.map((session, index) => ({
                ...session,
                displayTitle: `세션 ${index + 1}`
            }))
        }));
};