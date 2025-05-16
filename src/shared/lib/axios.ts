import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios"
import ApiErrorHandler from "./ApiErrorHandler";
import useAuthStore from "@/entities/auth/store/useAuthStore";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
})

const onRequest = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const accessToken = useAuthStore.getState().accessToken;

    if (accessToken) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
}

const onResponse = (res: AxiosResponse): AxiosResponse => {
    const { method, url } = res.config;
    const { code, message } = res.data;
    console.log(`${method}, ${url}, ${code}, ${message}`);
    return res;
}

const onError = (error: AxiosError | Error): Promise<AxiosError | Error> => {
    ApiErrorHandler.handleGlobalError(error);

    return Promise.reject(error);
}

axiosInstance.interceptors.request.use(onRequest);
axiosInstance.interceptors.response.use(onResponse, onError)

export default axiosInstance