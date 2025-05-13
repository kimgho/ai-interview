export type LoginFormType = {
    email: string;
    password: string;
}

export interface LoginState {
    formData: LoginFormType
    loading: boolean;
    error: string | null;
    fieldError: Partial<Record<keyof LoginFormType, string>>
}

export type LoginAction =
    | { type: "INPUT_CHANGE"; field: keyof LoginFormType, value: string }
    | { type: "SUBMIT_START" }
    | { type: "VALIDATION_FAILURE"; fieldError: Partial<Record<keyof LoginFormType, string>>; formError: string | null }
    | { type: "LOGIN_SUCCESS" }
    | { type: "LOGIN_FAILURE"; formError: string | null }

export const initialLoginState: LoginState = {
    formData: {
        email: "",
        password: ""
    },
    loading: false,
    error: null,
    fieldError: {}
}

export const loginReducer = (state: LoginState, action: LoginAction): LoginState => {
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
                    [action.field]: undefined,
                },
                error: null,
            }
        case "SUBMIT_START":
            return {
                ...state,
                loading: true,
                error: null,
                fieldError: {},
            }
        case "VALIDATION_FAILURE":
            return {
                ...state,
                loading: false,
                fieldError: action.fieldError,
                error: action.formError,
            }
        case "LOGIN_SUCCESS":
            return {
                ...state,
                formData: { email: '', password: '' },
                loading: false,
                error: null,
                fieldError: {}
            }
        case "LOGIN_FAILURE":
            return {
                ...state,
                loading: false,
                error: action.formError,
            }
        default:
            return state
    }
}