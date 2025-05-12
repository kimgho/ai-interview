import axiosInstance from "@/shared/lib/axios";

export type SignUpResponseBody = {
    name: string;
    email: string;
    password: string;
}

export const signUp = async (body: SignUpResponseBody) => {
    try {
        const response = await axiosInstance.post<SignUpResponseBody>("v1/interviewee", body);
        return response.data;
    } catch (error) {

    }
}