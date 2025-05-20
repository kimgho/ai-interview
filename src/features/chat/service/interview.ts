import { SenderType } from "@/entities/message/ui/ChatMessage";
import ApiErrorHandler from "@/shared/lib/ApiErrorHandler"
import axiosInstance from "@/shared/lib/axios"
import { BaseResponse } from "@/shared/lib/baseResponse";
import { AxiosError } from "axios"

export interface InterviewsResponseBody {
    id: number;
    status: string;
    startedAt: string;
    endedAt: string;
    intervieweeId: number;
}

export interface InterviewMessageResponseBody {
    id: number;
    sessionId: number;
    message: string;
    sender: SenderType;
    createdAt: string;

}
/**
 * 인터뷰 세션 목록을 조회
 * @requires accessToken
 * @returns {Promise<InterviewsResponseBody[]>} 인터뷰 세션 배열
 * @throws {ApiError} 요청 실패 시 에러를 throw
 */
export const getInterviews = async (): Promise<InterviewsResponseBody[]> => {
    try {
        const { data: response } = await axiosInstance.get<BaseResponse<InterviewsResponseBody[]>>('/interviews')
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
        const { data: response } = await axiosInstance.post<BaseResponse<InterviewsResponseBody>>('/interviews');
        return response.data;
    } catch (error) {
        throw ApiErrorHandler.handleRequestError(error as AxiosError | Error)
    }
}


/**
 * 특정 세션의 메시지 기록을 조회
 * @param {number} SessionId - 조회할 세션의 ID
 * @requires accessToken
 * @returns {Promise<InterviewMessageResponseBody>} 세션 정보 및 메시지 기록
 * @throws {ApiError} 요청 실패 시 에러를 throw
 */
export const getInterviewById = async (SessionId: number): Promise<InterviewMessageResponseBody[]> => {
    try {
        const { data: response } = await axiosInstance.get<BaseResponse<InterviewMessageResponseBody[]>>(`/interviews/${SessionId}/messages`)
        return response.data;
    } catch (error) {
        throw ApiErrorHandler.handleRequestError(error as AxiosError | Error);
    }
}

/**
 * 특정 세션을 종료
 * @param {number} SessionId
 * @requires accessToken
 * @throws {ApiError}
 */
export const postTerminateInterview = async (SessionId: number) => {
    try {
        const { data: response } = await axiosInstance.post(`/interviews/${SessionId}/complete`);
        return response.data;
    } catch (error) {
        throw ApiErrorHandler.handleRequestError(error as AxiosError | Error);
    }
}