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
 * 인터뷰 세션 목록을 조회
 * @requires accessToken
 * @returns {Promise<InterviewsResponseBody[]>} 인터뷰 세션 배열
 * @throws {ApiError} 요청 실패 시 에러를 throw
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
 * 새로운 인터뷰 세션을 생성
 * @requires accessToken
 * @returns {Promise<InterviewsResponseBody>} 생성된 인터뷰 세션 정보
 * @throws {ApiError} 요청 실패 시 에러를 throw
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
 * 특정 세션의 메시지 기록을 조회
 * @param {number} sessionId - 조회할 세션의 ID
 * @requires accessToken
 * @returns {Promise<InterviewsResponseBody>} 세션 정보 및 메시지 기록
 * @throws {ApiError} 요청 실패 시 에러를 throw
 */
export const getInterviewById = async (sessionId: number): Promise<InterviewsResponseBody> => {
    try {
        const response = await axiosInstance.get(`/interviews/${sessionId}/messages`)
        return response.data;
    } catch (error) {
        throw ApiErrorHandler.handleRequestError(error as AxiosError | Error);
    }
}