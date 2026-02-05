import { api } from "@/lib/api";

export const getMe = async () => {
    const response = await api.get('/user/me');
    return response.data;
}

export const updateMe = async (data: any) => {
    const response = await api.patch('/user', data);
    return response.data;
}
