import ApiErrorHandler from "@/shared/lib/ApiErrorHandler";
import axiosInstance from "@/shared/lib/axios";
import { BaseResponse } from "@/shared/lib/baseResponse";
import { AxiosError } from "axios";

export type SignUpRequestBody = {
    name: string;
    email: string;
    password: string;
}


export const signUp = async (body: SignUpRequestBody) => {
    try {
        const { data: response } = await axiosInstance.post<BaseResponse<SignUpRequestBody>>("/users", body);
        return response.data;
    } catch (error) {
        throw ApiErrorHandler.handleRequestError(error as AxiosError | Error);
    }
}