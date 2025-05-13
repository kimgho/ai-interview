import { useReducer } from "react";
import { signUp, SignUpRequestBody } from "../service/signUp";
import { CustomApiError } from "@/shared/lib/errors";
import { signUpFormSchema, SignUpFormType, SignUpRequestBodyType } from "../lib/validation";
import { ZodError } from "zod";
import { signUpReducer, initialState } from "./signUpReducer";

interface UseSignUp {
    formData: SignUpFormType;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
    loading: boolean;
    error: string | null;
    fieldError: Partial<Record<keyof SignUpFormType, string>>;
    success: boolean;
}

export const useSignUp = (): UseSignUp => {
    const [state, dispatch] = useReducer(signUpReducer, initialState);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        dispatch({ type: "INPUT_CHANGE", field: name as keyof SignUpFormType, value });
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch({ type: "SUBMIT_START" });

        const validationResult = signUpFormSchema.safeParse(state.formData);

        if (!validationResult.success) {
            const fieldErrors: Partial<Record<keyof SignUpFormType, string>> = {};
            validationResult.error.errors.forEach(err => {
                if (err.path.length > 0) {
                    const fieldName = err.path[0] as keyof SignUpFormType;
                    if (!fieldErrors[fieldName]) {
                        fieldErrors[fieldName] = err.message;
                    }
                }
            });
            const formLevelError = validationResult.error?.errors.find(err =>
                err.path.length === 0 ||
                (err.path.includes('confirmPassword') && err.message.includes("일치하지 않습니다"))
            )?.message || (Object.keys(fieldErrors).length > 0 ? "입력값을 확인해주세요." : null);

            dispatch({
                type: 'VALIDATION_FAILURE',
                fieldError: fieldErrors,
                formError: formLevelError,
            });
            return;
        }
        const requestBody: SignUpRequestBodyType = {
            name: validationResult.data.name,
            email: validationResult.data.email,
            password: validationResult.data.password
        };

        try {
            await signUp(requestBody as SignUpRequestBody);
            console.log("회원가입 성공");
            dispatch({ type: "SIGNUP_SUCCESS" });
        } catch (error) {
            console.error("회원가입 실패", error);
            let errorMessage = "알 수 없는 오류가 발생했습니다.";
            if (CustomApiError.isCustomApiError(error)) {
                errorMessage = error.message;
            } else if (error instanceof ZodError) {
                errorMessage = "요청 데이터 처리 중 오류가 발생했습니다.";
            }
            dispatch({ type: 'SIGNUP_FAILURE', formError: errorMessage });
        }
    }
    return {
        formData: state.formData,
        handleChange,
        handleSubmit,
        loading: state.loading,
        error: state.error,
        fieldError: state.fieldError,
        success: state.success,
    }
}