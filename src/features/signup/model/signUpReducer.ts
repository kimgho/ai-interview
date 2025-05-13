import { SignUpFormType } from "../lib/validation";

export interface SignUpState {
    formData: SignUpFormType;
    loading: boolean;
    error: string | null;
    fieldError: Partial<Record<keyof SignUpFormType, string>>;
    success: boolean;
}

export type SignUpAction =
    | { type: "INPUT_CHANGE"; field: keyof SignUpFormType; value: string }
    | { type: "CLEAR_FIELD_ERROR"; field: keyof SignUpFormType }
    | { type: "CLEAR_FORM_ERROR"; }
    | { type: "SUBMIT_START" }
    | { type: "VALIDATION_FAILURE"; fieldError: Partial<Record<keyof SignUpFormType, string>>; formError: string | null }
    | { type: "SIGNUP_SUCCESS" }
    | { type: "SIGNUP_FAILURE"; formError: string | null }

export const initialState: SignUpState = {
    formData: {
        email: '',
        name: '',
        password: '',
        confirmPassword: ''
    },
    loading: false,
    error: null,
    fieldError: {},
    success: false
}

export const signUpReducer = (state: SignUpState, action: SignUpAction): SignUpState => {
    switch (action.type) {
        case "INPUT_CHANGE":
            return {
                ...state,
                formData: {
                    ...state.formData,
                    [action.field]: action.value
                },
                fieldError: {
                    ...state.fieldError,
                    [action.field]: undefined
                },
                error: null,
            };
        case "CLEAR_FIELD_ERROR":
            return {
                ...state,
                fieldError: {
                    ...state.fieldError,
                    [action.field]: undefined,
                },
            };
        case "CLEAR_FORM_ERROR":
            return {
                ...state,
                error: null,
            };
        case "SUBMIT_START":
            return {
                ...state,
                loading: true,
                error: null,
                fieldError: {},
                success: false,
            };
        case "VALIDATION_FAILURE":
            return {
                ...state,
                loading: false,
                fieldError: action.fieldError,
                error: action.formError,
                success: false,
            };
        case "SIGNUP_SUCCESS":
            return {
                ...state,
                loading: false,
                success: true,
                formData: {
                    email: '', name: '', password: '', confirmPassword: ''
                },
                error: null,
                fieldError: {},
            };
        case "SIGNUP_FAILURE":
            return {
                ...state,
                loading: false,
                error: action.formError,
                success: false,
            };
        default:
            return state;
    }
}