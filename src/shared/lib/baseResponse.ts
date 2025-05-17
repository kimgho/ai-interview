export interface BaseResponse<T> {
    data: T,
    error: {
        code: string,
        message: string
    }
}