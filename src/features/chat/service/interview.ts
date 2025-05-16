import ApiErrorHandler from "@/shared/lib/ApiErrorHandler"
import axiosInstance from "@/shared/lib/axios"
import { AxiosError } from "axios"

export interface InterviewsResponseBody {
    id: number;
    status: string;
    startedAt: string;
    endedAt: string;
    intervieweeId: number;
}
/**
 * 인터뷰 세션 조회
 * @requires accessToken
 * @returns InterviewsResponseBody
 */
export const getInterviews = async (): Promise<InterviewsResponseBody[]> => {
    try {
        const response = await axiosInstance.get<InterviewsResponseBody[]>('/interviews')
        return response.data
    } catch (error) {
        throw ApiErrorHandler.handleRequestError(error as AxiosError | Error)
    }
}

/**
 * 인터뷰 세션 생성
 * @requires accessToken
 * @returns InterviewsResponseBody
 */
export const postInterviews = async (): Promise<InterviewsResponseBody> => {
    try {
        const response = await axiosInstance.post<InterviewsResponseBody>('/interviews');
        return response.data;
    } catch (error) {
        throw ApiErrorHandler.handleRequestError(error as AxiosError | Error)
    }
}
/**
 * 특정 세션의 메시지 기록 조회
 * @param sessionId 
 * @requires accessToken
 * @returns InterviewsResponseBody
 */
export const getInterviewById = async (sessionId: number): Promise<InterviewsResponseBody> => {
    try {
        const response = await axiosInstance.get(`/interviews/${sessionId}/messages`)
        return response.data;
    } catch (error) {
        throw ApiErrorHandler.handleRequestError(error as AxiosError | Error);
    }
}