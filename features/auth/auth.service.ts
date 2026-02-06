import { api } from "@/lib/api";
import { EmailVerificationDto, ForgotPasswordDto, LoginDto, ResetPasswordDto, SignupDto } from "./auth.interface";
import { ResendVerificationEmailDto } from "@/types/auth/resend-verification-email.interface";

export const login = async (data: LoginDto) => {
        const response = await api.post('/auth/login', data);
        return response.data;
}

export const signup = async (data: SignupDto) => {
        const response = await api.post('/auth/register', data);
        return response.data;
}

export const emailVerification = async (data: EmailVerificationDto) => {
        const response = await api.post('/auth/verify-email', data);
        return response.data;
}

export const resendOtp = async (data: ResendVerificationEmailDto) => {
        const response = await api.post('/auth/resend-verification', data);
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

export const logout = async () => {
    const response = await api.post('/auth/logout');
    return response.data;
}

export const getMe = async () => {
    const response = await api.get('/user/me');
    return response.data;
}
