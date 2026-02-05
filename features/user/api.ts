import { api } from "@/lib/api";

export const getMe = async () => {
    const response = await api.get('/user/me');
    return response.data;
}

export const updateMe = async (data: any) => {
    const response = await api.patch('/user', data);
    return response.data;
}

export const updateAvatar = async (formData: FormData) => {
    const response = await api.patch('/user/avatar', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
}
