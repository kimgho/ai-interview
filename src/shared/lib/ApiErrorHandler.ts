import axios, { AxiosError } from "axios";
import { CustomApiError } from "./errors";

class ApiErrorHandler {
    public static handleRequestError(error: AxiosError | Error): never {
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

            if (status !== undefined) {
                if (status === 400) {
                    errorMessage = error.response?.data?.message || "잘못된 요청입니다. 입력 정보를 확인해주세요";
                } else if (status === 401) {
                    errorMessage = "로그인이 필요한 서비스입니다. 로그인을 해주세요.";
                    // TODO 로그인 페이지로 넘길지? 아니면 리프레시 토큰을 받을지
                } else if (status === 403) {
                    errorMessage = "접근 권한이 없습니다.";
                } else if (status === 404) {
                    errorMessage = "요청한 리소스를 찾을 수 없습니다.";
                } else if (status >= 500) {
                    errorMessage = "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.";
                } else {
                    errorMessage = `API 요청 중 오류가 발생했습니다. (상태: ${status})`;
                }
            } else {
                errorMessage = "네트워크 연결 상태를 확인하거나 잠시 후 다시 시도해주세요."
                console.error("Network or CORS error:", error.message);
            }

            throw new CustomApiError(errorMessage, {
                status: status,
                data: error.response?.data,
                originalError: error,
            });

        } else {
            console.error(`[General Error] unexpected error`, error);
            throw new CustomApiError("알 수 없는 오류가 발생했습니다.", {
                originalError: error
            });
        }
    }

    public static handleGlobalError(error: AxiosError | Error): Promise<AxiosError | Error> {
        if (axios.isAxiosError(error)) {
            const status = error.response?.status;
            const serverErrorMessage = error.response?.data?.message || error.message;

            console.error(`[API Global Error] ${error.config?.method?.toUpperCase()} ${error.config?.url}`, {
                status: status,
                message: serverErrorMessage,
                responseData: error.response?.data,
                originalError: error,
            });

            if (status !== undefined) {
                if (status === 401) {
                    console.log("Global: Handling 401 - authentication required.");
                    // TODO: 에러처리
                }
            } else {
                console.error("[Global Network Error] No status received:", error.message);
                // TODO: 나머지 에러 처리
            }


        } else {
            console.error("[General Global Error] An unexpected error occurred:", error);
        }
        return Promise.reject(error);
    }
}

export default ApiErrorHandler;