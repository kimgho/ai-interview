import ApiErrorHandler from "@/shared/lib/ApiErrorHandler";
import axiosInstance from "@/shared/lib/axios";
import { BaseResponse } from "@/shared/lib/baseResponse";
import { AxiosError } from "axios";

export type LoginRequestBody = {
    email: string;
    password: string;
}

export type LoginResponseBody = {
    accessToken: {
        value: string;
    }
    refreshToken: {
        value: string;
    }
}

export const login = async (body: LoginRequestBody) => {
    try {
        const { data: response } = await axiosInstance.post<BaseResponse<LoginResponseBody>>('/auth/login', body)
        return response.data;
    } catch (error) {
        throw ApiErrorHandler.handleRequestError(error as AxiosError | Error);
    }
}