import { create } from "zustand"

interface Interview {
    id: number;
    status: "ACTIVE" | "ENDED";
    startedAt: string;
    endedAt: string | null;
    intervieweeId: number;
}

interface InterviewStatus {
    currentInterview: Interview | null;
    setInterview: (interview: Interview | null) => void;
    isInterviewEnded: () => boolean;
}

export const useInterviewStore = create<InterviewStatus>((set, get) => ({
    currentInterview: null,
    setInterview: (interview) => set({ currentInterview: interview }),
    isInterviewEnded: () => {
        const interview = get().currentInterview;
        return interview ? interview.endedAt !== null : false;
    }
}))