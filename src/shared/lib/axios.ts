import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios"

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
})

const onRequest = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const { method, url } = config
    console.log(`${method?.toUpperCase()} ${url}`);

    return config;
}

const onResponse = (res: AxiosResponse): AxiosResponse => {
    const { method, url } = res.config;
    const { code, message } = res.data;
    console.log(`${method}, ${url}, ${code}, ${message}`);
    return res;
}

const onError = (error: AxiosError | Error): Promise<AxiosError> => {
    if (axios.isAxiosError(error)) {
        const { method, url } = error.config as InternalAxiosRequestConfig
        console.log(`${method?.toUpperCase()} ${url}`)
    }
    return Promise.reject(error)
}

axiosInstance.interceptors.request.use(onRequest);
axiosInstance.interceptors.response.use(onResponse, onError)

export default axiosInstance