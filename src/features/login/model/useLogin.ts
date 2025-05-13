import { useReducer } from "react";
import { initialLoginState, LoginFormType, loginReducer } from "./loginReducer";
import { login, LoginRequestBody, LoginResponseBody } from "../service/login";
import { useNavigate } from "react-router";
import { CustomApiError } from "@/shared/lib/errors";
import useAuthStore from "@/entities/auth/store/useAuthStore";

interface UseLogin {
    formData: LoginFormType
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
    loading: boolean;
    error: string | null;
    fieldError: Partial<Record<keyof LoginFormType, string>>;
}

export const useLogin = (): UseLogin => {
    const navigate = useNavigate();
    const [state, dispatch] = useReducer(loginReducer, initialLoginState);
    const authLogin = useAuthStore.getState().login;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        dispatch({ type: "INPUT_CHANGE", field: name as keyof LoginFormType, value });
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch({ type: "SUBMIT_START" });

        const requestBody: LoginRequestBody = {
            email: state.formData.email,
            password: state.formData.password
        }
        try {
            const response: LoginResponseBody = await login(requestBody);
            console.log("로그인 성공", response);

            authLogin({
                userData: { email: state.formData.email },
                accessToken: response.accessToken.value,
                refreshToken: response.refreshToken.value
            })

            dispatch({ type: "LOGIN_SUCCESS" });
            navigate("/");
        } catch (error) {
            console.error("로그인 API 호출 실패:", error);

            let errorMessage = "알 수 없는 오류가 발생했습니다.";
            if (CustomApiError.isCustomApiError(error)) {
                errorMessage = error.message;
            }
            else if (error instanceof Error) {
                errorMessage = error.message;
            }
            dispatch({ type: 'LOGIN_FAILURE', formError: errorMessage });
        }
    }
    return {
        formData: state.formData,
        handleChange,
        handleSubmit,
        loading: state.loading,
        error: state.error,
        fieldError: state.fieldError
    }
}

