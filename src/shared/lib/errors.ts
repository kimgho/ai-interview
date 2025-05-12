import { AxiosError } from "axios";

export class CustomApiError extends Error {
    status?: number;
    data?: unknown;
    isCustomApiError = true;
    originalError?: AxiosError | Error;

    constructor(
        message: string,
        options?: {
            status?: number;
            data?: unknown;
            originalError?: AxiosError | Error;
        }
    ) {
        super(message);
        this.name = 'CustomApiError';
        this.status = options?.status;
        this.data = options?.data;
        this.originalError = options?.originalError;

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, CustomApiError);
        }
    }

    static isCustomApiError(error: unknown): error is CustomApiError {
        return error instanceof CustomApiError || (typeof error === 'object' && error !== null && (error as CustomApiError).isCustomApiError === true);
    }
}