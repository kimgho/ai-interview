import axios, { AxiosError } from "axios";
import { CustomApiError } from "./errors";

class ApiErrorHandler {
    public static handleRequestError(error: AxiosError | Error): never {
        let customError: CustomApiError;
        if (axios.isAxiosError(error)) {
            const status = error.response?.status;
            const serverErrorMessage = error.response?.data?.message || error.message;

            console.error(`[API Request Error] ${error.config?.method?.toUpperCase()} ${error.config?.url}`, {
                status: status,
                message: serverErrorMessage,
                responseData: error.response?.data,
                requestData: error.config?.data,
                originalError: error,
            });

            let errorMessage = "알 수 없는 오류가 발생했습니다.";
            if (status === 400) {
                errorMessage = error.response?.data?.message || "잘못된 요청입니다. 입력 정보를 확인해주세요";
            } else if (status === 401) {
                errorMessage = "로그인이 필요한 서비스입니다. 로그인을 해주세요.";
            } else if (status === 403) {

            } else if (status === 404) {

            } else if (status >= 500) {

            } else if (!status) {

            }
        }
    }
}