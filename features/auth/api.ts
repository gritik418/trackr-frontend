import { api } from "@/lib/api";
import { EmailVerificationDto, ForgotPasswordDto, LoginDto, ResetPasswordDto, SignupDto } from "./auth.interface";

export const login = async (data: LoginDto) => {
        const response = await api.post('/auth/login', data);
        return response.data;
}

export const signup = async (data: SignupDto) => {
        const response = await api.post('/auth/signup', data);
        return response.data;
}

export const emailVerification = async (data: EmailVerificationDto) => {
        const response = await api.post('/auth/email-verification', data);
        return response.data;
}

export const resetPassword = async (data: ResetPasswordDto) => {
        const response = await api.post('/auth/reset-password', data);

        return response.data;
}

export const forgotPassword = async (data: ForgotPasswordDto) => {
        const response = await api.post('/auth/forgot-password', data);
        return response.data;
}

export const getMe = async () => {
    const response = await api.get('/user/me');
    return response.data;
}
